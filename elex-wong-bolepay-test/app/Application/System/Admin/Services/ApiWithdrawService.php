<?php
namespace App\Application\System\Admin\Services;

use App\Models\Agent\ApiWithdraw;
use App\Services\System\AgentService;
use App\Utils\Helper;
use ONGR\ElasticsearchDSL\Query\TermLevel\TermQuery;
use ONGR\ElasticsearchDSL\Aggregation\Bucketing\FilterAggregation;
use ONGR\ElasticsearchDSL\Aggregation\Metric\SumAggregation;
use ONGR\ElasticsearchDSL\Aggregation\Metric\ValueCountAggregation;
use Time, Lang;

class ApiWithdrawService extends \App\Services\Agent\ApiWithdrawService {
    protected $model = ApiWithdraw::class;

    public function lists($data = []) {
        $this->listFormatBuilder = function(&$builder, &$data, &$attributes) {

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

            $notify_status = isset($data['notify_status']) ? (int)$data['notify_status'] : 0;
            if ($notify_status > 0) {
                $builder->where('notify_status', $notify_status - 2);
            }
        };

        $this->listFormatOrder = function(&$builder, &$data, &$attributes) {
            $orders = ['money' => 'desc', 'u' => 'desc', 'create_time' => 'desc'];
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
                $filterAggregation->addAggregation(new SumAggregation('total_pay_money', 'money'));
                $filterAggregation->addAggregation(new SumAggregation('total_service_fee', 'service_fee'));
                $filterAggregation->addAggregation(new SumAggregation('total_proxy_fee', 'proxy_fee'));
                $search->addAggregation($filterAggregation);
                $search->addAggregation(new SumAggregation('total_money', 'money'));
            });
        };

        return parent::lists($data);
    }

    public function update($data) {
        $api_withdraw = $this->getByMysql($data['id']);
		if(!$api_withdraw){
			$this->throwException('admin.api_withdraw.data_error');
		}
		$status = array_keys(Lang::get('admin.api_withdraw.status'));
		if(!in_array($data['status'],$status) || in_array($api_withdraw->status,[1,-1])){
			$this->throwException('admin.api_withdraw.status_error');
		}

        if (!isset($data['remark']) || empty($data['remark'])) {
            $this->throwException('common.remark_required', 'remark');
        }

        $this->pay($api_withdraw->sn, $api_withdraw->money, $data['status'] - 2,$data['remark'], function(&$withdraw) use ($data){
            $logs = $withdraw->admin_log;
            $logs[] = [
                'time' => UTC_TIME,
                'admin' => APP_CURRENT_ADMIN_NAME,
                'status' => $data['status'] - 2,
                'remark' => $data['remark']
            ];
            $withdraw->admin_id   = APP_CURRENT_ADMIN_ID;
            $withdraw->admin_name = APP_CURRENT_ADMIN_NAME;
            $withdraw->admin_log = $logs;
            $withdraw->operation_time = UTC_TIME;
            $withdraw->remark     = $data['remark'];
        });
    }

    

    public function getBySn($sn) {
        return ApiWithdraw::where('sn', $sn)->disableQueryBigDB()->first();
    }
	
	public function getByMysql($id) {
        return ApiWithdraw::where('id', $id)->disableQueryBigDB()->first();
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
                $content .= Lang::get('common.api_withdraw.export_agent_head');
            }

            foreach ($list as $item) {
				$update_time = $item->status == 1 ? Time::toDate($item->update_time) : '-';
                $content .= "\n\"" . $item->sn . "\t" . '","' . Helper::formatCsv($item->trade_no) . "\t" . '","' . Helper::formatCsv($item->agent_name) . '","'
                    . $item->money. '","' . $item->service_fee. '","' . Helper::formatCsv($item->payment_name). '",'
                    . $update_time . ',' . Time::toDate($item->create_time);
            }
            return $content;
        };

        return parent::export($data, $file, $offset, $limit);
    }
}