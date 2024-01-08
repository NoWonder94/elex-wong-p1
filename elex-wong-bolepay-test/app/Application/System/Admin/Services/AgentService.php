<?php 
namespace App\Application\System\Admin\Services;

use App\Models\Agent\Payment;
use App\Models\Agent\WithdrawPlatform;
use App\Models\Agent\Order;
use App\Models\System\Agent;
use App\Services\Agent\MoneyLogService;
use App\Services\Agent\PaymentService;
use App\Services\Agent\WithdrawPlatformService;
use App\Services\Agent\StatisticService;
use App\Services\System\StatisticService as SystemStatisticService;
use App\Traits\AgentTrait;
use App\Utils\Calc;
use Validator, Rule, Lang, Strings, Helper, AgentCache;

class AgentService extends \App\Services\System\AgentService {
    use AgentTrait;

    protected $model = Agent::class;
    protected $agentType = 0;

    public function lists($data = []) {
        $data['type'] = $this->agentType;

        $this->listFormatBuilder[] = function(&$builder, &$data, &$attributes) {
            $builder->with('parent');
        };

        $this->listFormatOrder = function(&$builder, &$data, &$attributes) {
            $orders = ['money' => 'desc', 'frozen_money' => 'desc', 'withdraw_money' => 'desc', 'create_time' => 'desc'];
            if (isset($orders[$attributes['order']])) {
                $builder->orderBy($attributes['order'], $this->getSort($attributes['sort'], $orders[$attributes['order']]));
            }

            if ($attributes['order'] != 'create_time') {
                $builder->orderBy('create_time', 'DESC');
            }
        };

        return parent::lists($data);
    }

    public function searchProxy($name) {
        $list = Agent::where('type', 1)->limit(20)->orderBy('id', 'desc');
        if (!empty($name)) {
            $list->where('name', 'like', '%' . $name . '%');
        }
        return $list->get();
    }

    public function get($key, $data = []) {
        $this->getFormatBuilder[] = function(&$builder, $key, &$data) {
            $builder->with('parent')->where('type', $this->agentType);
        };
        return parent::get($key, $data);
    }

    public function save($data, $type) {
        $this->saveFormatData[] = function(&$model, &$data, &$attributes) use ($type) {
            $rules = [
                'name' => ['required', 'min:5', 'max:32', 'regex:/^[A-Za-z]+[A-Za-z0-9]+$/'],
                'pwd'  => ['required', 'min:6', 'max:32', 'regex:/^[a-zA-Z0-9_]+$/'],
                'mobile'	=> ['required', 'regex:/^1\d{10}$/'],
                'email'		=> ['required', 'email'],
                'finish_type' => ['required', Rule::in(array_keys(Lang::get('admin.agent.finish_types')))],
            ];

            $messages = Lang::get('admin.agent.validators');

            if ($type == 'update') {
                unset($data['name']);
                unset($rules['name']);

                if(empty($data['pwd'])) {
                    unset($data['pwd']);
                    unset($rules['pwd']);
                }
            } else {
                if (!empty($data['name'])) {
                    if (Agent::where('name', $data['name'])->count() > 0) {
                        Helper::throwException($messages['name.unique'], 'name');
                    }
                }
            }

            unset($data['secret']);
            if (isset($data['reset_google']) && $data['reset_google'] == 2) {
                $data['secret'] = '';
            }

            $validator = Validator::make($data, $rules, $messages);
            $this->checkValidator($validator);

            $this->formatIps($data);

            $allow_fields = ['parent_id', 'parent_ids', 'name', 'real_name', 'type', 'pwd', 'email', 'mobile', 'qq', 'secret', 'finish_type', 'remark', 'crypt', 'app_id', 'app_secret', 'admin_ips', 'api_ips'];

            if ($type == 'create') {
                if ($data['parent_id'] > 0) {
                    $parent_agent = $this->getCacheById($data['parent_id']);
                    $data['parent_id'] = $parent_agent->id;
                    $data['parent_ids'] = $parent_agent->getAgentIds();
                }
                $data['type']   = $this->agentType;
                $data['crypt']  = Strings::randString(6);
                $data['pwd']    = md5(md5($data['pwd']) . $data['crypt']);
                $data['app_id'] = md5(Strings::randString(22) . UTC_TIME);
                $data['app_secret'] = md5(Strings::randString(22) . UTC_TIME);
            } else {
                unset($data['type'], $data['app_id'], $data['app_secret']);

                if(!empty($data['pwd'])) {
                    $data['crypt']  = Strings::randString(6);
                    $data['pwd']    = md5(md5($data['pwd']) . $data['crypt']);
                }

                if (isset($data['reset_app_id']) && $data['reset_app_id'] == 1) {
                    $data['app_id'] = md5(Strings::randString(22) . UTC_TIME);
                }

                if (isset($data['reset_app_secret']) && $data['reset_app_secret'] == 1) {
                    $data['app_secret'] = md5(Strings::randString(22) . UTC_TIME);
                }
                unset($data['reset_app_id'], $data['reset_app_secret']);
            }

            $data = array_intersect_key($data, array_flip($allow_fields));
           
        };

        $this->saveModelExtend[] = function($model, &$data, &$attributes) {
            $this->resetCache($model);

            if (!isset($attributes['extends']['payments']) && !isset($attributes['extends']['withdraw'])) {
                return;
            }

            $parent_agent = false;
            if ($model->parent_id > 0) {
                $parent_agent =  $this->getCacheById($model->parent_id);
            }

            $message = Lang::get('admin.agent.validators');

            $payments = $attributes['extends']['payments'];
            foreach ($payments as $payment_id => $payment) {
                $rate = (float)$payment['rate'];
                if ($rate < 0) {
                    $this->throwException('', '', $message['rate.error']);
                }

                $agentPayment = Payment::where('agent_id', $model->id)->where('payment_id', $payment_id)->first();
                if (!$agentPayment) {
                    $agentPayment = new Payment;
                    $agentPayment->agent_id    = $model->id;
                    $agentPayment->agent_ids   = ($parent_agent ? $parent_agent->getAgentIds() . ',' : '') . $model->id;
                    $agentPayment->payment_id  = $payment_id;
                    $agentPayment->create_time = UTC_TIME;
                } else {
                    /*if ($agentPayment->rate < $rate) {
                        Payment::whereRaw("FIND_IN_SET({$model->id}, agent_ids)")->where('payment_id', $payment_id)->update(['confirm_status' => 0]);
                    }*/
                }
				$agentPayment->agent_ids   = ($parent_agent ? $parent_agent->getAgentIds() . ',' : '') . $model->id;
                $agentPayment->status        = isset($payment['status']) ? 1 : 0;
                $agentPayment->rate          = $rate;
                $agentPayment->create_fee    = 0;
                $agentPayment->update_time   = UTC_TIME;
                if(isset($payment['rules'])){
                    $agentPayment->rules         = $payment['rules'];
                }
                $agentPayment->save();
            }
            AgentCache::assign($model->id)->forget('payments');
            
            
            $withdrawplatform = $attributes['extends']['withdraw'];
            foreach ($withdrawplatform as $payment_id => $payment) {
                $rate = (float)$payment['rate'];
				$rateMoney = (float)$payment['rate_money'];
                if ($rate < 0 || $rateMoney < 0) {
                    $this->throwException('', '', $message['rate.error']);
                }


                $agentPayment = WithdrawPlatform::where('agent_id', $model->id)->where('payment_id', $payment_id)->first();
                if (!$agentPayment) {
                    $agentPayment = new WithdrawPlatform;
                    $agentPayment->agent_id    = $model->id;
                    $agentPayment->agent_ids   = ($parent_agent ? $parent_agent->getAgentIds() . ',' : '') . $model->id;
                    $agentPayment->payment_id  = $payment_id;
                    $agentPayment->create_time = UTC_TIME;
                }

                $agentPayment->status        = isset($payment['status']) ? 1 : 0;
                $agentPayment->rate          = $rate;
				$agentPayment->rate_money    = $rateMoney;
                $agentPayment->update_time   = UTC_TIME;
                $agentPayment->save();
            }
            AgentCache::assign($model->id)->forget('withdraw_platforms');
        };

        return parent::save($data, $type);
    }

    public function moneyModify($data) {
        $agent = Agent::where('id', $data['id'])->first();
        if (!$agent) {
            $this->throwException('common.not_data');
        }

        $connection = $agent->getConnection();

        $connection->beginTransaction();
        try {
            $type = $data['type'];
            $order_sn = trim($data['order_sn']);
            $payment = false;
            $payment_id = 0;
            $prefix_remark = "";
            $statistic_date = null;

            if ($type == 'order') {
                if (empty($order_sn)) {
                    $this->throwException('', 'order_sn', '请输入订单流水号');
                }
                $order = Order::where('sn', $order_sn)->first();
                if (!$order) {
                    $this->throwException('', 'order_sn', '订单不存在');
                }
                $statistic_date = $order->create_date;
                $payment_id = $order->channel_id;
            } elseif($type == 'payment') {
                $payment_id = (int)$data['payment'];
            }

            if ($payment_id > 0) {
                $agent_payments  = PaymentService::instance()->getPayments($agent, false);
                if (!isset($agent_payments[$payment_id])) {
                    $this->throwException('', 'payment', '未开通此支付通道');
                }
                $payment = $agent_payments[$payment_id];

                if ($type == 'order') {
                    $prefix_remark = "订单 {$order_sn} 补单；";
                } else {
                    $prefix_remark = "支付通道 {$payment['name']} 补单；";
                }
            }

            $amount = (float)$data['amount'];
            if ($amount == 0) {
                $this->throwException('common.agent.amount_error', 'amount');
            }

            if ($type == 'order' || $type == 'payment') {
                if ($amount < 0) {
                    $this->throwException('', 'amount', '订单补单和通道补单不能为负数');
                }
            }

            if ($amount < 0 && abs($amount) > $agent->money) {
                $this->throwException(['common.agent.money_insufficient', $agent->money], 'amount');
            }

            if (empty($data['remark'])) {
                $this->throwException('common.agent.remark_required', 'remark');
            }

            $remark = $prefix_remark . Lang::format('common.agent.admin_modify_money', [APP_CURRENT_ADMIN_NAME, $data['remark']]);

			//计算金额
			if ($payment) {
                $pay_money         = $amount;
                $total_service_fee = Calc::div(Calc::mul($pay_money, $payment['rate'], 2), 100, 2);
                $amount            = Calc::sub($amount, $total_service_fee, 2);
                $proxy_fee         = 0;

                $parent_ids = array_reverse($agent->getParentIds());
                $agent_id   = $agent->id;

                foreach ($parent_ids as $level => $pid) {
                    $agent_payment = PaymentService::instance()->getPayment($agent_id, $payment_id);
                    if (!$agent_payment) {
                        continue;
                    }

                    $service_fee  = (float)Calc::div(Calc::mul($pay_money, $agent_payment['rate'], 2), 100, 2);
                    $proxy_fee    = Calc::add($proxy_fee, $service_fee, 2);

                    $update_data = [
                        'pay_num' => 1,
                        'pay_money' => $pay_money,
                        'server_fee_income'  => $service_fee,
                        'fee_income' => $service_fee
                    ];

                    //更新金额
                    $balance = $this->updateMoney($pid, $service_fee);

                    $parent_agent = AgentService::instance()->getCacheById($pid);
                    MoneyLogService::instance()->created($parent_agent, $service_fee, $balance, $order_sn, 'admin_modify', $remark);
                    StatisticService::instance()->paymentStatistic($pid, $payment['channel'], $payment_id, $update_data, $statistic_date);
                    $agent_id = $pid;
                }

                $system_service_fee = Calc::sub($total_service_fee, $proxy_fee, 2);
                if ($system_service_fee < 0) {
                    $this->throwException('common.fee_calc_error');
                }

                //更新系统统计
                SystemStatisticService::instance()->paymentStatistic($payment['channel'], $payment_id, [
                    'pay_num' => 1,
                    'pay_money' => $pay_money,
                    'server_fee' => $system_service_fee,
                    'fee_income' => $system_service_fee
                ], $statistic_date);
            }

            //调整后余额
            $balance = $this->updateMoney($agent->id, $amount);
			MoneyLogService::instance()->created($agent, $amount, $balance, $order_sn, 'admin_modify', $remark);
			if ($payment) {
                //更新统计
                StatisticService::instance()->paymentStatistic($agent->id, $payment['channel'], $payment_id, [
                    'pay_num' => 1,
                    'pay_money' => $pay_money,
                    'server_fee_outlay' => $total_service_fee,
                    'fee_outlay' => $total_service_fee
                ], $statistic_date);
            }

            $connection->commit();
        }catch(\Exception $e){
            $connection->rollback();
            throw $e;
        }
    }
}