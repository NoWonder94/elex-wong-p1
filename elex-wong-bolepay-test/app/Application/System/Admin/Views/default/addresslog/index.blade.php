@extends('default._layouts.base')
@section('body')
    @tpl_begin
        <tpl:list>
            <search>
                <row>
                    <item name="address" label="%admin.address.address"></item>
                    <item name="hash" label="%admin.addresslog.hash"></item>
                    <item name="sn" label="%admin.addresslog.sn"></item>
                    <btn type="search"></btn>
                </row>
            </search>
            <content>
                <btns>
                    <linkbtn type="add"></linkbtn>
                </btns>
                <table>
                    <columns>
                        <column code="address" label="%admin.address.address"></column>
                        <column code="hash"  label="%admin.addresslog.hash" style="word-break: break-all;"></column>
                        <column code="related_key" label="%admin.addresslog.sn"></column>
                        <column code="amount" label="%admin.addresslog.amount"></column>
                        <column code="create_time" type='time' label="%admin.create_time"></column>
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop 
