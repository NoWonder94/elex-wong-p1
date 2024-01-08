<?php
namespace App\Models;

use App\Models\Builders\MySqlEloquentBuilder;
use Illuminate\Database\Query\Grammars\MySqlGrammar;
use Illuminate\Database\Query\Processors\MySqlProcessor;
use Illuminate\Database\Query\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Exception;

class MySql extends Model {
    use Base;

    protected $guarded = [];
    public $timestamps = false;
    protected $connection = 'mysqlelasticsearch';

    public function getConnectionName() {
        return 'mysqlelasticsearch';
    }

    public function getTable() {
        if ($this && $this instanceof MySql) {
            if (!$this->table) {
                $this->table = $this->tablePrefix . Str::snake(class_basename($this));
            }
            return $this->table;
        } else {
            throw new Exception(Lang::get('common.db_not_table_name'));
        }
    }

    protected function newBaseQueryBuilder() {
        return new Builder($this->getConnection(), new MySqlGrammar(), new MySqlProcessor());
    }

    public function newEloquentBuilder($query) {
        return new MySqlEloquentBuilder($query);
    }
}
