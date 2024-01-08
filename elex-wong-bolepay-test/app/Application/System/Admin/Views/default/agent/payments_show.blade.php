<script src="{{ Helper::resource('manage/number.js') }}"></script>
<tpl:fitem label="%admin.agent.fee_setting" bcss="min-list">
    <table class="table table-bordered table-th-bg table-vmiddle" style="width: auto; text-align: center;">
        <thead>
            <th style="text-align:left;">{{ Lang::get('admin.payment.name') }}</th>
            <th style="width:70px;">{{ Lang::get('admin.payment.channel_id') }}</th>
            <th style="width:70px;">服务费率%</th>
            <th style="width:60px;">状态</th>
        </thead>
        <tbody>
        @foreach($payments as $payment_id => $payment)
            @if($payment['status'] == 1)
            <php>
                $agent_payment = $agent_payments[$payment_id];
            </php>
            <tr>
                <td style="text-align:left;">
                    {{ $payment['name'] }}
                </td>
                <td>{{ $payment['id'] }}</td>
                <td>{{ $payment['rate'] }}</td>
                <td>
                @if($payment['status'] == 1)
                    @if($payment['confirm_status'] == 0)
                    <span class="badge badge-warning">待确认</span>
                    @else
                    <span class="badge badge-success">启用</span>
                    @endif
                @else
                    <span class="badge badge-dark">关闭</span>
                @endif
                </td>
            </tr>
            @endif
        @endforeach
        </tbody>
    </table>
</tpl:fitem>