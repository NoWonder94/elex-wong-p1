<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>订单支付</title>
  <link rel="stylesheet" href="{{ Helper::resource('www/base.css') }}">
  <link rel="stylesheet" href="{{ Helper::resource('www/css.css') }}">
  @yield('header')
</head>
<body>
<div class="g-all">
  @if(!$order)
    <p style="text-align: center;color: red">订单不存在</p>
  @elseif($order->status == 1)
    <p style="text-align: center;color: red">订单已完成</p>
  @elseif($order->status == -1)
    <p style="text-align: center;color: red">订单已关闭</p>
  @else
    @yield('body')
  @endif
</div>
@yield('footer')
</body>
</html>