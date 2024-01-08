@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:list css="min-list">
        <search>
            <row>
                <item name="sn" label="%admin.sn" style="width:158px;"></item>
                <item name="trade_no" label="%admin.bank_log.trade_no" style="width:158px;"></item>
                <item name="payer" label="%admin.bank_log.payer" style="width:100px;"></item>
                <item name="deposit" label="%admin.bank_log.deposit" style="width:100px;"></item>
            </row>
            <row>
                <item label="%admin.order.bank">
                    <tpl:select name="bank" options="$banks" style="width:160px;" first="%admin.all" valuefield="id" textfield="short_name" firstval="0" selected="$_search_args['bank']"></tpl:select>
                </item>
                <item label="%admin.bank_log.status">
                    <tpl:select name="status" options="$status_list" first="%admin.all" firstvalue="" selected="$_search_args['status']"></tpl:select>
                </item>
                <item label="%admin.bank_log.pay_time">
                    <tpl:daterange data="$_search_args" begin_name="begin_time" end_name="end_time"></tpl:daterange>
                </item>
                <btn type="search"></btn>
            </row>
        </search>
        <content>
            <div class="alert alert-alt alert-primary alert-dismissible" role="alert">
                {{ Lang::get('admin.bank_log.total_deposit') }}：<b>￥{{ Tpl::money($statistic['total_deposit'] / 100) }}</b>
            </div>
            <table plugin="datatable">
                <attrs>
                    <datatable-options>"scrollX":true,"scrollCollapse":true,"fixedColumns":{leftColumns:7}</datatable-options>
                </attrs>
                <columns>
                    <column width="220" code="sn" align="left" halign="left" label="%admin.sn"></column>
                    <column width="180" code="trade_no" align="left" halign="left" label="%admin.bank_log.trade_no"></column>
                    <column width="100" code="payer" label="%admin.bank_log.payer"></column>
                    <column width="80" code="deposit" order="0" sort="desc" label="%admin.bank_log.deposit">
                        @if($list_item['deposit'] != 0){{ $list_item['deposit'] }}@endif
                    </column>
                    <column width="80" auth="balance" code="balance" label="%admin.bank_log.balance">
                        @if($list_item['balance'] != 0){{ $list_item['balance'] }}@endif
                    </column>
                    <column code="pay_time" type="time" order="1" sort="desc" label="%admin.bank_log.pay_time" width="120"></column>
                    <column code="create_time" type="time" order="0" sort="desc" label="%admin.bank_log.create_time" width="120"></column>
                    <column width="150" label="%admin.order.bank">
                        {{ $list_item['bank']['short_name'] }}
                    </column>
                    <column code="remark" align="left" halign="left" label="%admin.bank_log.remark" css="text-nowrap"></column>
                    <column width="170" label="%admin.bank_log.order_log">
                        @if($list_item->order)
                        <a href="{!! Helper::url('Order/index', ['sn' => $list_item->order->sn]) !!}" target="orderquery">{{ $list_item->order->sn }}</a>
                        @endif
                    </column>
                </columns>
            </table>
        </content>
    </tpl:list>
    @tpl_end
@stop