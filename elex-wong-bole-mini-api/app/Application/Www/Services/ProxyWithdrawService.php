<?php 
namespace App\Application\Www\Services;

use App\Models\Site\ProxyWithdraw;
use App\Models\Site\Proxy;
use DB, Time;

class ProxyWithdrawService extends EloquentService {
    public function lists($data = []) {
        $order = isset($data['order']) ? $data['order'] : null;
        $sort = isset($data['sort']) ? $data['sort'] : null;
        $this->listFormatBuilder = function(&$builder, &$data, &$attributes) use($order, $sort) {

            if (isset($order)) {
                $builder->orderBy($order, $sort);
            } 

            $sn = isset($data['sn']) ? trim($data['sn']) : '';
            if (!empty($sn)) {
                $builder->where('sn', 'like', "%{$sn}%");
            }

            $name = isset($data['name']) ? trim($data['name']) : '';
            if (!empty($name)) {
                $proxyId = Proxy::where('name', 'like', "%{$name}%")->pluck('id'); 
                $builder->where('proxy_id', $proxyId[0]);
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

            $builder->with('proxy');

        };
        return parent::lists($data);
    } 

    public function option($id, $status, $remark) {
        $proxyWithdraw = ProxyWithdraw::find($id);
        if($proxyWithdraw->status < 0 || $proxyWithdraw->status == 2) {
            $this->throwException('common.proxy.proxy_withdraw_status');
        }
        if (!in_array($status, [-2, -1, 1, 2])) {
            $this->throwException('common.proxy.status_not_change');
        } else {
            $data['status'] = $status;
            $data['dispose_remark'] = $remark; 
            return ProxyWithdraw::where('id', $id)->update($data);
        }
    }
}