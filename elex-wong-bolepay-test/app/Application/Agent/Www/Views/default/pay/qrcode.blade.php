@extends('default.pay.base')

@section('body')
  <div style="text-align:center; background:#fff; border:dotted 1px #ccc;box-shadow:0px 1px 2px #333333;">
    <div style="background:#f85c51; padding:15px; color:#fff;">
      @if($is_mobile)
      请先截图保存二维码到相册<br/>然后打开<span style="font-size:24px;">@if(strpos($order->channel, 'alipay') !== false)支付宝@else微信@endif</span>＂扫一扫＂，选择相册中的二维码
      @else
      请使用<span style="font-size:24px;">@if(strpos($order->channel, 'alipay') !== false)支付宝@else微信@endif</span>扫码支付
      @endif
    </div>
    <div style="padding: 15px;">
      <img src="{{ $order->data['qrcode'] }}" width="260" />
    </div>
  </div>
@stop