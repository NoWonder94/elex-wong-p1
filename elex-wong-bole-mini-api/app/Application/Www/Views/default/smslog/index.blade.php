@extends('default._layouts.base')
@section('body')
    @tpl_begin
        <tpl:list>
            <search>
                <row>
                    <item name="account_name" label="用户名" style="width:100px;"></item>
                    <item name="real_name" label="姓名" style="width:100px;"></item>
                    <item name="creator" label="发送人" style="width:100px;"></item>
                    <item label="发送时间">
                        <tpl:daterange data="$_search_args" begin_name="begin_time" end_name="end_time"></tpl:daterange>
                    </item>
                    <btn type="search"></btn>
                </row>
            </search>
            <content>
                <table>
                    <columns>
                        <column code="account_name" label="用户名" width="120"></column>
                        <column code="real_name" label="姓名" width="120"></column>
                        <column code="creator" label="发送人" width="120"></column>
                        <column code="content" label="发送内容" align="left"></column>
                        <column code="create_time" type="time" label="发送时间" width="150"></column>
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop