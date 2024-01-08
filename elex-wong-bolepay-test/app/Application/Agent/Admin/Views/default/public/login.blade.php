<!DOCTYPE html>
<html class="no-js css-menubar" lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    
    <title>{{ Lang::get('common.site_title') }}</title>
    
    <link rel="shortcut icon" href="{{ Helper::resource('images/favicon.ico') }}">
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="{{ Helper::resource('css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ Helper::resource('css/bootstrap-extend.min.css') }}">
    <link rel="stylesheet" href="{{ Helper::resource('manage/login.css') }}">
    <link rel="stylesheet" href="{{ Helper::resource('vendor/ladda/ladda.css') }}">

    <!-- Fonts -->
    <link rel="stylesheet" href="{{ Helper::resource('fonts/web-icons/web-icons.min.css') }}">
    <link rel='stylesheet' href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,300italic">

    <!--[if lt IE 9]>
    <script src="{{ Helper::resource('vendor/html5shiv/html5shiv.min.js') }}"></script>
    <![endif]-->
    
    <!--[if lt IE 10]>
    <script src="{{ Helper::resource('vendor/media-match/media.match.min.js') }}"></script>
    <script src="{{ Helper::resource('vendor/respond/respond.min.js') }}"></script>
    <![endif]-->
  </head>
  <body class="login-body">
    <div id="login-large" class="login-large">
      <canvas id="login-canvas" width="100%" height="100%"></canvas>
      <div class="login-form">
        <div class="login-content">
          <form name="loginForm" id="loginForm" class="form-icons">
            <h2>
              {{ Lang::get('common.site_title') }}
            </h2>
            <div class="input-group input-group-lg">
              <i class="form-control-icon wb-user-circle"></i>
              <input type="text" name="name" class="form-control" placeholder="{{Lang::get('admin.login.name')}}">
            </div>
            <div class="input-group input-group-lg">
              <i class="form-control-icon wb-lock"></i>
              <input type="password" name="pwd" class="form-control" placeholder="{{Lang::get('admin.login.pwd')}}">
            </div>
            <div class="input-group input-group-lg">
              <i class="form-control-icon wb-grid-9"></i>
              <input type="text" name="code" class="form-control" placeholder="{{Lang::get('admin.login.google')}}">
            </div>
            <div class="input-group input-group-lg">
              <button type="submit" id="submitBtn" class="btn btn-lg btn-primary btn-block ladda-button" data-style="expand-right">{{ Lang::get('admin.login1') }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Core  -->
    <script src="{{ Helper::resource('vendor/jquery/jquery.js') }}"></script>
    <script src="{{ Helper::resource('manage/base.js') }}"></script>
    <script src="{{ Helper::resource('js/tweenlite.min.js') }}"></script>
    <script src="{{ Helper::resource('js/easepack.min.js') }}"></script>
    <script src="{{ Helper::resource('manage/login.js') }}"></script>
    <script src="{{ Helper::resource('vendor/popper-js/umd/popper.min.js') }}"></script>
    <script src="{{ Helper::resource('vendor/bootstrap/bootstrap.js') }}"></script>
    <script src="{{ Helper::resource('vendor/ladda/spin.min.js') }}"></script>
    <script src="{{ Helper::resource('vendor/ladda/ladda.min.js') }}"></script>
    <script src="{{ Helper::resource('vendor/toolbar/jquery.toolbar.min.js') }}"></script>
    
    <script>
      jQuery(function() {
        $('#loginForm').submit(function(){

          if ($.trim(this.name.value) == '') {
            $(this.name).focus();
            return false;
          }

          if ($.trim(this.pwd.value) == ''){
            $(this.pwd).focus();
            return false;
          }

          var ladda = Ladda.create($("#submitBtn").get(0));
          ladda.start();

          var form = this;
          $.ajaxPost("{{ Helper::url('Public/dologin') }}", $(this).serialize(), function(result){
            ladda.stop();
            if (result.status) {
              location.href = result.url;
            } else {
              if (result.data.field != '') {
                $.showTooltip($(form[result.data.field]), result.msg, null, 'right', 2000, 'danger');
              } else {
                $.showTooltip($("#submitBtn"), result.msg, null, 'right', 2000, 'danger');
              }
            }
          }, function(){
            ladda.stop();
            $.showTooltip($("#submitBtn"), "{{ Lang::get('admin.login.error') }}", null, 'right', 2000, 'danger');
          });
          return false;
        });
      });
    </script>
  </body>
</html>