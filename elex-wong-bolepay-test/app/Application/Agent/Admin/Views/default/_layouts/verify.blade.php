<div class="form-row" style="padding-left:5px;">
	<!--<tpl:fitem label="%admin.verify.email_code" bcss="form-inline" pstyle="margin-right:50px;" required="true" tip="%admin.verify.email_code_tip">
		<div class="input-group">
			@if(IS_DEV_MODE)
			<input type="text" name="email_code" class="form-control" value="123123" style="width:100px;" data-fv-blank="true" data-fv-notempty="true" data-fv-notempty-message="{{ Lang::get('admin.verify.please_enter_email_code') }}">
			@else
			<input type="text" name="email_code" class="form-control" style="width:100px;" data-fv-blank="true" data-fv-notempty="true" data-fv-notempty-message="{{ Lang::get('admin.verify.please_enter_email_code') }}">
			@endif
			<span class="input-group-append">
				<button type="button" class="btn btn-primary waves-effect waves-classic ladda-button" data-style="expand-right" id="sendMailVerifyCode" data-action="{{ $_tpl_action }}">{{ Lang::get('admin.verify.send_code') }}</button>
			</span>
		</div>
	</tpl:fitem>-->
	<tpl:fitem label="%admin.verify.google_code" bcss="form-inline" required="true">
		<div class="input-group">
			@if(IS_DEV_MODE)
			<input type="text" name="google_code" class="form-control" value="123123" style="width:150px;" data-fv-blank="true" data-fv-notempty="true" data-fv-notempty-message="{{ Lang::get('admin.verify.please_enter_google_code') }}">
			@else
			<input type="text" name="google_code" class="form-control" style="width:150px;" data-fv-blank="true" data-fv-notempty="true" data-fv-notempty-message="{{ Lang::get('admin.verify.please_enter_google_code') }}">
			@endif
		</div>
	</tpl:fitem>
</div>