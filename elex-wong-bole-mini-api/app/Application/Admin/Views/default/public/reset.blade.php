@extends('default._layouts.base')
@section('body')

<div class="page container" style="">
	<div class="y-login" style="height: 400px;">
		<nav id="" class="collapse navbar-collapse">
			<ul class="nav navbar-nav navbar-left employer-Login">
				<li><a href="{{ Helper::url('Public/login') }}" class="employer-Login f14" style="color:#999;padding-left: 5px;">Back</a></li>
			</ul>
		</nav>
		<div class="row" style="padding-top: 13px;">
			<div class="employer-Login mt20">
				<span style="color: #666;">Please enter your registered email or mobile number. <br> An verification code will sent to your account shortly.</span>
			</div>
			<div class="login-box">
				<form action="#">
					<div class="form-group y-account">
						<div class="">
							<input type="text" name="account" class="email-css" placeholder="Email address or mobile number" />
							<a class="email-button btn btn-sm fr" /> <!-- active -->
							Send
							</a>
						</div>
						<span class="error"></span>
					</div>
					<div class="form-group y-code">
						<div class="">
							<input type="text" name="code" class="number" placeholder="Enter the 4-digit code" maxlength="4"  />
						</div>
						<span class="error"></span>
					</div>

					<button type="button" class="btn btn-info button-pwd">
						<img src="{{Helper::resource('www/images/logo/tick.svg')}}" class="glyphicon-ok-circle none">
						<span class="show-save">Reset Password</span>
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
	<script type="text/javascript">
		$(function(){
			var times = 60;
			$(".email-button").click(function(){
				if($("input[name=account]").val().length < 8){
					$(".y-account").find(".error").html("Invalid Account !").fadeIn();
					return false;
				}

				if($(this).hasClass("banned")){
					return false;
				}else{
					var data = {};
					data.account 	= $("input[name=account]").val();
					$.post("{{Helper::url('UserAuth/sendcode')}}",data,function(result){
						if(result.status){
							$(".email-button").addClass("banned").html(times+"s");
							times--;
							var intv = setInterval(function(){
								if(times>0){
									$(".email-button").html(times+"s");
									times--;
								}else{
									clearInterval(intv);
									times = 60;
									$(".email-button").removeClass("banned").html("Resend");
								}

							},1000);
						}else{
							$(".y-account").find(".error").html("Send failed! Please try again later").fadeIn();
						}
					},"json");

				}
			});

			$(".button-pwd").click(function(){
				if($("input[name=code]").val().length != 4){
					$(".y-code").find(".error").html("Invalid code !").fadeIn();
					return false;
				}
				var data = {};
				data.account 	= $("input[name=account]").val();
				data.code 		= $("input[name=code]").val();
				$.post("{{Helper::url('UserAuth/verifycode')}}",data,function(result){
					if(result.status){
						setTimeout(function(){
							window.location.href = "{{ Helper::url('Public/pwd') }}";
						},500);
					}else{
						$(".y-code").find(".error").html(result.message).fadeIn();
					}
				},"json");

			});

			$(".y-login input").focus(function(){
				$(".y-login .error").fadeOut("slow");
			});

		});
	</script>
@stop
