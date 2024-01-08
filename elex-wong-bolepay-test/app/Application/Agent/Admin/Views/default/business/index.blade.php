@extends('default._layouts.base')
@section('body')
	@tpl_begin
	<tpl:list>
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
			<table>
				<columns>
					<column width="150" align="left" halign="left" code="name" label="%admin.agent.name"></column>
					<column width="120" align="left" halign="left" code="real_name" label="%admin.agent.real_name"></column>
					<column width="120" auth="contact" code="mobile" label="%admin.mobile"></column>
					<column width="200" align="left" halign="left" auth="contact" code="email" label="%admin.email"></column>
					<column width="150" align="left" halign="left" auth="contact" code="qq" label="%admin.qq"></column>
					<column width="80" code="finish_type" label="%admin.agent.finish_type">
						{{ Lang::get('admin.agent.finish_types.' . $list_item['finish_type']) }}
					</column>
					<column code="create_time" type="time" label="%admin.create_time" width="150"></column>
					<column code="status" type="toggle" label="%admin.status" width="60"></column>
					<actions minwidth="69" align="left" halign="left">
						<action type="edit"></action>
					</actions>
				</columns>
			</table>
		</content>
	</tpl:list>
	@tpl_end
@stop