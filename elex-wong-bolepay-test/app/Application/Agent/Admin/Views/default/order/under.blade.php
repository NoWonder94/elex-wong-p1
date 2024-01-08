@extends('default._layouts.base')
@section('body')
    @tpl_begin
        <tpl:list css="min-list">
            <search>
                <row>
                    <item name="sn" label="%admin.sn"></item>
                    <item name="trade_no" label="%admin.order.trade_no"></item>
                    <item name="agent_name" label="%admin.agent_business" style="width:120px"></item>
                </row>
                <row>
                    <item label="%admin.create_time">
                        <tpl:daterange data="$_search_args" date_css="datetime" begin_name="begin_time" end_name="end_time"></tpl:daterange>
                    </item>
                    <php>
                        $status_str = Lang::get('admin.order.status_str');
                    </php>
                    <item label="%admin.order.status">
                        <tpl:select name="status" options="$status_str" first="%admin.all" firstvalue="0" selected="$_search_args['status']"></tpl:select>
                    </item>
                    <php>
                        $finish_status_arr = Lang::get('admin.order.finish_status_arr');
                    </php>
                    <item label="%admin.order.finish_status">
                        <tpl:select name="finish_status" options="$finish_status_arr" first="%admin.all" firstvalue="0" selected="$_search_args['finish_status']"></tpl:select>
                    </item>
                    <input type="hidden" name="type" value="under" />
                    <btn type="search"></btn>
                    <btn type="export" style="margin-left:8px;" id="exportBtn"></btn>
                </row>
            </search>
            <content>
                <div class="alert alert-alt alert-primary alert-dismissible" role="alert">
                    {{ Lang::get('admin.order.total_money') }}：<b>￥{{ Tpl::money($statistic['total_money'] / 100) }}</b>，
                    {{ Lang::get('admin.order.total_pay_money') }}：<b>￥{{ Tpl::money($statistic['total_pay_money'] / 100) }}</b>，
                    {{ Lang::get('admin.order.service_fee_increase') }}：<b>￥{{ Tpl::money($statistic['total_service_fee'] / 100) }}</b>
                    <!--，{{ Lang::get('admin.order.create_fee_increase') }}：<b>￥{{ Tpl::money($statistic['total_create_fee'] / 100) }}</b>-->
                </div>
                <table plugin="datatable">
                    <columns>
                        <column width="180" align="left" halign="left" code="sn" label="%admin.sn"></column>
                        <column width="200" code="trade_no" align="left" halign="left" label="%admin.order.trade_no"></column>
                        <column width="120" code="under_agent" label="%admin.agent_business">
                            {{ $list_item->under()->name }}
                        </column>
                        <column width="80" code="money" order="0" sort="desc" label="%admin.order.money"></column>
                        <column width="80" code="pay_money" label="%admin.order.pay_money"></column>
                        <column width="60" code="service_fee" label="%admin.order.service_fee">
                            {{ $list_item->fee->service_fee }}
                        </column>
                        <!--
                        <column width="60" code="create_fee" label="%admin.order.create_fee">
                            {{ $list_item->fee->create_fee }}
                        </column>
                        -->
                        <column width="100" code="payment_name" label="支付方式"></column>
                        <column code="pay_time" type="time" order="0" sort="desc" label="%admin.order.pay_time" width="130"></column>
                        <column code="create_time" type="time" order="1" sort="desc" label="%admin.create_time" width="130"></column>
                        <column width="60" code="status" type="badge" badge-css=",danger,dark,success" badge-label="admin.order.status_str" badge-add="2" label="%admin.order.status"></column>
                        <column minwidth="60" align="left" halign="left"  code="finish_status" type="badge" badge-css=",dark,success" badge-label="admin.order.finish_status_arr" badge-show="status" label="%admin.order.finish_status"></column>
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop