<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <link rel="stylesheet" href="{{ Helper::resource('static/vendor/bootstrap/bootstrap.min.css') }}?{{ $tpl_version }}">
    <link rel="stylesheet" href="{{ Helper::resource('static/fonts/web-icons/web-icons.min.css') }}?{{ $tpl_version }}">
    <title>{{ $site['name'] }}{{ $site_name }}注册</title>
    <style type="text/css">
    	html, body {height: 100%; background: #f1f1f1;}
    	.reg-box{
    		display: -webkit-flex;
  			display: flex;
  			flex-direction: column;
  			justify-content: center;
  			align-items: center;
  			height: 100%;
    	}

    	.lb-form{
    		width: 420px;
    		background: #fff;
    		border-radius: 4px;
    		overflow: hidden;
    		padding:40px;
    	}

    	.input-group{
    		margin-bottom:20px;
    	}

    	.input-group-addon {
    		padding: 6px 15px!important;
    		width: 120px;
    	}

    	h1{
    		text-align: center;
    		margin: 0;
    		padding: 0 0 30px 0;
    		font-size: 32px;
    	}
    	.require{
    		color: red;
    		padding: 5px;
    	}
    </style>
	<!--[if lt IE 9]>
	<script src="{{ Helper::resource('static/vendor/html5shiv/html5shiv.min.js') }}?{{ $tpl_version }}"></script>
	<![endif]-->

	<!--[if lt IE 10]>
	<script src="{{ Helper::resource('static/vendor/media-match/media.match.min.js') }}?{{ $tpl_version }}"></script>
	<script src="{{ Helper::resource('static/vendor/respond/respond.min.js') }}?{{ $tpl_version }}"></script>
	<![endif]-->

	<!-- Scripts -->
	<script src="{{ Helper::resource('static/vendor/jquery/jquery.min.js') }}?{{ $tpl_version }}"></script>
	<script src="{{ Helper::resource('manage/js/base.js') }}?{{ $tpl_version }}"></script>
	<script src="{{ Helper::resource('static/vendor/bootstrap/bootstrap.min.js') }}?{{ $tpl_version }}"></script>
</head>
<body>
	<div class="reg-box">
		<div class="lb-form">
			<form name="regForm" id="regForm">
			<h1>
				{{ $site['name'] }}{{ $site_name }}注册
			</h1>
			<div class="input-group input-group-lg">
			  <span class="input-group-addon"><i class="require">*</i>账户</span>
			  <input type="text" name="name" class="form-control" placeholder="请输入代理帐号">
			</div>
			<div class="input-group input-group-lg">
			  <span class="input-group-addon"><i class="require">*</i>真实姓名</span>
			  <input type="text" name="realname" class="form-control" placeholder="请输入提款真实姓名">
			</div> 
			<div class="input-group input-group-lg">
			  <span class="input-group-addon"><i class="require">*</i>密码</span>
			  <input type="password" name="pwd" class="form-control" placeholder="请输入密码">
			</div>
			<div class="input-group input-group-lg">
			  <span class="input-group-addon"><i class="require">*</i>确认密码</span>
			  <input type="password" name="repwd" class="form-control" placeholder="请再次输入密码">
			</div>
			<div class="input-group input-group-lg">
			  <span class="input-group-addon"><i class="require">*</i>电话</span>
			  <input type="text" name="mobile" class="form-control" placeholder="请输入联系电话">
			</div>
			<div class="input-group input-group-lg">
			  <span class="input-group-addon"><i class="require">*</i>邮箱</span>
			  <input type="text" name="email" class="form-control" placeholder="请输入邮箱地址">
			</div>
			<div class="input-group input-group-lg">
			  <span class="input-group-addon">QQ</span>
			  <input type="text" name="qq" class="form-control" placeholder="请输入QQ号码">
			</div>
			<div class="input-group input-group-lg">
			  <span class="input-group-addon">微信</span>
			  <input type="text" name="weixin" class="form-control" placeholder="请输入微信号码">
			</div>
			<div>
				<button id="submitBtn" type="submit" class="btn btn-success btn-lg btn-block">注　册</button>
			</div>
			</form>
		</div>
	</div>
	<div class="modal fade" id="alertModal" aria-hidden="true" role="dialog" tabindex="-1">
		<div class="modal-dialog modal-center">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
				<h4 class="modal-title"></h4>
			</div>
			<div class="modal-body">
				<p></p>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript">
jQuery(function($){
	$('#regForm').submit(function(){
		if ($.trim(this.name.value) == '') {
			$.showTooltip($(this.name),"请输入帐号", null, 'auto top');
			return false;
		}

		if ($.trim(this.realname.value) == '') {
			$.showTooltip($(this.realname),"请输入提款真实姓名", null, 'auto top');
			return false;
		}

		if ($.trim(this.pwd.value) == ''){
			$.showTooltip($(this.pwd),"请输入密码", null, 'auto top');
			return false;
		} 

		if ($.trim(this.pwd.value).length < 6 || $.trim(this.pwd.value).length > 20){
			$.showTooltip($(this.pwd),"密码长度错误", null, 'auto top');
			return false;
		}

		if ($.trim(this.repwd.value) == ''){
			$.showTooltip($(this.repwd),"请再次输入密码", null, 'auto top');
			return false;
		} 

		if ($.trim(this.repwd.value) != $.trim(this.pwd.value)){
			$.showTooltip($(this.repwd),"两次密码不一致", null, 'auto top');
			return false;
		}

		if ($.trim(this.mobile.value) == '' || !(/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/.test($.trim(this.mobile.value))) ){
			$.showTooltip($(this.mobile),"请输入正确联系电话", null, 'auto top');
			return false;
		} 

		if ($.trim(this.email.value) == '' || !( /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/.test($.trim(this.email.value))) ){
			$.showTooltip($(this.email),"请输入正确邮箱地址", null, 'auto top');
			return false;
		}  
		console.log($(this).serialize());
		return false;
		var form = this;
		$("#submitBtn").button('loading');
		$.ajaxPost("{{ Helper::url('Public/doreg') }}", $(this).serialize(), function(result){
			console.log(result);
			$("#submitBtn").button('reset');
			if (result.status) {
				location.href = result.url;
			} else {
				if (result.data.field != '') {
					$.showTooltip($(form[result.data.field]), result.msg, null, 'auto top');
				} else {
					$.showError(result.msg);
				}
			}
		}, function(){
			$("#submitBtn").button('reset');
			$.showError("登录发生错误，请重新登录");
		});
		return false;
	});
});
</script>
</html>