<?php
namespace App\Database\ElasticSearch\Eloquent;

abstract class Model extends \Illuminate\Database\Eloquent\Model {
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    protected $connection = 'elasticsearch';

    public function getConnectionName() {
        return 'elasticsearch';
    }

    public function getQualifiedKeyName() {
        return $this->getKeyName();
    }

    public function newEloquentBuilder($query) {
        return new Builder($query);
    }
}
