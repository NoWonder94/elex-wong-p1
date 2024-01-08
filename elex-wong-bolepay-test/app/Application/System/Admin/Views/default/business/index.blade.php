@extends('default._layouts.base')
@section('body')
	@tpl_begin
	<tpl:list css="min-list">
		<search>
			<row>
				<item name="name" label="%admin.agent.name"></item>
				<item name="mobile" label="%admin.mobile"></item>
				<item name="email" label="%admin.email"></item>
				<btn type="search"></btn>
			</row>
		</search>
		<content>
			<btns>
				<linkbtn type="add"></linkbtn>
			</btns>
			<table plugin="datatable">
				<columns>
					<column code="name" align="left" halign="left" label="%admin.agent.name"></column>
					<column code="real_name" align="left" halign="left" label="%admin.agent.real_name"></column>
					<column code="parent" align="left" halign="left" label="%admin.agent.parent">
						{{ $list_item->parent->name }}
					</column>
					<column auth="contact" align="left" halign="left" code="email" label="%admin.email"></column>
					<column auth="contact" width="100" code="mobile" label="%admin.mobile"></column>
					<column auth="contact" code="qq" label="%admin.qq"></column>
					<column width="80" code="money" order="0" sort="desc" label="%admin.agent.money"></column>
					<column width="80" code="frozen_money" order="0" sort="desc" label="%admin.agent.frozen_money"></column>
					<column width="90" code="withdraw_money" order="0" sort="desc" label="%admin.agent.withdraw_money"></column>
					<column width="60" code="finish_type" label="%admin.agent.finish_type">
						{{ Lang::get('admin.agent.finish_types.' . $list_item['finish_type']) }}
					</column>
					<column code="create_time" type="time" order="1" sort="desc" label="%admin.create_time" width="120"></column>
					<column code="status" type="status" label="%admin.status" width="60"></column>
					<actions width="120">
						<action type="edit"></action>
						<action label="%admin.agent.money_modify" auth="money" click="moneyModify(this, {{ $list_item['id'] }}, {{ $list_item['money'] }})"></action>
						<action label="代付" css="text-danger">
							<attrs>
								<url>{{ Helper::url('Withdraw/add', ['agent_id' => $list_item['id']]) }}</url>
							</attrs>
						</action>
					</actions>
				</columns>
			</table>
		</content>
	</tpl:list>
	@tpl_include('default.agent.money')
	@tpl_end
@stop