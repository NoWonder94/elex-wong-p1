@extends('default._layouts.base')
@section('body')
    @tpl_begin
        <tpl:list css="min-list">
            <search>
                <row>
                    <item name="sn" label="%admin.sn" style="width:100px;"></item>
                    <item name="trade_no" label="%admin.order.trade_no" style="width:100px;"></item>
					<item label="%admin.order.payment1">
						<tpl:select name="payment" options="$payments" first="%admin.all" firstvalue="0" selected="$_search_args['payment']" textfield="name" valuefield="id"></tpl:select>
					</item>
                    <item label="%admin.create_time">
                        <tpl:daterange data="$_search_args" date_css="datetime" begin_name="begin_time" end_name="end_time"></tpl:daterange>
                    </item>
                    <php>
                        $status_str = Lang::get('admin.order.status_str');
                    </php>
                    <item label="%admin.order.status">
                        <tpl:select name="status" options="$status_str" first="%admin.all" firstvalue="0" selected="$_search_args['status']"></tpl:select>
                    </item>
                    <php>
                        $finish_status_arr = Lang::get('admin.order.finish_status_arr');
                    </php>
                    <item label="%admin.order.finish_status">
                        <tpl:select name="finish_status" options="$finish_status_arr" first="%admin.all" firstvalue="0" selected="$_search_args['finish_status']"></tpl:select>
                    </item>
                    <php>
                        $notify_status_str = Lang::get('admin.order.notify_status_str');
                    </php>
                    <item label="%admin.order.notify_status">
                        <tpl:select name="notify_status" options="$notify_status_str" first="%admin.all" firstvalue="0" selected="$_search_args['notify_status']"></tpl:select>
                    </item>
                    <input type="hidden" name="type" value="my" />
                    <btn type="search"></btn>
                    <btn type="export" style="margin-left:8px;" id="exportBtn"></btn>
                </row>
            </search>
            <content>
                <div class="alert alert-alt alert-primary alert-dismissible" role="alert">
                    {{ Lang::get('admin.order.total_money') }}：<b>￥{{ Tpl::money($statistic['total_money'] / 100) }}</b>，
                    {{ Lang::get('admin.order.total_pay_money') }}：<b>￥{{ Tpl::money($statistic['total_pay_money'] / 100) }}</b>，
                    {{ Lang::get('admin.order.service_fee_decrease') }}：<b>￥{{ Tpl::money($statistic['total_service_fee'] / 100) }}</b>
                    <!--，{{ Lang::get('admin.order.create_fee_decrease') }}：<b>￥{{ Tpl::money($statistic['total_create_fee'] / 100) }}</b>-->
                </div>
                <table plugin="datatable">
                    <details>
                        <td class="text-left text-break td-detail-show" colspan="13">
                            <ul class="list-group list-group-dividered list-group-flush">
                                @if($list_item->bank_pay_code)
                                <li class="list-group-item"><b>付款码：</b>{{ $list_item->bank_pay_code }}</li>
                                @endif
                                @if($list_item->address)
                                    <li class="list-group-item"><b>数字币地址：</b>{{ $list_item->address }}</li>
                                @endif
                                @if($list_item->address)
                                    <li class="list-group-item"><b>数字币数量：</b>{{ $list_item->address_amount }}；<b>数字币汇率：</b>{{ $list_item->address_rate }}</li>
                                @endif
                                @if($list_item->finish_status == 2)
                                <li class="list-group-item"><b>结算时间：</b>{{ Tpl::time($list_item->finish_time) }}</li>
                                @elseif($list_item->status == 1)
                                <li class="list-group-item"><b>结算执行时间：</b>{{ Tpl::time($list_item->finish_next_time) }}</li>
                                @endif
                                <li class="list-group-item"><b>通知地址：</b>{{ $list_item->notify_url }}</li>
                                @if($list_item->notify_time > 0)
                                <li class="list-group-item"><b>通知时间：</b>{{ Tpl::time($list_item->notify_time) }}</li>
                                @endif
                                <li class="list-group-item"><b>客户端IP：</b>{{ $list_item->client_ip }}；<b>服务器IP：</b>{{ $list_item->server_ip }}</li>
                                @if($list_item->remark)
                                <li class="list-group-item"><b>备注：</b>{{ $list_item->remark }}</li>
                                @endif
                            </ul>
                        </td>
                    </details>
                    <columns>
                        <column width="180" align="left" halign="left" code="sn" label="%admin.sn"></column>
                        <column width="200" align="left" halign="left" code="trade_no" label="%admin.order.trade_no"></column>
                        <column width="80" code="money" order="0" sort="desc" label="%admin.order.money"></column>
                        <column width="80" code="pay_money" label="%admin.order.pay_money"></column>
                        <!--<column width="60" code="create_fee" label="%admin.order.create_fee"></column>-->
                        <column width="60" code="service_fee" label="%admin.order.service_fee"></column>
                        <column width="100" code="payment_name" label="支付方式"></column>
                        <column code="pay_time" type="time" order="0" sort="desc" label="%admin.order.pay_time" width="130"></column>
                        <column code="create_time" type="time" order="1" sort="desc" label="%admin.create_time" width="130"></column>
                        <column width="60" code="status" type="badge" badge-css=",danger,dark,success" badge-label="admin.order.status_str" badge-add="2" label="%admin.order.status"></column>
                        <column width="60" code="finish_status" type="badge" badge-css=",dark,success" badge-label="admin.order.finish_status_arr" badge-show="status" label="%admin.order.finish_status"></column>
                        <column width="60" code="notify_status" type="badge" badge-css=",danger,dark,success" badge-label="admin.order.notify_status_str" badge-add="2" badge-show="status" label="%admin.order.notify_status"></column>
                        <actions minwidth="69" align="left" halign="left">
                            @if($list_item->status == 1)
                            <action label="%admin.order.send_notify">
                                <attrs>
                                    <click>sendNotify(this, {{ $list_item->id }}, '{{ $list_item->sn }}', {{ $list_item->money }}, {{ $list_item->pay_money }})</click>
                                </attrs>
                            </action>
                            @endif
                        </actions>
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop

@section('footer')
    <script type="text/javascript">
        function sendNotify(btn, id, sn, money, payMoney) {
            var notifyFunc = function() {
                var td = $(btn).parent();
                $(btn).hide();
                $(btn).after('<i class="fa fa-spinner fa-pulse send-notify"></i>');

                $.ajaxPost("{{ Helper::url('Order/notify') }}", {"sn":sn}, (result) => {
                    $(btn).show();
                    td.find('.send-notify').remove();
                    if (result.status) {
                        $.updateListRow(id, result.data, true);
                        $.showSuccess("{{Lang::get('common.handler_success')}}", 300, null, 2000);
                    } else {
                        $.showTooltip($(btn), result.msg, null, 'top', 3000, 'danger');
                    }
                }, () => {
                    $(btn).show();
                    td.find('.send-notify').remove();
                    $.showTooltip($(btn), "{{Lang::get('common.handler_error')}}", null, 'top', 2000, 'danger');
                });
            };

            if (payMoney < money) {
                $.showConfirm("支付金额 <span style='color:#f00;'>￥" + payMoney + "</span> 小于订单金额 <span style='color:#f00;'>￥" + money + "</span>，你确定要回调通知商家吗？", function(hideFunc){
                    hideFunc();
                    notifyFunc();
                });
            } else {
                notifyFunc();
            }
        }
    </script>
@stop