<?php 
namespace App\Application\Www\Services;

use App\Application\Www\Models\SmsTpl;

class SmsTplService extends EloquentService {
	protected $type = 0;
	
	public function get($key, $data = []) {
		$type = $this->type;
        $this->getFormatBuilder = function(&$builder, &$key, &$data) use($type) {
			return $builder->where('id', $key)->where('type', $type)->first();
        };
        return parent::get($key, $data);
    }
	
	public function lists($data = []) {
		$type = $this->type;
        $this->listFormatBuilder = function(&$builder, &$data, &$attributes) use($type) {
			$builder->where('type', $type);
        };
        return parent::lists($data);
    }
	
    public function create($data) {
        $data['creator'] = APP_CURRENT_ADMIN_NAME;
        $data['create_time'] = UTC_TIME;
		$data['type'] = $this->type;
		
        return parent::create($data);
    }

    public function update($data) {
        $data['modifier'] = APP_CURRENT_ADMIN_NAME;
        $data['modify_time'] = UTC_TIME;
		
		$type = $this->type;
		$this->saveFind = function($model, &$data, &$attributes) use($type) {
			return $builder->where('id', $attributes['id'])->where('type', $type)->first();
        };
		
        return parent::update($data);
    }
	
	public function delete($key, $data = []) {
		$type = $this->type;
        $this->deleteFormatBuilder = function(&$builder, &$key, &$data) use($type) {
			$builder->where('id', $key)->where('type', $type);
        };
        return parent::delete($key, $data);
    }

    public function toggle($data) {
		$type = $this->type;
        $this->deleteFormatBuilder = function(&$builder, &$attributes, $primary_key) use($type) {
			$builder->where('id', $attributes['id'])->where('type', $type);
        };
        return parent::toggle($data);
    }

    public function getList() {
        return SmsTpl::where('status', 1)->where('type', $this->type)->orderBy('id', 'DESC')->get();
    }
}