@extends('default.pay.base')
@section('header')
<link rel="stylesheet" href="{{ Helper::resource('www/alert.css') }}">
@stop

@section('body')
  <div class="u-title tc">
    <p>请使用<span style="color:#1e9ada;font-size:24px;">支付宝</span></p>
    <p>转账到下面银行账户</p>
  </div>
  <div class="g-tableshow">
    <table>
      <tr>
        <td width="22%"><span class="u-tdtitle">姓名</span></td>
        <td width="78%">
          <div class="pl15 pr15 clearfix">
            <div class="m-copytxt fl">
              <input type="text" value="{{ $order->data['bank_payee'] }}" readonly id="name">
            </div>
            <span class="u-btn fr" id="copyname">复制</span>
          </div>
        </td>
      </tr>
      <tr>
        <td><span class="u-tdtitle">卡号</span></td>
        <td>
          <p class="m-kahao"><input type="text" value="{{ $order->data['bank_card'] }}" readonly id="code"></p>
          <p class="pr15 pb15 clearfix"><span class="u-btn fr" id="copycode">复制</span></p>
        </td>
      </tr>
      <tr>
        <td><span class="u-tdtitle">银行</span></td>
        <td>
          <p class="f18 pl15">{{ $order->data['bank_name'] }}</p>
        </td>
      </tr>
      <tr>
        <td><span class="u-tdtitle">金额</span></td>
        <td>
          <div class="pl15 pr15 clearfix">
            <div class="m-copytxt m-amount fl">
              <input type="text" value="{{ $order->money }}" readonly id="amount">
            </div>
            <span class="u-btn fr" id="copyamount">复制</span>
          </div>
        </td>
      </tr>
    </table>
  </div>
  <div class="u-fttt">
    <p class="tc">（请务必在 {{ Tpl::time($order->expire_time - 300) }} 之前完成支付，支付金额必须与此处完全一致）</p>
  </div>

  <div class="g-tip">
    <p class="f-tiptt">温馨提示：</p>
    <p class="f-tipshow">
      该支付方式每晚 <b style="color:#d50000;">23:30 - 02:00</b> 由于支付宝系统凌晨结算无法及时到账，建议您该时间段使用其他支付方式，<b style="color:#d50000;">02:00之后即可恢复</b> 。
    </p>
  </div>
  @if(!$is_mobile)
  <div class="g-tip">
    <p class="f-tiptt">手机网页浏览：</p>
    <p class="f-tipshow tc">
      <img src="data:image/png;base64,{!! $wap_qrcode !!}" />
      <br/><br/>
    </p>
  </div>
  @endif
@stop

@section('footer')
  @if($order->status == 0)
  <!-- 弹框 -->
  <div class="g-dialog">
    <div class="flex-column-center g-padcon">
      <div class="m-dialogcon">
        <p class="tc f16 p15"><b>支付提示</b></p>
        <p class="tc f-diatt">
          您此次存款系统金额为 <b style="color:#d50000;">￥{{ $order->money }}</b> 元，请务必支付完全一致的金额，否则无法自动到账。
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
@stop