<?php 
namespace App\Libraries\Payment;

use App\Models\System\Bank;
use App\Models\Agent\Order;
use Strings, Lang, Time, Http;

/**
 * 云闪付支付
 */
class BoleYsfLibrarie extends BaseLibrarie {

	protected function getBank() {
        return Bank::where('type', 'Ysf')->where('mode', 'pay')->where('status', 1)->orderBy('pay_count', 'ASC')->first();
    }

    private function getPayCode() {
	    static $list = null;
	    if ($list === null) {
            $list = explode(',', file_get_contents(APP_SITE_PATH . 'resources/idiom.table'));
        }
        $index = mt_rand(0, count($list) - 1);
	    return $list[$index];
    }

    private function checkTime() {
        $min_time = 25200; //07:00
        $max_time = 81000; //22:30
        $now_time = UTC_TIME - UTC_DAY;

        if (!IS_DEV_MODE && ($now_time < $min_time || $now_time > $max_time)) {
            $this->throwException(['common.order.time_limie', '09:00 - 20:30']);
        }
    }

    public function create(&$order) {
        $this->checkTime();

        $bank = $this->getBank();
        if (!$bank) {
            $this->throwException('common.order.bank_error');
        }

        $bank_data = json_decode($bank->data, true);

        $num = 0;
        do {
            $pay_code = $this->getPayCode();

            //根据es库
            $check = Order::where('bank_pay_code', $pay_code)
                ->where('bank_receive_id', $bank->id)
                ->where('status', 0)
                ->count();

            if ($check == 0) {
                //根据数据库
                $check = Order::where('bank_pay_code', $pay_code)
                    ->where('bank_receive_id', $bank->id)
                    ->where('status', 0)
                    ->disableQueryBigDB()
                    ->count();
            }

            if ($check > 0) {
                $num++;
                if ($num > 10) {
                    $this->throwException('common.order.generate_pay_code_error');
                } else {
                    usleep(5);
                }
            }
        } while ($check > 0);

        $order->bank_pay_code = $pay_code;

        $money = $order->money;
        $num = 0;
        do {
            $rand_money = bcadd($money, mt_rand(1, 99) / 100, 2);

            //根据es库
            $check = Order::where('money', $rand_money)
                ->where('bank_receive_id', $bank->id)
                ->where('status', 0)
                ->count();

            if ($check == 0) {
                //根据数据库
                $check = Order::where('money', $rand_money)
                    ->where('bank_receive_id', $bank->id)
                    ->where('status', 0)
                    ->disableQueryBigDB()
                    ->count();
            }

            if ($check > 0) {
                $num++;
                if ($num > 10) {
                    $this->throwException('common.order.generate_money_error');
                } else {
                    usleep(5);
                }
            } else {
                $money = $rand_money;
            }
        } while ($check > 0);

        $order->money = $money;

        Bank::where('id', $bank->id)->increment('pay_count');

        $order->bank_pay_id = $bank->id;
        $order->bank_receive_id = $bank_data['receive_id'];

        return [];
    }

    public function getPayInfo(&$order) {
        if ($order->expire_time > 0) {
            if ($order->expire_time - UTC_TIME < 600) {
                $this->throwException('common.order.expire_error');
            } else {
                return $order->data;
            }
        }

        $result = [];

        $bank = Bank::where('id', $order->bank_pay_id)->where('status', 1)->first();
        if (!$bank) {
            $result['tip'] = '银行卡禁用';
            return $result;
        }

        $bank_data = json_decode($bank->data, true);

        $data = [
            'money' => $order->money,
            'code'  => $order->bank_pay_code,
            'sn'    => $order->sn
        ];

        $url = 'http://' . $bank_data['host'] . '/ysf/create';

        $log = [
            'url'  => $url,
            'data' => $data
        ];

        $response = Http::post($url, $data, [], 20);
        $log['result'] =  $response;
        //$this->apiLog($log);

        $response = empty($response) ? false : json_decode($response, true);
        if (!$response || !isset($response['status'])) {
            $result['tip'] = '调用接口失败';
            return $result;
        }

        if (!$response['status']) {
            $result['tip'] = $response['msg'];
            return $result;
        }

        $url = $response['data']['url'];

        $data = [
            'schema' => str_replace('https://', 'chsp://', $url),
            'qrcode' => $this->createQrcode($url, $order->sn)
        ];

        $order->data = $data;
        $order->expire_time = UTC_TIME + 900;
        $order->save();

        return $data;
    }
}