@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:form>
        <tpl:fitem label="%admin.withdraw.bank">
            <tpl:select name="bank_id" options="$banks" textfield="full_name" valuefield="id"></tpl:select>
        </tpl:fitem>
		@if($_agent_type == 1)
        <tpl:fitem name="money" label="%admin.withdraw.money" required="true">
            <attrs>
                <attr>data-min="1000" data-max="49990" data-step="10000" data-plugin="asSpinner"</attr>
                <tip>{{ Lang::format('admin.withdraw.agent_money_tip', $max_money) }}</tip>
            </attrs>
        </tpl:fitem>
		@else
			<tpl:fitem name="money" label="%admin.withdraw.money" required="true">
            <attrs>
                <attr>data-min="25000" data-max="49990" data-step="10000" data-plugin="asSpinner"</attr>
                <tip>{{ Lang::format('admin.withdraw.money_tip', $max_money) }}</tip>
            </attrs>
        </tpl:fitem>
		@endif
        <tpl:fitem label="%admin.withdraw.service_fee_type">
            <tpl:radio name="service_fee_type" options="$service_fee_types" default="2"></tpl:radio>
        </tpl:fitem>
        @tpl_include('default._layouts.verify', ['action' => 'withdrawadd'])
    </tpl:form>
    @tpl_end
@stop