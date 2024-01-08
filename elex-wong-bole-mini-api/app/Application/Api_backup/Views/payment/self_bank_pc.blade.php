<div style="display: table; margin:0 auto; color: #000;">
    <div style="display:table-cell; text-align:right; vertical-align:middle;">
        <img src="https://game-resources.oss-cn-beijing.aliyuncs.com/static/images/self_bank.jpg">
    </div>
    <div style="display:table-cell; text-align:left; padding:0 0 0 50px; vertical-align:middle;">
        <p style="margin: 0 0 10px;"><b>请使用网银转账到下面银行账户</b></p>
        <p style="margin: 0 0 10px;">姓名：<b style="color:#FF5D31;">{{ $payee }}</b></p>
        <p style="margin: 0 0 10px;">卡号：<b style="color:#FF5D31;">{{ $account }}</b></p>
        <p style="margin: 0 0 10px;">银行：<b>{{ $bank }}</b></p>
        <p style="margin: 0 0 10px;">金额：<b>￥{{ $money }}</b></p>
        <p style="margin: 0 0 10px;">附言码：<b style="color:#c10195;">{{ $pay_sn }}</b></p>
        <p style="margin: 0 0 10px; color:#f00;">(请确认您的支付网银姓名为：<b style="color:#00F;">{{ $payer }}</b>，转账时记得输入附言码：<b style="color:#c10195;">{{ $pay_sn }}</b>，不然无法自动到帐)</p>
    </div>
</div>