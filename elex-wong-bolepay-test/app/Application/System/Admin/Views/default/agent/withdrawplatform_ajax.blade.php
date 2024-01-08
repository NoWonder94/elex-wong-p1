@foreach($withdrawplatform as $payment_id => $payment)
            @if($payment['status'] == 1)
            <php>
                $agent_withdrawplatform = $agent_withdrawplatforms[$payment_id];
            </php>
            <tr>
                <td>
                    <div class="checkbox-custom checkbox-primary text-left">
                        <input id="withdraw-{{ $payment_id }}" type="checkbox" name="extends[withdraw][{{ $payment_id }}][status]" value="1" @if($agent_withdrawplatform['status'] == 1) checked @endif/>
                        <label for="withdraw-{{ $payment_id }}">{{ $payment['name'] }}&nbsp;</label>
                    </div>
                </td>
                <td>{{ $payment['id'] }}</td>
                <td>{{ $payment['rate'] }}</td>
                <td>
                    <input type="text" name="extends[withdraw][{{ $payment_id }}][rate]" value="{{ (float)$agent_withdrawplatform['rate'] }}"
                           data-base-rate="{{ $payment['rate'] }}" data-show-id="agentWithdrawRate{{ $payment_id }}"
                           data-min="0" data-max="50" data-step="0.05" data-precision="2" data-plugin="asSpinner" data-id="{{ $payment_id }}" 
                           class="form-control add-withdraw-rate" id="withdraw-rate-{{ $payment_id }}" style="width:70px; height: 40px!important;" />
                </td>
				<td>{{ $payment['rate_money'] }}</td>
                <td>
                    <input type="text" name="extends[withdraw][{{ $payment_id }}][rate_money]" value="{{ (float)$agent_withdrawplatform['rate_money'] }}"
                           data-base-money="{{ $payment['rate_money'] }}" data-show-id="agentWithdrawRate{{ $payment_id }}"
                           data-min="0" data-max="50" data-step="0.05" data-precision="2" data-plugin="asSpinner" data-id="{{ $payment_id }}"  
                           class="form-control add-withdraw-rate" id="withdraw-rate-money-{{ $payment_id }}" style="width:70px; height: 40px!important;" />
                </td>
                <td>
                    <span id="agentWithdrawRate{{ $payment_id }}"></span>
                </td>
            </tr>
            @endif
        @endforeach