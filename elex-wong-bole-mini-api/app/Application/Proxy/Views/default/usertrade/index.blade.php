@extends('default._layouts.base')
@section('body')
    @tpl_begin 
        <tpl:list>
            <search method="get">
                <row> 
                    <item label="类型">
                        <tpl:select name="type" options="0,1,2" texts="所有,存款,取款" selected="$_search_args['type']"></tpl:select>
                    </item> 
                    <item label="查询时间">
                        <tpl:daterange data="$_search_args" begin_name="begin_time" end_name="end_time"></tpl:daterange>
                    </item>
                    <btn type="search"></btn>
                </row> 
            </search>
            <content> 
                <table>
                    <columns>
                        <column code="create_time" type="time" label="结算日期" width="190" ></column> 
                        <column code="sn" label="流水号" ></column> 
                        <column code="name" label="会员名" ></column>
                        <column code="real_name" label="真实姓名" ></column>
                        <column code="group_name" label="等级" ></column>
                        <column code="type" label="类型" > 
                            @if($list_item['type'] == 'deposit') 存款 @elseif($list_item['type'] == 'withdraw') 取款 @endif
                        </column>
                        <column code="money" label="交易金额" ></column>   
                        </column> 
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop
 