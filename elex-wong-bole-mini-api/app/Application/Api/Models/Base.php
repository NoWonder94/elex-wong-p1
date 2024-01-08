<?php
	namespace App\Application\Api\Models;
	use App\Models\Base AS BaseModel;
	use Illuminate\Support\Facades\DB;
	
	class Base extends BaseModel {
		public static function dbTable($alias = null){
	        return empty($alias) ? DB::table(static::TABLENAME) : DB::table(static::TABLENAME . ' as ' . $alias);
	    }

	    public function getUnformattedData($key) {
        	return $this->attributes[$key];
    	}
	}
?>