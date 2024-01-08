<?php
namespace App\Database\MySqlElasticSearch\Eloquent;

abstract class Model extends \Illuminate\Database\Eloquent\Model {
    protected $connection = 'mysqlelasticsearch';

    public function getConnectionName() {
        return 'mysqlelasticsearch';
    }

    public function newEloquentBuilder($query) {
        return new Builder($query);
    }
}
