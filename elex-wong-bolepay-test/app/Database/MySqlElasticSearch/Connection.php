<?php
namespace App\Database\MySqlElasticSearch;

use App\Database\MySqlElasticSearch\Query\Builder as QueryBuilder;
use App\Database\MySqlElasticSearch\Query\Processors\Processor as QueryProcessor;
use App\Database\MySqlElasticSearch\Query\Grammars\Grammar as QueryGrammar;
use Strings, DB;

class Connection extends \Illuminate\Database\MySqlConnection {
    protected $elasticSearchUpdateTables = [];
    protected $elasticSearchDeleteTables = [];
    protected $elasticSearchQuerySn = '';

    public function query() {
        return new QueryBuilder(
            $this, new QueryGrammar(), new QueryProcessor()
        );
    }

    protected function getDefaultPostProcessor() {
        return new QueryProcessor();
    }

    protected function getDefaultQueryGrammar() {
        return new QueryGrammar();
    }

    public function beginTransaction() {
        parent::beginTransaction();

        if ($this->transactions == 1) {
            $this->elasticSearchQuerySn = Strings::getUUID();
            $this->elasticSearchUpdateTables = [];
            $this->elasticSearchDeleteTables = [];
        }
    }

    public function getElasticSearchQuerySn() {
        return $this->elasticSearchQuerySn;
    }

    public function commit() {
        parent::commit();

        if ($this->transactions == 0) {
            foreach ($this->elasticSearchUpdateTables as $table => $val) {
                $list = $this->table($table)->where('query_sn', $this->elasticSearchQuerySn)->disableQueryBigDB()->get();
                foreach ($list as $item) {
                    try {
                        parent::beginTransaction();
                        $status = $this->affectingStatement("UPDATE {$table} SET query_sn = NULL, db_sync_time = NULL WHERE id = {$item->id} AND query_sn = '{$this->elasticSearchQuerySn}'");
                        if ($status > 0) {
                            $item = (array)$item;
                            $item['query_sn'] = '';
                            unset($item['db_sync_time']);
                            DB::connection('elasticsearch')->index($table, $item);
                        }
                        parent::commit();
                    } catch (\Exception $ex) {
                        \Log::info($ex->getTraceAsString());
                        parent::rollBack();
                    }
                }
            }
            $this->elasticSearchUpdateTables = [];

            foreach ($this->elasticSearchDeleteTables as $table => $bodys) {
                foreach ($bodys as $body) {
                    try {
                        DB::connection('elasticsearch')->deleteByQuery($table, $body);
                    } catch (\Exception $ex) {
                        \Log::info($ex->getTraceAsString());
                        $log  = ['table' => $table, 'body' => $body];
                        $log  = json_encode($log);
                        $name = md5($log);
                        $path = storage_path('elasticsearch/delete/' . $name . '.log');
                        file_put_contents($path, $log);
                    }
                }

            }
            $this->elasticSearchDeleteTables = [];
        }
    }

    public function addElasticSearchUpdateTable($table) {
        $this->elasticSearchUpdateTables[$table] = true;
    }

    public function addElasticSearchDeleteTable($table, $body) {
        $this->elasticSearchDeleteTables[$table][] = $body;
    }

    public function rollBack($toLevel = null) {
        parent::rollBack($toLevel);

        if ($this->transactions == 0) {
            $this->elasticSearchUpdateTables = [];
            $this->elasticSearchDeleteTables = [];
            $this->elasticSearchQuerySn = '';
        }
    }
}
