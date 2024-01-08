<!--<div class="form-group row">
	<label class="col-md-4 form-control-label" style="flex: 0 0 {{ $_tpl_width }}px;">{{ Lang::get('admin.verify.email_code') }}<span class="required text-danger">*</span>: </label>
	<div class="col-md-8">
		<div class="input-group">
			@if(IS_DEV_MODE)
			<input type="text" id="emailVerifyCode" name="email_code" value="123123" class="form-control">
			@else
			<input type="text" id="emailVerifyCode" name="email_code" class="form-control">
			@endif
			<span class="input-group-append">
				<button type="button" class="btn btn-primary waves-effect waves-classic ladda-button" data-style="expand-right" id="sendMailVerifyCode" data-action="{{ $_tpl_action }}">{{ Lang::get('admin.verify.send_code') }}</button>
			</span>
		</div>
		<small class="form-text text-danger">{{ Lang::get('admin.verify.email_code_tip') }}</small>
	</div>
</div>-->
<div class="form-group row">
	<label class="col-md-4 form-control-label" style="flex: 0 0 {{ $_tpl_width }}px;">{{ Lang::get('admin.verify.google_code') }}<span class="required text-danger">*</span>: </label>
	<div class="col-md-8">
		@if(IS_DEV_MODE)
		<input type="text" id="googleVerifyCode" name="google_code" value="123123" class="form-control" >
		@else
		<input type="text" id="googleVerifyCode" name="google_code" class="form-control" >
		@endif
	</div>
</div>