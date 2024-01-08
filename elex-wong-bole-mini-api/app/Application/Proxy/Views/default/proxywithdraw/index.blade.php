@extends('default._layouts.base')
@section('body')
    @tpl_begin
        <tpl:list>
            <search method="get">
                <row>
                    <item name="sn" label="流水号"></item> 
                    <item label="状态">
                        <tpl:select name="status" options="0,1,2,3,4,5" texts="所有,付款失败,拒绝,待处理,审核成功,支付成功" selected="$_search_args['status']"></tpl:select>
                    </item>
                </row>
                <row style="margin-top:10px;">
                    <item label="查询时间">
                        <tpl:daterange data="$_search_args" begin_name="begin_time" end_name="end_time"></tpl:daterange>
                    </item>
                    <btn type="search"></btn>
                </row> 
            </search>
            <content> 
                <table>
                    <columns>
                        <column code="sn" sort="true" defaultorder="true" label="流水号" ></column> 
                        <column code="money" sort="true" label="金额" ></column>
                        <column code="bank_name" label="银行名称" ></column>
                        <column code="bank_user" label="收款人" ></column>
                        <column code="bank_account" label="银行帐号" ></column>
                        <column code="create_time" sort="true" type="time" label="创建日期" width="190" ></column> 
                        <column code="status" label="状态" >
                        {{Lang::get('root::common.proxy_withdraw_status.'.$list_item['status']) }}
                        </column> 
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop
 