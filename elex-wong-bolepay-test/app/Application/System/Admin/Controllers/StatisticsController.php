<?php
namespace App\Application\System\Admin\Controllers;

use App\Application\System\Admin\Services\StatisticService;
use App\Services\System\PaymentService;
use App\Utils\Page;
use Request, Time;

class StatisticsController extends EloquentController {
    protected $pageSize = 20;

    public function platform() {
        if (!Request::all()) {
            Request::offsetSet('begin_time', Time::toDate(UTC_DAY - 31 * 86400, 'Y-m-d'));
            Request::offsetSet('end_time', Time::toDate(UTC_DAY, 'Y-m-d'));
        }

        $this->share('payment_platforms', PaymentService::instance()->getCacheByCode('payment_platforms'));
        $this->share('platform_names', PaymentService::instance()->getCacheByCode('platform_names'));

        $data = StatisticService::instance()->platform(Request::all(), $this->pageSize);

        $this->share('list', $data['lists']);
        //检测是否有分页
        if (isset($data['total_count'])) {
            $page_args = Request::all();
            $page_args['ca'] = APP_CONTROLLER_NAME . '/' . APP_ACTION_NAME;
            $pager = new Page($data['total_count'], $page_args, $this->pageSize);
            $this->share('pager', $pager->nums());
        }

        $this->share('statistic', $data['statistic']);

        return $this->display();
    }
}