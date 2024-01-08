@extends('default._layouts.base')
@section('body')
	@tpl_begin
	<div class="nav-tabs-horizontal" data-plugin="tabs">
		<ul class="nav nav-tabs" role="tablist">
			<li class="nav-item" role="presentation">
				<a class="nav-link {{ $mode == 'receive' ? 'active' : '' }}" href="{{ Helper::url('Bank/index', ['mode'=>'receive']) }}">{{ Lang::get('admin.bank.receive_mode') }}</a>
			</li>
			<li class="nav-item" role="presentation">
				<a class="nav-link {{ $mode == 'pay' ? 'active' : '' }}" href="{{ Helper::url('Bank/index', ['mode'=>'pay']) }}">{{ Lang::get('admin.bank.pay_mode') }}</a>
			</li>
		</ul>
	</div>
	<tpl:list>
		<search>
			<row>
				<item name="card" label="%admin.bank.card"></item>
				<item label="%admin.bank.type">
					<tpl:select name="type" options="$types" first="%admin.all" firstval="0" selected="$_search_args['type']"></tpl:select>
				</item>
				<item label="%admin.status">
					<tpl:select name="status" options="$status_search" first="%admin.all" firstval="0" selected="$_search_args['status']"></tpl:select>
				</item>
				<item type="hidden" name="mode" val="$_search_args['mode']"></item>
				<btn type="search"></btn>
			</row>
		</search>
		<content>
			<btns>
				<linkbtn type="add">
					<attrs>
						<url>{{ Helper::url('Bank/add', ['mode'=>$mode]) }}</url>
					</attrs>
				</linkbtn>
				<linkbtn type="refresh" id="refreshBtn"></linkbtn>
			</btns>
			<panels>
				<div class="col-lg-4 col-md-6">
					<div class="panel panel-bordered" style="border:1px solid #e4eaec;">
						<div class="panel-heading">
							<h3 class="panel-title" style="font-size:16px;padding:15px;">
								[{{ $list_item['id'] }}] [{{ $types[$list_item['type']] }}] [{{ $list_item['name'] }}]
								<p style="margin:8px 0 0 0;">{{ $list_item['card'] }}</p>
							</h3>
							@if(Helper::checkAuth('edit'))
								<div class="panel-actions" style="right: 0;">
									<a class="panel-action icon wb-settings" href="{!! Helper::url('Bank/edit', ['id' => $list_item['id'], 'mode' => $list_item['mode']]) !!}" title="{{ Lang::get('admin.edit') }}"></a>
								</div>
							@endif
						</div>
						<php>
							$alert_css = '';
							switch($list_item['run_status']) {
								case 0://未运行
								case -1://关闭
									$alert_css = 'alert-danger';
									if ($list_item['status']) {
										$is_notification = true;
									}
								break;

								case 1://初始化中
									$alert_css = 'alert-warning';
								break;

								case 2://运行中
									$alert_css = 'alert-success';
								break;

								case 3://创建支付中
									$alert_css = 'alert-info';
								break;
							}
						</php>
						<div class="alert {{ $alert_css }} alert-dismissible" style="padding: 15px;" role="alert">
							{!! $list_item['run_msg'] !!}
						</div>
						<div class="panel-body" style="padding: 15px;">
							<div class="row">
								@if($list_item['server'])
									<div class="col-md-6" style="line-height:36px;">{{Lang::get('admin.bank.server_code')}}：{{ $list_item['server']['code'] }}</div>
									<div class="col-md-6" style="line-height:36px;">{{Lang::get('admin.bank.run_ip')}}：{{ $list_item['server']['run_ip'] }}</div>
								@else
									<div class="col-md-12">
										<select id="bank-server-{{ $list_item['id'] }}" class="form-control ">
											<option value="0">{{ Lang::get('admin.bank.select_server') }}</option>
											@foreach($servers as $server)
												@if(in_array($list_item['type'], $server['bank_type']))
												<option value="{{ $server['id'] }}">【{{ $server['code'] }}】{{ $server['run_ip'] }}</option>
												@endif
											@endforeach
										</select>
									</div>
								@endif
							</div>
						</div>
						@if(Helper::checkAuth('soft'))
						<php>
							$disabled = $list_item['status'] ? '' : 'disabled';
						</php>
						<div class="panel-footer" style="padding:0;">
							<div class="btn-group btn-group-justified">
								@if($list_item['server'])
									<div class="btn-group" role="group">
										<button onclick="softAction({{ $list_item['id'] }}, 'refresh')" type="button" {{ $disabled }} class="btn btn-warning" style="border-radius:0;">{{Lang::get('admin.bank.restart')}}</button>
									</div>
									<div class="btn-group" role="group">
										<button onclick="softAction({{ $list_item['id'] }}, 'close')" type="button" {{ $disabled }} class="btn btn-danger" style="border-radius:0;">{{Lang::get('admin.bank.close')}}</button>
									</div>
								@else
									<div class="btn-group" role="group">
										<button onclick="softStart({{ $list_item['id'] }})" type="button" {{ $disabled }} class="btn btn-primary" style="border-radius:0;">{{Lang::get('admin.bank.start')}}</button>
									</div>
								@endif
							</div>
						</div>
						@endif
					</div>
				</div>
			</panels>
		</content>
	</tpl:list>
	@tpl_end
@stop

@section('footer')
	<script type="text/javascript">
		var isStop = false;
		function showNotification() {
			@if($is_notification)
			var notif = new Notification("{!! Lang::get('admin.bank.error_tip') !!}", {
						"icon": "",
						"body": "{!! Lang::get('admin.bank.bank_error') !!}"
					});
			notif.onclick = function() {
				location.href = "{!! Helper::url('Bank/index') !!}";
			};
			@endif
		}

		function softAction(id, action) {
			isStop = true;
			$.showModel("操作提示", "请在处理中，请稍候...");
			setTimeout(function(){
				location.href = "{!! Helper::url('Bank/soft') !!}?id=" + id + "&action=" + action;
			}, 1000);
		}

		function softStart(id) {
			var serverId = $("#bank-server-" + id).val();
			if (serverId < 1) {
				$.showError("{{Lang::get('admin.bank.select_server_tip')}}");
				return;
			}
			$.showModel("操作提示", "请在处理中，请稍候...");
			isStop = true;
			setTimeout(function(){
				location.href = "{!! Helper::url('Bank/soft') !!}?id=" + id + "&action=refresh&server_id=" + serverId;
			}, 1000);
		}

		/*if(window.Notification){
            if(Notification.permission !== 'granted') {
                Notification.requestPermission(function(permission){
                    if (permission === "granted") {
                        //showNotification();
                    }
                });
            } else {
                //showNotification();
            }
        } else {
            alert("{!! Lang::get('admin.bank.notification_tip') !!}");
		}*/

		jQuery(function($){
			var time = 10;
			var text = $('#refreshBtn').text();
			setInterval(function(){
				if (isStop) {
					return;
				}

				if (time < 1) {
					location.reload(true);
					return;
				}
				$('#refreshBtn').text(text + '(' + time + ')');
				time--;
			}, 1000);
		});
	</script>
@stop