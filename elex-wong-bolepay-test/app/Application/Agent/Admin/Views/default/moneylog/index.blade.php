@extends('default._layouts.base')
@section('body')
    @tpl_begin
        <tpl:list>
            <search>
                <row>
                    <item name="sn" label="%admin.sn"></item>
                    <item label="%admin.create_time">
                        <tpl:daterange data="$_search_args" date_css="datetime" begin_name="begin_time" end_name="end_time"></tpl:daterange>
                    </item>
                    <btn type="search"></btn>
                </row>
            </search>
            <content>
				<table plugin="datatable">
                    <columns>
                        <column width="100" code="increase" order="0" sort="desc" label="%admin.moneylog.increase">
                            @if($list_item['increase'] > 0)
                                {{ $list_item['increase'] }}
                            @endif
                        </column>
                        <column width="100" code="decrease" order="0" sort="desc" label="%admin.moneylog.decrease">
                            @if($list_item['decrease'] > 0)
                                {{ $list_item['decrease'] }}
                            @endif
                        </column>
						<column width="120" code="balance" label="%admin.moneylog.balance"></column>
                        <column code="create_time" type="time" order="1" sort="desc" label="%admin.create_time" width="150"></column>
						<column code="remark" halign="left" align="left" label="%admin.moneylog.remark"></column>
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop