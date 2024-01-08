<?php
namespace App\Application\Agent\Admin\Services;

use Validator, Rule, Lang;

class BankService extends \App\Services\Agent\BankService {

    public function lists($data = []) {
        $this->listFormatBuilder[] = function(&$builder, &$data, &$attributes) {
            $bank_no = isset($data['bank_no']) ? trim($data['bank_no']) : '';
            if (!empty($bank_no)) {
                $builder->where('bank_no', $bank_no);
            }

            $status = isset($data['status']) ? (int)$data['status'] : 0;
            if ($status > 0) {
                $builder->where('status', '=', $status - 1);
            }
        };
        return parent::lists($data);
    }

    public function save($data, $type) {
        $this->saveFormatData[] = function(&$model, &$data, &$attributes) use ($type) {
            $banks = Lang::get('admin.agent_bank_types');
            $rules = [
                'bank' => ['required', Rule::in(array_keys($banks))],
                'bank_no'  => ['required'],
                'payee'	=> ['required'],
            ];

            $validator = Validator::make($data, $rules, Lang::get('admin.bank.validators'));
            $this->checkValidator($validator);

            $data['bank'] = $banks[$data['bank']];
        };
        return parent::save($data, $type);
    }
}