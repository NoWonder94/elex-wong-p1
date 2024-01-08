@extends('default._layouts.base')
@section('body')
	@tpl_begin
	<tpl:list css="min-list">
		<search>
			<row>
				<item name="bank" label="%admin.bank.bank">
					<tpl:select name="bank" options="$banks" first="%admin.all" firstval="0" textfield="full_name" valuefield="id" selected="$_search_args['bank']"></tpl:select>
				</item>
				<item label="%admin.create_time">
					<tpl:daterange data="$_search_args" date_css="datetime" begin_name="begin_time" end_name="end_time"></tpl:daterange>
				</item>
				<php>
					$status_str = Lang::get('admin.withdraw.status');
				</php>
				<item label="%admin.status">
					<tpl:select name="status" options="$status_str" first="%admin.all" firstval="0" selected="$_search_args['status']"></tpl:select>
				</item>
				<btn type="search"></btn>
			</row>
		</search>
		<content>
			<btns>
				<linkbtn type="add"></linkbtn>
			</btns>
			<table plugin="datatable">
				<columns>
					<column width="180" code="sn" label="%admin.sn"></column>
					<column width="80" code="money" order="0" sort="desc" label="%admin.withdraw.money"></column>
					<column width="80" code="really_money" label="%admin.withdraw.really_money">
						@if($list_item->really_money > 0) {{ $list_item->really_money }} @endif
					</column>
					<column width="80" code="service_fee" label="%admin.withdraw.service_fee"></column>
					<column width="180" code="bank" align="left" label="%admin.withdraw.bank">
						{{ $list_item->bank->short_name }}
					</column>
					<column width="130" code="create_time" type="time" order="1" sort="desc" label="%admin.create_time"></column>
					<column width="60" code="status" type="badge" badge-css=",danger,dark,info,success" badge-label="admin.withdraw.status" badge-add="2" label="%admin.status"></column>
					<column width="130" code="operation_time" type="time" label="%admin.withdraw.operation_time"></column>
					<column code="remark" halign="left" align="left" label="%admin.remark" style="word-break:break-all; word-wrap:break-all;"></column>
				</columns>
			</table>
		</content>
	</tpl:list>
	@tpl_end
@stop