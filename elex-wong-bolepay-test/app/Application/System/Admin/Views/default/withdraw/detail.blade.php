@extends('default._layouts.base')

@section('body')
    @tpl_begin
    <tpl:form>
        @if($agent->type == 1)
        <tpl:fitem label="代理">
            <p class="form-control-static">{{ $agent->name }}</p>
        </tpl:fitem>
        @else
        <tpl:fitem label="商家">
            <p class="form-control-static">{{ $agent->name }}</p>
        </tpl:fitem>
        @endif
        <tpl:fitem label="%admin.withdraw.bank" required="true">
            <tpl:select name="bank_id" first="添加银行卡" firstvalue="0" options="$banks" textfield="full_name" valuefield="id"></tpl:select>
        </tpl:fitem>
        <tpl:fitem label="开户行" pcss="add_banks">
            <tpl:select name="bank[bank]" options="$bank_types"></tpl:select>
        </tpl:fitem>
        <tpl:fitem name="bank[bank_no]" pcss="add_banks">
            <attrs>
                <label><![CDATA[卡号<span class="required text-danger">*</span>]]></label>
            </attrs>
        </tpl:fitem>
        <tpl:fitem name="bank[payee]" pcss="add_banks">
            <attrs>
                <label><![CDATA[收款人<span class="required text-danger">*</span>]]></label>
            </attrs>
        </tpl:fitem>
        <tpl:fitem name="bank[bank_address]" label="开户支行" pcss="add_banks"></tpl:fitem>
        <tpl:fitem name="money" id="money" label="%admin.withdraw.money" required="true">
            <attrs>
                <tip>{{ Lang::format('admin.withdraw.money_tip', $agent->money) }}</tip>
            </attrs>
        </tpl:fitem>
        <tpl:fitem name="service_fee" id="serviceFee" label="%admin.withdraw.service_fee" required="true" default="3"></tpl:fitem>
        <tpl:fitem label="渠道支付" bcss="min-list">
            <table class="table table-bordered table-th-bg table-vmiddle" style="width: auto; text-align: center; font-size:12px;">
                <thead>
                <th style="text-align:left;">渠道</th>
                <th style="width:70px;">余额</th>
                <th style="width:100px;">支付</th>
                </thead>
                <tbody id="platformsBody">
                <tr>
                    <td colspan="3">正在加载中...</td>
                </tr>
                </tbody>
            </table>
        </tpl:fitem>
        <tpl:fitem name="remark" label="%admin.remark" type="textarea" required="true"></tpl:fitem>
        @tpl_include('default._layouts.verify', ['action' => 'withdrawadd'])
        <input type="hidden" name="agent_id" value="{{ $agent->id }}" />
    </tpl:form>
    @tpl_end
@stop

@section('footer')
<script type="text/tpl" id="platform_tpl">
@{{~it :item:index}}
<tr>
    <td style="text-align:left;">@{{=item.name}}</td>
    <td>@{{=item.balance}}</td>
    <td>
        <input type="text" name="extends[platforms][@{{=item.code}}]" value="@{{=item.money}}" class="form-control form-control-sm" style="width:70px;" />
    </td>
</tr>
@{{~}}
</script>
<script type="text/javascript">
jQuery(function ($) {
    $.getPaymentPlatforms = function(){
        var money = parseInt($("#money").val());
        var serviceFee = parseInt($("#serviceFee").val());

        if (money <= 0) {
            return;
        }

        $.ajaxPost("{{ Helper::url('PaymentPlatform/withdraw') }}", {"money":money + serviceFee}, (result) => {
            var html = $.template($("#platform_tpl").html(), result.data);
            $('#platformsBody').html(html);
        });
    };

    $("#bank_id").change(function () {
        var id = $(this).val();
        if (id > 0) {
            $('.add_banks').hide();
        } else {
            $('.add_banks').show();
        }
    });

    $("#money").change(function () {
        $.getPaymentPlatforms();
    });

    $("#serviceFee").change(function () {
        $.getPaymentPlatforms();
    });
});
</script>
@stop