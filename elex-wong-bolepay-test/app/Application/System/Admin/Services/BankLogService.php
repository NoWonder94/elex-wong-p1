<?php
namespace App\Application\System\Admin\Services;

use Time;

class BankLogService extends \App\Services\System\BankLogService {
    public function lists($data = []) {
        $bank_type = '';
        $this->listFormatBuilder = function(&$builder, &$data, &$attributes) use(&$bank_type) {
            $builder->with('bank', 'order');

            $bank = isset($data['bank']) ? (int)$data['bank'] : 0;
            if ($bank > 0) {
                $builder->where('bank_id', $bank);
            }

            if ($bank > 0) {
                $bank = BankService::instance()->getById($bank);
                $bank_type = $bank->type;
            }

            $trade_no = isset($data['trade_no']) ? trim($data['trade_no']) : '';
            if (!empty($trade_no)) {
                $builder->where('trade_no', $trade_no);
            }

            $payer = isset($data['payer']) ? trim($data['payer']) : '';
            if (!empty($payer)) {
                $builder->where('payer', $payer);
            }

            $sn = isset($data['sn']) ? trim($data['sn']) : '';
            if (!empty($sn)) {
                $builder->where('sn', $sn);
            }

            $deposit = isset($data['deposit']) ? (float)$data['deposit'] : 0;
            if ($deposit > 0) {
                $builder->where('deposit', $deposit * 100);
            }

            $begin_time = isset($data['begin_time']) ? Time::toTime(trim($data['begin_time'])) : 0;
            if ($begin_time > 0) {
                $builder->where('pay_time', '>=', $begin_time);
            }

            $end_time = isset($data['end_time']) ? Time::toTime(trim($data['end_time'])) : 0;
            if ($end_time > 0) {
                $builder->where('pay_time', '<', $end_time + 86400);
            }

            $status = isset($data['status']) ? (int)$data['status'] : 0;
            if ($status > 0) {
                if ($status == 2) {
                    $builder->where('status', 1);
                } else {
                    $builder->where('status', '<>', 1);
                }
            }
        };

        $this->listFormatOrder = function(&$builder, &$data, &$attributes) use(&$bank_type) {
            $orders = ['deposit' => 'desc', 'pay_time' => 'desc', 'create_time' => 'desc'];
            if (isset($orders[$attributes['order']])) {
                $builder->orderBy($attributes['order'], $this->getSort($attributes['sort'], $orders[$attributes['order']]));
            }

            if ($attributes['order'] != 'pay_time') {
                $builder->orderBy('pay_time', 'DESC');
            }

            if ($attributes['order'] != 'create_time') {
                $builder->orderBy('create_time', 'DESC');
            }
        };

        $data['statistic'] = ['deposit'];

        return parent::lists($data);
    }
}