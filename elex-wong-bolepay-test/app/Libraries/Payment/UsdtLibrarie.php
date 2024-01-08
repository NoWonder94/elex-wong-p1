<?php
namespace App\Libraries\Payment;

use App\Models\System\Bank;
use App\Models\System\Address;
use App\Models\Agent\Order;
use App\Services\Agent\OrderService;

use App\Utils\Calc;
use Http, Storage, Time, Helper;

/**
 * Usdt
 */
class UsdtLibrarie extends BaseLibrarie {
    protected $type = '';

    public function notify($data) {
        return 'success';
    }
    
    public function queryTxns($address,$offset = 1000){
        $url = 'https://api.etherscan.io/api';
        $args = [
            'module' => 'account',
            'action' => 'tokentx',
            'page' => 1,
            'offset' => $offset,
            'sort' => 'desc',
            'apikey' => $this->payment['data']['apikey'],
            'address' => $address
        ];
        $result = json_decode(Http::get($url,$args),true);
        if($result && $result['status'] == 1 && count($result['result']) > 0)
        {
            return $result['result'];
        }else{
            return [];
        }
    }
    
    public function matchByAddress($address,$amount,$from_address = ''){
        $result = [];
        $list = $this->queryTxns($address);
        foreach($list as $val){
            $bool = true;
            $curent_amount = Calc::div($val['value'], pow(10,$val['tokenDecimal']), 6);
            if(!empty($from_address)){
                    $bool = $from_address == $val['from'];
            }
            if(
                $val['to'] == $address && 
                $curent_amount == $amount && 
                $val['confirmations'] >= 12 &&
		$bool
            ){
                $result = $val;
                break;
            }
        }
        return $result;
    }

    public function create(&$order) {
        $address = Address::where('status',1)
                ->where('currency','USDT')
                ->orderBy('income','asc')
                ->first();
        if(!$address){
            $this->throwException('','','暂无可用地址,请稍后再试');
        }
        $order->address = $address->address;
        $order->address_id = $address->id;
        $prices = [];
        $prices[] = $this->binancePrice();
        $prices[] = $this->huobiPrice();
        $prices[] = $this->okexPrice();
        $price = 0;
        foreach($prices as $val){
            if($val > 0){
                $price = $price > 0 ? min($price,$val) : $val;
            }
        }
        if($price == 0){
            $this->throwException('', '', 'api return error');
        }
        $order->address_rate = $price;
        $amount = Calc::div($order->money,$order->address_rate);
        while(true){
            $rand = rand(1,1000) / 1000000;
            $end_amount = Calc::add($rand,$amount,6);
            $check = Order::where('address',$order->address)
                    ->where('address_amount',$end_amount)
                    ->where('expired_time','>',UTC_TIME)
                    ->where('status',0)
                    ->first();
            if(!$check){
                $order->address_amount = $end_amount;
                break;
            }
            $end_amount = 0;
        }
        $order->address_amount = Calc::add($rand,$amount,6);
        $order->expire_time = UTC_TIME + 1800;
        $result['qrcode'] = $this->createQrcode($order->address, $order->sn);
        $result['url'] = Helper::url('www#Pay/order', ['sn' => $order->sn]);
        $order->data = $result;
        return $result;
        
    }
    
    //币安usdt价格
    private function binancePrice(){
        $url = 'https://www.binance.com/gateway-api/v1/public/c2c/sys-config/getPayAndPriceByTradeType';
        $header = ['Content-Type:application/json'];
        $args = '{"currencyType":"CNY","tradeType":"BUY"}';
        $result = @json_decode(Http::post($url,$args,[],10,$header),true);
        if($result['code'] != '000000'){
            return 0;
        }
        $price = 0;
        foreach($result['data']['priceList'] as $val){
            if($val['asset'] == 'USDT'){
                $price = $val['referencePrice'];
                break;
            }
        }
        return round((float)$price,2);
    }
    
    //火币usdt价格
    private function huobiPrice(){
        $url = 'https://otc-api-hk.eiijo.cn/v1/trade/fast/quote?quoteAsset=cny&cryptoAsset=usdt&side=sell&amount=20&type=quantity';
        $header = ['otc-language:zh-CN','portal:web'];
        $result = @json_decode(Http::get($url,[],10,$header),true);
        if($result['code'] != 200 || $result['success'] != 'true'){
            return 0;
        }
        $price = [];
        foreach($result['data'] as $val){
             foreach($val['quoteDetail']  as $v){
                 if($v['price'] > 0){
                     $price[] = $v['price'];
                 }
             }
        }
        if(count($price) > 0){
            return round(min($price),2);
        }else{
            return 0;
        }
    }
    
    
    //币安usdt价格
    private function okexPrice(){
        $url = 'https://www.okex.com/v3/c2c/otc-ticker/roughly?baseCurrency=USDT&quoteCurrency=CNY&paymentMethod=aliPay&side=buy';
        $result = @json_decode(Http::get($url),true);
        if($result['code'] != 0){
            return 0;
        }
        return round((float)$result['data']['price'],2);
    }


}