<?php
namespace App\Database\ElasticSearch\Query\Grammars;

use App\Database\ElasticSearch\TermsAggregation;
use Illuminate\Database\Query\Builder;
use ONGR\ElasticsearchDSL\Search;
use ONGR\ElasticsearchDSL\Sort\FieldSort;
use ONGR\ElasticsearchDSL\Query\MatchAllQuery;
use ONGR\ElasticsearchDSL\Query\Compound\BoolQuery;
use ONGR\ElasticsearchDSL\Query\TermLevel\RangeQuery;
use ONGR\ElasticsearchDSL\Query\TermLevel\TermQuery;
use ONGR\ElasticsearchDSL\Query\TermLevel\TermsQuery;
use ONGR\ElasticsearchDSL\Query\TermLevel\WildcardQuery;
use ONGR\ElasticsearchDSL\Query\TermLevel\ExistsQuery;
use ONGR\ElasticsearchDSL\Query\TermLevel\IdsQuery;
use ONGR\ElasticsearchDSL\Query\FullText\MatchQuery;
use ONGR\ElasticsearchDSL\Aggregation\Metric\SumAggregation;
use ONGR\ElasticsearchDSL\Aggregation\Metric\AvgAggregation;
use ONGR\ElasticsearchDSL\Aggregation\Metric\MaxAggregation;
use ONGR\ElasticsearchDSL\Aggregation\Metric\MinAggregation;
use ONGR\ElasticsearchDSL\Aggregation\Metric\ValueCountAggregation;
use ONGR\ElasticsearchDSL\Aggregation\Metric\CardinalityAggregation;
use RuntimeException;

class Grammar extends \Illuminate\Database\Query\Grammars\Grammar {
    /**
     * The grammar specific operators.
     *
     * @var array
     */
    protected $operators = [];

    protected $search;
    protected $bool;
    protected $aggregateOne = false;

    protected $aggregations = [
        'sum'   => SumAggregation::class,
        'avg'   => AvgAggregation::class,
        'max'   => MaxAggregation::class,
        'min'   => MinAggregation::class,
        'count' => ValueCountAggregation::class,
        'distinct' => CardinalityAggregation::class
    ];

    /**
     * The components that make up a select clause.
     *
     * @var array
     */
    protected $selectComponents = [
        'aggregate',
        'columns',
        //'from',
        'wheres',
        //'groups',
        'orders',
        'limit',
        'offset',
    ];

    public function __construct() {
        $this->search = new Search();
        $this->bool   = new BoolQuery();
    }

    public function compileSelect(Builder $query) {
        $this->compileComponents($query);
        $this->compileGroups($query, $query->groups);

        if ($query->aggregate) {
            $this->search->setSize(0);
        }

        if ($query->aggregations) {
            $this->search->setSize(0);
            call_user_func_array($query->aggregations, [&$this->search]);
        }

        $params = [
            'body' => $this->search->toArray()
        ];

        $this->resetSearch();
        return $params;
    }

    protected function resetSearch() {
        $this->search = new Search();
        $this->bool   = new BoolQuery();
    }

    protected function compileComponents(Builder $query) {
        foreach ($this->selectComponents as $component) {
            if (isset($query->$component) && ! is_null($query->$component)) {
                $method = 'compile'.ucfirst($component);
                $this->$method($query, $query->$component);
            }
        }
    }

    protected function compileAggregate(Builder $query, $aggregate)
    {
        $column = $this->formatField($aggregate['columns'][0]);
        if ($column == '*') {
            throw new RuntimeException("This column * is not supported");
        }

        $type = strtolower($aggregate['function']);
        if (!isset($this->aggregations[$type])) {
            throw new RuntimeException("This aggregation {$type} is not supported");
        }

        $aggregation = new $this->aggregations[$type]('aggregate');
        $aggregation->setField($column);

        $this->search->addAggregation($aggregation);
    }

    protected function compileJoins(Builder $query, $joins) {
        throw new RuntimeException("This method is not supported");
    }

    protected function compileWheres(Builder $query) {
        if (!$query->wheres) {
            $this->search->addQuery(new MatchAllQuery());
            return;
        }

        $bool = new BoolQuery();

        collect($query->wheres)->map(function ($where) use ($query, &$bool) {
            $method = "setWhere{$where['type']}";
            if (method_exists($this, $method)) {
                $this->$method($query, $where, $bool);
            } else {
                throw new RuntimeException("This where is not supported");
            }
            
        })->all();

        $this->search->addQuery($bool);
    }

    protected function formatField($field) {
        $field = explode('.', $field);
        $field = last($field);

        if ($field == 'id') {
            $field = '_id';
        }
        return $field;
    }

    protected function whereRaw(Builder $query, $where) {
        throw new RuntimeException("This method is not supported");
    }

    protected function setWhereBasic(Builder $query, $where, &$bool) {
        $field = $this->formatField($where['column']);

        switch (strtolower($where['operator'])) {
            case '>=':
                $esquery = new RangeQuery($field, ["gte" => $where['value']]);
                break;

            case '<=':
                $esquery = new RangeQuery($field, ["lte" => $where['value']]);
                break;

            case '>':
                $esquery = new RangeQuery($field, ["gt" => $where['value']]);
                break;

            case '<':
                $esquery = new RangeQuery($field, ["lt" => $where['value']]);
                break;

            case '=':
                $esquery = new TermQuery($field, $where['value']);
                break;

            case 'match':
                $esquery = new MatchQuery($field, $where['value']);
                break;

            case 'like':
                $esquery = new WildcardQuery($field, str_replace('%', '*', $where['value']));
                break;

            case 'not like':
                $esquery = new WildcardQuery($field, str_replace('%', '*', $where['value']));
                $bool->add($esquery, BoolQuery::MUST_NOT);
                $esquery = null;
                break;

            case '!=':
            case '<>':
                $esquery = new TermQuery($field, $where['value']);
                $bool->add($esquery, BoolQuery::MUST_NOT);
                $esquery = null;
                break;

            default:
                throw new RuntimeException("This where {$where['operator']} is not supported");
                break;
        }

        if ($esquery) {
            $bool->add($esquery, $where['boolean'] == 'and' ? BoolQuery::FILTER : BoolQuery::SHOULD);
        }
    }

    protected function setWhereIn(Builder $query, $where, &$bool) {
        if (! empty($where['values'])) {
            $esquery = new TermsQuery($this->formatField($where['column']), array_values($where['values']));
            $bool->add($esquery, $where['boolean'] == 'and' ? BoolQuery::FILTER : BoolQuery::SHOULD);
        }
    }

    protected function setWhereNotIn(Builder $query, $where, &$bool) {
        if (! empty($where['values'])) {
            $esquery = new TermsQuery($this->formatField($where['column']), array_values($where['values']));
            $bool->add($esquery, BoolQuery::MUST_NOT);
        }
    }

    protected function setWhereNotInRaw(Builder $query, $where, &$bool) {
        $this->setWhereNotIn($query, $where, $bool);
    }

    protected function setWhereInRaw(Builder $query, $where, &$bool) {
        $this->setWhereIn($query, $where, $bool);
    }

    protected function setWhereNull(Builder $query, $where, &$bool) {
        $esquery = new ExistsQuery($this->formatField($where['column']));
        $bool->add($esquery, $where['boolean'] == 'and' ? BoolQuery::FILTER : BoolQuery::SHOULD);
    }

    protected function setWhereNotNull(Builder $query, $where, &$bool) {
        $esquery = new ExistsQuery($this->formatField($where['column']));
        $bool->add($esquery, BoolQuery::MUST_NOT);
    }

    protected function setWhereBetween(Builder $query, $where, &$bool) {
        $esquery = new RangeQuery($this->formatField($where['column']), ['gte' => reset($where['values']), 'lte' => end($where['values'])]);
        if ($where['not']) {
            $bool->add($esquery, BoolQuery::MUST_NOT);
        } else {
            $bool->add($esquery, $where['boolean'] == 'and' ? BoolQuery::FILTER : BoolQuery::SHOULD);
        }
    }

    protected function setWhereNested(Builder $query, $where, &$bool)  {
        $nested_bool  = new BoolQuery();
        $nested_query = $where['query'];

        collect($nested_query->wheres)->map(function ($nested_where) use ($nested_query, &$nested_bool) {
            $method = "setWhere{$nested_where['type']}";
            if (method_exists($this, $method)) {
                $this->$method($nested_query, $nested_where, $nested_bool);
            } else {
                throw new RuntimeException("This where is not supported");
            }
        })->all();

        $bool->add($nested_bool, $where['boolean'] == 'and' ? BoolQuery::FILTER : BoolQuery::SHOULD);
    }

    protected function compileGroups(Builder $query, $groups) {
        $fields = [];

        if (!$query->columns && !$groups) {
            return $fields;
        }

        $terms = null;
        $is_aggregation = false;

        if ($groups && count($groups) > 0) {
            $groups = array_reverse($groups);
            $group  = array_shift($groups);

            $terms = new TermsAggregation($group);
            $terms->setField($group);
        }

        if ($query->columns) {
            $types = [
                'sum'   => SumAggregation::class,
                'avg'   => AvgAggregation::class,
                'max'   => MaxAggregation::class,
                'min'   => MinAggregation::class,
                'count' => ValueCountAggregation::class
            ];

            $pattern = '/^(?:(?<aggregation>\w+)\()?(?<field>\w+)(?:\)\s+as\s+(?<name>\w+))?$/i';
            foreach ($query->columns as $column) {
                if ($column == '*') {
                    continue;
                }

                $items = explode(',', $column);
                foreach ($items as $item) {
                    if (preg_match($pattern, trim($item), $match)) {
                        if (!empty($match['aggregation'])) {
                            $is_aggregation = true;
                            $type = strtolower($match['aggregation']);
                            if (!isset($this->aggregations[$type])) {
                                throw new RuntimeException("This aggregation {$type} is not supported");
                            }

                            $aggregation = new $this->aggregations[$type]($match['name']);
                            $aggregation->setField($this->formatField($match['field']));

                            if ($terms) {
                                $terms->addAggregation($aggregation);
                            } else {
                                $this->search->addAggregation($aggregation);
                            }
                        } else {
                            $fields[] = $this->formatField($match['field']);
                        }
                    }
                }
            }
        }

        if ($terms) {
            foreach ($groups as $group) {
                $pterms = new TermsAggregation($group);
                $pterms->setField($group);
                $pterms->addAggregation($terms);
                $terms = $pterms;
            }
            $this->search->addAggregation($terms);
        }

        if ($is_aggregation) {
            $this->search->setSize(0);
        }
    }

    protected function compileOrders(Builder $query, $orders) {
        if (empty($orders)) {
            return;
        }

        foreach ($orders as $order) {
            if ($order['column'] == 'id') {
                $sort = new FieldSort('_id', strtolower($order['direction']), ['unmapped_type' => 'keyword']);
            } else {
                $sort = new FieldSort($order['column'], strtolower($order['direction']));
            }
            $this->search->addSort($sort);
        }
    }

    protected function compileLimit(Builder $query, $limit) {
        $this->search->setSize((int)$limit);
    }

    protected function compileOffset(Builder $query, $offset) {
        $this->search->setFrom((int)$offset);
    }

    public function compileQuery($query, $columns = '*') {
        $this->compileWheres($query);
        $data = $this->search->toArray();
        $this->resetSearch();
        return $data;
    }

    public function compileUpdate(Builder $query, $values) {
        $this->compileWheres($query);
        
        $params = [];
        $source = [];
        foreach ($values as $key => $value) {
            $field = "ctx._source.{$key}";
            $param = "params.{$key}";

            if (is_array($value)) {
                $params[$key] = $value[0];
                if ($value[1] instanceof \Closure) {
                    $source[] = call_user_func_array($value[1], [$field, $param, &$params]);
                } else {
                    $source[] = "{$field} {$value[1]} {$param}";
                }
            } elseif ($value instanceof \Closure) {
                $source[] = call_user_func_array($value, [$field, &$params]);
            }else {
                $params[$key] = $value;
                $source[] = "{$field} = {$param}";
            }
        }

        $body = $this->search->toArray();
        $body['script'] = [
            'lang'   => 'painless',
            'source' => implode(';', $source)
        ];

        if (count($params) > 0) {
            $body['script']['params'] = $params;
        }

        $this->resetSearch();
        return $body;
    }

    public function compileDelete(Builder $query) {
        if (!$query->wheres) {
            throw new RuntimeException("This empty wheres is not supported");
        }
        $this->compileWheres($query);

        $data = $this->search->toArray();
        $this->resetSearch();
        return $data;
    }
}
