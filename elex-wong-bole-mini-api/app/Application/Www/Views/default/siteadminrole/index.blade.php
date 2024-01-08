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
                        <column code="name" label="名称" align="left"></column>
                        <column code="status" label="状态" type="toggle" readonly="is_super" width="80"></column>
                        <actions width="90">
                            @if($list_item['is_super'] != 1)
                            <action type="edit"></action>
                            <action type="delete"></action>
                            @endif
                        </actions>
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop