<script src="{{ Helper::resource('manage/number.js') }}"></script>
<style>
    .modal-dialog{max-width: 1000px;}
</style>
<tpl:fitem label="代付费用设置" bcss="min-list">
    <attrs>
        <tip>服务费=(基础费率 + 加收费率) * 代付金额 + 基础笔费 + 加收笔费</tip>
    </attrs>
    <table class="table table-bordered table-th-bg table-vmiddle" style="width: auto; text-align: center;">
        <thead>
            <th style="text-align:left;">{{ Lang::get('admin.payment.name') }}</th>
            <th style="width:70px;">{{ Lang::get('admin.payment.channel_id') }}</th>
            <th style="width:100px;">基础费率%</th>
            <th style="width:130px;">加收费率%</th>
			<th style="width:100px;">基础笔费</th>
            <th style="width:130px;">加收笔费</th>
            <th style="width:120px;">最终服务费</th>
        </thead>
        <tbody id="agentFeeSettingBody1">
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
        </tbody>
    </table>
    
    
    <script>
		
        jQuery(function($){
			$.changeServiceFee = function(id){
				var baseRate = parseFloat($("#withdraw-rate-" + id).data('base-rate'));
				var rate = parseFloat($("#withdraw-rate-" + id).val());
				var baseRateMoney = parseFloat($("#withdraw-rate-money-" + id).data('base-money'));
				var rateMoney = parseFloat($("#withdraw-rate-money-" + id).val());
				var service_fee = BPNumber.add(baseRate,rate) + "% + " + BPNumber.add(baseRateMoney,rateMoney);
                $("#" + $("#withdraw-rate-" + id).data('show-id')).html(service_fee);
			}
            $("#agentFeeSettingBody1").on('change', '.add-withdraw-rate', function(){
				var id = $(this).data("id");
				$.changeServiceFee(id);
				
            }).on('asSpinner::change', '.add-withdraw-rate', function (e) {
                $(this).trigger('change');
            });
			
	
			
            $("#agentFeeSettingBody1 .add-withdraw-rate").trigger('change');

            $("#proxySelect").change(function () {
                $("#agentFeeSettingBody1").html("");

                $.post("{!! Helper::url( APP_CONTROLLER_NAME . '/withdrawplatform') !!}",{"proxy_id":$("#proxySelect").val()}, function(result){
                    $("#agentFeeSettingBody1").html(result.data);
                    $(".add-withdraw-rate").asSpinner({
                        namespace: 'spinnerUi',
                        skin: null,
                        min: 0,
                        max: 50,
                        step: 0.05,
                        precision: 2,
                        mousewheel: true
                    });
					
                    $("#agentFeeSettingBody1 .add-withdraw-rate").trigger('change');
                });
            });
            
        });
    </script>
</tpl:fitem>