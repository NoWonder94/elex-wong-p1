<?php
namespace App\Application\System\Admin\Services;

use App\Models\Agent\Order;
use App\Models\System\BankLog;
use App\Models\System\AddressLog;
use App\Services\System\AgentService;
use App\Services\System\PaymentService;
use App\Utils\Helper;
use ONGR\ElasticsearchDSL\Query\TermLevel\TermQuery;
use ONGR\ElasticsearchDSL\Aggregation\Bucketing\FilterAggregation;
use ONGR\ElasticsearchDSL\Aggregation\Metric\SumAggregation;
use ONGR\ElasticsearchDSL\Aggregation\Metric\ValueCountAggregation;
use Time, Lang;

class OrderService extends \App\Services\Agent\OrderService {
    protected $model = Order::class;

    public function lists($data = []) {
        $this->listFormatBuilder = function(&$builder, &$data, &$attributes) {
            $builder->with('fees', 'bank');

            $agent = isset($data['agent']) ? trim($data['agent']) : '';
            if (!empty($agent)) {
                $show_child = isset($data['show_child']) ? (int)$data['show_child'] : 0;
                if ($show_child == 2) {
                    $agent = AgentService::instance()->getCacheByName($agent);
                    if (!$agent) {
                        $attributes['empty_data'] = true;
                        return;
                    }
                    $builder->where('agent_ids', $agent->id);
                } else {
                    $builder->where('agent_name', $agent);
                }
            }

            $sn = isset($data['sn']) ? trim($data['sn']) : '';
            if (!empty($sn)) {
                $builder->where('sn', $sn);
            }

            $payment = isset($data['payment']) ? (int)$data['payment'] : 0;
            if ($payment > 0) {
                $builder->where('channel_id', $payment);
            }

            $to_payment = isset($data['to_payment']) ? (int)$data['to_payment'] : 0;
            if ($to_payment > 0) {
                $builder->where('to_channel_id', $to_payment);
            }

            $payment_type = isset($data['payment_type']) ? $data['payment_type'] : '';
            if (!empty($payment_type)) {
                $builder->where('platform', $payment_type);
            }

            $trade_no = isset($data['trade_no']) ? trim($data['trade_no']) : '';
            if (!empty($trade_no)) {
                $builder->where('trade_no', $trade_no);
            }

            $bank_trade_no = isset($data['bank_trade_no']) ? trim($data['bank_trade_no']) : '';
            if (!empty($bank_trade_no)) {
                $builder->where('bank_trade_no', $bank_trade_no);
            }

            $bank_log_sn = isset($data['bank_log_sn']) ? trim($data['bank_log_sn']) : '';
            if (!empty($bank_log_sn)) {
                $builder->where('bank_log_sn', $bank_log_sn);
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
                $builder->where('status', $status - 2);
            }

            $finish_status = isset($data['finish_status']) ? (int)$data['finish_status'] : 0;
            if ($finish_status > 0) {
                $builder->where('finish_status', $finish_status);
            }

            $notify_status = isset($data['notify_status']) ? (int)$data['notify_status'] : 0;
            if ($notify_status > 0) {
                $builder->where('notify_status', $notify_status - 2);
            }
        };

        $this->listFormatOrder = function(&$builder, &$data, &$attributes) {
            $orders = ['money' => 'desc', 'pay_time' => 'desc', 'create_time' => 'desc'];
            if (isset($orders[$attributes['order']])) {
                $builder->orderBy($attributes['order'], $this->getSort($attributes['sort'], $orders[$attributes['order']]));
            }

            if ($attributes['order'] != 'create_time') {
                $builder->orderBy('create_time', 'DESC');
            }
        };

        $this->listFormatStatistic = function(&$builder, $data) {
            $builder->setAggregations(function (&$search) {
                $termFilter = new TermQuery('status', 1);
                $filterAggregation = new FilterAggregation('_virtual_', $termFilter);
                $filterAggregation->addAggregation(new SumAggregation('total_pay_money', 'pay_money'));
                $filterAggregation->addAggregation(new ValueCountAggregation('total_pay_num', 'pay_money'));
                $filterAggregation->addAggregation(new SumAggregation('total_service_fee', 'service_fee'));
                $filterAggregation->addAggregation(new SumAggregation('total_proxy_fee', 'proxy_fee'));
                $search->addAggregation($filterAggregation);
                $search->addAggregation(new SumAggregation('total_money', 'money'));
            });
        };

        return parent::lists($data);
    }

    public function update($data) {
        if (!isset($data['sn']) || empty($data['sn'])) {
            $this->throwException('common.not_data');
        }

        if (!isset($data['remark']) || empty($data['remark'])) {
            $this->throwException('common.remark_required', 'remark');
        }

        $bank_log = null;

        $is_test = isset($data['is_test']) && $data['is_test'] == 2 ? true : false;
        if ($is_test) {
            $this->test($data['sn'], function(&$order) use($data) {
                $logs = $order->admin_log;
                $logs[] = [
                    'time' => UTC_TIME,
                    'admin' => APP_CURRENT_ADMIN_NAME,
                    'type' => 'pay',
                    'remark' => $data['remark']
                ];
                $order->admin_id   = APP_CURRENT_ADMIN_ID;
                $order->admin_name = APP_CURRENT_ADMIN_NAME;
                $order->admin_log = $logs;
                $order->operation_time = UTC_TIME;
                $order->remark     = $data['remark'];
            });
            return;
        }
        
       

        $this->pay($data['sn'], 0, null, function(&$order, &$money, &$is_finish) use($data, &$bank_log) {
            if ($order->bank_receive_id > 0) {
                if (!IS_DEV_MODE && (!isset($data['bank_log_sn']) || empty($data['bank_log_sn']))) {
                    $this->throwException('common.order.bank_log_sn_required', 'bank_log_sn');
                }

                $bank_log = BankLog::where('sn', $data['bank_log_sn'])->first();
                if (!IS_DEV_MODE && !$bank_log) {
                    $this->throwException('common.order.bank_log_sn_empty', 'bank_log_sn');
                }

                if (!IS_DEV_MODE && $bank_log->status == 1) {
                    $this->throwException('common.order.bank_log_sn_use', 'bank_log_sn');
                }

                if (IS_DEV_MODE) {
                    $order->pay_time = UTC_TIME;
                    $money = $order->money;
                } else {
                    $order->bank_log_sn = $bank_log->sn;
                    $order->bank_trade_no = $bank_log->trade_no;
                    $order->pay_time = $bank_log->create_time;
                    $money = $bank_log->deposit;
                }

            } elseif((int)$order->address_id > 0) {
                if (!isset($data['hash']) || empty($data['hash'])) {
                    $this->throwException('common.order.hash_required', 'hash');
                }
                if (!isset($data['from_address']) || empty($data['from_address'])) {
                    $this->throwException('common.order.from_address_required', 'from_address');
                }
                $channel_id = (int)$order->to_channel_id > 0 ? $order->to_channel_id : $order->channel_id;
                $pay_lib = PaymentService::instance()->getLibrarieById($channel_id);
                $match = $pay_lib->matchByAddress($order->address,$order->address_amount,$data['from_address']);
                if(empty($match)){
                    $this->throwException('common.order.address_log_empty');
                }
                $check = AddressLog::where('hash',$match['hash'])->first();
                if($check){
                    $this->throwException('common.order.address_log_use');
                }
                $order->pay_time = $match['timeStamp'];
                
            }else{
                if (!isset($data['pay_money']) || empty($data['pay_money'])) {
                    $this->throwException('common.order.pay_money_required', 'pay_money');
                }
                $money = (float)$data['pay_money'];

                if (!isset($data['pay_time']) || empty($data['pay_time'])) {
                    $this->throwException('common.order.pay_time_required', 'pay_time');
                }

                $pay_time = Time::toTime($data['pay_time']);
                if ($pay_time == 0) {
                    $this->throwException('common.order.pay_time_required', 'pay_time');
                }

                $order->pay_time = $pay_time;
            }

            $is_finish = true;

            $logs = $order->admin_log;
            $logs[] = [
                'time' => UTC_TIME,
                'admin' => APP_CURRENT_ADMIN_NAME,
                'type' => 'pay',
                'remark' => $data['remark']
            ];
            $order->admin_id   = APP_CURRENT_ADMIN_ID;
            $order->admin_name = APP_CURRENT_ADMIN_NAME;
            $order->admin_log = $logs;
            $order->operation_time = UTC_TIME;
            $order->remark     = $data['remark'];
        }, function($order) {
            if ($order->bank_receive_id > 0) {
                BankLog::where('sn', $order->bank_log_sn)->update(['status' => 1]);
            }
        },$data['from_address'],$data['hash']);
    }

    public function finish($sn, $dataClosure = null) {
        parent::finish($sn, function(&$order) {
            $logs = $order->admin_log;
            $logs[] = [
                'time' => UTC_TIME,
                'admin' => APP_CURRENT_ADMIN_NAME,
                'type' => 'finish',
                'remark' => ''
            ];
            $order->admin_id   = APP_CURRENT_ADMIN_ID;
            $order->admin_name = APP_CURRENT_ADMIN_NAME;
            $order->admin_log  = $logs;
            $order->operation_time = UTC_TIME;
        });
    }

    public function getOrderBySn($sn) {
        return Order::with('fees', 'bank')->where('sn', $sn)->disableQueryBigDB()->first();
    }

    public function export($data = [], $file = '', $offset = 0, $limit = 1000) {
        $scroll_id = isset($data['scroll_id']) ? $data['scroll_id'] :  '';
        unset($data['scroll_id']);

        $this->exportFormatBuilder = function(&$builder, &$data) use ($offset) {
            if ($offset == 0) {
                $agent = isset($data['agent']) ? trim($data['agent']) : '';
                if (!empty($agent)) {
                    $show_child = isset($data['show_child']) ? (int)$data['show_child'] : 0;
                    if ($show_child == 2) {
                        $agent = AgentService::instance()->getCacheByName($agent);
                        if (!$agent) {
                            $attributes['empty_data'] = true;
                            return;
                        }
                        $builder->where('agent_ids', $agent->id);
                    } else {
                        $builder->where('agent_name', $agent);
                    }
                }

                $sn = isset($data['sn']) ? trim($data['sn']) : '';
                if (!empty($sn)) {
                    $builder->where('sn', $sn);
                }

                $payment = isset($data['payment']) ? (int)$data['payment'] : 0;
                if ($payment > 0) {
                    $builder->where('channel_id', $payment);
                }

                $payment_type = isset($data['payment_type']) ? $data['payment_type'] : '';
                if (!empty($payment_type)) {
                    $payment_ids = PaymentService::instance()->getIdsByType($payment_type);
                    if (count($payment_ids) < 1) {
                        $attributes['empty_data'] = true;
                        return;
                    }
                    $builder->whereIn('channel_id', $payment_ids);
                }

                $trade_no = isset($data['trade_no']) ? trim($data['trade_no']) : '';
                if (!empty($trade_no)) {
                    $builder->where('trade_no', $trade_no);
                }

                $bank_trade_no = isset($data['bank_trade_no']) ? trim($data['bank_trade_no']) : '';
                if (!empty($bank_trade_no)) {
                    $builder->where('bank_trade_no', $bank_trade_no);
                }

                $bank_log_sn = isset($data['bank_log_sn']) ? trim($data['bank_log_sn']) : '';
                if (!empty($bank_log_sn)) {
                    $builder->where('bank_log_sn', $bank_log_sn);
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
                    $builder->where('status', $status - 2);
                }

                $finish_status = isset($data['finish_status']) ? (int)$data['finish_status'] : 0;
                if ($finish_status > 0) {
                    $builder->where('finish_status', $finish_status);
                }

                $notify_status = isset($data['notify_status']) ? (int)$data['notify_status'] : 0;
                if ($notify_status > 0) {
                    $builder->where('notify_status', $notify_status - 2);
                }

                $builder->orderBy('create_time', 'DESC');
            }
        };

        $this->exportFormatResult = function(&$builder, &$result, $limit) use (&$scroll_id) {
            $list = $builder->limit($limit)->scroll($scroll_id);
            $result['scroll_id'] = $scroll_id;
            return $list;
        };

        $this->exportFormatContent = function($list, $offset) {
            $content = '';
            if ($offset == 0) {
                $content .= Lang::get('common.order.export_agent_head');
            }

            foreach ($list as $item) {
                $content .= "\n\"" . $item->sn . "\t" . '","' . Helper::formatCsv($item->trade_no) . "\t" . '","' . Helper::formatCsv($item->agent_name) . '",'
                    . $item->money. ',' . $item->pay_money. ',' . $item->service_fee. ',"' . Helper::formatCsv($item->payment_name). '",'
                    . Time::toDate($item->pay_time) . ',' . Time::toDate($item->create_time);
            }
            return $content;
        };

        return parent::export($data, $file, $offset, $limit);
    }
}