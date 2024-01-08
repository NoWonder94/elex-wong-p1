@extends('default._layouts.base') 
@section('body')
    @tpl_begin
        <tpl:list>
            <search>
                <row>
                    <item name="real_name" label="姓　　名"></item>
                    <item name="name" label="用户名"></item>
                </row>
                <row style="margin-top:10px;"> 
                    <item label="性别">
                        <tpl:select name="gender" options="all,先生,女士" texts="所有,先生,女士" selected="$_search_args['gender']"></tpl:select>
                    </item>
                    <item label="统计时间">
                        <tpl:daterange data="$_search_args" begin_name="begin_time" end_name="end_time"></tpl:daterange>
                    </item>
                    <item label="注册时间">
                        <tpl:daterange data="$_search_args" begin_name="reg_begin_time" end_name="reg_end_time"></tpl:daterange>
                    </item>
                    <btn type="search"></btn>
                </row>
            </search>
            <content> 
                <table>
                    <columns>
                        <column code="name" label="用户名" ></column>
                        <column code="real_name" label="真实姓名"></column>
                        <column code="group_name" label="等级"></column>
                        <column code="deposit_money" label="存款金额">
                            {{(float)$list_item['deposit_money']}}
                        </column>
                        <column code="withdraw_money" label="取款金额">
                            {{(float)$list_item['withdraw_money']}}
                        </column>
                        <column code="bets_money" label="投注金额">
                            {{(float)$list_item['bets_money']}}
                        </column>
                        <column code="reg_source" label="注册源"></column>
                        <column code="" type="time" label="注册日期" width="190" align="left">
                            {{ Time::toDate($list_item['reg_time']) }}    
                        </column> 
                        <column code="" type="time" label="最后登录日期" width="190" align="left">
                            {{ Time::toDate($list_item['login_time']) }}    
                        </column> 
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop 