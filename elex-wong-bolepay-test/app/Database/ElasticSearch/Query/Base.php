<?php
namespace App\Database\ElasticSearch\Query;

trait Base {
    public $aggregations = null;

    public function setAggregations($closure) {
        $this->aggregations = $closure;
    }
}
