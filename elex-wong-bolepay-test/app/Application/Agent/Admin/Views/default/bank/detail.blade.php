@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:form>
        <tpl:fitem label="%admin.bank.bank">
            <tpl:select name="bank" options="$banks" selected="$data['bank']"></tpl:select>
        </tpl:fitem>
		<tpl:fitem name="bank_no" label="%admin.bank.address" required="true"></tpl:fitem>
		<tpl:fitem name="payee" label="%admin.bank.payee" required="true" default="USDT"></tpl:fitem>
        <tpl:fitem name="bank_address" label="%admin.bank.bank_address"></tpl:fitem>
        @tpl_include('default._layouts.verify', ['action' => 'bankadd'])
    </tpl:form>
    @tpl_end
	<script type="text/javascript">
		$(document).on("change","#bank",function(){
			var val = $(this).val();
			var html = '<span class="required text-danger">*</span>：';
			if(val == 0){
				$("#bank_no-form-item label").html("{{ Lang::get('admin.bank.address')}}" + html);
				$("#payee").val("USDT");
			}else{
				$("#bank_no-form-item label").html("{{ Lang::get('admin.bank.bank_no')}}" + html);
				$("#payee").val("");
			}
		})
	</script>
@stop