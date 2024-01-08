<?php
namespace App\Database\ElasticSearch\Query;

use Illuminate\Support\Arr;
use App\Database\ElasticSearch\Connection;
use App\Database\ElasticSearch\Query\Processors\Processor;
use App\Database\ElasticSearch\Query\Grammars\Grammar;
use RuntimeException, InvalidArgumentException;

class Builder extends \Illuminate\Database\Query\Builder {
    use Base;

    public $bindings = [
        'select' => [],
        'from'   => [],
        'join'   => [],
        'where'  => [],
        'having' => [],
        'order'  => [],
        'union'  => [],
    ];

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
    }

    public function selectSub($query, $as) {
    	throw new RuntimeException("This method is not supported");
    }

    public function selectRaw($expression, array $bindings = []) {
        throw new RuntimeException("This method is not supported");
    }

    public function fromSub($query, $as) {
        throw new RuntimeException("This method is not supported");
    }

    public function fromRaw($expression, $bindings = []) {
        throw new RuntimeException("This method is not supported");
    }

    public function addSelect($column) {
        $columns = is_array($column) ? $column : func_get_args();
        foreach ($columns as $as => $column) {
            $this->columns[] = $column;
        }
        return $this;
    }

    public function from($table, $as = null) {
        $this->from = $table;
        return $this;
    }

    public function join($table, $first, $operator = null, $second = null, $type = 'inner', $where = false) {
        throw new RuntimeException("This method is not supported");
    }

    public function joinWhere($table, $first, $operator, $second, $type = 'inner') {
        throw new RuntimeException("This method is not supported");
    }

    public function joinSub($query, $as, $first, $operator = null, $second = null, $type = 'inner', $where = false) {
        throw new RuntimeException("This method is not supported");
    }

    public function leftJoin($table, $first, $operator = null, $second = null) {
        throw new RuntimeException("This method is not supported");
    }

    public function leftJoinWhere($table, $first, $operator, $second) {
        throw new RuntimeException("This method is not supported");
    }

    public function leftJoinSub($query, $as, $first, $operator = null, $second = null) {
        throw new RuntimeException("This method is not supported");
    }

    public function rightJoin($table, $first, $operator = null, $second = null) {
        throw new RuntimeException("This method is not supported");
    }

    public function rightJoinWhere($table, $first, $operator, $second) {
        throw new RuntimeException("This method is not supported");
    }

    public function rightJoinSub($query, $as, $first, $operator = null, $second = null) {
        throw new RuntimeException("This method is not supported");
    }

    public function crossJoin($table, $first = null, $operator = null, $second = null) {
        throw new RuntimeException("This method is not supported");
    }

    public function mergeWheres($wheres, $bindings) {
        throw new RuntimeException("This method is not supported");
    }

    public function lock($value = true) {
        throw new RuntimeException("This method is not supported");
    }

    protected function runSelect() {
        return $this->connection->search($this->from, $this->grammar->compileSelect($this));
    }

    /*
    public function paginate($perPage = 15, $columns = ['*'], $pageName = 'page', $page = null)
    {
        $page = $page ?: Paginator::resolveCurrentPage($pageName);

        $total = $this->getCountForPagination();

        $results = $total ? $this->forPage($page, $perPage)->get($columns) : collect();

        return $this->paginator($results, $total, $perPage, $page, [
            'path' => Paginator::resolveCurrentPath(),
            'pageName' => $pageName,
        ]);
    }

    public function simplePaginate($perPage = 15, $columns = ['*'], $pageName = 'page', $page = null)
    {
        $page = $page ?: Paginator::resolveCurrentPage($pageName);

        $this->skip(($page - 1) * $perPage)->take($perPage + 1);

        return $this->simplePaginator($this->get($columns), $perPage, $page, [
            'path' => Paginator::resolveCurrentPath(),
            'pageName' => $pageName,
        ]);
    }

    public function getCountForPagination($columns = ['*'])
    {
        $results = $this->runPaginationCountQuery($columns);

        // Once we have run the pagination count query, we will get the resulting count and
        // take into account what type of query it was. When there is a group by we will
        // just return the count of the entire results set since that will be correct.
        if (isset($this->groups)) {
            return count($results);
        } elseif (! isset($results[0])) {
            return 0;
        } elseif (is_object($results[0])) {
            return (int) $results[0]->aggregate;
        }

        return (int) array_change_key_case((array) $results[0])['aggregate'];
    }

    protected function runPaginationCountQuery($columns = ['*'])
    {
        $without = $this->unions ? ['orders', 'limit', 'offset'] : ['columns', 'orders', 'limit', 'offset'];

        return $this->cloneWithout($without)
                    ->cloneWithoutBindings($this->unions ? ['order'] : ['select', 'order'])
                    ->setAggregate('count', $this->withoutSelectAliases($columns))
                    ->get()->all();
    }

    protected function withoutSelectAliases(array $columns)
    {
        return array_map(function ($column) {
            return is_string($column) && ($aliasPosition = stripos($column, ' as ')) !== false
                    ? substr($column, 0, $aliasPosition) : $column;
        }, $columns);
    }


    public function cursor()
    {
        if (is_null($this->columns)) {
            $this->columns = ['*'];
        }

        return $this->connection->cursor(
            $this->toSql(), $this->getBindings(), ! $this->useWritePdo
        );
    }

    public function chunkById($count, callable $callback, $column = 'id', $alias = null)
    {
        $alias = $alias ?: $column;

        $lastId = null;

        do {
            $clone = clone $this;

            // We'll execute the query for the given page and get the results. If there are
            // no results we can just break and return from here. When there are results
            // we will call the callback with the current chunk of these results here.
            $results = $clone->forPageAfterId($count, $lastId, $column)->get();

            $countResults = $results->count();

            if ($countResults == 0) {
                break;
            }

            // On each chunk result set, we will pass them to the callback and then let the
            // developer take care of everything within the callback, which allows us to
            // keep the memory low for spinning through large result sets for working.
            if ($callback($results) === false) {
                return false;
            }

            $lastId = $results->last()->{$alias};

            unset($results);
        } while ($countResults == $count);

        return true;
    }

    public function implode($column, $glue = '')
    {
        return $this->pluck($column)->implode($glue);
    }*/

    public function exists() {
        throw new RuntimeException("This method is not supported");
    }

    public function count($columns = '*') {
        if ($this->distinct) {
            return (int) $this->aggregate('distinct', [$columns]);
        } else {
            return (int) $this->connection->count($this->from, $this->grammar->compileQuery($this, $columns));
        }
    }

    public function scroll(&$scrollId, $columns = '*') {
        if (empty($scrollId)) {
            $params = [
                'size' => $this->limit,
                'body' => $this->grammar->compileQuery($this)
            ];

            $result = $this->connection->search($this->from, $params, true, $scrollId);
        } else {
            $result = $this->connection->scroll($scrollId);
        }

        return collect($this->onceWithColumns(Arr::wrap($columns), function () use ($result) {
            return $this->processor->processSelect($this, $result);
        }));
    }

    public function numericAggregate($function, $columns = ['*']) {
        throw new RuntimeException("This method is not supported");
    }

    public function insert(array $values) {
        $result = $this->connection->index($this->from, $values);
        return $result['_id'];
    }

    public function insertOrIgnore(array $values) {
        throw new RuntimeException("This method is not supported");
    }

    public function insertGetId(array $values, $sequence = null) {
        $result = $this->connection->index($this->from, $values);
        return $result['_id'];
    }

    public function insertUsing(array $columns, $query) {
        throw new RuntimeException("This method is not supported");
    }

    public function update(array $values) {
        $body = $this->grammar->compileUpdate($this, $values);
        return $this->connection->updateByQuery($this->from, $body);
    }

    public function updateOrInsert(array $attributes, array $values = []) {
        throw new RuntimeException("This method is not supported");
    }

    public function increment($column, $amount = 1, array $extra = []) {
        if (! is_numeric($amount)) {
            throw new InvalidArgumentException('Non-numeric value passed to increment method.');
        }

        $values = [
            $column => [$amount, '+=']
        ];

        return $this->update($values);
    }

    public function decrement($column, $amount = 1, array $extra = []) {
        if (! is_numeric($amount)) {
            throw new InvalidArgumentException('Non-numeric value passed to decrement method.');
        }

        $values = [
            $column => [$amount, '-=']
        ];

        return $this->update($values);
    }

    public function delete($id = null) {
        if (!is_null($id)) {
            $this->where('id', '=', $id);
        }
        return $this->connection->deleteByQuery($this->from, $this->grammar->compileDelete($this));
    }

    public function truncate() {
        throw new RuntimeException("This method is not supported");
    }
}
