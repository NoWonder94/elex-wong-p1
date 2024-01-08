@extends('default._layouts.base')

@section('body')
    @tpl_begin
    <tpl:list css="min-list">
        <content>
            <btns>
                <linkbtn type="add"></linkbtn>
            </btns>
            <table pager="no">
                <columns>
                    <column width="60" code="name" label="平台"></column>
                    <column width="100" code="balance" label="余额"></column>
                    <column width="120" code="total_money" label="累计金额"></column>
                    <column width="120" code="total_withdraw" label="累计提现"></column>
                    
					<actions width="120">
					@if($list_item->code == 'yl')
						<action label="调整余额">
							<attrs>
								<click>updateBalance(this, '{{ $list_item->code }}')</click>
							</attrs>
						</action>
						@endif
					</actions>
					
                </columns>
            </table>
        </content>
    </tpl:list>
    @tpl_end
	<script type="text/tpl" id="balance_tpl">
		<form class="form-horizontal" id="balanceForm">
            <div class="form-group row">
                <label class="col-md-3 form-control-label">金额:</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" id="money" name="money" placeholder="扣减余额请填负数，如:-100" />
                </div>
            </div>
			<input type="hidden" name="code" value="@{{=it.code }}" />
		</form>
	</script>
@stop
@section('footer')
	<script type="text/javascript">
		function updateBalance(btn, code){
			var html = $.template($("#balance_tpl").html(), {"code":code});
					$.showConfirm(html, function(hiddenFunc){
						var ladda = Ladda.create(this);
						ladda.start();
						var form = $("#balanceForm");
						$.ajaxPost("{{ Helper::url('PaymentPlatform/update') }}",form.serialize(), (result) => {
							ladda.stop();
							if(result.status){
								hiddenFunc();
								$.showSuccess("{{Lang::get('common.handler_success')}}", 300, function(){
									location.reload(true);
								}, 2000);
							}else{
								$.showTooltip($(this), result.msg, null, 'top', 3000, 'danger');
							}
						}, () => {
							ladda.stop();
							$.showTooltip($(this), "{{Lang::get('common.handler_error')}}", null, 'top', 2000, 'danger');
						} , "json");
					}, null, function(){
						
					},null, 400, "调整余额");
		}
	</script>
@stop
