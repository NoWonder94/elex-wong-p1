@extends('default._layouts.base')

@section('header')
<link rel="stylesheet" href="{{ Helper::resource('vendor/highlight/styles/default.css') }}">
<link rel="stylesheet" href="{{ Helper::resource('vendor/highlight/styles/github-gist.css') }}">
<link rel="stylesheet" href="{{ Helper::resource('vendor/highlight/highlight.css') }}">
@stop

@section('body')
@tpl_begin
<div style="color: #000;">
<div class="panel panel-bordered">
    <div class="panel-heading">
        <h3 class="panel-title">接口信息</h3>
    </div>
    <div class="panel-body">
        <table class="table table-bordered table-th-bg table-vmiddle text-center">
            <tr>
                <th style="width:266px;">APP ID</th>
                <th style="width:266px;">APP SECRET</th>
                <th style="width:120px;">回调服务器IP</th>
                <th></th>
            </tr>
            <tr>
                <td id="appId">--</td>
                <td id="appSecret">--</td>
                <td id="callbackServerIp">--</td>
                <td class="text-left">
                    <span class="badge badge-lg badge-primary" id="showAppInfo" style="color: #fff; cursor: pointer;">查看</span>
                    <a class="badge badge-lg badge-success" style="color: #fff;" href="{{ Helper::resource('demo200212.zip') }}">下载示例</a>
                </td>
            </tr>
        </table>
        <h4 class="mt-20">快速导航</h4>
        <div class="btn-group" role="group" aria-label="Basic example">
            <a class="btn btn-default waves-effect waves-classic" href="#api1">1 . 充值下单</a>
            <a class="btn btn-default waves-effect waves-classic" href="#api2">2 . 订单结果回调</a>
            <a class="btn btn-default waves-effect waves-classic" href="#api3">3 . 订单查询</a>
            <a class="btn btn-default waves-effect waves-classic" href="#api4">4 . 可用金额查询</a>
            <a class="btn btn-default waves-effect waves-classic" href="#api5">5 . 签名规则</a>
			<a class="btn btn-default waves-effect waves-classic" href="#api6">6 . API代付</a>
			<a class="btn btn-default waves-effect waves-classic" href="#api7">7 . 代付结果回调</a>
        </div>
    </div>
</div>
<div class="panel panel-bordered" id="api1">
    <div class="panel-heading">
        <h3 class="panel-title">1 . 充值下单</h3>
    </div>
    <div class="panel-body">
        <h4>接口说明</h4>
        <table class="table table-bordered table-th-bg table-vmiddle text-center">
            <tr>
                <th class="text-left" style="width:300px;">接口地址</th>
                <th style="width:80px;">请求方式</th>
                <th style="width:170px;">请求格式</th>
                <th></th>
            </tr>
            <tr>
                <td class="text-left">{{ Helper::url('api#pay/create') }}</td>
                <td>POST</td>
                <td>x-www-form-urlencoded</td>
                <td></td>
            </tr>
        </table>
        <h4 class="mt-20">参数示例</h4>
        <table class="table table-bordered table-th-bg table-vmiddle">
            <tr>
                <th style="width:110px;">名称</th>
                <th style="width:100px;">参数名</th>
                <th style="width:50px;" class="text-center">必填</th>
                <th style="width:100px;">类型</th>
                <th style="width:220px;">示例</th>
                <th>备注</th>
            </tr>
            <tr>
                <td>APP ID</td>
                <td>app_id</td>
                <td class="text-center">是</td>
                <td>string(32)</td>
                <td>AWoTf26cM1IzEkc5TPPPGJVrcPmW3RvR</td>
                <td>平台签约的商户标识</td>
            </tr>
            <tr>
                <td>签名</td>
                <td>sign</td>
                <td class="text-center">是</td>
                <td>string(32)</td>
                <td>7oHDbEMod9s05eGVdg3WsGnnJvk7c6Yo</td>
                <td><a href="#api5">参考签名规则</a></td>
            </tr>
            <tr>
                <td>商户订单号</td>
                <td>trade_no</td>
                <td class="text-center">是</td>
                <td>string(32)</td>
                <td>20191219202028</td>
                <td>商户自定义业务号，每个商户订单号唯一，可在后台管理查单使用字段。<br/>不可使用相同商户相同订单号下单。</td>
            </tr>
            <tr>
                <td>支付通道</td>
                <td>channel_id</td>
                <td class="text-center">是</td>
                <td>int(11)</td>
                <td>10001</td>
                <td>支付通道ID，<a href="{{ Helper::url('Payment/index') }}" target="_blank">点击查看</a></td>
            </tr>
            <tr>
                <td>金额</td>
                <td>money</td>
                <td class="text-center">是</td>
                <td>decimal(8,2)</td>
                <td>100.18</td>
                <td>
                    充值金额，单位为元，精度为0.01<br/>
                    <span style="color: #f00; font-size: 12px;">各支付通道有不同的金额限制，请在<a href="{{ Helper::url('Payment/index') }}" target="_blank">支付通道</a>页面查看</span><br/>
                    <span style="color: #f00; font-size: 12px;">支付通道：10018，10019 可以先调用，可用金额接口，获取允许使用的金额</span>
                </td>
            </tr>
            <tr>
                <td>用户IP</td>
                <td>ip</td>
                <td class="text-center">是</td>
                <td>string(16)</td>
                <td>113.108.250.125</td>
                <td>终端用户IP地址;IPV4格式</td>
            </tr>
            <tr>
                <td>通知回调地址</td>
                <td>notify_url</td>
                <td class="text-center">是</td>
                <td>string(256)</td>
                <td>http://www.xxx.com/pay/result?code=BolePay&id=10001</td>
                <td>提供外网可访问地址，参考订单结果回调</td>
            </tr>
            <tr>
                <td>终端类型</td>
                <td>client_type</td>
                <td class="text-center">否</td>
                <td>string(10)</td>
                <td>mobile</td>
                <td>
                    用户终端类型<br/>
                    <span style="color: #f00; font-size: 12px;">pc:电脑；mobile:手机、平板</span><br/>
                    <span style="color: #f00; font-size: 12px;">支付通道：10016，10017 必须提交此参数</span>
                </td>
            </tr>
        </table>
        <h4 class="mt-20">成功返回示例</h4>
        <pre data-plugin="highlight"><code class="json">{
    "status": true,
    "data": {
        "sn": "201912192037210313612637",
        "money": 100.82,
        "expire_time": "2019-12-19 20:52:21",
        "url": "https://www.bolepays.com/Pay/order?sn=201912192037210313612637"
    },
    "msg": ""
}</code></pre>
        <h4 class="mt-20">失败返回示例</h4>
        <pre data-plugin="highlight"><code class="json">{
    "status": false,
    "data": null,
    "msg": "支付金额不能小于 100"
}</code></pre>
        <table class="table table-bordered table-th-bg table-vmiddle">
            <tr>
                <th style="width:110px;">名称</th>
                <th style="width:100px;">参数名</th>
                <th style="width:50px;" class="text-center">必返</th>
                <th style="width:100px;">类型</th>
                <th>备注</th>
            </tr>
            <tr>
                <td>状态</td>
                <td>status</td>
                <td class="text-center">是</td>
                <td>boolean</td>
                <td>true:成功  false:失败</td>
            </tr>
            <tr>
                <td>错误信息</td>
                <td>msg</td>
                <td class="text-center">是</td>
                <td>text</td>
                <td>status为true 则输出为空</td>
            </tr>
            <tr>
                <td>相关数据</td>
                <td>data</td>
                <td class="text-center">是</td>
                <td>object</td>
                <td>status为false 则输出为null</td>
            </tr>
            <tr>
                <td>　订单流水号</td>
                <td>sn</td>
                <td class="text-center">是</td>
                <td>string(24)</td>
                <td></td>
            </tr>
            <tr>
                <td>　支付金额</td>
                <td>money</td>
                <td class="text-center">是</td>
                <td>decimal(8,2)</td>
                <td>某些支付通道要求金额唯一，会在提交金额的基础上增加 0 - 0.99的随机金额</td>
            </tr>
            <tr>
                <td>　支付网页</td>
                <td>url</td>
                <td class="text-center">是</td>
                <td>string(256)</td>
                <td></td>
            </tr>
            <tr>
                <td>　支付二维码</td>
                <td>qrcode</td>
                <td class="text-center">是</td>
                <td>string(256)</td>
                <td></td>
            </tr>
            <tr>
                <td>　过期时间</td>
                <td>expire_time</td>
                <td class="text-center">否</td>
                <td>string(19)</td>
                <td>某些支付通道有时间限制，用户必须在过期时间前完成支付，否则无法自动到帐</td>
            </tr>
            <tr>
                <td>　收款银行</td>
                <td>bank_name</td>
                <td class="text-center">否</td>
                <td>string(32)</td>
                <td>某转账到银行卡类型返回</td>
            </tr>
            <tr>
                <td>　收款人</td>
                <td>bank_payee</td>
                <td class="text-center">否</td>
                <td>string(32)</td>
                <td>某转账到银行卡类型返回</td>
            </tr>
            <tr>
                <td>　银行卡号</td>
                <td>bank_card</td>
                <td class="text-center">否</td>
                <td>string(32)</td>
                <td>某转账到银行卡类型返回</td>
            </tr>
        </table>
    </div>
</div>
<div class="panel panel-bordered" id="api2">
    <div class="panel-heading">
        <h3 class="panel-title">2 . 订单结果回调</h3>
    </div>
    <div class="panel-body">
        <h4>接口说明</h4>
        <p>
            订单支付成功时将发送此接口通知商户进行确认、商户收到此回调需回复 <span class="text-primary">PAY_SUCCESS</span> (表示已接收到通知并成功处理,忽略大小写)或 <span class="text-primary">PAY_FAIL</span> (表示已接收到通知但该订单已关闭,忽略大小写)确认来保证消息可达性、否则平台会延迟再次重传结果直到死信。<br/>
            商户需内部实现去重工作、防止业务重复导致损失。<br/>
            重传机制 间隔时间为 10s/20s/30s/60s/120s/300s/600s/900s/1800s/3600s。
        </p>
        <table class="table table-bordered table-th-bg table-vmiddle text-center">
            <tr>
                <th style="width:100px;">请求地址</th>
                <th style="width:80px;">请求方式</th>
                <th style="width:170px;">请求格式</th>
                <th></th>
            </tr>
            <tr>
                <td>notify_url</td>
                <td>POST</td>
                <td>x-www-form-urlencoded</td>
                <td></td>
            </tr>
        </table>
        <h4 class="mt-20">订单回调参数示例</h4>
        <table class="table table-bordered table-th-bg table-vmiddle">
            <tr>
                <th style="width:110px;">名称</th>
                <th style="width:100px;">参数名</th>
                <th style="width:50px;" class="text-center">必填</th>
                <th style="width:100px;">类型</th>
                <th style="width:300px;">示例</th>
                <th>备注</th>
            </tr>
            <tr>
                <td>APP ID</td>
                <td>app_id</td>
                <td class="text-center">是</td>
                <td>string(32)</td>
                <td>AWoTf26cM1IzEkc5TPPPGJVrcPmW3RvR</td>
                <td>平台签约的商户标识</td>
            </tr>
            <tr>
                <td>签名</td>
                <td>sign</td>
                <td class="text-center">是</td>
                <td>string(32)</td>
                <td>C380BEC2BFD727A4B6845133519F3AD6</td>
                <td>
                    <a href="#api5">参考签名规则</a><br/>
                    <span style="color: #f00; font-size: 12px;">签名忽略notify_url中的参数</span>
                </td>
            </tr>
            <tr>
                <td>订单流水号</td>
                <td>sn</td>
                <td class="text-center">是</td>
                <td>string(24)</td>
                <td>201912192037210313612637</td>
                <td>平台订单流水号</td>
            </tr>
            <tr>
                <td>商户订单号</td>
                <td>trade_no</td>
                <td class="text-center">是</td>
                <td>string(32)</td>
                <td>20191219202028</td>
                <td>商户自定义业务号</td>
            </tr>
            <tr>
                <td>支付金额</td>
                <td>money</td>
                <td class="text-center">是</td>
                <td>decimal(8,2)</td>
                <td>100.18</td>
                <td>用户实际支付金额</td>
            </tr>
            <tr>
                <td>支付时间</td>
                <td>pay_time</td>
                <td class="text-center">是</td>
                <td>string(19)</td>
                <td>2019-12-19 20:33:02</td>
                <td>支付成功时间</td>
            </tr>
        </table>
        <h4 class="mt-20">商户确认返回示例</h4>
        <table class="table table-bordered table-th-bg table-vmiddle">
            <tr>
                <td style="width:120px;">PAY_SUCCESS</td>
                <td>表示已接收到通知并成功处理，忽略大小写</td>
            </tr>
            <tr>
                <td>PAY_FAIL</td>
                <td>表示已接收到通知但该订单已关闭，忽略大小写</td>
            </tr>
        </table>
    </div>
</div>
<div class="panel panel-bordered" id="api3">
    <div class="panel-heading">
        <h3 class="panel-title">3 . 订单查询</h3>
    </div>
    <div class="panel-body">
        <h4>接口说明</h4>
        <table class="table table-bordered table-th-bg table-vmiddle text-center">
            <tr>
                <th class="text-left" style="width:300px;">接口地址</th>
                <th style="width:80px;">请求方式</th>
                <th style="width:170px;">请求格式</th>
                <th></th>
            </tr>
            <tr>
                <td class="text-left">{{ Helper::url('api#order/query') }}</td>
                <td>POST</td>
                <td>x-www-form-urlencoded</td>
                <td></td>
            </tr>
        </table>
        <h4 class="mt-20">参数示例</h4>
        <table class="table table-bordered table-th-bg table-vmiddle">
            <tr>
                <th style="width:110px;">名称</th>
                <th style="width:100px;">参数名</th>
                <th style="width:50px;" class="text-center">必填</th>
                <th style="width:100px;">类型</th>
                <th style="width:300px;">示例</th>
                <th>备注</th>
            </tr>
            <tr>
                <td>APP ID</td>
                <td>app_id</td>
                <td class="text-center">是</td>
                <td>string(32)</td>
                <td>AWoTf26cM1IzEkc5TPPPGJVrcPmW3RvR</td>
                <td>平台签约的商户标识</td>
            </tr>
            <tr>
                <td>签名</td>
                <td>sign</td>
                <td class="text-center">是</td>
                <td>string(32)</td>
                <td>C380BEC2BFD727A4B6845133519F3AD6</td>
                <td>
                    <a href="#api5">参考签名规则</a><br/>
                    <span style="color: #f00; font-size: 12px;">签名忽略notify_url中的参数</span>
                </td>
            </tr>
            <tr>
                <td>商户订单号</td>
                <td>trade_no</td>
                <td class="text-center">是</td>
                <td>string(32)</td>
                <td>20191219202028</td>
                <td>商户自定义业务号</td>
            </tr>
        </table>
        <h4 class="mt-20">成功返回示例</h4>
        <pre data-plugin="highlight"><code class="json">{
    "status": true,
    "data": {
        "sn": "201912192037210313612637",
        "money": 100.82,
        "pay_time": "2019-12-19 20:52:21",
        "pay_status": true
    },
    "msg": ""
}</code></pre>
        <h4 class="mt-20">失败返回示例</h4>
        <pre data-plugin="highlight"><code class="json">{
    "status": false,
    "data": null,
    "msg": "订单不存在"
}</code></pre>
        <table class="table table-bordered table-th-bg table-vmiddle">
            <tr>
                <th style="width:110px;">名称</th>
                <th style="width:100px;">参数名</th>
                <th style="width:50px;" class="text-center">必返</th>
                <th style="width:100px;">类型</th>
                <th>备注</th>
            </tr>
            <tr>
                <td>状态</td>
                <td>status</td>
                <td class="text-center">是</td>
                <td>boolean</td>
                <td>true:成功  false:失败</td>
            </tr>
            <tr>
                <td>错误信息</td>
                <td>msg</td>
                <td class="text-center">是</td>
                <td>text</td>
                <td>status为true 则输出为空</td>
            </tr>
            <tr>
                <td>相关数据</td>
                <td>data</td>
                <td class="text-center">是</td>
                <td>object</td>
                <td>status为false 则输出为null</td>
            </tr>
            <tr>
                <td>　订单流水号</td>
                <td>sn</td>
                <td class="text-center">是</td>
                <td>string(24)</td>
                <td>平台订单流水号</td>
            </tr>
            <tr>
                <td>　支付金额</td>
                <td>money</td>
                <td class="text-center">是</td>
                <td>decimal(8,2)</td>
                <td>用户实际支付金额</td>
            </tr>
            <tr>
                <td>　支付时间</td>
                <td>pay_time</td>
                <td class="text-center">是</td>
                <td>string(19)</td>
                <td>支付成功时间</td>
            </tr>
            <tr>
                <td>　支付状态</td>
                <td>pay_status</td>
                <td class="text-center">是</td>
                <td>string(256)</td>
                <td>true:已支付  false:未支付</td>
            </tr>
        </table>
    </div>
</div>
<div class="panel panel-bordered" id="api4">
    <div class="panel-heading">
        <h3 class="panel-title">4 . 可用金额查询</h3>
    </div>
    <div class="panel-body">
        <h4>接口说明</h4>
        <table class="table table-bordered table-th-bg table-vmiddle text-center">
            <tr>
                <th class="text-left" style="width:300px;">接口地址</th>
                <th style="width:80px;">请求方式</th>
                <th style="width:170px;">请求格式</th>
                <th></th>
            </tr>
            <tr>
                <td class="text-left">{{ Helper::url('api#pay/moneys') }}</td>
                <td>POST</td>
                <td>x-www-form-urlencoded</td>
                <td></td>
            </tr>
        </table>
        <h4 class="mt-20">参数示例</h4>
        <table class="table table-bordered table-th-bg table-vmiddle">
            <tr>
                <th style="width:110px;">名称</th>
                <th style="width:100px;">参数名</th>
                <th style="width:50px;" class="text-center">必填</th>
                <th style="width:100px;">类型</th>
                <th style="width:300px;">示例</th>
                <th>备注</th>
            </tr>
            <tr>
                <td>APP ID</td>
                <td>app_id</td>
                <td class="text-center">是</td>
                <td>string(32)</td>
                <td>AWoTf26cM1IzEkc5TPPPGJVrcPmW3RvR</td>
                <td>平台签约的商户标识</td>
            </tr>
            <tr>
                <td>签名</td>
                <td>sign</td>
                <td class="text-center">是</td>
                <td>string(32)</td>
                <td>C380BEC2BFD727A4B6845133519F3AD6</td>
                <td>
                    <a href="#api5">参考签名规则</a>
                </td>
            </tr>
            <tr>
                <td>支付通道</td>
                <td>channel_id</td>
                <td class="text-center">是</td>
                <td>int(11)</td>
                <td>10018</td>
                <td>
                    支付通道ID<br/>
                    <span style="color: #f00; font-size: 12px;">只支持支付通道：10018，10019，其他通道返回空数组</span>
                </td>
            </tr>
        </table>
        <h4 class="mt-20">成功返回示例</h4>
        <pre data-plugin="highlight"><code class="json">{
    "status": true,
    "data": [10, 20, 30, 50, 100, 200, 300, 500],
    "msg": ""
}</code></pre>
        <h4 class="mt-20">失败返回示例</h4>
        <pre data-plugin="highlight"><code class="json">{
    "status": false,
    "data": null,
    "msg": "通道不存在"
}</code></pre>
        <table class="table table-bordered table-th-bg table-vmiddle">
            <tr>
                <th style="width:110px;">名称</th>
                <th style="width:100px;">参数名</th>
                <th style="width:50px;" class="text-center">必返</th>
                <th style="width:100px;">类型</th>
                <th>备注</th>
            </tr>
            <tr>
                <td>状态</td>
                <td>status</td>
                <td class="text-center">是</td>
                <td>boolean</td>
                <td>true:成功  false:失败</td>
            </tr>
            <tr>
                <td>错误信息</td>
                <td>msg</td>
                <td class="text-center">是</td>
                <td>text</td>
                <td>status为true 则输出为空</td>
            </tr>
            <tr>
                <td>相关数据</td>
                <td>data</td>
                <td class="text-center">是</td>
                <td>array</td>
                <td>支持的金额数组</td>
            </tr>
        </table>
    </div>
</div>
<div class="panel panel-bordered" id="api5">
    <div class="panel-heading">
        <h3 class="panel-title">5 . 签名规则</h3>
    </div>
    <div class="panel-body">
        <ol style="list-style-type: square;">
            <li>
                将集合内非空参数值的参数按照参数名ASCII码从小到大排序（字典序），使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串。<br/>
                示例：
                <div style="padding-left: 2em;">
                    <b>请求参数：</b>
                    <pre data-plugin="highlight"><code class="json">'app_id' : 'AWoTf26cM1IzEkc5TPPPGJVrcPmW3RvR',
'trade_no' : '20191219202028',
'channel_id' : 10001,
'money' : 100.18,
'ip' : '113.108.250.125',
'notify_url' : 'http://www.xxx.com/pay/result?code=BolePay&id=10001'</code></pre>
                    <b>拼接结果：</b>
                    <pre style="white-space: pre-wrap;word-wrap: break-word;">app_id=AWoTf26cM1IzEkc5TPPPGJVrcPmW3RvR&amp;channel_id=10001&amp;ip=113.108.250.125&amp;money=100.18&amp;notify_url=http://www.xxx.com/pay/result?code=BolePay&amp;id=10001&amp;trade_no=20191219202028</pre>
                </div>
                <b>注意以下重要规则：</b>
                <ul>
                    <li>参数名ASCII码从小到大排序（字典序）；</li>
                    <li>如果参数的值为空不参与签名；</li>
                    <li>参数名区分大小写；</li>
                    <li>验证调用返回签名时，只有POST请求参数参与签名，传送的sign参数不参与签名，将生成的签名与该sign值作校验；</li>
                    <li>接口可能增加字段，验证签名时必须支持增加的扩展字段</li>
                </ul>
                <br/>
            </li>
            <li>
                密钥拼接
                <ul>
                    <li>用密钥[app_secret]添加在字符串的尾部；</li>
                    <li>如密钥为：1DOddA1NLdItB3xieoM099Km8z90bvVm；</li>
                    <li>
                        示例：
                        <pre style="white-space: pre-wrap;word-wrap: break-word;">app_id=AWoTf26cM1IzEkc5TPPPGJVrcPmW3RvR&amp;channel_id=10001&amp;ip=113.108.250.125&amp;money=100.18&amp;notify_url=http://www.xxx.com/pay/result?code=BolePay&amp;id=10001&amp;trade_no=20191219202028<span style="color:#f00;">&amp;app_secret=1DOddA1NLdItB3xieoM099Km8z90bvVm</span></pre>
                    </li>
                </ul>
                <br/>
            </li>
            <li>
                生成32位MD5签名
                <ul>
                    <li>b6805ce009e258b0222a6a7c29c04b21</li>
                </ul>
                <br/>
            </li>
            <li>
                请求参数带入sign签名
                <pre data-plugin="highlight"><code class="json">'app_id' : 'AWoTf26cM1IzEkc5TPPPGJVrcPmW3RvR',
'trade_no' : '20191219202028',
'channel_id' : 10001,
'money' : 100.18,
'ip' : '113.108.250.125',
'notify_url' : 'http://www.xxx.com/pay/result?code=BolePay&id=10001',
'sign' : 'b6805ce009e258b0222a6a7c29c04b21'</code></pre>
                <br/>
            </li>
            <li>
                注意
                <ul>
                    <li>签名参数保持原生值，不要通过unicode或urlencode 编码之后再签名；</li>
                    <li>传递参数可以使用urlencode进行编码 但不建议使用unicode编码</li>
                </ul>
            </li>
        </ol>
    </div>
</div>
<div class="panel panel-bordered" id="api6">
    <div class="panel-heading">
        <h3 class="panel-title">6 . API代付</h3>
    </div>
    <div class="panel-body">
        <h4>接口说明</h4>
        <table class="table table-bordered table-th-bg table-vmiddle text-center">
            <tr>
                <th class="text-left" style="width:300px;">接口地址</th>
                <th style="width:80px;">请求方式</th>
                <th style="width:170px;">请求格式</th>
                <th></th>
            </tr>
            <tr>
                <td class="text-left">{{ Helper::url('api#withdraw/create') }}</td>
                <td>POST</td>
                <td>x-www-form-urlencoded</td>
                <td></td>
            </tr>
        </table>
        <h4 class="mt-20">参数示例</h4>
        <table class="table table-bordered table-th-bg table-vmiddle">
            <tr>
                <th style="width:110px;">名称</th>
                <th style="width:100px;">参数名</th>
                <th style="width:50px;" class="text-center">必填</th>
                <th style="width:100px;">类型</th>
                <th style="width:220px;">示例</th>
                <th>备注</th>
            </tr>
            <tr>
                <td>APP ID</td>
                <td>app_id</td>
                <td class="text-center">是</td>
                <td>string(32)</td>
                <td>AWoTf26cM1IzEkc5TPPPGJVrcPmW3RvR</td>
                <td>平台签约的商户标识</td>
            </tr>
            <tr>
                <td>签名</td>
                <td>sign</td>
                <td class="text-center">是</td>
                <td>string(32)</td>
                <td>7oHDbEMod9s05eGVdg3WsGnnJvk7c6Yo</td>
                <td><a href="#api5">参考签名规则</a></td>
            </tr>
            <tr>
                <td>商户订单号</td>
                <td>trade_no</td>
                <td class="text-center">是</td>
                <td>string(32)</td>
                <td>20191219202028</td>
                <td>商户自定义业务号，每个商户订单号唯一，可在后台管理查单使用字段。<br/>不可使用相同商户相同订单号下单。</td>
            </tr>
            <tr>
                <td>代付通道</td>
                <td>channel_id</td>
                <td class="text-center">是</td>
                <td>int(11)</td>
                <td>10001</td>
                <td>代付通道ID，10001：永利代付 暂只支持此通道</td>
            </tr>
            <tr>
                <td>金额</td>
                <td>money</td>
                <td class="text-center">是</td>
                <td>decimal(8,2)</td>
                <td>100.18</td>
                <td>
                    代付金额，单位为元，精度为0.01
                    
                </td>
            </tr>
			<tr>
                <td>收款人</td>
                <td>name</td>
                <td class="text-center">是</td>
                <td>string(32)</td>
                <td>马云</td>
                <td>
                    收款人姓名
                </td>
            </tr>
			<tr>
                <td>收款账户</td>
                <td>account</td>
                <td class="text-center">是</td>
                <td>string(64)</td>
                <td>123456@qq.com</td>
                <td>
                    收款账户<br/>
                    <span style="color: #f00; font-size: 12px;">暂只支持支付宝，手机或者邮箱</span>
                </td>
            </tr>
            <tr>
                <td>用户IP</td>
                <td>ip</td>
                <td class="text-center">是</td>
                <td>string(16)</td>
                <td>113.108.250.125</td>
                <td>终端用户IP地址;IPV4格式</td>
            </tr>
            <tr>
                <td>通知回调地址</td>
                <td>notify_url</td>
                <td class="text-center">是</td>
                <td>string(256)</td>
                <td>http://www.xxx.com/pay/result?code=BolePay&id=10001</td>
                <td>提供外网可访问地址，参考代付结果回调</td>
            </tr>
            
        </table>
        <h4 class="mt-20">成功返回示例</h4>
        <pre data-plugin="highlight"><code class="json">{
    "status":true,
    "data":{
        "sn":"20200614141516377013009328",
        "money":1000,
        "fee":35
    },
    "msg":""
}
</code></pre>
        <h4 class="mt-20">失败返回示例</h4>
        <pre data-plugin="highlight"><code class="json">{
    "status": false,
    "data": null,
    "msg": "账号格式错误"
}</code></pre>
        <table class="table table-bordered table-th-bg table-vmiddle">
            <tr>
                <th style="width:110px;">名称</th>
                <th style="width:100px;">参数名</th>
                <th style="width:50px;" class="text-center">必返</th>
                <th style="width:100px;">类型</th>
                <th>备注</th>
            </tr>
            <tr>
                <td>状态</td>
                <td>status</td>
                <td class="text-center">是</td>
                <td>boolean</td>
                <td>true:成功  false:失败</td>
            </tr>
            <tr>
                <td>错误信息</td>
                <td>msg</td>
                <td class="text-center">是</td>
                <td>text</td>
                <td>status为true 则输出为空</td>
            </tr>
            <tr>
                <td>相关数据</td>
                <td>data</td>
                <td class="text-center">是</td>
                <td>object</td>
                <td>status为false 则输出为null</td>
            </tr>
            <tr>
                <td>　订单流水号</td>
                <td>sn</td>
                <td class="text-center">是</td>
                <td>string(24)</td>
                <td></td>
            </tr>
            <tr>
                <td>　代付金额</td>
                <td>money</td>
                <td class="text-center">是</td>
                <td>decimal(8,2)</td>
                <td></td>
            </tr>
            <tr>
                <td>　手续费</td>
                <td>fee</td>
                <td class="text-center">是</td>
                <td>decimal(8,2)</td>
                <td></td>
            </tr>
            
        </table>
    </div>
</div>
<div class="panel panel-bordered" id="api7">
    <div class="panel-heading">
        <h3 class="panel-title">7 . 代付结果回调</h3>
    </div>
    <div class="panel-body">
        <h4>接口说明</h4>
        <p>
            代付不管成功或失败将发送此接口通知商户进行确认、商户收到此回调需回复 <span class="text-primary">WITHDRAW_SUCCESS</span> (表示已接收到通知并成功处理,忽略大小写)或 <span class="text-primary">WITHDRAW_FAIL</span> (表示已接收到通知但该代付订单已关闭,忽略大小写)确认来保证消息可达性、否则平台会延迟再次重传结果直到死信。<br/>
            商户需内部实现去重工作、防止业务重复导致损失。<br/>
            重传机制 间隔时间为 10s/20s/30s/60s/120s/300s/600s/900s/1800s/3600s。
        </p>
        <table class="table table-bordered table-th-bg table-vmiddle text-center">
            <tr>
                <th style="width:100px;">请求地址</th>
                <th style="width:80px;">请求方式</th>
                <th style="width:170px;">请求格式</th>
                <th></th>
            </tr>
            <tr>
                <td>notify_url</td>
                <td>POST</td>
                <td>x-www-form-urlencoded</td>
                <td></td>
            </tr>
        </table>
        <h4 class="mt-20">代付回调参数示例</h4>
        <table class="table table-bordered table-th-bg table-vmiddle">
            <tr>
                <th style="width:110px;">名称</th>
                <th style="width:100px;">参数名</th>
                <th style="width:50px;" class="text-center">必填</th>
                <th style="width:100px;">类型</th>
                <th style="width:300px;">示例</th>
                <th>备注</th>
            </tr>
            <tr>
                <td>APP ID</td>
                <td>app_id</td>
                <td class="text-center">是</td>
                <td>string(32)</td>
                <td>AWoTf26cM1IzEkc5TPPPGJVrcPmW3RvR</td>
                <td>平台签约的商户标识</td>
            </tr>
            <tr>
                <td>签名</td>
                <td>sign</td>
                <td class="text-center">是</td>
                <td>string(32)</td>
                <td>C380BEC2BFD727A4B6845133519F3AD6</td>
                <td>
                    <a href="#api5">参考签名规则</a><br/>
                    <span style="color: #f00; font-size: 12px;">签名忽略notify_url中的参数</span>
                </td>
            </tr>
			<tr>
                <td>状态</td>
                <td>status</td>
                <td class="text-center">是</td>
                <td>int(2)</td>
                <td>1</td>
                <td>代付处理状态，1：成功 -1：失败</td>
            </tr>
            <tr>
                <td>流水号</td>
                <td>sn</td>
                <td class="text-center">是</td>
                <td>string(24)</td>
                <td>201912192037210313612637</td>
                <td>平台流水号</td>
            </tr>
            <tr>
                <td>商户订单号</td>
                <td>trade_no</td>
                <td class="text-center">是</td>
                <td>string(32)</td>
                <td>20191219202028</td>
                <td>商户自定义业务号</td>
            </tr>
            <tr>
                <td>代付金额</td>
                <td>money</td>
                <td class="text-center">是</td>
                <td>decimal(8,2)</td>
                <td>100.18</td>
                <td>用户实际支付金额</td>
            </tr>
            <tr>
                <td>处理时间</td>
                <td>pay_time</td>
                <td class="text-center">是</td>
                <td>string(19)</td>
                <td>2019-12-19 20:33:02</td>
                <td>成功时即为支付的时间</td>
            </tr>
			<tr>
                <td>备注</td>
                <td>pay_time</td>
                <td class="text-center">否</td>
                <td>string(256)</td>
                <td>账户不对</td>
                <td>失败原因</td>
            </tr>
        </table>
        <h4 class="mt-20">商户确认返回示例</h4>
        <table class="table table-bordered table-th-bg table-vmiddle">
            <tr>
                <td style="width:120px;">WITHDRAW_SUCCESS</td>
                <td>表示已接收到通知并成功处理，忽略大小写</td>
            </tr>
            <tr>
                <td>WITHDRAW_FAIL</td>
                <td>表示已接收到通知但该订单已关闭，忽略大小写</td>
            </tr>
        </table>
    </div>
</div>
</div>
<script type="text/tpl" id="agent_tpl">
    <form class="form-horizontal" id="agentForm">
        @tpl_include('default._layouts.verify_min', ['action' => 'appinfo', 'width' => 143])
    </form>
</script>
@tpl_end
@stop

@section('footer')
<script src="{{ Helper::resource('vendor/highlight/highlight.pack.js') }}"></script>
<script src="{{ Helper::resource('js/Plugin/highlight.js') }}"></script>
<script type="text/javascript">
    $("#showAppInfo").click(function () {
        $.showConfirm($("#agent_tpl").html(), function(hiddenFunc){
            var ladda = Ladda.create(this);
            ladda.start();

            var form = $("#agentForm");

            $.ajaxPost("{{ Helper::url('Agent/appinfo') }}", form.serialize(), (result) => {
                ladda.stop();
                if (result.status) {
                    hiddenFunc();
                    $("#appId").html(result.data.app_id);
                    $("#appSecret").html(result.data.app_secret);
                    $("#callbackServerIp").html(result.data.callback_server_ip);
                    $("#showAppInfo").hide();
                } else {
                    if (result.data.field != '') {
                        $.showTooltip($("[name='" + result.data.field + "']", form), result.msg, null, 'right', 3000, 'danger');
                    } else {
                        $.showTooltip($(this), result.msg, null, 'right', 3000, 'danger');
                    }
                }
            });
        }, null, null, null, 500, "查看接口密匙");
    });
</script>
@stop