<?php 
namespace App\Application\Www\Services;


use App\Models\Site\ProxyLevelLog;
class ProxyLevelLogService extends EloquentService {
 
    public function lists($data = []) {
        $this->listFormatBuilder = function(&$builder, &$data, &$attributes) { 
            $builder->with('proxy', 'level', 'beforeLevel');
        };
        return parent::lists($data);
    }

}