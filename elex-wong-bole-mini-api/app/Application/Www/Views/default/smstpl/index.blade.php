@extends('default._layouts.base')
@section('body')
    @tpl_begin
        <tpl:list>
            <content>
                <btns>
                    <linkbtn type="add"></linkbtn>
                </btns>
                <table>
                    <columns>
                        <column code="code" label="短信代码" width="120"></column>
                        <column code="content" label="短信内容" align="left"></column>
                        <column code="status" label="状态" type="toggle" width="60"></column>
                        <actions width="100">
                            <action type="edit"></action>
							<action type="delete"></action>
                        </actions>
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop