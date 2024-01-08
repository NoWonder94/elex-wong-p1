@extends('default.pay.base')

@section('header')
<link rel="stylesheet" href="{{ Helper::resource('fonts/font-awesome/font-awesome.min.css') }}">
@stop

@section('body')
  <div style="font-size:14px;">
    <div><img style="height:50px;" src="https://onecoin.press/wp-content/uploads/2019/10/image-6.png" /></div>
    <div style="margin-top:20px;"><b>订单流水号：</b><span style="font-size:13px;">{{ $order->sn }}</span></div>
    <div style="margin-top:10px;"><b>应付RMB：</b><span style="font-size:16px; color:#ff9800;">￥{{ $order->money }}</span> 元</div>
	<div style="margin-top:10px;"><b>应转币数量：</b><span style="font-size:16px; color:#ff9800;">{{ $order->address_amount }}</span></div>
	<div style="margin-top:10px;"><b>转币地址：</b><span style="font-size:16px; color:#ff9800;">{{ $order->address }}</span></div>

    <div id="successBox" style="display:none;">
      @if($is_mobile)
		 <div style="margin-top:10px; color: #4caf50;"><i class="fa fa-check-circle"></i> 请复制以上转币地址，或者扫以下二维码进行转币</div>
      <div id="expireTimeBox" style="margin-top:10px; color: #fb8c00;"><i class="fa fa-exclamation-triangle"></i> 请在 <b id="expireTime" style="font-size:16px; color:#e53935;"></b> 内完成支付，否则会出现无法及时到帐的情况</div>
      <div id="expireError" style="margin-top:10px; color: #e53935; display: none;"><i class="fa fa-exclamation-triangle"></i> 订单已经超过有效支付时间，如果未完成支付，请不要再进行支付，以避免出现无法及时到帐的情况</div>
      <div style="margin-top:10px; text-align: center;">
        <img id="qrcodeImg" width="260" />
      </div>
      @else
      <div style="margin-top:10px; color: #4caf50;"><i class="fa fa-check-circle"></i> 请复制以上转币地址，或者扫以下二维码进行转币</div>
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
@if($order->status == 0)
  <!-- 弹框 -->
  <div class="g-dialog">
    <div class="flex-column-center g-padcon">
      <div class="m-dialogcon">
        <p class="tc f16 p15"><b>支付提示</b></p>
        <p class="tc f-diatt">
          您此次转币数量为 <b style="color:#d50000;">{{ $order->address_amount }}</b> ，请务必转完全一致的数量，否则无法自动到账。
        </p>
        <div class="flex-row-middle-around f-ftcon">
          <span>确定</span>
        </div>
      </div>
    </div>
  </div>
  <script src="{{ Helper::resource('www/jquery.min.js') }}"></script>
  <script src="{{ Helper::resource('www/alert.min.js') }}"></script>
  <script src="{{ Helper::resource('www/pay.js') }}"></script>
  @endif
<script src="{{ Helper::resource('vendor/jquery/jquery.min.js') }}"></script>
<script>
jQuery(function ($) {
  var payExpire = function (time) {
    var date = new Date();
    var step = time - parseInt(date.getTime() / 1000);
	var minute = parseInt(step / 60);
	var html = "";
	if(minute > 0){
		html += minute + '分';
	}
	var second = step % 60;
	html += second + '秒';
	
    if (step >= 0) {
      $('#expireTime').html(html);

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