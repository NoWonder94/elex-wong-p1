@extends('default.pay.base')

@section('header')
<link rel="stylesheet" href="{{ Helper::resource('fonts/font-awesome/font-awesome.min.css') }}">
@stop

@section('body')
  <div style="font-size:14px;">
    <div><img style="height:50px;" src="{{ Helper::resource('images/ysf-title.png') }}" /></div>
    <div style="margin-top:20px;"><b>订单流水号：</b><span style="font-size:13px;">{{ $order->sn }}</span></div>
    <div style="margin-top:10px;"><b>应付款金额：</b><span style="font-size:16px; color:#ff9800;">{{ $order->money }}</span> 元</div>
    <div id="progressBox">
      <div id="waitBox" style="margin-top:10px; color: #00acc1;"><i class="fa fa-spinner fa-pulse"></i> 正在生成付款码中，请稍候...</div>
    </div>
    <div id="successBox" style="display:none;">
      @if($is_mobile)
      <div style="margin-top:10px; color: #4caf50;"><i class="fa fa-check-circle"></i> 生成付款码成功，请点击【打开云闪付】付款</div>
      <div id="expireTimeBox" style="margin-top:10px; color: #fb8c00;"><i class="fa fa-exclamation-triangle"></i> 请在 <b id="expireTime" style="font-size:16px; color:#e53935;"></b> 秒内完成支付，否则会出现无法及时到帐的情况</div>
      <div id="expireError" style="margin-top:10px; color: #e53935; display: none;"><i class="fa fa-exclamation-triangle"></i> 订单已经超过有效支付时间，如果未完成支付，请不要再进行支付，以避免出现无法及时到帐的情况</div>
      <div style="margin-top:10px;">
        <a id="nativeApp" href="#" target="_blank" style="background:#56a2f0; display: block; border-radius: 5px; padding: 10px 0; text-align: center; color: #fff; font-weight: bold; font-size: 16px;">打开云闪付</a>
      </div>
      <div style="margin-top:10px; color: #3f51b5;">或者截图保存二维码到相册，使用云闪付或银行APP＂扫一扫＂，选择相册中的二维码进行付款</div>
      <div style="margin-top:10px; text-align: center;">
        <img id="qrcodeImg" width="260" />
      </div>
      @else
      <div style="margin-top:10px; color: #4caf50;"><i class="fa fa-check-circle"></i> 生成付款码成功，请使用云闪付或银行APP扫码支付</div>
      <div id="expireTimeBox" style="margin-top:10px; color: #fb8c00;"><i class="fa fa-exclamation-triangle"></i> 请在 <b id="expireTime" style="font-size:16px; color:#e53935;"></b> 秒内完成支付，否则会出现无法及时到帐的情况</div>
      <div id="expireError" style="margin-top:10px; color: #e53935; display: none;"><i class="fa fa-exclamation-triangle"></i> 订单已经超过有效支付时间，如果未完成支付，请不要再进行支付，以避免出现无法及时到帐的情况</div>
      <div style="margin-top:10px;">
        <img id="qrcodeImg" width="260" />
      </div>
      @endif
    </div>
  </div>
@stop

@section('footer')
<script src="{{ Helper::resource('vendor/jquery/jquery.min.js') }}"></script>
<script>
jQuery(function ($) {
  var payExpire = function (time) {
    var date = new Date();
    var step = time - parseInt(date.getTime() / 1000);

    if (step >= 0) {
      $('#expireTime').html(step);

      if (step > 0) {
        setTimeout(function () {
          payExpire(time);
        }, 1000);
      } else {
        $('#expireTimeBox').hide();
        $('#expireError').show();
      }
    } else {
      $('#expireTimeBox').hide();
      $('#expireError').show();
    }
  };

  var payInfo = function() {
    var request = $.ajax({
      url: "{{ Helper::url('Pay/info') }}",
      method: "POST",
      data: {"sn":"{{ $order->sn }}"},
      dataType: "json"
    });

    request.done(function(result) {
      try {
        if (result.status) {
          if (result.data.qrcode) {
            $('#waitBox').remove();
            $('#nativeApp').attr('href', result.data.schema);
            $('#qrcodeImg').attr('src', result.data.qrcode);
            $('#successBox').show();
            payExpire(result.data.expire_time);
          } else {
            setTimeout(payInfo, 1000);
          }
        } else {
          $('#waitBox').remove();
          $("#progressBox").append('<div style="margin-top:10px; color: #e53935;"><i class="fa fa-times-circle"></i> ' + result.msg + '</div>');
        }
      } catch (e) {
        setTimeout(payInfo, 1000);
      }
    });

    request.fail(function(xhr, status) {
      setTimeout(payInfo, 1000);
    });
  }
  payInfo();
});
</script>
@stop