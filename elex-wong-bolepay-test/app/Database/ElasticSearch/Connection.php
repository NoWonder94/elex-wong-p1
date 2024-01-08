<?php
namespace App\Database\ElasticSearch;

use Elasticsearch\ClientBuilder;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Arr;
use Illuminate\Database\Events\QueryExecuted;
use App\Database\ElasticSearch\Query\Builder as QueryBuilder;
use App\Database\ElasticSearch\Query\Processors\Processor as QueryProcessor;
use App\Database\ElasticSearch\Query\Grammars\Grammar as QueryGrammar;
use RuntimeException, SystemCache;

class Connection extends \Illuminate\Database\Connection {
    protected $client;

    protected $defaultType = '_doc';

    public function __construct(array $config) {
        $this->config = $config;
        $this->tablePrefix = $config['prefix'];

        $this->client = $this->createClient($config);
        $this->useDefaultPostProcessor();
        $this->useDefaultQueryGrammar();
    }

    protected function createClient(array $config) {
        $hosts = $config['host'];
        if (!is_array($hosts)) {
            $hosts = [$hosts];
        }

        $list = [];
        foreach ($hosts as $host) {
            $list[] = [
                'host'   => $host,
                'port'   => $config['port'],
                'scheme' => $config['scheme'],
            ];
        }
        return ClientBuilder::create()->setHosts($list)->build();
    }

    public function getClient() {
        return $this->client;
    }

    public function getDB($table) {
        return $this->tablePrefix . $table;
    }

    public function query() {
        return new QueryBuilder(
            $this, new QueryGrammar(), new QueryProcessor()
        );
    }

    public function count($db, $body) {
        $params = [
            'index' => $this->getDB($db),
            //'type'  => $this->defaultType,
            'body'  => $body
        ];

        $result = $this->runQuery('count', $params);
        return (int)$result['count'];
    }

    public function deleteByQuery($db, $body) {
        $params = [
            'index' => $this->getDB($db),
            //'type'  => $this->defaultType,
            'body'  => $body
        ];
        $result = $this->runQuery('deleteByQuery', $params);
        return $result['deleted'];
    }

    public function exists($db, $id) {
        $params = [
            'index' => $this->getDB($db),
            //'type'  => '_doc',
            'id'    => $id
        ];
        return $this->runQuery('exists', $params);
    }

    public function index($db, $data) {
        $id = '';
        if (isset($data['id'])) {
            $id = trim($data['id']);
            unset($data['id']);
        }

        foreach ($data as $key => $val) {
            $type = $this->getFieldType($db, $key);
            if ($val != null && $type == 'nested' && !is_array($val)) {
                $data[$key] = json_decode($val, true);
            }
        }

        $params = [
            'index' => $this->getDB($db),
            //'type'  => $this->defaultType,
            'body'  => $data
        ];

        if ($id !== '') {
            $params['id'] = $id;
        }

        return $this->runQuery('index', $params);
    }

    public function search($db, $params, $isScroll = false, &$scrollId = '') {
        $params['index'] = $this->getDB($db);
        //$params['type']  = $this->defaultType;
        
        if ($isScroll) {
            $params['scroll'] = '5m';
        }

        $results = $this->runQuery('search', $params);
        //echo json_encode($params);

        if (isset($results['aggregations'])) {
            $list = [];
            $this->getAggregationsData($results['aggregations'], $list);
        } else {
            $list = [];
            foreach ($results['hits']['hits'] as $item) {
                $item['_source']['id'] = $item['_id'];
                $list[] = $item['_source'];
            }
        }

        if ($isScroll) {
            $scrollId = $results['_scroll_id'];
        }

        return $list;
    }

    public function scroll(&$scrollId) {
        $params = [
            'scroll_id' => $scrollId,
            'scroll'    => '5m',
        ];
        
        $results = $this->runQuery('scroll', $params);

        $list = [];
        foreach ($results['hits']['hits'] as $item) {
            $item['_source']['id'] = $item['_id'];
            $list[] = $item['_source'];
        }
        $scrollId = $results['_scroll_id'];
        return $list;
    }

    public function clearScroll($scrollId) {
        $params = [
            'scroll_id' => $scrollId
        ];
        
        $result = $this->runQuery('clearScroll', $params);
    }

    public function sql($sql, $isReturnList = true) {
        $sql = str_replace('_DB_', $this->tablePrefix, $sql);

        $promise = $this->client->transport->performRequest('GET', '/_xpack/sql', ['format' => 'json'], ["query" => $sql]);

        $start = microtime(true);

        $result  = $this->client->transport->resultOrFuture($promise);

        $this->logQuery(
            '_xpack/sql:'. $sql, [], $this->getElapsedTime($start)
        );

        $list    = [];
        $is_one_column = count($result['columns']) == 1;
        foreach ($result['rows'] as $row) {
            if ($is_one_column) {
                $item = $row[0];
            } else {
                $item = [];
                foreach ($row as $key => $value) {
                    $item[$result['columns'][$key]['name']] = $value;
                }
            }
            $list[] = $item;
        }

        if ($isReturnList) {
            return $list;
        } else {
            return count($list) > 0 ? $list[0] : null;
        }
    }

    public function updateByQuery($db, $body) {
        $params = [
            'index' => $this->getDB($db),
            //'type'  => '_doc',
            'body'  => $body
        ];

        $result = $this->runQuery('updateByQuery', $params);
        return $result['updated'];
    }

    protected function getAggregationsData($data, &$list, $item = []) {
        $status = 0;
        foreach ($data as $key => $val) {
            if ($key == '_virtual_') {
                $status = 0;
                unset($val['doc_count']);
                $this->getAggregationsData($val, $list, $item);
            } elseif (isset($val['buckets'])) {
                foreach ($val['buckets'] as $ckey => $cval) {
                    $item[$key] = $cval['key'];
                    unset($cval['key'], $cval['doc_count']);
                    $this->getAggregationsData($cval, $list, $item);
                }
            } else {
                $status = 1;
                $item[$key] = current($val);
            }
        }

        if ($status) {
            $list[] = $item;
        }
    }

    protected function runQuery($method, $query) {
        $start = microtime(true);

        $result = $this->client->$method($query);

        $this->logQuery(
            $method .':'. var_export($query, true), [], $this->getElapsedTime($start)
        );

        return $result;
    }

    protected function getFieldType(string $index, string $field) {
        $mapping = $this->getMapping($index);
        return isset($mapping[$field]) ? $mapping[$field]['type'] : null;
    }

    protected function getMapping(string $index) {
        static $mappings = [];
        $key = 'elasticsearch_mapping_' . $index;
        if (!isset($mappings[$key])) {
            $mappings[$key] = SystemCache::get($key);
            if (!$mappings[$key]) {
                $db = $this->getDB($index);
                $mapping = $this->client->indices()->getMapping(['index' => $db]);
                $mapping = $mapping[$db]['mappings']['properties'];
                SystemCache::forever($key, $mapping);
                $mappings[$key] = $mapping;
            }
        }
        return $mappings[$key];
    }

    public function logQuery($query, $bindings, $time = null) {

        $this->event(new QueryExecuted($query, $bindings, $time, $this));

        if ($this->loggingQueries) {
            $this->queryLog[] = compact('query', 'bindings', 'time');
        }
    }

    protected function getElapsedTime($start) {
        return round((microtime(true) - $start) * 1000, 2);
    }

    public function listen(\Closure $callback) {
        if (isset($this->events)) {
            $this->events->listen(Events\QueryExecuted::class, $callback);
        }
    }

    protected function event($event) {
        if (isset($this->events)) {
            $this->events->dispatch($event);
        }
    }

    public function raw($value)
    {
        return new Expression($value);
    }

    public function getName() {
        return $this->getConfig('name');
    }

    public function getConfig($option = null) {
        return Arr::get($this->config, $option);
    }

    public function getDriverName() {
        return $this->getConfig('driver');
    }

    protected function getDefaultPostProcessor() {
        return new QueryProcessor();
    }

    protected function getDefaultQueryGrammar() {
        return new QueryGrammar();
    }

    public function getEventDispatcher() {
        return $this->events;
    }

    public function setEventDispatcher(Dispatcher $events) {
        $this->events = $events;
        return $this;
    }

    public function unsetEventDispatcher() {
        $this->events = null;
    }

    public function getQueryLog() {
        return $this->queryLog;
    }

    public function flushQueryLog() {
        $this->queryLog = [];
    }

    public function enableQueryLog() {
        $this->loggingQueries = true;
    }

    public function disableQueryLog() {
        $this->loggingQueries = false;
    }

    public function logging() {
        return $this->loggingQueries;
    }

    public function getTablePrefix() {
        return $this->tablePrefix;
    }

    protected function run($query, $bindings, \Closure $callback) {
        throw new RuntimeException("This empty wheres is not supported");
    }
}
