@foreach($payments as $payment_id => $payment)
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
                       class="form-control add-payment-rate" style="width:70px; height: 40px!important;" />
            </td>
            <td>
                <span id="agentPaymentRate{{ $payment_id }}"></span>
            </td>
        </tr>
    @endif
@endforeach