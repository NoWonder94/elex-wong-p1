@extends('default._layouts.base')
@section('body')
    @tpl_begin
        <tpl:list>
            <content>
                <btns>
                    <linkbtn type="add"></linkbtn>
                </btns>
                <table pager="no">
                    <columns>
                        <column width="200" code="name" label="%admin.name" align="left" halign="left"></column>
                        <column code="status" label="%admin.status" type="toggle" readonly="is_super" width="80"></column>
                        <column code="update_time" label="%admin.update_time" type="time" width="150"></column>
                        <actions minwidth="60" align="left" halign="left">
                            @if($list_item['is_super'] != 1)
                            <action type="edit"></action>
                            @endif
                        </actions>
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop