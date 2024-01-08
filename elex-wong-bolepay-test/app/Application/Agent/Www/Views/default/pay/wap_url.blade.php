@extends('default.pay.base')

@section('body')
  <div style="text-align: center;">
    <br/>
    <p>手机网页浏览</p>
    <br/>
    <img src="data:image/png;base64,{!! $wap_qrcode !!}" />
  </div>
@stop