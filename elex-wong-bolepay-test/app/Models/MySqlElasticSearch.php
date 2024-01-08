<?php 
namespace App\Models;

use App\Database\MySqlElasticSearch\Eloquent\Model;
use App\Database\MySqlElasticSearch\Query\Builder;
use App\Models\Builders\MySqlElasticSearchEloquentBuilder;
use Illuminate\Support\Str;
use Exception;

class MySqlElasticSearch extends Model {
    use Base;

    protected $guarded = [];
    public $timestamps = false;

	public function getTable(){
		if ($this && $this instanceof MySqlElasticSearch) {
			if (!$this->table) {
                $this->table = $this->tablePrefix . Str::snake(class_basename($this));
			}
            return $this->table;
        } else {
        	throw new Exception(Lang::get('common.db_not_table_name'));
        }
	}

    protected function newBaseQueryBuilder() {
        $conn    = $this->getConnection();

        return new Builder($conn, $conn->getQueryGrammar(), $conn->getPostProcessor());
    }

    public function newEloquentBuilder($query) {
        return new MySqlElasticSearchEloquentBuilder($query);
    }
}
