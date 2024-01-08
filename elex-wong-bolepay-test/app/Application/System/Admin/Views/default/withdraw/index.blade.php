@extends('default._layouts.base')
@section('body')
	@tpl_begin
	<php>
		$withdraw_status = Lang::get('admin.withdraw.status');
	</php>
	<tpl:list css="min-list">
		<search>
			<row>
				<item name="sn" label="%admin.sn"></item>
				<item name="agent" label="%admin.agent_business" style="width:120px"></item>
				<item label="%admin.status">
					<tpl:select name="status" options="$withdraw_status" first="%admin.all" firstval="0" selected="$_search_args['status']"></tpl:select>
				</item>
				<item label="%admin.create_time">
					<tpl:daterange data="$_search_args" date_css="datetime" begin_name="begin_time" end_name="end_time"></tpl:daterange>
				</item>
				<btn type="search"></btn>
			</row>
		</search>
		<content>
			<table plugin="datatable">
				<details>
					<td colspan="11" class="text-left text-break td-detail-show">
						<ul class="list-group list-group-dividered list-group-flush">
							<li class="list-group-item">{{ $list_item->bank->getInfo() }}</li>
							@if($list_item->payment_platforms)
								<li class="list-group-item">渠道支付：
									@foreach($list_item->payment_platforms as $payment_platform)
										{{ $platform_names[$payment_platform['code']] }}:￥{{ (float)($payment_platform['money'] / 100) }}；
									@endforeach
								</li>
							@endif
							@if($list_item->admin_log)
								<li class="list-group-item">
									<div><b>操作记录：</b></div>
									@foreach($list_item->admin_log as $log)
										<div>操作时间：{{ Time::toDate($log['time']) }}；管理员：{{ $log['admin'] }}；更新状态：{{ Lang::get('admin.withdraw.status.' . ($log['status'] + 2)) }}；备注：{{ $log['remark'] }}</div>
									@endforeach
								</li>
							@else
								<li class="list-group-item">
									<div>备注：{{ $list_item->remark }}</div>
								</li>
							@endif
						</ul>
					</td>
				</details>
				<columns>
					<column width="160" code="sn" label="%admin.sn"></column>
					<column width="106" code="agent" label="%admin.agent_business">
						{{ $list_item->agent->name }}
					</column>
					<column width="80" code="money" order="0" sort="desc" label="%admin.withdraw.money"></column>
					<column width="80" code="really_money" label="%admin.withdraw.really_money">
						@if($list_item->really_money > 0) {{ $list_item->really_money }} @endif
					</column>
					<column width="80" code="service_fee" label="%admin.withdraw.service_fee"></column>
					<column code="bank" align="left" halign="left" label="%admin.withdraw.bank">
						{{ $list_item->bank->short_name }}
					</column>
					<column width="120" code="create_time" type="time" order="1" sort="desc" label="%admin.create_time"></column>
					<column width="50" code="status" type="badge" badge-css=",danger,dark,info,success" badge-label="admin.withdraw.status" badge-add="2" label="%admin.status"></column>
					<column width="120" code="operation_time" type="time" label="%admin.withdraw.operation_time"></column>
					<column width="30" code="platform_code" label="已转三方">
						@if(!empty($list_item->platform_code))
							{{$platform_names[$list_item->platform_code]}}
						@else
							无
						@endif
					</column>
					<actions width="120">
						@if($list_item['status'] == 0 || $list_item['status'] == 1)
							<action label="%admin.withdraw.edit">
								<attrs>
									<click>withdrawEdit(this, {{ $list_item->id }}, {{ $list_item->money }}, {{ $list_item->service_fee_type }}, {{ $list_item->status }}, {{ $list_item->agent->money }}, {{ $list_item->service_fee }}, '{{ $list_item['platform_code'] }}')</click>
								</attrs>
							</action>
							@if(empty($list_item['platform_code']))
								<action label="转至三方">
									<attrs>
										<click>gotoThree(this, {{ $list_item->id }}, {{ $list_item->money }}, {{ $list_item->service_fee_type }}, {{ $list_item->agent->money }})</click>
									</attrs>
								</action>
							@endif
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
			@if($key != 2)
				@if($key == 3)
					@{{? it.status == 0 }}
                    <option value="{{$key}}">{{$val}}</option>
						@{{?}}
						@else
					<option value="{{$key}}">{{$val}}</option>
						@endif
			@endif
		@endforeach
		</select>
    </div>
</div>
<div class="form-group row withdraw-success-row" style="display:none">
    <label class="col-md-4 form-control-label" style="flex: 0 0 143px;">实付金额<span class="required text-danger">*</span>: </label>
    <div class="col-md-8">
        <input type="text" class="form-control" id="reallyMoney" name="really_money" value="@{{=it.money }}" readonly />
    </div>
</div>
<div class="form-group row withdraw-success-row" style="display:none">
    <label class="col-md-4 form-control-label" style="flex: 0 0 143px;"></label>
    <div class="col-md-8 text-danger" style="font-size: 12px">
        @{{? it.fee_type == 1 }}
        从代付金额扣除手续费
        @{{??}}
        从代理余额扣除手续费，当前余额：￥@{{=it.agent_money }}
        @{{?}}
    </div>
</div>
<div class="form-group row withdraw-success-row" style="display:none">
    <label class="col-md-4 form-control-label" style="flex: 0 0 143px;">手续费<span class="required text-danger">*</span>: </label>
    <div class="col-md-8">
        <input type="text" class="form-control" id="serviceFee" name="service_fee" value="@{{=it.service_fee }}" />
    </div>
</div>
<div class="form-group row withdraw-success-row" style="display:none">
    <label class="col-md-4 form-control-label" style="flex: 0 0 143px;">渠道支付: </label>
    <div class="col-md-8 min-list">
        <table class="table table-bordered table-th-bg table-vmiddle" style="width: auto; text-align: center; font-size:12px;">
            <thead>
                <th style="text-align:left;">渠道</th>
                <th style="width:70px;">余额</th>
                <th style="width:100px;">支付</th>
            </thead>
            <tbody id="platformsBody">
                <tr>
                    <td colspan="3">
                        正在加载中...
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
<div class="form-group row">
    <label class="col-md-4 form-control-label" style="flex: 0 0 143px;">备注<span class="required text-danger">*</span>: </label>
    <div class="col-md-8">
        <textarea id="withdrawRemark" name="remark" class="form-control" rows="1"></textarea>
    </div>
</div>
@tpl_include('default._layouts.verify_min', ['action' => 'withdrawupdate', 'width' => 143])
<input type="hidden" name="id" value="@{{=it.id }}" />
</form>
</script>
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
	<script type="text/tpl" id="three_tpl">
		<form class="form-horizontal" id="platformForm">
			<div class="form-group row">
				<label class="col-md-4 form-control-label" style="flex: 0 0 143px;">选择渠道: </label>
				<div class="col-md-8">
					<select id="platform" name="code" style="margin-bottom: 15px;" class="form-control">
						@{{~it.data :item:index}}
							<option value="@{{=item.code}}">@{{=item.name}}</option>
						@{{~}}
					</select>
				</div>
			</div>
			<div class="form-group row">
				<label class="col-md-4 form-control-label" style="flex: 0 0 143px;">实付金额<span class="required text-danger">*</span>: </label>
				<div class="col-md-8">
					<input type="text" class="form-control" id="reallyMoney" name="really_money" value="@{{=it.money }}" readonly />
				</div>
			</div>
            <div class="form-group row">
                <label class="col-md-4 form-control-label" style="flex: 0 0 143px;"></label>
                <div class="col-md-8 text-danger" style="font-size: 12px">
                    @{{? it.fee_type == 1 }}
                    从代付金额扣除手续费
                    @{{??}}
                    从代理余额扣除手续费，当前余额：￥@{{=it.agent_money }}
                    @{{?}}
                </div>
            </div>
            <div class="form-group row">
                <label class="col-md-4 form-control-label" style="flex: 0 0 143px;">手续费<span class="required text-danger">*</span>: </label>
                <div class="col-md-8">
                    <input type="text" class="form-control" id="serviceFee" name="service_fee" value="3" />
                </div>
            </div>
			<input type="hidden" name="id" value="@{{=it.id }}" />
		</form>
	</script>
	@tpl_end
@stop

@section('footer')
	<script type="text/javascript">
		function gotoThree(btn, id, money, fee_type, agent_money){
			$.ajaxPost("{{ Helper::url('Withdraw/platforms') }}",{}, function(result){
				if(result.status == false){
					$.showError(result.msg);
				}else{
					var html = $.template($("#three_tpl").html(), {"id":id, "money":money, "fee_type":fee_type, "agent_money":agent_money,"data":result.data});
					$.showConfirm(html, function(hiddenFunc){
						var ladda = Ladda.create(this);
						ladda.start();

						var form = $("#platformForm");
						$.ajaxPost("{{ Helper::url('Withdraw/gotothree') }}",form.serialize(), (result) => {
							ladda.stop();
							if(result.status){
								hiddenFunc();
								$.showSuccess("{{Lang::get('common.handler_success')}}", 300, null, 2000);
							}else{
								$.showTooltip($(this), result.msg, null, 'top', 3000, 'danger');
							}
						}, () => {
							ladda.stop();
							$.showTooltip($(this), "{{Lang::get('common.handler_error')}}", null, 'top', 2000, 'danger');
						} , "json");
					}, null, function(){
						$("#serviceFee").change(function () {
							if (fee_type == 1) {
								var serviceFee = parseInt($("#serviceFee").val());
								$("#reallyMoney").val(money - serviceFee);
							}
						}).trigger("change");
					},null, 500, "转至三方");
				}
			}, null, "json");
		}
		function withdrawEdit(btn, id, money, fee_type, status, agent_money, service_fee, platform_code) {
			if (service_fee == 0) {
				service_fee = 3;
			}

			var html = $.template($("#withdraw_tpl").html(), {
				"id":id, "money":money, "fee_type":fee_type, "status":status, "agent_money":agent_money, "service_fee":service_fee
			});

			function getPaymentPlatforms() {
				var withdrawMoney = parseInt($("#reallyMoney").val());
				var serviceFee = parseInt($("#serviceFee").val());
				$.ajaxPost("{{ Helper::url('PaymentPlatform/withdraw') }}", {"code":platform_code, "money":withdrawMoney + serviceFee}, (result) => {
					var html = $.template($("#platform_tpl").html(), result.data);
					$('#platformsBody').html(html);
				});
			}

			$.showConfirm(html, function(hiddenFunc){
				var ladda = Ladda.create(this);
				ladda.start();

				var form = $("#withdrawForm");

				$.ajaxPost("{{ Helper::url('Withdraw/update') }}", form.serialize(), (result) => {
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
			}, null, function () {
				$("#serviceFee").change(function () {
					if (fee_type == 1) {
						var serviceFee = parseInt($("#serviceFee").val());
						$("#reallyMoney").val(money - serviceFee);
					}
					getPaymentPlatforms();
				}).trigger("change");

				$("#withdrawStatus").change(function () {
					if ($(this).val() == 4) {
						getPaymentPlatforms();
						$(".withdraw-success-row").show();
					} else {
						$(".withdraw-success-row").hide();
					}
				});
			}, null, 500, "{{ Lang::get('admin.withdraw.edit_title') }}");
		}
	</script>
@stop