@extends('default._layouts.base')
@section('body')
    @tpl_begin 
    <tpl:list>
        <search>
            <row>
                <item name="title" label="%admin.title"></item>
                <btn type="search"></btn>
            </row>
        </search>
        <content> 
            <btns>
                <linkbtn type="add"></linkbtn>
            </btns>
            <table>
                <columns>
                    <column width="380" code="title" align="left" halign="left" label="%admin.title"></column>
                    <column width="150" code="create_time" label="%admin.create_time" type="time"></column>
                    <column width="150" code="end_time" label="%admin.notice.end_time" type="time"></column>
                    <column width="60" code="status" label="%admin.status" type="status"></column>
                    <actions minwidth="60" align="left" halign="left">
                        <action type="edit"></action>
                    </actions>
                </columns>
            </table>
        </content>
    </tpl:list>
    @tpl_end
@stop