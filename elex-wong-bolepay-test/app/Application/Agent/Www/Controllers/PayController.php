<?php

namespace App\Application\Agent\Www\Controllers;

use App\Services\Agent\OrderService;
use App\Services\System\PaymentService;
use App\Services\System\AgentService;
use Endroid\QrCode\QrCode;
use Request, Helper, Redirect, Http;

class PayController extends BaseController {
	
    public function order() {
        $sn  = Request::get('sn');
        $tpl = 'base';
        if (!empty($sn) && strlen($sn) > 20) {
            $order = OrderService::instance()->getBySn($sn);
            if (!$order) {
                $order = OrderService::instance()->getOrderBySn($sn);
            }
            $this->share('order', $order);

            if ($order) {
                if((int)$order->to_channel_id > 0){
                    $payment = PaymentService::instance()->get($order->to_channel_id);
                }else{
                    $payment = $order->getPayment();
                }
                $tpl = $payment['mode'];

                if ($tpl == 'html') {
                    die($order->data['html']);
                }

                $this->share('payment', $payment);

                $is_mobile = Helper::getIsMobile();

                if ($tpl == 'url' || ($tpl == 'wap_url' && $is_mobile)) {
                    return Redirect::to($order->data['url'])->send();
                }

                if($tpl != "qrcode") {
                    $qrcode = new QrCode(Request::fullUrl());
                    $qrcode->setSize(200);
                    $qrcode->setMargin(5);

                    $this->share('wap_qrcode', base64_encode($qrcode->writeString()));
                }
                $this->share('is_mobile', $is_mobile);
            }
        }
    	return $this->display($tpl);
    }

    public function info() {
        $sn  = Request::get('sn');
        $order = OrderService::instance()->getBySn($sn);
        if (!$order) {
            $order = OrderService::instance()->getOrderBySn($sn);
        }
        $librarie = PaymentService::instance()->getLibrarieById($order->channel_id);
        $data = $librarie->getPayInfo($order);
        if ($order->expire_time > 0) {
            $data['expire_time'] = $order->expire_time - 600;
        }
        return $this->successData($data);
    }

    public function test() {
        $agent = AgentService::instance()->getByAppId('486303c673e96730858178e8919b6014');

        $data = [
            'channel_id'  => 10021,
            'trade_no'    => Helper::getShortSn(),
            'money'       => 1,
            'notify_url'  => 'http://managetest.bolepays.com/callback/Test/order',
            'ip'          => CLIENT_IP
        ];

        $data = AgentService::instance()->formatRequestArgs($agent, $data);

        $result = Http::post('http://test.bolepays.com/api/pay/create', $data);
        $result = @json_decode($result, true);
        if (!$result || !isset($result['status'])) {
            die("api return error");
        } elseif (!$result['status']) {
            die($result['msg']);
        }
        return Redirect::to($result['data']['url']);
    }

    public function succ() {
        return $this->display();
    }
	public function fail() {
        die('failed');
    }
}