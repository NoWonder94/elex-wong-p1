@extends('default._layouts.base')
@section('body')
    @tpl_begin
        <tpl:list css="min-list">
            <search>
                <row>
                    <item label="%admin.create_time">
                        <tpl:daterange data="$_search_args" begin_name="begin_time" end_name="end_time"></tpl:daterange>
                    </item>
                    <btn type="search"></btn>
                </row>
            </search>
            <content>
                <table plugin="datatable">
                    <details>
                        <td colspan="4" class="text-left text-break td-detail-show">
                            <ul class="list-group list-group-dividered list-group-flush">
                                <li class="list-group-item">
                                    <div><b>{{Lang::get('admin.operation_log.request')}}：</b></div>
                                    <div class="text-break" style="word-break:break-all;">{{ $list_item['request'] }}</div>
                                </li>
                                <li class="list-group-item">
                                    <div><b>{{Lang::get('admin.operation_log.olddata')}}：</b></div>
                                    <div class="text-break" style="word-break:break-all;">{{ $list_item['olddata'] }}</div>
                                </li>
                            </ul>
                        </td>
                    </details>
                    <columns>
                        <column width="120" code="admin_name" label="%admin.admin_name"></column>
                        <column width="160" code="controller_action" label="%admin.operation_log.controller_action"></column>
                        <column width="120" code="ip" label="%admin.ip"></column>
                        <column minwidth="150" align="left" halign="left" code="create_time" type="time" label="%admin.create_time"></column>
                    </columns>
                </table> 
            </content>
        </tpl:list>
    @tpl_end
@stop