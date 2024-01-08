@extends('default._layouts.base')
@section('body')
<div class="page container" style="">
	<div class="y-login" style="height: 400px;padding-top: 60px;">
		<div class="row">
			<div class="talent-Login text-center" style="margin-bottom: 21px;">
				<span>Reset Password</span>
			</div>
			<div class="login-box">
				<form action="#">
					<div class="form-group y-password">
						<div class="">
							<input type="password" name="password_new" maxlength="32" placeholder="New Password:( 8-character minimum; case sensitive )" />
						</div>
						<span class="error"></span>
					</div>
					<div class="form-group y-password-re">
						<div class="">
							<input type="password" name="password_reenter" maxlength="32" placeholder="Reenter Password" />
						</div>
						<span class="error"></span>
					</div>
					<button type="button" class="btn btn-info button-pwd"> <!-- active -->
						<img src="{{ Helper::resource('www/images/logo/tick.svg') }}" class="glyphicon-ok-circle none">
						<span class="show-save">Save</span><!-- Saved -->
					</button>
				</form>
			</div>
			<div class="login-box">

			</div>
			<div class="login-box">

			</div>
		</div>

	</div>
</div>
@stop
@section('js')
<script>
	$(function(){
		$(".button-pwd").click(function(){
			if($("input[name=password_new]").val().length < 8){
				$(".y-password").find(".error").html("Please enter more than 8 chars !").fadeIn();
				return false;
			}
			if($("input[name=password_new]").val() != $("input[name=password_reenter]").val()){
				$(".y-password-re").find(".error").html("Please enter the same password !").fadeIn();
				return false;
			}
			var data = {};
			data.password_new 	= $("input[name=password_new]").val();
			data.password_reenter 	= $("input[name=password_reenter]").val();

			$.post("{{Helper::url('UserAuth/changepassword')}}",data,function(result){
				if(result.status){
					$(this).addClass("active");
					$(this).find(".glyphicon-ok-circle").removeClass("none");
					$(this).find(".show-save").html(" Saved");
					setTimeout(function(){
						window.location.href = "{{ Helper::url('Public/login') }}";
					},500);
				}else{
					$(".y-password").find(".error").html("Save failed!").fadeIn();
				}
			},"json");

		});
		$(".y-login input").focus(function(){
			$(".y-login .error").fadeOut("slow");
		});
	})
</script>
@stop
