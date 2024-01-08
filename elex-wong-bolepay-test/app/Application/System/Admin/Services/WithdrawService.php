<?php
namespace App\Application\System\Admin\Services;

use App\Models\Agent\Bank;
use App\Models\System\Agent;
use App\Models\Agent\Withdraw;
use App\Models\System\PaymentPlatform;
use App\Models\System\Payment;
use App\Services\System\PaymentService;
use App\Utils\Calc;
use Validator, Rule, Lang, Helper, Time;

class WithdrawService extends \App\Services\Agent\WithdrawService {
    protected $model = Withdraw::class;

    public function lists($data = []) {
        $this->listFormatBuilder = function(&$builder, &$data, &$attributes) {
            $builder->with('agent', 'bank');

            $sn = isset($data['sn']) ? trim($data['sn']) : '';
            if (!empty($sn)) {
                $builder->where('sn', $sn);
            }

            $agent = isset($data['agent']) ? trim($data['agent']) : '';
            if (!empty($agent)) {
                $builder->where('agent_name', $agent);
            }

            $begin_time = isset($data['begin_time']) ? Time::toTime(trim($data['begin_time'])) : 0;
            if ($begin_time > 0) {
                $builder->where('create_time', '>=', $begin_time);
            }

            $end_time = isset($data['end_time']) ? Time::toTime(trim($data['end_time'])) : 0;
            if ($end_time > 0) {
                $builder->where('create_time', '<=', $end_time);
            }

            $status = isset($data['status']) ? (int)$data['status'] : 0;
            if ($status > 0) {
                $builder->where('status', '=', $status - 2);
            }
        };

        $this->listFormatOrder = function(&$builder, &$data, &$attributes) {
            $orders = ['money' => 'desc', 'create_time' => 'desc'];
            if (isset($orders[$attributes['order']])) {
                $builder->orderBy($attributes['order'], $this->getSort($attributes['sort'], $orders[$attributes['order']]));
            }

            if ($attributes['order'] != 'create_time') {
                $builder->orderBy('create_time', 'DESC');
            }
        };

        return parent::lists($data);
    }

    public function create($data) {
        $agent_id = isset($data['agent_id']) ? (int)$data['agent_id'] : 0;
        if ($agent_id < 1) {
            $this->throwException('', '', '请选择要提现的代理或商户');
        }

        $agent = AgentService::instance()->getById($agent_id);
        if (!$agent) {
            $this->throwException('', '', '代理或商户不存在');
        }

        $rules = [
            'bank_id' => ['required'],
            'money'  => ['required', 'numeric', 'min:1'],
            'service_fee' => ['required', 'numeric', 'min:0'],
            'remark' => ['required'],
        ];
        $message = Lang::get('admin.withdraw.add_validators');
        $validator = Validator::make($data, $rules, $message);
        $this->checkValidator($validator);

        if ($data['bank_id'] < 1) {
            $bank_types = Lang::get('admin.agent_bank_types');
            $rules = [
                'bank' => ['required', Rule::in(array_keys($bank_types))],
                'bank_no'  => ['required'],
                'payee'	=> ['required'],
            ];
            $validator = Validator::make($data['bank'], $rules, Lang::get('admin.withdraw.bank_validators'));
            $this->checkValidator($validator);
        }

        if ($agent->money < $data['money'] + $data['service_fee']) {
            $this->throwException('', 'money', $message['money.max1']);
        }

        if ($data['bank_id'] > 0) {
            $agent_bank = Bank::where('id', $data['bank_id'])->where('agent_id', $agent->id)->where('status', 1)->first();
            if (!$agent_bank) {
                $this->throwException('admin.withdraw.bank_error', 'bank_id');
            }
        }

        $data['sn'] = Helper::getSn();
        $data['agent_name'] = $agent->name;
        $data['agent_ids'] = $agent->getAgentIds();
        $data['create_time'] = UTC_TIME;
        $data['create_date'] = UTC_DAY;
        $data['service_fee_type'] = 2;
        $data['really_money'] = $data['money'];
        $data['status'] = 2;
        $data['operation_time'] = UTC_TIME;
        $data['admin_log'] = [[
            'time' => UTC_TIME,
            'admin' => APP_CURRENT_ADMIN_NAME,
            'status' => 2,
            'remark' => $data['remark']
        ]];
        $data['admin_id'] = APP_CURRENT_ADMIN_ID;
        $data['admin_name'] = APP_CURRENT_ADMIN_NAME;

        $withdraw_fee = Calc::add($data['money'], $data['service_fee'], 2);

        $payment_platforms = [];
        $platform_money = 0;
        if (isset($data['extends']['platforms'])) {
            foreach ($data['extends']['platforms'] as $pcode => $pmoney) {
                $pmoney = (float)$pmoney;
                if ($pmoney > 0) {
                    $platform_money = Calc::add($platform_money, $pmoney, 2);
                    $payment_platforms[] = [
                        'code'    => $pcode,
                        'money'   => $pmoney * 100
                    ];
                }
            }
        }
		
        if ($platform_money != $withdraw_fee) {
            Helper::throwException(sprintf($message['platform_money.error'], $platform_money, $withdraw_fee));
        }

        $data['payment_platforms'] = $payment_platforms;

        unset($data['__RETURN_URL__'], $data['extends'], $data['id']);

        $withdraw = new Withdraw();
        $connection = $withdraw->getConnection();
        //开启事务
        $connection->beginTransaction();
        try{
            if ($data['bank_id'] < 1) {
                $agent_bank = new Bank();
                $agent_bank->agent_id     = $agent->id;
                $agent_bank->bank         = $bank_types[$data['bank']['bank']];
                $agent_bank->bank_no      = $data['bank']['bank_no'];
                $agent_bank->payee        = $data['bank']['payee'];
                $agent_bank->bank_address = $data['bank']['bank_address'];
                $agent_bank->create_time  = UTC_TIME;
                $agent_bank->save();
                $data['bank_id'] = $agent_bank->id;
            }
            unset($data['bank']);

            $data['bank_info'] = $agent_bank->getInfo();

            $withdraw = $withdraw->safeCreate($data);
            $withdraw = $this->getByMysql($withdraw->id);
            $this->updateByManage($withdraw, $agent);
            foreach ($payment_platforms as $pindex => $payment_platform) {
                $payment_platforms[$pindex]['balance'] = PaymentPlatformService::instance()->updateBalance($payment_platform['code'], $payment_platform['money'] / 100);
            }
            $connection->commit();
            return $withdraw->id;
        }catch(\Exception $e){
            $connection->rollback();
            throw $e;
        }
    }

    public function save($data, $type) {
        $this->saveFormatModel = function(&$model, &$data, &$attributes) {
            $model = $model->lockForUpdate();
        };

        $agent = null;

        $this->saveFormatData = function(&$model, &$data, &$attributes) use (&$agent) {
            $rules = [
                'status' => ['required', Rule::in(array_keys(Lang::get('admin.withdraw.status')))],
                'remark' => ['required'],
            ];

            $messages = Lang::get('admin.withdraw.validators');

            if (in_array($model->status, [-1, 2])) {
                Helper::throwException($messages['status.use']);
            }

            if ($model->status == $data['status'] - 2) {
                Helper::throwException($messages['status.in'], 'status');
            }

            if ($data['status'] == 4) {
                $rules['really_money'] = ['required', 'numeric', 'min:0', 'max:' . $model->money];
                $rules['service_fee'] = ['required', 'numeric', 'min:0'];
            }

            $validator = Validator::make($data, $rules, $messages);
            $this->checkValidator($validator);

            if ($model->service_fee_type == 2 || in_array($data['status'] - 2, [-1, 2])) {
                $agent = Agent::find($model->agent_id);
            }

            if ($data['status'] == 4) {
                if ($model->service_fee_type == 1) {//从代付金额扣手续费
                    $withdraw_fee = Calc::add($data['really_money'], $data['service_fee'], 2);
                    if ($withdraw_fee != $model->money) {
                        Helper::throwException(sprintf($messages['fee.error'], $withdraw_fee, $model->money), 'really_money');
                    }
                } else {//从代理余额扣手续费
                    if ($agent->money < $data['service_fee']) {
                        Helper::throwException(sprintf($messages['service_fee.error'], $agent->money, $data['service_fee']), 'service_fee');
                    }
                    $data['really_money'] = $model->money;
                    $withdraw_fee = Calc::add($model->money, $data['service_fee'], 2);
                }

                $payment_platforms = [];
                $platform_money = 0;
                if (isset($attributes['extends']['platforms'])) {
                    foreach ($attributes['extends']['platforms'] as $pcode => $pmoney) {
                        $pmoney = (float)$pmoney;
                        if ($pmoney > 0) {
                            $platform_money = Calc::add($platform_money, $pmoney, 2);
                            $payment_platforms[] = [
                                'code'    => $pcode,
                                'money'   => $pmoney * 100
                            ];
                        }
                    }
                }
				
                if ($platform_money != $withdraw_fee) {
                    Helper::throwException(sprintf($messages['platform_money.error'], $platform_money, $withdraw_fee));
                }

                foreach ($payment_platforms as $pindex => $payment_platform) {
                    $payment_platforms[$pindex]['balance'] = PaymentPlatformService::instance()->updateBalance($payment_platform['code'], $payment_platform['money'] / 100);
                }

                $data['payment_platforms'] = $payment_platforms;
            }

            $logs = $model->admin_log;
            $logs[] = [
                'time' => UTC_TIME,
                'admin' => APP_CURRENT_ADMIN_NAME,
                'status' => $data['status'] - 2,
                'remark' => $data['remark']
            ];

            $data['status'] = $data['status'] - 2;
            $data['operation_time'] = UTC_TIME;
            $data['admin_log'] = $logs;
            $data['admin_id'] = APP_CURRENT_ADMIN_ID;
            $data['admin_name'] = APP_CURRENT_ADMIN_NAME;
        };

        $this->saveExtend = function($primary_val, &$data, &$attributes) use (&$agent) {
            $withdraw = Withdraw::where('id', $primary_val)->disableQueryBigDB()->first();

            if ($withdraw->status == -1) {
                $this->updateByCancel($withdraw, $agent);
            } elseif($withdraw->status == 2) {
                $this->updateByComplete($withdraw, $agent);
            }
        };

        return parent::save($data, $type);
    }

    public function getByMysql($id) {
        return Withdraw::with('agent', 'bank')->where('id', $id)->disableQueryBigDB()->first();
    }

    public function platforms(){
        $data = PaymentPlatform::where('is_withdraw',1)->get();
        return $data;
    }

    public function gotothree($id, $code, $reallyMoney, $serviceFee){
        $payment = Payment::where('type',$code)->orderBy('status','desc')->first();
        if(!$payment){
            $this->throwException('未找到渠道信息');
        }

        $withdraw = Withdraw::where('id', $id)->where('platform_code', '')->where('status', 0);

        $connection = $withdraw->getConnection();
        $connection->beginTransaction();
        try{
            $withdraw = $withdraw->lockForUpdate()->first();
            if(!$withdraw){
                $this->throwException('该数据已处理');
            }

            $withdraw->really_money = $reallyMoney;
            $withdraw->service_fee = $serviceFee;
            /**$paymentLib = PaymentService::instance()->getLibrarieById($payment->id);
            $paymentLib->withdraw($withdraw);*/
            $withdraw->platform_code = $code;
            $withdraw->save();
            $connection->commit();
            return true;
        } catch(\Exception $e){
            $connection->rollback();
            throw $e;
        }
    }
}