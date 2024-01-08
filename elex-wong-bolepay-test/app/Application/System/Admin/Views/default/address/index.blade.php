@extends('default._layouts.base')
@section('body')
    @tpl_begin
        <tpl:list>
            <search>
                <row>
                    <item name="address" label="%admin.address.address"></item>
                    <btn type="search"></btn>
                </row>
            </search>
            <content>
                <btns>
                    <linkbtn type="add"></linkbtn>
                </btns>
                <table>
                    <columns>
                        <column width="200" code="address" label="%admin.address.address"></column>
                        <column code="income"  label="%admin.address.income"></column>
                        <column code="income_num" label="%admin.address.income_num"></column>
                        <column code="status_str" label="%admin.status"></column>
                        <actions minwidth="60" align="left" halign="left">
                            <action type="edit"></action>
                        </actions>
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop 
