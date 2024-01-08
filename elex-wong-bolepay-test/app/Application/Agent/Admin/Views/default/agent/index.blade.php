@extends('default._layouts.base')
@section('body')
	@include('default.agent.menu')
	@tpl_begin
	<div class="panel">
		<div class="panel-body container-fluid">
			<table class="table table-bordered table-th-bg">
				<tr>
					<th width="160">登陆帐号</th>
					<td>{{ $data['name'] }}</td>
				</tr>
				<tr>
					<th>可提现金额</th>
					<td>{{ $data['money'] }}</td>
				</tr>
				<tr>
					<th>冻结金额</th>
					<td>{{ $data['frozen_money'] }}</td>
				</tr>
				<tr>
					<th>已提现金额</th>
					<td>{{ $data['withdraw_money'] }}</td>
				</tr>
				<tr>
					<th>邮箱</th>
					<td>{{ $data['email'] }}</td>
				</tr>
				<tr>
					<th>手机</th>
					<td>{{ $data['mobile'] }}</td>
				</tr>
				<tr>
					<th>联系QQ</th>
					<td>{{ $data['qq'] }}</td>
				</tr>
				<tr>
					<th>最近登陆</th>
					<td>{{ Time::toDate($data['login_time']) }}</td>
				</tr>
				<tr>
					<th>注册时间</th>
					<td>{{ Time::toDate($data['create_time']) }}</td>
				</tr>
			</table>
		</div>
	</div>
	@tpl_end
@stop