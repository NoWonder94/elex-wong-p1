<?php 
namespace App\Libraries\Payment;

use App\Models\System\Bank;
use Http, Storage, Time;

/**
 * 善付
 */
class SftLibrarie extends BaseLibrarie {
	protected $type = '';

	protected function getBank() {
        return Bank::where('type', 'Sft')->where('mode', 'pay')->where('status', 1)->where('run_status', 2)->orderBy('pay_count', 'ASC')->first();
    }

    public function create(&$order) {
        $data['money'] = $order->money;
        $data['type']  = $this->type;
        $data['sn']    = $order->sn;

        $bank = $this->getBank();
        if (!$bank) {
            $this->throwException('common.order.bank_error');
        }

        $url = 'http://' . $bank->server->public_ip . ':9999/pay';
        $log = [
            'url'  => $url,
            'data' => $data
        ];

        $result = Http::get('http://' . $bank->server->public_ip . ':39899/pay', $data);
        /*$result = json_encode([
          'status' => true,
          'trade_no' => '72019112614032437900',
          'receive_id' => 1,
          'qrcode' => base64_encode(file_get_contents(APP_SITE_PATH . 'public/manage/test.png')),
        ]);*/

        $log['result'] =  $result;
        $this->apiLog($log);

        $result = empty($result) ? false : json_decode($result, true);
        if (!$result || !isset($result['status']) || !$result['status']) {
            $this->throwException('common.order.api_error');
        }

        $order->bank_trade_no = $result['trade_no'];

        if (isset($result['qrcode'])) {
            $store = Storage::disk('s3');
            $path  = 'resources/qrcodes/' . Time::toDate(UTC_TIME, 'Y-m-d') . '/' . $order->sn .  '.jpg';
            if ($store->put($path, base64_decode($result['qrcode']))) {
                $result['qrcode'] = $store->url($path);
            } else {
                $this->throwException('common.order.save_qrcode_error');
            }
        }

        Bank::where('id', $bank->id)->increment('pay_count');

        $order->bank_pay_id = $bank->id;
        $order->bank_receive_id = $result['receive_id'];
        $order->data = $result;

        if (isset($result['qrcode'])) {
            return ['qrcode' => $result['qrcode']];
        } else {
            return ['url' => $result['url']];
        }
    }
}