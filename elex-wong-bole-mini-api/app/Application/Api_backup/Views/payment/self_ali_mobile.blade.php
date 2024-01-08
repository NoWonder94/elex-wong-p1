<div style="margin:10px; color: #000;">
    <p style="margin: 0 0 10px;"><b>请使用支付宝转账到下面银行账户</b></p>
    <p style="margin: 0 0 10px;">姓名：<b style="color:#FF5D31;">{{ $payee }}</b></p>
    <p style="margin: 0 0 10px;">卡号：<b style="color:#FF5D31;">{{ $account }}</b></p>
    <p style="margin: 0 0 10px;">银行：<b>{{ $bank }}</b></p>
    <p style="margin: 0 0 10px;">金额：<b>￥{{ $money }}</b></p>
    <p style="margin: 0 0 10px; color:#f00;">(请确认您的支付宝实名认证姓名为：<b style="color:#00F;">{{ $payer }}</b>，不然无法自动到帐)</p>
    <p style="margin: 0 0 10px;">温馨提示：该支付方式每晚 <b style="color:#f00;">23:30-00:40</b> 由于支付宝系统凌晨更新无法及时到账，建议您该时间段先使用其他方式存款，<b style="color:#f00;">00:40之后即可恢复。</b></p>
</div>