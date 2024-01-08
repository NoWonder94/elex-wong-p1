@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:list css="min-list">
        <search>
            <row>
                <item name="sn" label="%admin.order.sn"></item>
                <item name="trade_no" label="%admin.order.trade_no"></item>
                <item name="bank_trade_no" label="%admin.order.bank_trade_no"></item>
                <item name="bank_log_sn" label="%admin.order.bank_log_sn"></item>
            </row>
            <row>
                <item label="%admin.order.payment1">
                    <tpl:select name="payment" options="$payments" first="%admin.all" firstvalue="0" selected="$_search_args['payment']" textfield="name" valuefield="id"></tpl:select>
                </item>
                <item label="%admin.order.to_payment">
                    <tpl:select name="to_payment" options="$payments" first="%admin.all" firstvalue="0" selected="$_search_args['to_payment']" textfield="name" valuefield="id"></tpl:select>
                </item>
                <item label="%admin.order.payment_type">
                    <tpl:select name="payment_type" options="$payment_platforms" first="%admin.all" firstvalue="" textfield="name" valuefield="code" selected="$_search_args['payment_type']"></tpl:select>
                </item>
                <item label="%admin.create_time">
                    <tpl:daterange data="$_search_args" date_css="datetime" begin_name="begin_time" end_name="end_time"></tpl:daterange>
                </item>
            </row>
            <row>
                <item name="agent" label="%admin.agent_business" style="width:120px"></item>
                <php>
                    $agent_order_show_type = Lang::get('admin.order.agent_order_show_type');
                </php>
                <item label="%admin.order.show_child_order" pid="showChildOrder">
                    <attrs>
                        <pstyle>@if(empty($_search_args['agent'])) display:none; @endif</pstyle>
                    </attrs>
                    <tpl:select name="show_child" options="$is_search" selected="$_search_args['show_child']"></tpl:select>
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
                <btn type="search"></btn>
                <btn type="export" style="margin-left:8px;" id="exportBtn"></btn>
            </row>
        </search>
        <content>
            <div class="alert alert-alt alert-primary alert-dismissible" role="alert">
                订单总数：<b>{{ $pager['total_count'] }}</b>，
                支付订单数：<b>{{ $statistic['total_pay_num'] }}</b>，
                订单总额：<b>￥{{ Tpl::money($statistic['total_money'] / 100) }}</b>，
                订单支付总额：<b>￥{{ Tpl::money($statistic['total_pay_money'] / 100) }}</b>，
                平台服务费：<b>￥{{ Tpl::money(($statistic['total_service_fee'] - $statistic['total_proxy_fee']) / 100) }}</b>，
                代理佣金：<b>￥{{ Tpl::money($statistic['total_proxy_fee'] / 100) }}</b>，
                成功率：<b>{{ $statistic['total_pay_num'] > 0 ? Tpl::money($statistic['total_pay_num'] / $pager['total_count'] * 100) : 0 }}%</b>
            </div>
            <table plugin="datatable" detail-new-row="true">
                <attrs>
                    <datatable-options>"scrollX":true,"scrollCollapse":true,"fixedColumns":{leftColumns:2,rightColumns:5}</datatable-options>
                </attrs>
                <details>
                    <attrs>
                        <base><![CDATA[<td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>]]></base>
                    </attrs>
                    <td></td>
                    <td class="text-left text-break td-detail-show" colspan="8">
                        <ul class="list-group list-group-dividered list-group-flush">
                            @if($list_item->fees && count($list_item->fees) > 0)
                                <li class="list-group-item">
                                    <div><b>代理收入：</b></div>
                                    @foreach($list_item->fees as $fee)
                                        <div class="text-break">
                                            代理：{{ $fee->agent_name }}；
                                            服务费率：{{ $fee->service_rate }}%；
                                            服务费：@if($list_item->finish_status != 2)未结算@else￥{{ $fee->service_fee }}@endif
                                        </div>
                                    @endforeach
                                </li>
                            @endif
                            @if($list_item->bank_pay_code)
                                <li class="list-group-item"><b>付款码：</b>{{ $list_item->bank_pay_code }}</li>
                            @endif
                            @if($list_item->address)
                                <li class="list-group-item"><b>数字币地址：</b>{{ $list_item->address }}</li>
                            @endif
                            @if($list_item->address)
                                <li class="list-group-item"><b>数字币数量：</b>{{ $list_item->address_amount }}；<b>数字币汇率：</b>{{ $list_item->address_rate }}</li>
                            @endif
                            @if($list_item->bank_trade_no)
                                <li class="list-group-item"><b>第三方单号：</b>{{ $list_item->bank_trade_no }}</li>
                            @endif
                            @if($list_item->bank_log_sn)
                                <li class="list-group-item"><b>银行流水号：</b><a href="{!! Helper::url('BankLog/index', ['sn' => $list_item->bank_log_sn]) !!}" target="orderquery">{{ $list_item->bank_log_sn }}</a></li>
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
                            @if($list_item->admin_log)
                                <li class="list-group-item">
                                    <div><b>操作记录：</b></div>
                                    @foreach($list_item->admin_log as $log)
                                        <div>操作时间：{{ Time::toDate($log['time']) }}；管理员：{{ $log['admin'] }}；操作类型：{{ Lang::get('admin.order.operation.' . $log['type']) }}@if($log['remark'])；备注：{{ $log['remark'] }}@endif</div>
                                    @endforeach
                                </li>
                            @endif
                        </ul>
                    </td>
                    <td colspan="5"></td>
                </details>
                <columns>
                    <column width="180" align="left" halign="left" code="sn" label="%admin.order.sn"></column>
                    <column code="trade_no" minwidth="200" align="left" halign="left" label="%admin.order.trade_no"></column>
                    <column width="120" code="agent_name" label="%admin.agent_business"></column>
                    <column width="80" code="money" order="0" sort="desc" label="%admin.order.money"></column>
                    <column width="80" code="pay_money" label="%admin.order.pay_money"></column>
                    <!--<column width="60" code="create_fee" label="%admin.order.create_fee"></column>-->
                    <column width="60" code="service_fee" label="%admin.order.service_fee"></column>
                    <column width="100" code="payment_name" label="支付方式">
                        {{ $list_item->payment_name }}
                        @if((int)$list_item->to_channel_id > 0)<big style="color:red;">转</big><br>{{ $payments[$list_item->to_channel_id]['name']}}@endif
                    </column>
                    <column code="pay_time" type="time" order="0" sort="desc" label="%admin.order.pay_time" width="130"></column>
                    <column code="create_time" type="time" order="1" sort="desc" label="%admin.create_time" width="130"></column>
                    <column width="50" code="status" type="badge" badge-css=",danger,dark,success" badge-label="admin.order.status_str" badge-add="2" label="%admin.order.status"></column>
                    <column width="50" code="finish_status" type="badge" badge-css=",dark,success" badge-label="admin.order.finish_status_arr" badge-show="status" label="%admin.order.finish_status"></column>
                    <column width="50" code="notify_status" type="badge" badge-css=",danger,dark,success" badge-label="admin.order.notify_status_str" badge-add="2" badge-show="status" label="%admin.order.notify_status"></column>
                    <actions width="60">
                        @if($list_item->status == 1)
                            <action label="%admin.order.send_notify">
                                <attrs>
                                    <click>sendNotify(this, {{ $list_item->id }}, '{{ $list_item->sn }}', {{ $list_item->money }}, {{ $list_item->pay_money }})</click>
                                </attrs>
                            </action>

                            @if($list_item->finish_status != 2)
                                <action label="%admin.order.send_finish" css="text-success">
                                    <attrs>
                                        <click>sendFinish(this, {{ $list_item->id }}, '{{ $list_item->sn }}')</click>
                                    </attrs>
                                </action>
                            @endif
                        @else
                            <action label="%admin.order.edit_pay">
                                <attrs>
                                    <click>pay(this, {{ $list_item->id }}, '{{ $list_item->sn }}', '{{ $list_item->bank_trade_no }}', {{ $list_item->money }}, {{ $list_item->getPaymentIsExternal() }}, '{!! $list_item->getPaymentExternalUrl() !!}', {{ $list_item->bank_receive_id }},'{{ $list_item->address }}')</click>
                                </attrs>
                            </action>
                        @endif
                    </actions>
                </columns>
            </table>
        </content>
    </tpl:list>
    <script type="text/tpl" id="pay_tpl">
		<form class="form-horizontal" id="payForm">
		    @{{? it.is_external == 1 }}
            <div class="form-group row">
                <label class="col-md-4 form-control-label" style="flex: 0 0 143px;">第三方单号: </label>
                <div class="col-md-8">
                    <input type="text" class="form-control" value="@{{=it.trade_no }}" disabled />
                    <small class="form-text text-info"><a href="@{{=it.external_url }}" target="orderquery">点击进入第三方查询</a></small>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-md-4 form-control-label" style="flex: 0 0 143px;">支付金额<span class="required text-danger">*</span>: </label>
                <div class="col-md-8">
                    <input type="text" class="form-control" id="payMoney" name="pay_money" value="@{{=it.money }}" />
                </div>
            </div>
            <div class="form-group row">
                <label class="col-md-4 form-control-label" style="flex: 0 0 143px;">支付时间<span class="required text-danger">*</span>: </label>
                <div class="col-md-8">
                    <input type="text" class="form-control" id="payTime" name="pay_time" value="{{ Tpl::time(UTC_TIME) }}" />
                </div>
            </div>
            @{{?? it.address == '' }}
            <div class="form-group row">
                <label class="col-md-4 form-control-label" style="flex: 0 0 143px;">银行流水号<span class="required text-danger">*</span>: </label>
                <div class="col-md-8">
                    <input type="text" class="form-control" id="bankLogSn" name="bank_log_sn" value="" />
                    <small class="form-text text-info"><a href="{!! Helper::url('BankLog/index') !!}?bank=@{{=it.bank_id }}&deposit=@{{=it.money }}" target="orderquery">点击查询银行记录</a></small>
                </div>
            </div>
            @{{?}}
            @{{? it.address != '' }}
            <div class="form-group row">
                <label class="col-md-4 form-control-label" style="flex: 0 0 143px;">交易hash<span class="required text-danger">*</span>: </label>
                <div class="col-md-8">
                    <input type="text" class="form-control" id="hash" name="hash" />
                    <small class="form-text text-info"><a href="https://etherscan.io/address/@{{=it.address }}#tokentxns" target="_blank">点击查询</a></small>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-md-4 form-control-label" style="flex: 0 0 143px;">付款地址<span class="required text-danger">*</span>: </label>
                <div class="col-md-8">
                    <input type="text" class="form-control" id="from_address" name="from_address"  />
                </div>
            </div>
            @{{?}}
            <div class="form-group row" style="margin-bottom:0;">
                <label class="col-md-4 form-control-label" style="flex: 0 0 143px;">测试订单: </label>
                <div class="col-md-8">
                    <tpl:radio name="is_test" css="is-test-radio" options="$is_search" default="1"></tpl:radio>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-md-4 form-control-label" style="flex: 0 0 143px;"></label>
                <div class="col-md-8 text-danger" style="font-size: 12px">如要选择是，订单金额将不会结算到商户余额</div>
            </div>
            <div class="form-group row">
                <label class="col-md-4 form-control-label" style="flex: 0 0 143px;">备注<span class="required text-danger">*</span>: </label>
                <div class="col-md-8">
                    <textarea id="payRemark" name="remark" class="form-control"></textarea>
                </div>
            </div>
            @tpl_include('default._layouts.verify_min', ['action' => 'orderpay', 'width' => 143])
            <input type="hidden" name="sn" value="@{{=it.sn }}" />
        </form>
        </script>
    @tpl_end
@stop

@section('footer')
    <script type="text/javascript">
        jQuery(function($){
            $("#agent").keyup(function () {
                var val = $.trim($(this).val());

                if (val != "") {
                    $("#showChildOrder").show();
                } else {
                    $("#showChildOrder").hide();
                }
            });
        });

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

        function sendFinish(btn, id, sn) {
            var td = $(btn).parent();
            $(btn).hide();
            $(btn).after('<i class="fa fa-spinner fa-pulse send-finish"></i>');

            $.ajaxPost("{{ Helper::url('Order/finish') }}", {"sn":sn}, (result) => {
                $(btn).show();
                td.find('.send-finish').remove();
                if (result.status) {
                    $.updateListRow(id, result.data, true);
                    $.showSuccess("{{Lang::get('common.handler_success')}}", 300, null, 2000);
                } else {
                    $.showTooltip($(btn), result.msg, null, 'top', 3000, 'danger');
                }
            }, () => {
                $(btn).show();
                td.find('.send-finish').remove();
                $.showTooltip($(btn), "{{Lang::get('common.handler_error')}}", null, 'top', 2000, 'danger');
            });
        }

        function pay(btn, id, sn, trade_no, money, is_external, external_url, bank_id,address) {
            var html = $.template($("#pay_tpl").html(), {
                "sn":sn, "trade_no":trade_no, "money":money, "is_external":is_external, "external_url":external_url, "bank_id":bank_id,"address":address
            });

            $.showConfirm(html, function(hiddenFunc){
                var form = $("#payForm");
                var isTest = $('.is-test-radio:checked').val();
                if (is_external == 1) {
                    var payMoney = parseFloat($('#payMoney').val());
                    if (isTest == 1 && (isNaN(payMoney) || payMoney <= 0)) {
                        $.showTooltip($('#payMoney'), "{{Lang::get('common.order.pay_money_required')}}", null, 'right', 3000, 'danger');
                        return false;
                    }

                    var payTime = $.trim($('#payTime').val());
                    if (payTime == '') {
                        $.showTooltip($('#payTime'), "{{Lang::get('common.order.pay_time_required')}}", null, 'right', 3000, 'danger');
                        return false;
                    }
                } else if(address == '') {
                    var bankLogSn = $.trim($('#bankLogSn').val());
                    if (isTest == 1 && bankLogSn == '') {
                        $.showTooltip($('#bankLogSn'), "{{Lang::get('common.order.bank_log_sn_required')}}", null, 'right', 3000, 'danger');
                        return false;
                    }
                }

                var payRemark = $.trim($('#payRemark').val());
                if (payRemark == '') {
                    $.showTooltip($('#payRemark'), "{{Lang::get('common.remark_required')}}", null, 'right', 3000, 'danger');
                    return false;
                }

                var ladda = Ladda.create(this);
                ladda.start();

                $.ajaxPost("{{ Helper::url('Order/update') }}", form.serialize(), (result) => {
                    ladda.stop();
                    if (result.status) {
                        hiddenFunc();
                        $.updateListRow(id, result.data, true);
                        $.showSuccess("{{Lang::get('common.handler_success')}}", 300, null, 2000);
                    } else {
                        if (result.data.field != '') {
                            $.showTooltip($("[name='" + result.data.field + "']", form), result.msg, null, 'right', 3000, 'danger');
                        } else {
                            $.showTooltip($(this), result.msg, null, 'right', 3000, 'danger');
                        }
                    }
                }, () => {
                    ladda.stop();
                    $.showTooltip($(this), "{{Lang::get('common.handler_error')}}", null, 'right', 2000, 'danger');
                });
            }, null, function () {
                $("#payTime").datetimepicker({
                    format: 'yyyy-mm-dd hh:ii:ss',
                    language:'zh-CN',
                    autoclose: true,
                    todayBtn: true,
                    showSecond:1,
                    minView: 0,
                    minuteStep: 1
                });
            }, null, 500, "{{ Lang::get('admin.order.edit_pay') }}");
        }
    </script>
@stop