@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:form>
        <tpl:fitem name="name" label="%admin.payment.name" required="true"></tpl:fitem>
        <!-- @if(isset($data['id'])) -->
        <tpl:fitem name="code" label="%admin.payment.code" type="text"></tpl:fitem>
        
        <!-- @else -->
        <tpl:fitem name="code" label="%admin.payment.code" required="true"></tpl:fitem>
        
        <!-- @endif -->
        <tpl:fitem name="rate" label="服务费" required="true" default="0">
			费率(%)：<input type="text" name="rate" value="{{ $data['rate'] }}" class="form-control" style="width:100px;display:inline;" default="0"> + 固定笔费：
			<input type="text" name="rate_money" value="{{ $data['rate_money'] }}" class="form-control" style="width:100px;display:inline;" default="0">
		</tpl:fitem>
		
        <!--<tpl:fitem name="create_fee" label="%admin.payment.create_fee" required="true" default="0"></tpl:fitem>-->
        <tpl:fitem name="day_money" label="%admin.payment.day_money" required="true" default="0" tip="%admin.payment.money_tip"></tpl:fitem>
        @if(!isset($data['data']['fixed_amounts']))
        <tpl:fitem name="min_money" label="%admin.payment.min_money" required="true" default="0" tip="%admin.payment.money_tip"></tpl:fitem>
        <tpl:fitem name="max_money" label="%admin.payment.max_money" required="true" default="0" tip="%admin.payment.money_tip"></tpl:fitem>
        @endif
        <tpl:fitem name="sort" label="%admin.sort" required="true" default="100"></tpl:fitem>
        <tpl:fitem type="textarea" name="brief" label="%admin.payment.desc"></tpl:fitem>
        <tpl:fitem label="%admin.payment.data">
            @if(file_exists(APP_NAMESPACE_PATH . '/Views/default/withdrawplatform/' . $data['type'] . '.blade.php'))
                <php>
                    $payment_tpl_path = 'default.withdrawplatform.' . $data['type'];
                </php>
                @include($payment_tpl_path)
            @else
                <textarea class="form-control" name="data" rows="5">{{ json_encode($data['data']) }}</textarea>
            @endif
        </tpl:fitem>
        
        @tpl_include('default._layouts.verify', ['action' => 'payment'])
    </tpl:form>
    
    

    @tpl_end
@stop