<?php
namespace App\Application\Agent\Admin\Services;

use App\Models\System\Agent;
use App\Models\Agent\Payment;
use App\Models\Agent\WithdrawPlatform;
use App\Utils\Calc;
use App\Services\Agent\WithdrawPlatformService;
use Strings, Validator, Rule, Lang, AgentCache, Helper;

class AgentChildService extends \App\Services\System\AgentService {
    protected $model = Agent::class;
    protected $agentType = 0;

    public function lists($data = []) {
        $data['parent_id'] = APP_CURRENT_AGENT_ID;
        $data['type'] = $this->agentType;
        return parent::lists($data);
    }

    public function get($key, $data = []) {
        $this->getFormatBuilder[] = function(&$builder, $key, &$data) {
            $builder->where('parent_id', APP_CURRENT_AGENT_ID)->where('type', $this->agentType);
        };
        return parent::get($key, $data);
    }

    //创建
    public function save($data, $type) {
        $parent_agent = $data['agent'];
        unset($data['agent']);

        $data['parent_id'] = APP_CURRENT_AGENT_ID;
        $data['parent_ids'] = $parent_agent->getAgentIds();
        $data['type'] = $this->agentType;

        $this->saveFormatData = function(&$model, &$data, &$attributes) use ($parent_agent) {

            $rules = [
                'name' => ['required', 'min:6', 'max:32', 'regex:/^[A-Za-z]+[A-Za-z0-9]+$/'],
                'pwd'  => ['required', 'min:6', 'max:32', 'regex:/^[a-zA-Z0-9_]+$/'],
                'mobile'	=> ['required', 'regex:/^1\d{10}$/'],
                'email'		=> ['required', 'email'],
                'finish_type'	=> ['required', Rule::in($parent_agent->getFinishTypes())],
            ];

            $messages = Lang::get('admin.agent.validators');

            if (!empty($data['name'])) {
                if (Agent::where('name', $data['name'])->count() > 0) {
                    Helper::throwException($messages['name.unique'], 'name');
                }
            }

            $validator = Validator::make($data, $rules, $messages);
            $this->checkValidator($validator);

            $data['crypt']  = Strings::randString(6);
            $data['pwd']    = md5(md5($data['pwd']) . $data['crypt']);
            $data['app_id'] = md5(Strings::randString(22) . UTC_TIME);
            $data['app_secret'] = md5(Strings::randString(22) . UTC_TIME);

            $allow_fields = ['parent_id', 'parent_ids', 'type', 'name', 'real_name', 'pwd', 'email', 'mobile', 'qq', 'finish_type', 'remark', 'crypt', 'app_id', 'app_secret'];
            $data = array_intersect_key($data, array_flip($allow_fields));
        };

        $this->saveExtend[] = function($primary_val, &$data, &$attributes) use ($parent_agent) {
            $payments = $attributes['extends']['payments'];
            $this->setPayments($primary_val, $payments, $parent_agent);
            $withdrawplatform = $attributes['extends']['withdraw'];
            $this->setWithdrawPlatform($primary_val, $withdrawplatform, $parent_agent);
        };

        return parent::save($data, $type);
    }

    protected function setPayments($id, $payments, $parentAgent) {
        $parent_payments  = PaymentService::instance()->getPayments($parentAgent);

        $message = Lang::get('admin.agent.validators');

        foreach ($payments as $payment_id => $payment) {
            if (!isset($parent_payments[$payment_id])) {
                continue;
            }

            $parent_payment = $parent_payments[$payment_id];

            $rate = (float)$payment['rate'];
            $total_reate = (float)Calc::add($rate, $parent_payment['rate']);
            if ($rate < 0 || $total_reate > 50) {
                $this->throwException('', '', $message['rate.error']);
            }

            $agentPayment = Payment::where('agent_id', $id)->where('payment_id', $payment_id)->first();
            if (!$agentPayment) {
                $agentPayment = new Payment;
                $agentPayment->agent_id    = $id;
                $agentPayment->agent_ids   = $parentAgent->getAgentIds() . ',' . $id;
                $agentPayment->payment_id  = $payment_id;
                $agentPayment->create_time = UTC_TIME;
            } else {
                /*if ($agentPayment->rate < $rate) {
                    Payment::whereRaw("FIND_IN_SET({$id}, agent_ids)")->where('payment_id', $payment_id)->update(['confirm_status' => 0]);
                }*/
            }

            $agentPayment->status        = isset($payment['status']) ? 1 : 0;
            $agentPayment->rate          = $rate;
            $agentPayment->create_fee    = 0;
            $agentPayment->update_time   = UTC_TIME;
            $agentPayment->save();
        }
        AgentCache::assign($id)->forget('payments');
    }
    
    
    protected function setWithdrawPlatform($id, $payments, $parentAgent) {
        $parent_payments  = WithdrawPlatformService::instance()->getPayments($parentAgent);

        $message = Lang::get('admin.agent.validators');

        foreach ($payments as $payment_id => $payment) {
            if (!isset($parent_payments[$payment_id])) {
                continue;
            }

            $parent_payment = $parent_payments[$payment_id];

            $rate = (float)$payment['rate'];
            $rateMoney = (float)$payment['rate_money'];
            $total_reate = (float)Calc::add($rate, $parent_payment['rate']);
            if ($rate < 0 || $total_reate > 50 || $rateMoney < 0) {
                $this->throwException('', '', $message['rate.error']);
            }

            $agentPayment = WithdrawPlatform::where('agent_id', $id)->where('payment_id', $payment_id)->first();
            if (!$agentPayment) {
                $agentPayment = new WithdrawPlatform();
                $agentPayment->agent_id    = $id;
                $agentPayment->agent_ids   = $parentAgent->getAgentIds() . ',' . $id;
                $agentPayment->payment_id  = $payment_id;
                $agentPayment->create_time = UTC_TIME;
            } else {
                /*if ($agentPayment->rate < $rate) {
                    Payment::whereRaw("FIND_IN_SET({$id}, agent_ids)")->where('payment_id', $payment_id)->update(['confirm_status' => 0]);
                }*/
            }

            $agentPayment->status        = isset($payment['status']) ? 1 : 0;
            $agentPayment->rate          = $rate;
            $agentPayment->rate_money    = $rateMoney;
            $agentPayment->update_time   = UTC_TIME;
            $agentPayment->save();
        }
        AgentCache::assign($id)->forget('withdraw_platforms');
    }

    //修改
    public function update($data) {
        $parent_agent = $data['agent'];
        unset($data['agent']);

        $connection = \DB::connection();

        $connection->beginTransaction();
        try{
            $agent = Agent::where('id', $data['id'])->where('parent_id', APP_CURRENT_AGENT_ID)->first();
            if (!$agent) {
                $this->throwException('common.not_data');
            }
            $this->setPayments($data['id'], $data['extends']['payments'], $parent_agent);
			$this->setWithdrawPlatform($data['id'], $data['extends']['withdraw'], $parent_agent);
            $connection->commit();
            return true;
        } catch(\Exception $e){
            $connection->rollback();
            throw $e;
        }
    }

    public function toggle($data) {
        $this->toggleFormatBuilder = function(&$builder, &$attributes, $primary_key) {
            $builder->where('parent_id', APP_CURRENT_AGENT_ID);
        };
        return parent::toggle($data);
    }
}