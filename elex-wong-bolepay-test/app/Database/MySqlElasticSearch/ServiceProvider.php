<?php
namespace App\Database\MySqlElasticSearch;

use Illuminate\Database\Connectors\MySqlConnector;
use App\Database\MySqlElasticSearch\Eloquent\Model;

class ServiceProvider extends \Illuminate\Support\ServiceProvider {

    public function boot() {
        Model::setConnectionResolver($this->app['db']);
        Model::setEventDispatcher($this->app['events']);
    }

    public function register() {
        $this->app->resolving('db', function ($db) {
            $db->extend('mysqlelasticsearch', function ($config, $name) {
                $connector = new MySqlConnector();
                $connection = $connector->connect($config);
                return new Connection($connection, $config['database'], $config['prefix'], $config);
            });
        });
    }
}