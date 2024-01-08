<?php 
namespace App\Application\Proxy\Services;

use App\Models\Site\ProxyBank;
use Time, DB;

class ProxyWithdrawService extends EloquentService { 
     
    public function lists($data = []) {
        $order = isset($data['order']) ? $data['order'] : null;
        $sort = isset($data['sort']) ? $data['sort'] : null;
        $this->listFormatBuilder = function(&$builder, &$data, &$attributes) use($order, $sort) {
            $builder->where('proxy_id', APP_CURRENT_PROXY_ID);

            if (isset($order)) {
                $builder->orderBy($order, $sort);
            }

            $sn = isset($data['sn']) ? trim($data['sn']) : '';
            if (!empty($sn)) {
                $builder->where('sn', 'like', "%{$sn}%");
            } 

            $begin_time = isset($data['begin_time']) ? Time::toTime(trim($data['begin_time'])) : 0;
            if ($begin_time > 0) {
                $builder->where('create_time', '>=', $begin_time);
            }

            $end_time = isset($data['end_time']) ? Time::toTime(trim($data['end_time'])) : 0;
            if ($end_time > 0) {
                $builder->where('create_time', '<=', $end_time);
            } 

            $status = isset($data['status']) ? $data['status'] : 0;

            if ($status > 0) {
                $builder->where('status', $status - 3);
            } 

        };
        return parent::lists($data);
    } 

}