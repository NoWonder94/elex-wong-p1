@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:list css="min-list">
        <search>
            <row>
                <item label="渠道">
                    <tpl:select name="platform" options="$payment_platforms" first="%admin.all" firstvalue="" textfield="name" valuefield="code" selected="$_search_args['platform']"></tpl:select>
                </item>
                <item label="日期">
                    <tpl:daterange data="$_search_args" date_css="date" begin_name="begin_time" end_name="end_time"></tpl:daterange>
                </item>
                <btn type="search"></btn>
            </row>
        </search>
        <content>
            <div class="alert alert-alt alert-primary alert-dismissible" role="alert">
                订单总数：<b>{{ (int)$statistic['total_order_num'] }}</b>，
                支付订单数：<b>{{ $statistic['total_pay_num'] }}</b>，
                订单总额：<b>￥{{ Tpl::money($statistic['total_order_money']) }}</b>，
                订单支付总额：<b>￥{{ Tpl::money($statistic['total_pay_money']) }}</b>，
                服务费：<b>￥{{ Tpl::money($statistic['total_fee_income']) }}</b>，
                净收入：<b>￥{{ Tpl::money($statistic['total_real_income']) }}</b>，
                成功率：<b>{{ $statistic['total_pay_num'] > 0 ? Tpl::money($statistic['total_pay_num'] / $statistic['total_order_num'] * 100) : 0 }}%</b>
            </div>
            <table plugin="datatable">
                <columns>
                    <column width="80" code="day" order="1" sort="desc" label="日期">
                        {{ Tpl::date($list_item->day) }}
                    </column>
                    <column width="80" code="platform" label="渠道">
                        {{ $platform_names[$list_item->platform] }}
                    </column>
                    <column width="100" code="order_num" order="0" sort="desc" label="订单数"></column>
                    <column width="100" code="pay_num" order="0" sort="desc" label="支付订单数"></column>
                    <column width="100" label="成功率">
                        {{ $list_item->pay_num > 0 ? Tpl::money($list_item->pay_num / $list_item->order_num * 100) : 0 }}%
                    </column>
                    <column width="100" code="order_money" order="0" sort="desc" label="订单金额"></column>
                    <column width="100" code="pay_money" order="0" sort="desc" label="支付金额"></column>
                    <column width="100" code="fee_income" order="0" sort="desc" label="服务费"></column>
                    <column width="100" code="real_income" order="0" sort="desc" label="净收入"></column>
                    <column code="empty" label="　"></column>
                </columns>
            </table>
        </content>
    </tpl:list>
    @tpl_end
@stop