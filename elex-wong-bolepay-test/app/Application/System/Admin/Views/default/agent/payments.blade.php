<script src="{{ Helper::resource('manage/number.js') }}"></script>
<style>
    .modal-dialog{max-width: 1000px;}
</style>
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
            <th style="width:120px;">最终服务费率%</th>
            <th style="width:120px;">切量规则</th>
        </thead>
        <tbody id="agentFeeSettingBody">
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
                           data-min="0" data-max="50" data-step="0.05" data-precision="2" data-plugin="asSpinner"
                           class="form-control add-payment-rate" style="width:70px; height: 40px!important;" />
                </td>
                <td>
                    <span id="agentPaymentRate{{ $payment_id }}"></span>
                </td>
                <td>
                    <input type="hidden" id="rules-{{ $payment_id }}" name="extends[payments][{{ $payment_id }}][rules]" value="{{ $agent_payment['rules'] }}"/>
                    <a href="javascript:$.ruleSet('{{ $payment['id']}}');">设置</a>
                </td>
            </tr>
            @endif
        @endforeach
        </tbody>
    </table>
    <script type="text/tpl" id="ruleForm">
        <table class="table table-bordered" role="grid" style="background-color:#fff;" id="rule-table">
                <thead style="background-color:#f3f7f9!important; text-align: center;">
                    <tr role="row">
                        <td style="vertical-align:middle; width: 1082px;">
                            <span>{{ Lang::get('admin.payment.switch_rule') }}</span>
                        </td>
                        <td style="text-align:left;">
                            <tpl:btn type="add" css="btn-primary btn-sm" click="$.addRule(this,'@{{=it.channel_id}}')"></tpl:btn>
                        </td>
                    </tr>
                </thead>
                
                @{{~it.data :item:index}}
                  <tbody>
                    <tr role="row">
                        <td class="form-inline" style="vertical-align:middle;border-width:0px">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <input type="checkbox" class="rule-val is-range" style="width:20px;height:20px;" data-key="is_range" value="1" @{{? item.is_range == 1 }} checked @{{?}} >
                                    {{ Lang::get('admin.payment.money_range') }} 
                                </span>
                                <input type="number" class="form-control rule-val range-num" data-key="min_amount" style="width:80px;" value="@{{=item.min_amount}}" @{{? item.is_range == 0 }} disabled @{{?}} >
                                <span class="input-group-addon"> ~ </span>
                                <input type="number" class="form-control rule-val range-num" data-key="max_amount" style="width:80px;" value="@{{=item.max_amount}}" @{{? item.is_range == 0 }} disabled @{{?}} >
                                <span class="input-group-addon"> 且 </span>
                                <input type="number" class="form-control rule-val" data-key="rate" style="width:70px;" value="@{{=item.rate}}">
                                <span class="input-group-addon">% 的订单转至</span>
                                <select class="form-control rule-val bonus_type" data-key="channel_id" style="width: auto;">
                                    @{{~it.payments :val:key}} 
                                    @{{? val.id != it.channel_id}}
                                        <option value="@{{=val.id}}" @{{? val.id == item.channel_id}} selected @{{?}}>@{{=val.name}}</option>
                                    @{{?}}
                                    @{{~}} 
                                </select>
                            </div>
                        </td>
                        <td>
                            <button class="btn btn-danger btn-sm delete-role remove-rule" type="button">{{ Lang::get('admin.delete') }}</button>
                        </td>
                    </tr>
                </tbody> 
               @{{~}}
               
            </table>
    </script>
    <script type="text/tpl" id="ruleTpl">
        <tbody>
            <tr role="row">
                <td class="form-inline" style="vertical-align:middle;border-width:0px">
                    <div class="input-group">
                        <span class="input-group-addon">
                            <input type="checkbox" class="rule-val is-range" style="width:20px;height:20px;" data-key="is_range" value="1" checked >
                            {{ Lang::get('admin.payment.money_range') }} 
                        </span>
                        <input type="number" class="form-control rule-val range-num" data-key="min_amount" style="width:80px;" value="">
                        <span class="input-group-addon"> ~ </span>
                        <input type="number" class="form-control rule-val range-num" data-key="max_amount" style="width:80px;" value="">
                        <span class="input-group-addon"> 且 </span>
                        <input type="number" class="form-control rule-val" data-key="rate" style="width:70px;">
                        <span class="input-group-addon">% 的订单转至</span>
                        <select class="form-control rule-val bonus_type" data-key="channel_id" style="width: auto;">
                           @{{~it.payments :item:index}} 
                           @{{? item.id != it.channel_id}}
                            <option value="@{{=item.id}}" >@{{=item.name}}</option>
                            @{{?}}
                            @{{~}} 
                        </select>
                    </div>
                </td>
                <td>
                    <button class="btn btn-danger btn-sm delete-role remove-rule" type="button">{{ Lang::get('admin.delete') }}</button>
                </td>
            </tr>
        </tbody> 
    </script>

    <script>
        jQuery(function($){
            $("#agentFeeSettingBody").on('change', '.add-payment-rate', function(){
                var val  = parseFloat($(this).val());
                var base = parseFloat($(this).data('base-rate'));
                $('#' + $(this).data('show-id')).html(BPNumber.add(val, base));
            }).on('asSpinner::change', '.add-payment-rate', function (e) {
                $(this).trigger('change');
            });
            $("#agentFeeSettingBody .add-payment-rate").trigger('change');

            $("#proxySelect").change(function () {
                $("#agentFeeSettingBody").html("");
                $.post("{!! Helper::url( APP_CONTROLLER_NAME . '/payments') !!}",{"proxy_id":$("#proxySelect").val()}, function(result){
                    $("#agentFeeSettingBody").html(result.data);
                    $(".add-payment-rate").asSpinner({
                        namespace: 'spinnerUi',
                        skin: null,
                        min: 0,
                        max: 50,
                        step: 0.05,
                        precision: 2,
                        mousewheel: true
                    });
                    $("#agentFeeSettingBody .add-payment-rate").trigger('change');
                });

            });


            var payments = JSON.parse('{!! json_encode(array_values($payments)) !!}');
                
            $.addRule = function(obj,channel_id){
                var html = $.template($("#ruleTpl").html(),{
                    "channel_id":channel_id,
                    "payments":payments
                });
                $(obj).parents('table').append(html);
            }

            $(document).on("click",".remove-rule",function(){
                $(this).parents("tbody").remove();
            })

            $(document).on("click",".is-range",function(){
                if($(this).is(":checked")){
                    $(this).parent("span").siblings(".range-num").attr("disabled",false);
                }else{
                    $(this).parent("span").siblings(".range-num").attr("disabled",true);
                }
            })

            $.ruleSet = function(channel_id){
                var data = $("#rules-"+channel_id).val();
                if(data){
                    data = JSON.parse(data);
                }
                var html = $.template($("#ruleForm").html(),{
                    "channel_id":channel_id,
                    "data":data,
                    "payments":payments
                });
                $.showConfirm(html, function(hiddenFunc){
                    /*var ladda = Ladda.create(this);
                    ladda.start();*/
                    var rules = new Array();
                    $('#rule-table tbody').each(function(){
                        var rule = {};
                        $('.rule-val', this).each(function(){
                            if($(this).data('key') == 'is_range'){
                                if($(this).is(":checked")){
                                    rule[$(this).data('key')] = 1;
                                }else{
                                    rule[$(this).data('key')] = 0;
                                }
                            }else{
                                rule[$(this).data('key')] = $(this).val();
                            }
                        });
                        rules.push(rule);
                    });
                    $("#rules-"+channel_id).val(JSON.stringify(rules));
                    //ladda.stop();
                    hiddenFunc();
                }, null, null, null, 850, "");
            }
        });
    </script>
</tpl:fitem>