<?php
namespace App\Database\MySqlElasticSearch\Query;

use Illuminate\Support\Arr;
use App\Database\MySqlElasticSearch\Connection;
use Illuminate\Database\Query\Grammars\Grammar;
use App\Database\ElasticSearch\Query\Grammars\Grammar as ElasticSearchGrammar;
use Illuminate\Database\Query\Processors\Processor;
use App\Database\ElasticSearch\Query\Base;
use DB, RuntimeException, InvalidArgumentException;

class Builder extends \Illuminate\Database\Query\Builder {
    use Base;

    private $esGrammar;
    private $is_query_bigdb = true;
    private $is_only_bigdb  = false;
    private $is_only_db     = false;
    private $sync_time      = 10;

    public $operators = [
        '=', '<', '>', '<=', '>=', '<>', '!=', 'like', 'not like', 'match',
    ];

    public function __construct(Connection $connection,
                                Grammar $grammar = null,
                                Processor $processor = null)
    {
        $this->connection = $connection;
        $this->grammar = $grammar ?: $connection->getQueryGrammar();
        $this->processor = $processor ?: $connection->getPostProcessor();
        $this->esGrammar = new ElasticSearchGrammar();
    }

    public function onlyUpdateBigDB() {
        $this->is_only_bigdb = true;
        return $this;
    }

    public function onlyUpdateDB() {
        $this->is_only_db = true;
        return $this;
    }

    public function disableQueryBigDB() {
        $this->is_query_bigdb = false;
        return $this;
    }

    protected function runSelect() {
        if (!is_null($this->lock) || !$this->is_query_bigdb) {
            return parent::runSelect();
        }

        return DB::connection('elasticsearch')->search($this->from, $this->esGrammar->compileSelect($this));
    }

    public function exists() {
        if (!is_null($this->lock) || !$this->is_query_bigdb) {
            return parent::exists();
        }
        throw new RuntimeException("This method is not supported");
    }

    public function count($columns = '*') {
        if (!is_null($this->lock) || !$this->is_query_bigdb) {
            return parent::count($columns);
        }

        if ($this->distinct) {
            return (int) $this->aggregate('distinct', [$columns]);
        } else {
            return (int) DB::connection('elasticsearch')->count($this->from, $this->esGrammar->compileQuery($this, $columns));
        }
    }

    public function insert(array $values) {
        throw new RuntimeException("This method is not supported");
    }

    public function insertOrIgnore(array $values) {
        //如果有事务
        if ($this->connection->transactionLevel() > 0) {
            $this->connection->addElasticSearchUpdateTable($this->from);
            $values['query_sn'] = $this->connection->getElasticSearchQuerySn();
            $values['db_sync_time'] = $this->raw("unix_timestamp() + " . $this->sync_time);
        }

        $result = parent::insertOrIgnore($values);
        if ($result > 0) {
            //如果没有事务
            if ($this->connection->transactionLevel() < 1) {
                DB::connection('elasticsearch')->index($this->from, $values);
            }
        }
        return $result;
    }

    public function insertGetId(array $values, $sequence = null) {
        //如果有事务
        if ($this->connection->transactionLevel() > 0) {
            $values['query_sn'] = $this->connection->getElasticSearchQuerySn();
            $values['db_sync_time'] = $this->raw("unix_timestamp() + " . $this->sync_time);
            $this->connection->addElasticSearchUpdateTable($this->from);
        }

        $id = parent::insertGetId($values, $sequence);
        //如果没有事务
        if ($this->connection->transactionLevel() < 1) {
            $values['id'] = $id;
            DB::connection('elasticsearch')->index($this->from, $values);
        }
        return $id;
    }

    public function update(array $values) {
        if($this->is_only_db) {
            return parent::update($values);
        } elseif ($this->is_only_bigdb) {
            $body = $this->esGrammar->compileUpdate($this, $values);
            return DB::connection('elasticsearch')->updateByQuery($this->from, $body);
        } else {
            //如果有事务
            if ($this->connection->transactionLevel() > 0) {
                $values['query_sn'] = $this->connection->getElasticSearchQuerySn();
                $values['db_sync_time'] = $this->raw("unix_timestamp() + " . $this->sync_time);
                $this->connection->addElasticSearchUpdateTable($this->from);
            }

            $result = parent::update($values);
            if ($result) {
                //如果没有事务
                if ($this->connection->transactionLevel() < 1) {
                    $body = $this->esGrammar->compileUpdate($this, $values);
                    DB::connection('elasticsearch')->updateByQuery($this->from, $body);
                }
            }
            return $result;
        }
    }

    public function updateOrInsert(array $attributes, array $values = []) {
        throw new RuntimeException("This method is not supported");
    }

    public function increment($column, $amount = 1, array $extra = []) {
        if (! is_numeric($amount)) {
            throw new InvalidArgumentException('Non-numeric value passed to increment method.');
        }

        $values = array_merge([$column => [$amount, '+=']], $extra);

        if($this->is_only_db) {
            return parent::increment($column, $amount, $extra);
        } elseif ($this->is_only_bigdb) {
            $body = $this->esGrammar->compileUpdate($this, $values);
            return DB::connection('elasticsearch')->updateByQuery($this->from, $body);
        } else {
            //如果有事务
            if ($this->connection->transactionLevel() > 0) {
                $wrapped = $this->grammar->wrap($column);
                $values  = array_merge([$column => $this->raw("$wrapped + $amount")], $extra);
                $values['query_sn'] = $this->connection->getElasticSearchQuerySn();
                $values['db_sync_time'] = $this->raw("unix_timestamp() + " . $this->sync_time);
                $this->connection->addElasticSearchUpdateTable($this->from);
                $result = parent::update($values);
            } else {
                $result = parent::increment($column, $amount, $extra);
            }

            if ($result) {
                //如果没有事务
                if ($this->connection->transactionLevel() < 1) {
                    $body = $this->esGrammar->compileUpdate($this, $values);
                    DB::connection('elasticsearch')->updateByQuery($this->from, $body);
                }
            }
            return $result;
        }
    }

    public function decrement($column, $amount = 1, array $extra = []) {
        if (! is_numeric($amount)) {
            throw new InvalidArgumentException('Non-numeric value passed to decrement method.');
        }

        $values = array_merge([$column => [$amount, '-=']], $extra);

        if($this->is_only_db) {
            return parent::decrement($column, $amount, $extra);
        } elseif ($this->is_only_bigdb) {
            $body = $this->esGrammar->compileUpdate($this, $values);
            return DB::connection('elasticsearch')->updateByQuery($this->from, $body);
        } else {
            //如果有事务
            if ($this->connection->transactionLevel() > 0) {
                $wrapped = $this->grammar->wrap($column);
                $values  = array_merge([$column => $this->raw("$wrapped - $amount")], $extra);
                $values['query_sn'] = $this->connection->getElasticSearchQuerySn();
                $values['db_sync_time'] = $this->raw("unix_timestamp() + " . $this->sync_time);
                $this->connection->addElasticSearchUpdateTable($this->from);
                $result = parent::update($values);
            } else {
                $result = parent::decrement($column, $amount, $extra);
            }

            if ($result) {
                //如果没有事务
                if ($this->connection->transactionLevel() < 1) {
                    $body = $this->esGrammar->compileUpdate($this, $values);
                    DB::connection('elasticsearch')->updateByQuery($this->from, $body);
                }
            }
            return $result;
        }
    }

    public function delete($id = null) {
        if (!is_null($id)) {
            $this->where('id', '=', $id);
        }

        $body = $this->esGrammar->compileDelete($this);

        //如果有事务
        if ($this->connection->transactionLevel() > 0) {
            $this->connection->addElasticSearchDeleteTable($this->from, $body);
        }

        $result = $this->connection->delete(
            $this->grammar->compileDelete($this), $this->cleanBindings(
            $this->grammar->prepareBindingsForDelete($this->bindings)
        ));

        if ($result > 0) {
            //如果没有事务
            if ($this->connection->transactionLevel() < 1) {
                DB::connection('elasticsearch')->deleteByQuery($this->from, $body);
            }
        }
        return $result;
    }

    public function truncate() {
        throw new RuntimeException("This method is not supported");
    }

    public function scroll(&$scrollId, $columns = '*') {
        if (empty($scrollId)) {
            $params = [
                'size' => $this->limit,
                'body' => $this->esGrammar->compileQuery($this)
            ];

            $result = DB::connection('elasticsearch')->search($this->from, $params, true, $scrollId);
        } else {
            $result = DB::connection('elasticsearch')->scroll($scrollId);
        }

        return collect($this->onceWithColumns(Arr::wrap($columns), function () use ($result) {
            return $this->processor->processSelect($this, $result);
        }));
    }
}
