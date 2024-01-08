<?php 
namespace App\Application\Www\Services;

use App\Models\Site\Proxy;
use App\Models\Site\ProxyWithdraw;
use App\Models\Site\ProxyCommission;
use Illuminate\Database\Query\Expression;
use Time, DB, Lang;

class ProxyCommissionService extends EloquentService { 
     
    public function lists($data = []) { 
        $order = isset($data['order']) ? $data['order'] : null;
        $sort = isset($data['sort']) ? $data['sort'] : null;
        $this->listFormatBuilder = function(&$builder, &$data, &$attributes) use($order, $sort) {
            
            if (isset($order)) {
                $builder->orderBy($order, $sort);
            } else {
                $builder->orderBy('give_time', 'DESC');
            }

            $proxy_name = isset($data['proxy_name']) ? trim($data['proxy_name']) : '';

            if (!empty($proxy_name)) {
                $proxy = Proxy::where('name', $proxy_name)->first();
                if (isset($proxy->id)) {
                    $builder->where('proxy_id', $proxy->id);
                } 
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
                $builder->where('status', $status - 2);
            } 

            $builder->with('proxy');

        };
        return parent::lists($data);
    } 

    public function option($id, $status, $prizePool, $remark) {
 
        $proxyCommission = ProxyCommission::find($id); 

        if (!in_array($status, [-1, 1]) || $proxyCommission->status != 0) {
            $this->throwException('common.proxy.commission_status_error');
        } else {
            try {
                DB::connection()->beginTransaction();
                $data = [];
                $data['status'] = $status;
                $data['prize_pool'] = abs($prizePool);
                $data['dispose_time'] = UTC_TIME; 
                $data['dispose_remark'] = $remark; 
                //当审核佣金记录的时候 拒绝佣金大于0和通过奖池大于0的 记录时，会自动拒绝提款申请
                if (($status < 0 && $proxyCommission->original_commission > 0) || ($status > 0 && $prizePool > 0)) {
    
                    if ($status > 0 && $prizePool > 0) {
                        //计算修改佣金记录后的佣金
                        $curentCommission = ProxyCommissionService::instance()->commissionCount($proxyCommission->total_bet, $proxyCommission->total_winning, $proxyCommission->total_bonus, $prizePool, $proxyCommission->fixed_percent, $proxyCommission->percent); 

                        $data['commission'] = $curentCommission;
                    } else {
                        $curentCommission = 0;
                    }

                    $proxyBalance = $curentCommission - $proxyCommission->original_commission;

                    $proxyWithdraw = ProxyWithdraw::where('proxy_id', $proxyCommission->proxy_id)
                                                  ->orderBy('id', 'DESC')
                                                  ->first(); 
                    //如果存款数据已存在且未处理 
                    if (!empty($proxyWithdraw) && $proxyWithdraw->status == 0) { 
                        $proxyWithdrawReject = [
                            'status' => -1,
                            'dispose_time' => UTC_TIME,
                            'dispose_date' => UTC_DAY,
                            'dispose_remark' => Lang::get('common.proxy.auto_reject'),
                        ];
                        //拒绝提款单
                        ProxyWithdraw::where('proxy_id', $proxyCommission->proxy_id)
                                     ->where('status', 0)
                                     ->update($proxyWithdrawReject);
                        $proxyBalance = $proxyWithdraw->money - abs($proxyBalance);
                    }  
                    
                    //退还金额
                    Proxy::where('id', $proxyCommission->proxy_id)->update(['commission'=>new Expression('commission + '.$proxyBalance)]);
                }
                ProxyCommission::where('id', $id)->update($data);
                DB::connection()->commit();
            } catch(\Exception $e) {
                DB::connection()->rollback();
                throw $e;
            } 
            return true;
        }
    }

    /**
     * 利润计算公式 
     * $bet 总投注
     * $winning 总输赢
     * $bonus 总奖金
     * $return 总返水
     * $prizePool 奖池
     * $fixedPercent 固定佣金率 
     * @return float 佣金
     */
    public function commissionCount($bet, $winning, $bonus, $return, $prizePool, $fixedPercent) {
        return ($bet - $winning)*$fixedPercent - $bonus - $return - $prizePool;
    }


}