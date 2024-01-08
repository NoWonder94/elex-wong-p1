@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:form>
        <tpl:fitem name="name" label="%admin.payment.name" required="true"></tpl:fitem>
        <!-- @if(isset($data['id'])) -->
        <tpl:fitem name="code" label="%admin.payment.code" type="text"></tpl:fitem>
        <tpl:fitem name="channel" label="%admin.payment.channel" type="text"></tpl:fitem>
        <!-- @else -->
        <tpl:fitem name="code" label="%admin.payment.code" required="true"></tpl:fitem>
        <tpl:fitem label="%admin.payment.channel">
            <tpl:select name="channel" options="$channels"></tpl:select>
        </tpl:fitem>
        <!-- @endif -->
        <tpl:fitem name="rate" label="%admin.payment.rate" required="true" default="0"></tpl:fitem>
        <!--<tpl:fitem name="create_fee" label="%admin.payment.create_fee" required="true" default="0"></tpl:fitem>-->
        <tpl:fitem name="day_money" label="%admin.payment.day_money" required="true" default="0" tip="%admin.payment.money_tip"></tpl:fitem>
        @if(!isset($data['data']['fixed_amounts']))
        <tpl:fitem name="min_money" label="%admin.payment.min_money" required="true" default="0" tip="%admin.payment.money_tip"></tpl:fitem>
        <tpl:fitem name="max_money" label="%admin.payment.max_money" required="true" default="0" tip="%admin.payment.money_tip"></tpl:fitem>
        @endif
        <tpl:fitem name="sort" label="%admin.sort" required="true" default="100"></tpl:fitem>
        <tpl:fitem type="textarea" name="brief" label="%admin.payment.desc"></tpl:fitem>
        <tpl:fitem label="%admin.payment.data">
            @if(file_exists(APP_NAMESPACE_PATH . '/Views/default/payment/' . $data['type'] . '.blade.php'))
                <php>
                    $payment_tpl_path = 'default.payment.' . $data['type'];
                </php>
                @include($payment_tpl_path)
            @else
                <textarea class="form-control" name="data" rows="5">{{ json_encode($data['data']) }}</textarea>
            @endif
        </tpl:fitem>
        @if((int)$data['id'] > 0)
        <tpl:fitem label="%admin.payment.switch_set">
            <table class="table table-bordered" role="grid" style="background-color:#fff;" id="ruleBodys">
                <thead style="background-color:#f3f7f9!important; text-align: center;">
                    <tr role="row">
                        <td style="vertical-align:middle; width: 1082px;">
                            <span>{{ Lang::get('admin.payment.switch_rule') }}</span>
                        </td>
                        <td style="text-align:left;">
                            <tpl:btn type="add" css="btn-primary btn-sm" click="$.addRule()"></tpl:btn>
                        </td>
                    </tr>
                </thead>
                @foreach($data['rules'] as $rule)
                <tbody>
                    <tr role="row">
                        <td class="form-inline" style="vertical-align:middle;border-width:0px">
                            <div class="input-group">
                                
                                <span class="input-group-addon">
                                    <input type="checkbox" class="rule-val is-range" style="width:20px;height:20px;" data-key="is_range" value="1" @if($rule['is_range'] == 1) checked @endif>
                                    {{ Lang::get('admin.payment.money_range') }} 
                                </span>
                                <input type="number" class="form-control rule-val range-num" data-key="min_amount" @if($rule['is_range'] == 0) disabled @endif style="width:80px;" value="{{ $rule['min_amount'] }}">
                                <span class="input-group-addon"> ~ </span>
                                <input type="number" class="form-control rule-val range-num" data-key="max_amount" @if($rule['is_range'] == 0) disabled @endif style="width:80px;" value="{{ $rule['max_amount'] }}">
                                <span class="input-group-addon"> 且 </span>
                                <input type="number" class="form-control rule-val" data-key="rate" value="{{ $rule['rate'] }}">
                                <span class="input-group-addon">% 的订单转至</span>
                                <select class="form-control rule-val bonus_type" data-key="channel_id" style="width: auto;">
                                    @foreach($payments as $val)
                                    <option value="{{ $val->id}}" @if($rule['channel_id'] == $val->id) selected @endif>{{ $val->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </td>
                        <td>
                            <button class="btn btn-danger btn-sm delete-role remove-rule" type="button">{{ Lang::get('admin.delete') }}</button>
                        </td>
                    </tr>
                </tbody>
                @endforeach
            </table>
        </tpl:fitem>
        <tpl:fitem name="rules" id="ruleList" type="hidden"></tpl:fitem>
        @endif
        @tpl_include('default._layouts.verify', ['action' => 'payment'])
    </tpl:form>

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
                        <input type="number" class="form-control rule-val" data-key="rate">
                        <span class="input-group-addon">% 的订单转至</span>
                        <select class="form-control rule-val bonus_type" data-key="channel_id" style="width: auto;">
                            @foreach($payments as $val)
                            <option value="{{ $val->id}}">{{ $val->name }}</option>
                            @endforeach
                        </select>
                    </div>
                </td>
                <td>
                    <button class="btn btn-danger btn-sm delete-role remove-rule" type="button">{{ Lang::get('admin.delete') }}</button>
                </td>
            </tr>
        </tbody>
    </script>
    <script type="text/javascript">
        $.addRule = function(){
            $("#ruleBodys").append($("#ruleTpl").html());
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

        APP.validateForm = function(submitFun) {
            var rules = new Array();

            $('#ruleBodys tbody').each(function(){
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
            $("#ruleList").val(JSON.stringify(rules));
            submitFun();
        }

    </script>
    @tpl_end
@stop