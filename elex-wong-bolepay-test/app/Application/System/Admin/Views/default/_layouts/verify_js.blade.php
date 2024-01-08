/*var emailCode = $.trim($('#emailVerifyCode').val());
if (emailCode.length != 6) {
	$.showTooltip($('#sendMailVerifyCode'), "{{ Lang::get('admin.verify.please_enter_email_code') }}", null, 'right', 3000, 'danger');
	return false;
}*/

var googleCode = $.trim($('#googleVerifyCode').val());
if (googleCode.length != 6) {
	$.showTooltip($('#googleVerifyCode'), "{{ Lang::get('admin.verify.please_enter_google_code') }}", null, 'right', 3000, 'danger');
	return false;
}