@extends('default._layouts.base')
@section('body')
    @tpl_begin
        <tpl:list>
            <search>
                <row>
                    <item label="操作时间">
                        <tpl:daterange data="$_search_args" begin_name="begin_time" end_name="end_time"></tpl:daterange>
                    </item>
                    <btn type="search"></btn>
                </row>
            </search>
            <content>
                <table>
                    <columns>
                        <column code="creator" label="操作人" width="120"></column>
                        <column label="控件器/方法" width="200">
                            {{ $list_item['controller'] }}/{{ $list_item['action'] }}
                        </column>
                        <column code="ip" label="IP" width="120"></column>
                        <column code="create_time" type="time" label="操作时间" width="150"></column>
                        <column code="request" label="提交参数" align="left"></column>
						<column code="olddata" label="原数据" align="left"></column>
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop