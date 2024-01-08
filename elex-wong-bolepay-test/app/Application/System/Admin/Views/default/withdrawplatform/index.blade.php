@extends('default._layouts.base')
@section('body')
    @tpl_begin
        <tpl:list css="min-list">
            <content>
                <btns>
                    <linkbtn type="add"></linkbtn>
                </btns>
                <table pager="no">
                    <columns>
                        <column width="60" code="id" label="%admin.payment.channel_id"></column>
                        <column width="120" code="name" label="%admin.name"></column>
                        <column width="80" code="code" label="%admin.payment.code"></column>
                        <column width="120" code="rate" label="服务费">
						{{ $list_item['rate'] }}% + {{ $list_item['rate_money']}}
						</column>
                        
                        <column width="60" label="%admin.payment.day_money">
                            @if($list_item['day_money'] > 0)
                            {{ $list_item['day_money'] }}
                            @else
                            不限制
                            @endif
                        </column>
                        <column width="60" label="%admin.payment.min_money">
                            @if(isset($list_item['data']['fixed_amounts']))
                            固定金额
                            @elseif($list_item['min_money'] > 0)
                            {{ $list_item['min_money'] }}
                            @else
                            不限制
                            @endif
                        </column>
                        <column width="60" label="%admin.payment.max_money">
                            @if(isset($list_item['data']['fixed_amounts']))
                            固定金额
                            @elseif($list_item['max_money'] > 0)
                            {{ $list_item['max_money'] }}
                            @else
                            不限制
                            @endif
                        </column>
                        <column width="60" code="status" label="%admin.status" type="toggle"></column>
                        <column width="60" code="total_withdraw" label="代付总额"></column>
                        <actions width="50">
                            <action type="edit"></action>
                        </actions>
                        <column code="brief" align="left" halign="left" label="%admin.payment.desc">
                            @if(!empty($list_item['brief']))
                            {{ $list_item['brief'] }}；
                            @endif
                            @if(isset($list_item['data']['fixed_amounts']))
                            只能支付以下固定金额：{{ implode(' , ', $list_item['data']['fixed_amounts']) }}；
                            @endif
                        </column>
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop