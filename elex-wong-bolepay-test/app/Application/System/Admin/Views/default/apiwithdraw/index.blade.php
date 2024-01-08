@extends('default._layouts.base')
@section('body')
    @tpl_begin
	<php>
		$withdraw_status = Lang::get('admin.api_withdraw.status'); 
	</php>
    <tpl:list css="min-list">
        <search>
            <row>
                <item name="sn" label="%admin.order.sn"></item>
                <item name="trade_no" label="%admin.order.trade_no"></item>
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
                <item label="%admin.create_time">
                    <tpl:daterange data="$_search_args" date_css="datetime" begin_name="begin_time" end_name="end_time"></tpl:daterange>
                </item>
				
            </row>
            <row>
                
                <php>
                    $status_str = Lang::get('admin.order.status_str');
                </php>
                <item label="%admin.status">
                    <tpl:select name="status" options="$status_str" first="%admin.all" firstvalue="0" selected="$_search_args['status']"></tpl:select>
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
                代付总额：<b>￥{{ Tpl::money($statistic['total_money'] / 100) }}</b>，
                代付成功总额：<b>￥{{ Tpl::money($statistic['total_pay_money'] / 100) }}</b>，
                平台服务费：<b>￥{{ Tpl::money(($statistic['total_service_fee'] - $statistic['total_proxy_fee']) / 100) }}</b>，
                代理佣金：<b>￥{{ Tpl::money($statistic['total_proxy_fee'] / 100) }}</b>，
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
                    <td class="text-left text-break td-detail-show" colspan="9">
                        <ul class="list-group list-group-dividered list-group-flush">
                            <li class="list-group-item"><b>收款信息：</b>@if(!empty($list_item['bank_name'])) {{ $list_item['bank_name'] }} @endif {{ $list_item['payee']}}  {{$list_item['bank_no']}}</li>
                            <li class="list-group-item"><b>通知地址：</b>{{ $list_item->notify_url }}</li>
                            @if($list_item->notify_time > 0)
                                <li class="list-group-item"><b>通知时间：</b>{{ Tpl::time($list_item->notify_time) }}</li>
                            @endif
                            <li class="list-group-item"><b>客户端IP：</b>{{ $list_item->client_ip }}；<b>服务器IP：</b>{{ $list_item->server_ip }}</li>
                            @if($list_item->admin_log)
                                <li class="list-group-item">
									<div><b>操作记录：</b></div>
									@foreach($list_item->admin_log as $log)
										<div>操作时间：{{ Time::toDate($log['time']) }}；管理员：{{ $log['admin'] }}；更新状态：{{ Lang::get('admin.withdraw.status.' . ($log['status'] + 2)) }}；备注：{{ $log['remark'] }}</div>
									@endforeach
								</li>
							@elseif(!empty($list_item['remark']))
								<li class="list-group-item">备注：{{ $list_item->remark }}</li>
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
                    
                    <column width="60" code="service_fee" label="%admin.withdraw.service_fee"></column>
					<column width="60" label="收款信息">
					@if(!empty($list_item['bank_name'])) {{ $list_item['bank_name'] }} @endif {{ $list_item['payee'] . '(' . $list_item['bank_no'].')'}}
					</column>
                    <column code="payment_name" label="代付渠道" width="80"></column>
                    <column code="update_time" label="%admin.order.pay_time" width="130">
						@if($list_item['status'] == 1){{ Time::toDate($list_item['update_time']) }}@endif
					</column>
                    <column code="create_time" type="time" order="1" sort="desc" label="%admin.create_time" width="130"></column>
                    <column width="50" code="status" type="badge" badge-css=",danger,dark,success" badge-label="admin.order.status_str" badge-add="2" label="%admin.order.status"></column>
                    <column width="50" code="notify_status" type="badge" badge-css=",danger,dark,success" badge-label="admin.order.notify_status_str" badge-add="2" badge-show="status" label="%admin.order.notify_status"></column>
                    <actions width="60">
                        @if($list_item->status == 1)
                            <action label="%admin.order.send_notify">
                                <attrs>
                                    <click>sendNotify(this, {{ $list_item->id }}, '{{ $list_item->sn }}')</click>
                                </attrs>
                            </action>
                        @elseif($list_item->status == 0)
                            <action label="处理">
                                <attrs>
                                    <click>withdrawEdit(this, {{ $list_item->id }})</click>
                                </attrs>
                            </action>
                        @endif
                    </actions>
                </columns>
            </table>
        </content>
    </tpl:list>
<script type="text/tpl" id="withdraw_tpl">
		<form class="form-horizontal" id="withdrawForm">
			<div class="form-group row">
				<label class="col-md-4 form-control-label" style="flex: 0 0 143px;">状态: </label>
				<div class="col-md-8">
					<select id="withdrawStatus" name="status" style="margin-bottom: 15px;" class="form-control">
					@foreach($withdraw_status as $key => $val)
			<option value="{{$key}}">{{$val}}</option>
		@endforeach
		</select>
    </div>
</div>
<div class="form-group row">
    <label class="col-md-4 form-control-label" style="flex: 0 0 143px;">备注<span class="required text-danger">*</span>: </label>
    <div class="col-md-8">
        <textarea id="withdrawRemark" name="remark" class="form-control" rows="1"></textarea>
    </div>
</div>
@tpl_include('default._layouts.verify_min', ['action' => 'apiwithdrawupdate', 'width' => 143])
<input type="hidden" name="id" value="@{{=it.id }}" />
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

        function sendNotify(btn, id, sn) {
			var td = $(btn).parent();
			$(btn).hide();
			$(btn).after('<i class="fa fa-spinner fa-pulse send-notify"></i>');

			$.ajaxPost("{{ Helper::url('ApiWithdraw/notify') }}", {"sn":sn}, (result) => {
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
        }

        function withdrawEdit(btn, id) {
			var html = $.template($("#withdraw_tpl").html(), {"id":id});

			$.showConfirm(html, function(hiddenFunc){
				var ladda = Ladda.create(this);
				ladda.start();

				var form = $("#withdrawForm");

				$.ajaxPost("{{ Helper::url('ApiWithdraw/update') }}", form.serialize(), (result) => {
					ladda.stop();
					if (result.status) {
						hiddenFunc();
						$.updateListRow(id, result.data);
						$.showSuccess("{{Lang::get('common.handler_success')}}", 300, null, 2000);
					} else {
						if (result.data.field != '') {
							$.showTooltip($("[name='" + result.data.field + "']", form), result.msg, null, 'right', 3000, 'danger');
						} else {
							$.showTooltip($(this), result.msg, null, 'top', 3000, 'danger');
						}
					}
				}, () => {
					ladda.stop();
					$.showTooltip($(this), "{{Lang::get('common.handler_error')}}", null, 'top', 2000, 'danger');
				});
			}, null, null, null, 500, "{{ Lang::get('admin.withdraw.edit_title') }}");
		}
    </script>
@stop