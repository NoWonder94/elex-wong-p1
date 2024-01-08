<?php
namespace App\Database\ElasticSearch;

use App\Database\ElasticSearch\Eloquent\Model;

class ServiceProvider extends \Illuminate\Support\ServiceProvider {

    public function boot() {
        Model::setConnectionResolver($this->app['db']);
        Model::setEventDispatcher($this->app['events']);
    }


    public function register() {
        $this->app->resolving('db', function ($db) {
            $db->extend('elasticsearch', function ($config, $name) {
                $config['name'] = $name;
                return new Connection($config);
            });
        });
    }
}