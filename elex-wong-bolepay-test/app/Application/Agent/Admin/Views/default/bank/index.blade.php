@extends('default._layouts.base')
@section('body')
	@tpl_begin
	<tpl:list>
		<search>
			<row>
				<item name="bank_no" label="%admin.bank.bank_no"></item>
				<item label="%admin.status">
					<tpl:select name="status" options="$status_search" first="%admin.all" firstval="0" selected="$_search_args['status']"></tpl:select>
				</item>
				<btn type="search"></btn>
			</row>
		</search>
		<content>
			<btns>
				<linkbtn type="add"></linkbtn>
			</btns>
			<table>
				<columns>
					<column code="bank" width="138" label="%admin.bank.bank"></column>
					<column code="bank_no" width="200"  label="%admin.bank.no_address"></column>
					<column code="payee" width="80" label="%admin.bank.payee"></column>
					<column code="bank_address" width="200" align="left" halign="left" label="%admin.bank.bank_address"></column>
					<column code="create_time" width="155" type="time" label="%admin.create_time"></column>
					<column code="status" type="toggle" align="left" halign="left" label="%admin.status" minwidth="80"></column>
				</columns>
			</table>
		</content>
	</tpl:list>
	@tpl_end
@stop