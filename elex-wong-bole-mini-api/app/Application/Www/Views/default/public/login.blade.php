<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <link rel="stylesheet" href="{{ Helper::resource('static/vendor/bootstrap/bootstrap.min.css') }}?{{ $tpl_version }}">
    <link rel="stylesheet" href="{{ Helper::resource('static/fonts/web-icons/web-icons.min.css') }}?{{ $tpl_version }}">
    <title>{{ $site['name'] }}{{ $site_name }}</title>
    <style type="text/css">
    	html, body {height: 100%; background: #f1f1f1;}
    	.login-box{
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
    	}

    	h1{
    		text-align: center;
    		margin: 0;
    		padding: 0 0 30px 0;
    		font-size: 32px;
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
	<div class="login-box">
		<div class="lb-form">
			<form name="loginForm" id="loginForm">
			<h1>
				{{ $site['name'] }}{{ $site_name }}
			</h1>
			<div class="input-group input-group-lg">
			  <span class="input-group-addon"><i class="icon wb-user"></i></span>
			  <input type="text" name="name" class="form-control" placeholder="请输入管理员帐号">
			</div>
			<div class="input-group input-group-lg">
			  <span class="input-group-addon"><i class="icon wb-lock"></i></span>
			  <input type="password" name="pwd" class="form-control" placeholder="请输入管理员密码">
			</div>
			<div>
				<button id="submitBtn" type="submit" class="btn btn-success btn-lg btn-block">登　录</button>
			</div>
			</form>
		</div>
	</div>
  	<!-- Page -->
  	<div class="page" id="pageBox">
	    <div class="page-content container-fluid">
	      	@yield('body')
	    </div>
  	</div>
 	<!-- End Page -->
</body>
<script type="text/tpl" id="alertModalTpl">
<div class="modal fade" id="@{{=it.id}}" aria-hidden="true" role="dialog" tabindex="-1">
	<div class="modal-dialog modal-center" style="width:@{{=it.width}}px; margin-top: 20%;">
	  	<div class="modal-content">
		    <div class="modal-header">
		      	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
		      	<h4 class="modal-title">@{{=it.title}}</h4>
		    </div>
		    <div class="modal-body">
		      	<p>@{{=it.msg}}</p>
		    </div>
	  	</div>
	</div>
</div>
</script>
<script type="text/javascript">
jQuery(function($){
	$('#loginForm').submit(function(){
		if ($.trim(this.name.value) == '') {
			$.showTooltip($(this.name),"请输入管理员帐号", null, 'auto top');
			return false;
		}

		if ($.trim(this.pwd.value) == ''){
			$.showTooltip($(this.pwd),"请输入管理员密码", null, 'auto top');
			return false;
		}

		var form = this;
		$("#submitBtn").button('loading');
		$.ajaxPost("{{ Helper::url('Public/dologin') }}", $(this).serialize(), function(result){
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