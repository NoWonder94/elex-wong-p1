@extends('default._layouts.base')
@section('body')
    @tpl_begin
        <tpl:list>
            <search method="get">
                <row>
                    <item name="sn" label="流水号"></item> 
                    <item label="状态">
                        <tpl:select name="status" options="0,1,2,3" texts="所有,拒绝,待处理,审核成功" selected="$_search_args['status']"></tpl:select>
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
                        <column code="sn" sort="true" label="流水号" ></column> 
                        <column code="total_bet" sort="true" label="总投注" ></column>
                        <column code="total_winning" sort="true" label="总输赢" ></column>
                        <column code="total_bonus" sort="true" label="总优惠" ></column>
                        <column code="total_return" sort="true" label="总返水" ></column>
                        <column code="prize_pool" sort="true" label="奖池金额" ></column>
                        <column code="percent" sort="true" label="佣金率" ></column> 
                        <column code="original_commission" sort="true" label="原佣金" ></column>
                        <column code="commission" sort="true" label="佣金" ></column>
                        <column code="give_time" sort="true" defaultorder="true" type="time" label="结算日期" width="190" ></column> 
                        <column code="status" label="状态" >
                        {{Lang::get('root::common.proxy_commission_status.'.$list_item['status']) }}
                        </column> 
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop
 