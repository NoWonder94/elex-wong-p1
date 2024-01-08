<script src="{{ Helper::resource('manage/number.js') }}"></script>
<tpl:fitem label="%admin.agent.fee_setting" bcss="min-list">
    <attrs>
        <tip>{!! Lang::format('admin.agent.payment_tip', Helper::url('Payment/index')) !!}</tip>
    </attrs>
    <table class="table table-bordered table-th-bg table-vmiddle" style="width: auto; text-align: center;">
        <thead>
            <th style="text-align:left;">{{ Lang::get('admin.payment.name') }}</th>
            <th style="width:70px;">{{ Lang::get('admin.payment.channel_id') }}</th>
            <th style="width:100px;">基础服务费率%</th>
            <th style="width:130px;">加收服务费率%</th>
            @if($_tpl_type == 'proxy')
            <th style="width:120px;">代理最终服务费率%</th>
            @else
            <th style="width:120px;">商家最终服务费率%</th>
            @endif
        </thead>
        <tbody>
        @foreach($parent_payments as $payment_id => $payment)
            @if($payment['status'] == 1)
            <php>
                $agent_payment = $agent_payments[$payment_id];
            </php>
            <tr>
                <td>
                    <div class="checkbox-custom checkbox-primary text-left">
                        <input id="payment-{{ $payment_id }}" type="checkbox" name="extends[payments][{{ $payment_id }}][status]" value="1" @if($agent_payment['status'] == 1) checked @endif/>
                        <label for="payment-{{ $payment_id }}">{{ $payment['name'] }}&nbsp;</label>
                    </div>
                </td>
                <td>{{ $payment['id'] }}</td>
                <td>{{ $payment['rate'] }}</td>
                <td>
                    <input type="text" name="extends[payments][{{ $payment_id }}][rate]" value="{{ (float)$agent_payment['rate'] }}"
                           data-base-rate="{{ $payment['rate'] }}" data-show-id="agentPaymentRate{{ $payment_id }}"
                           data-min="0" data-max="50" data-step="0.05" data-precision="2" data-plugin="asSpinner"
                           class="form-control add-payment-rate" style="width:70px; height: 40px!important;" />
                </td>
                <td>
                    <span id="agentPaymentRate{{ $payment_id }}"></span>
                </td>
            </tr>
            @endif
        @endforeach
        </tbody>
    </table>
    <script>
        jQuery(function($){
            $('.add-payment-rate').change(function(){
                var val  = parseFloat($(this).val());
                var base = parseFloat($(this).data('base-rate'));
                $('#' + $(this).data('show-id')).html(BPNumber.add(val, base));
            }).on('asSpinner::change', function (e) {
                $(this).trigger('change');
            }).trigger('change');
        });
    </script>
</tpl:fitem>