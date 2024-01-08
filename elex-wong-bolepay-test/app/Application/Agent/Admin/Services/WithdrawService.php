<?php
namespace App\Application\Agent\Admin\Services;

use App\Models\Agent\Bank;
use App\Models\Agent\Withdraw;
use Validator, Rule, Lang, Helper, Time;

class WithdrawService extends \App\Services\Agent\WithdrawService {

    public function lists($data = []) {
        $this->listFormatBuilder[] = function(&$builder, &$data, &$attributes) {
            $builder->with('bank');

            $bank = isset($data['bank']) ? trim($data['bank']) : '';
            if (!empty($bank)) {
                $builder->where('bank_id', $bank);
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

    public function save($data, $type) {
        $agent = $data['agent'];
        unset($data['agent']);

        $this->saveFormatData[] = function(&$model, &$data, &$attributes) use ($agent) {
            $rules = [
                'bank_id' => ['required'],
                'money'  => ['required', 'numeric', 'min:25000', 'max:49999'],
                'service_fee_type'	=> ['required', Rule::in(array_keys(Lang::get('admin.withdraw.service_fee_types')))],
            ];
			$message = Lang::get('admin.withdraw.validators');
			if($agent->type == 1){
				$rules['money'] = ['required', 'numeric', 'min:1000', 'max:49999'];
				$message = Lang::get('admin.withdraw.validators_1');
			}

           
            $validator = Validator::make($data, $rules, $message);
            $this->checkValidator($validator);

            if ($agent->money < $data['money']) {
                $this->throwException('', 'money', $message['money.max1']);
            }

            $bank = Bank::where('id', $data['bank_id'])->where('status', 1)->first();
            if (!$bank) {
                $this->throwException('admin.withdraw.bank_error', 'bank_id');
            }

            $data['sn'] = Helper::getSn();
            $data['agent_name'] = $agent->name;
            $data['agent_ids'] = $agent->getAgentIds();
            $data['bank_info'] = $bank->getInfo();
            $data['create_time'] = UTC_TIME;
            $data['create_date'] = UTC_DAY;
        };

        $this->saveExtend = function($primary_val, &$data, &$attributes) use ($agent) {
            $withdraw = Withdraw::where('id', $primary_val)->disableQueryBigDB()->first();
            $this->updateByCreate($withdraw, $agent);
        };
        return parent::save($data, $type);
    }
}