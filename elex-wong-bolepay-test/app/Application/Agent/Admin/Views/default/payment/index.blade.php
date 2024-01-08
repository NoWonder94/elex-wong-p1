@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <div class="min-list">
        <div class="alert alert-alt alert-primary alert-dismissible" role="alert">
            {{ Lang::get('admin.payment.tip') }}
        </div>
        <table class="table table-bordered table-th-bg table-vmiddle" style="background: #fff; text-align: center;">
            <tr>
                <th style="text-align:left; width:120px;">{{ Lang::get('admin.payment.name') }}</th>
                <th style="width:70px;">{{ Lang::get('admin.payment.rate') }}</th>
                <th style="width:60px;">{{ Lang::get('admin.payment.day_money') }}</th>
                <th style="width:60px;">{{ Lang::get('admin.payment.min_money') }}</th>
                <th style="width:60px;">{{ Lang::get('admin.payment.max_money') }}</th>
                <th style="width:80px;">{{ Lang::get('admin.payment.channel_id') }}</th>
                <th style="width:60px;">{{ Lang::get('admin.status') }}</th>
                <th style="text-align:left;">{{ Lang::get('admin.payment.desc') }}</th>
            </tr>
            @foreach($payments as $code => $payment)
                <php>
                    if ($payment['status'] != 1) {
                        continue;
                    }
                </php>
                <tr>
                    <td style="text-align: left;">
                        {{ $payment['name'] }}
                    </td>
                    <td>
                        {{ $payment['rate'] }}
                    </td>
                    <td>
                        @if($payment['day_money'] > 0)
                        {{ $payment['day_money'] }}
                        @else
                        无限制
                        @endif
                    </td>
                    <td>
                        @if(isset($payment['data']['fixed_amounts']))
                        固定金额
                        @elseif($payment['min_money'] > 0)
                        {{ $payment['min_money'] }}
                        @else
                        不限制
                        @endif
                    </td>
                    <td>
                        @if(isset($payment['data']['fixed_amounts']))
                        固定金额
                        @elseif($payment['max_money'] > 0)
                        {{ $payment['max_money'] }}
                        @else
                        不限制
                        @endif
                    </td>
                    <td>
                        {{ $payment['id'] }}
                    </td>
                    <td>
                        @if($payment['status'] == 1)
                            @if($payment['confirm_status'] == 0)
                            <span class='badge badge-warning payment-confirm' data-toggle="tooltip" data-placement="right"
                                  data-trigger="hover" title="费率变动，点击后开启支付通道" style="cursor: pointer;" onclick="confirmPayment(this, {{ $payment['id'] }})">待确认</span>
                            @else
                            <span class='badge badge-success'>{{ Lang::get('admin.status_txts.1') }}</span>
                            @endif
                        @else
                            <span class='badge badge-dark'>{{ Lang::get('admin.status_txts.0') }}</span>
                        @endif
                    </td>
                    <td style="text-align:left;">
                        @if(!empty($payment['brief']))
                        {{ $payment['brief'] }}；
                        @endif
                        @if(isset($payment['data']['fixed_amounts']))
                        只能支付以下固定金额：{{ implode(' , ', $payment['data']['fixed_amounts']) }}；
                        @endif
                    </td>
                </tr>
            @endforeach
        </table>
    </div>
    <script>
        function confirmPayment(btn, id) {
            var td = $(btn).parent();
            $(btn).hide();
            $(btn).after('<i class="fa fa-spinner fa-pulse send-finish"></i>');
            $.ajaxPost("{{ Helper::url('Payment/confirm') }}", {"id":id}, (result) => {
                $(btn).show();
                td.find('.send-finish').remove();
                if (result.status) {
                    $.showSuccess("{{Lang::get('common.handler_success')}}", 300, function(){
                        location.reload();
                    }, 2000);
                } else {
                    $.showTooltip($(btn), result.msg, null, 'top', 3000, 'danger');
                }
            }, () => {
                $(btn).show();
                td.find('.send-finish').remove();
                $.showTooltip($(btn), "{{Lang::get('common.handler_error')}}", null, 'top', 2000, 'danger');
            });
        }

        jQuery(function ($) {
            $('[data-toggle="tooltip"]').tooltip();
        });
    </script>
    @tpl_end
@stop
