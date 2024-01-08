@extends('default._layouts.base')
@section('body')
    @tpl_begin 
        <tpl:list>
            <search method="get">
                <row> 
                    <item name="name" label="用户名"></item>
                    <item label="查询时间">
                        <tpl:daterange data="$_search_args" begin_name="begin_time" end_name="end_time"></tpl:daterange>
                    </item>
                    <btn type="search"></btn>
                </row> 
            </search>
            <content> 
                <table>
                    <columns>
                        <column code="name" label="会员名" ></column>
                        <column code="real_name" label="真实姓名" ></column>
                        <column code="group_name" label="等级" ></column> 
                        <column code="bets_money" label="投注金额" ></column>
                        <column code="winning_money" label="赔付金额" ></column>
                        <column code="profit_money" label="利润" ></column>   
                        </column> 
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop
 