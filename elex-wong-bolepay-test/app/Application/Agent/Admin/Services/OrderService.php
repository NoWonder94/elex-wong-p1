<?php
namespace App\Application\Agent\Admin\Services;

use App\Services\System\AgentService;
use ONGR\ElasticsearchDSL\Aggregation\Bucketing\NestedAggregation;
use ONGR\ElasticsearchDSL\Aggregation\Bucketing\FilterAggregation;
use ONGR\ElasticsearchDSL\Aggregation\Metric\SumAggregation;
use ONGR\ElasticsearchDSL\Query\TermLevel\TermQuery;
use Time, Helper, Lang;

class OrderService extends \App\Services\Agent\OrderService {
    public function lists($data = []) {
        $agent = $data['agent'];
        unset($data['agent']);

        $this->listFormatBuilder = function(&$builder, &$data, &$attributes) use($agent) {
            if ($data['type'] == 'under') {
                $builder->with('fee');
                $builder->where('agent_ids', $agent->id)->where('agent_id', '<>', $agent->id);

                $agent_name = isset($data['agent_name']) ? trim($data['agent_name']) : '';
                if (!empty($agent_name)) {
                    $under_agent = AgentService::instance()->getCacheByName($agent_name);
                    if (!$under_agent || $under_agent->parent_id != $agent->id) {
                        $attributes['empty_data'] = true;
                        return;
                    }
                    $builder->where('agent_ids', $under_agent->id);
                }
            } else {
                $builder->where('agent_id', $agent->id);
            }

            $sn = isset($data['sn']) ? trim($data['sn']) : '';
            if (!empty($sn)) {
                $builder->where('sn', $sn);
            }

            $trade_no = isset($data['trade_no']) ? trim($data['trade_no']) : '';
            if (!empty($trade_no)) {
                $builder->where('trade_no', $trade_no);
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
			
			$payment = isset($data['payment']) ? (int)$data['payment'] : 0;
            if ($payment > 0) {
                $builder->where('channel_id', $payment);
            }

            $finish_status = isset($data['finish_status']) ? (int)$data['finish_status'] : 0;
            if ($finish_status > 0) {
                $builder->where('finish_status', $finish_status);
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

        if ($data['type'] == 'under') {
            $this->listFormatStatistic = function(&$builder, $data) use($agent) {
                $builder->setAggregations(function (&$search) use($agent) {

                    $termFilter = new TermQuery('agent_fees.agent_id', $agent->id);
                    $filterAggregation = new FilterAggregation('_virtual_', $termFilter);
                    $filterAggregation->addAggregation(new SumAggregation('total_service_fee', 'agent_fees.service_fee'));
                    //$filterAggregation->addAggregation(new SumAggregation('total_create_fee', 'agent_fees.create_fee'));

                    $nestedAggregation = new NestedAggregation('_virtual_', 'agent_fees');
                    $nestedAggregation->addAggregation($filterAggregation);

                    $search->addAggregation($nestedAggregation);
                    $search->addAggregation(new SumAggregation('total_money', 'money'));
                    $search->addAggregation(new SumAggregation('total_pay_money', 'pay_money'));
                });
            };
        } else {
            //$data['statistic'] = ['service_fee', 'create_fee', 'money', 'pay_money'];
            $data['statistic'] = ['service_fee', 'money', 'pay_money'];
        }

        return parent::lists($data);
    }

    public function export($data = [], $file = '', $offset = 0, $limit = 1000) {
        $agent = $data['agent'];
        unset($data['agent']);

        $scroll_id = isset($data['scroll_id']) ? $data['scroll_id'] :  '';
        unset($data['scroll_id']);

        $type = $data['type'];
        unset($data['type']);

        $this->exportFormatBuilder = function(&$builder, &$data) use ($type, $agent, $offset) {
            if ($offset == 0) {
                if ($type == 'under') {
                    $builder->with('fee');
                    $builder->where('agent_ids', $agent->id)->where('agent_id', '<>', $agent->id);
                    $agent_name = isset($data['agent_name']) ? trim($data['agent_name']) : '';
                    if (!empty($agent_name)) {
                        $under_agent = AgentService::instance()->getCacheByName($agent_name);
                        if (!$under_agent || $under_agent->parent_id != $agent->id) {
                            $attributes['empty_data'] = true;
                            return;
                        }
                        $builder->where('agent_ids', $under_agent->id);
                    }
                } else {
                    $builder->where('agent_id', $agent->id);
                }

                $sn = isset($data['sn']) ? trim($data['sn']) : '';
                if (!empty($sn)) {
                    $builder->where('sn', $sn);
                }

                $trade_no = isset($data['trade_no']) ? trim($data['trade_no']) : '';
                if (!empty($trade_no)) {
                    $builder->where('trade_no', $trade_no);
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

                $builder->orderBy('create_time', 'DESC');
            }
        };

        $this->exportFormatResult = function(&$builder, &$result, $limit) use (&$scroll_id) {
            $list = $builder->limit($limit)->scroll($scroll_id);
            $result['scroll_id'] = $scroll_id;
            return $list;
        };

        $this->exportFormatContent = function($list, $offset) use ($type) {
            $content = '';
            if ($offset == 0) {
                if ($type == 'under') {
                    $content .= Lang::get('common.order.export_agent_head');
                } else {
                    $content .= Lang::get('common.order.export_head');
                }
            }

            foreach ($list as $item) {
                if ($type == 'under') {
                    $content .= "\n\"" . $item->sn . "\t" . '","' . Helper::formatCsv($item->trade_no) . "\t" . '","' . Helper::formatCsv($item->under()->name) . '",'
                        . $item->money. ',' . $item->pay_money. ',' . $item->fee->service_fee . ',"' . Helper::formatCsv($item->payment_name). '",'
                        . Time::toDate($item->pay_time) . ',' . Time::toDate($item->create_time);
                } else {
                    $content .= "\n\"" . $item->sn . "\t" . '","' . Helper::formatCsv($item->trade_no) . "\t" . '",'
                        . $item->money. ',' . $item->pay_money. ',' . $item->service_fee . ',"' . Helper::formatCsv($item->payment_name). '",'
                        . Time::toDate($item->pay_time) . ',' . Time::toDate($item->create_time);
                }
            }
            return $content;
        };

        return parent::export($data, $file, $offset, $limit);
    }
}