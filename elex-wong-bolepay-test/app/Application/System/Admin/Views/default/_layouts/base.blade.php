@if(!$is_ajax_request)
<!DOCTYPE html>
<html class="no-js css-menubar" lang="zh">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">

  <title>{{ Lang::get('common.site_title') }}</title>
  <link rel="shortcut icon" href="{{ Helper::resource('favicon.ico') }}">

  <!-- Stylesheets -->
  <link rel="stylesheet" href="{{ Helper::resource('css/bootstrap.min.css') }}">
  <link rel="stylesheet" href="{{ Helper::resource('css/bootstrap-extend.min.css') }}">
  <link rel="stylesheet" href="{{ Helper::resource('css/site.min.css') }}">
  <link rel="stylesheet" href="{{ Helper::resource('manage/base.css') }}">

  <!-- Plugins -->
  <link rel="stylesheet" href="{{ Helper::resource('vendor/animsition/animsition.css') }}">
  <link rel="stylesheet" href="{{ Helper::resource('vendor/asscrollable/asScrollable.css') }}">
  <link rel="stylesheet" href="{{ Helper::resource('vendor/switchery/switchery.css') }}">
  <link rel="stylesheet" href="{{ Helper::resource('vendor/intro-js/introjs.css') }}">
  <link rel="stylesheet" href="{{ Helper::resource('vendor/slidepanel/slidePanel.css') }}">
  <link rel="stylesheet" href="{{ Helper::resource('vendor/flag-icon-css/flag-icon.css') }}">
  <link rel="stylesheet" href="{{ Helper::resource('vendor/waves/waves.css') }}">
  <link rel="stylesheet" href="{{ Helper::resource('vendor/ladda/ladda.css') }}">
  <link rel="stylesheet" href="{{ Helper::resource('vendor/select2/select2.css') }}">
  <link rel="stylesheet" href="{{ Helper::resource('vendor/kindeditor/themes/default/default.css') }}">

  <link rel="stylesheet" href="{{ Helper::resource('vendor/datatables/datatables.min.css') }}">

  <!-- Page -->
  <link rel="stylesheet" href="{{ Helper::resource('vendor/formvalidation/formValidation.css') }}">
  <link rel="stylesheet" href="{{ Helper::resource('vendor/bootstrap-datepicker/bootstrap-datepicker.min.css') }}">
  <link rel="stylesheet" href="{{ Helper::resource('vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css') }}">
  <link rel="stylesheet" href="{{ Helper::resource('vendor/jquery.timepicker/jquery.timepicker.css') }}">
  <link rel="stylesheet" href="{{ Helper::resource('vendor/asspinner/asSpinner.css') }}">
  <link rel="stylesheet" href="{{ Helper::resource('vendor/bootstrap-touchspin/bootstrap-touchspin.css') }}">

  <!-- Fonts -->
  <link rel="stylesheet" href="{{ Helper::resource('fonts/material-design/material-design.min.css') }}">
  <link rel="stylesheet" href="{{ Helper::resource('fonts/brand-icons/brand-icons.min.css') }}">
  <link rel="stylesheet" href="{{ Helper::resource('fonts/font-awesome/font-awesome.min.css') }}">
  <link rel="stylesheet" href="{{ Helper::resource('fonts/web-icons/web-icons.min.css') }}">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,300italic">

  <!--[if lt IE 9]>
  <script src="{{ Helper::resource('vendor/html5shiv/html5shiv.min.js') }}"></script>
  <![endif]-->

  <!--[if lt IE 10]>
  <script src="{{ Helper::resource('vendor/media-match/media.match.min.js') }}"></script>
  <script src="{{ Helper::resource('vendor/respond/respond.min.js') }}"></script>
  <![endif]-->

  <!-- Scripts -->
  <script src="{{ Helper::resource('vendor/babel-external-helpers/babel-external-helpers.js') }}"></script>
  <script src="{{ Helper::resource('vendor/popper-js/umd/popper.min.js') }}"></script>
  <script src="{{ Helper::resource('vendor/jquery/jquery.min.js') }}"></script>
  <script src="{{ Helper::resource('manage/base.js') }}"></script>
  <script src="{{ Helper::resource('vendor/bootstrap/bootstrap.min.js') }}"></script>
  <script src="{{ Helper::resource('vendor/kindeditor/kindeditor-min.js') }}"></script>
  <script src="{{ Helper::resource('vendor/kindeditor/lang/zh_CN.js') }}"></script>
  <script src="{{ Helper::resource('vendor/breakpoints/breakpoints.js') }}"></script>
  <script src="{{ Helper::resource('vendor/json3.min.js') }}"></script>
  <script>
    var RUN_FUNCS = [];
    var SITE_URL  = "{{ Helper::url('/') }}";
    var CURR_CONTROLLER  = "{{ APP_CONTROLLER_NAME }}";
    var CURR_ACTION  = "{{ APP_ACTION_NAME }}";
    Breakpoints();
  </script>
  @yield('header')
</head>
<body class="animsition">
  <nav class="site-navbar navbar navbar-default navbar-fixed-top navbar-mega" role="navigation">
    <div class="navbar-header">
      <button type="button" class="navbar-toggler hamburger hamburger-close navbar-toggler-left hided"
        data-toggle="menubar">
        <span class="sr-only">Toggle navigation</span>
        <span class="hamburger-bar"></span>
      </button>
      <button type="button" class="navbar-toggler collapsed" data-target="#site-navbar-collapse"
        data-toggle="collapse">
        <i class="icon md-more" aria-hidden="true"></i>
      </button>
      <div class="navbar-brand navbar-brand-center site-gridmenu-toggle" data-toggle="gridmenu">
        <img class="navbar-brand-logo" src="{{ Helper::resource('images/logo.png') }}">
        <span class="navbar-brand-text hidden-xs-down"> {{ Lang::get('common.site_name') }}</span>
      </div>
    </div>

    <div class="navbar-container container-fluid">
      <!-- Navbar Collapse -->
      <div class="collapse navbar-collapse navbar-collapse-toolbar" id="site-navbar-collapse">
        <!-- Navbar Toolbar -->
        <ul class="nav navbar-toolbar">
          <li class="nav-item hidden-float" id="toggleMenubar">
            <a class="nav-link" data-toggle="menubar" href="#" role="button">
              <i class="icon hamburger hamburger-arrow-left">
                <span class="sr-only">Toggle menubar</span>
                <span class="hamburger-bar"></span>
              </i>
            </a>
          </li>
          <li class="nav-item hidden-sm-down" id="toggleFullscreen">
            <a class="nav-link icon icon-fullscreen" data-toggle="fullscreen" href="#" role="button">
              <span class="sr-only">Toggle fullscreen</span>
            </a>
          </li>
          <li class="nav-item hidden-float">
            <ol class="breadcrumb" style="margin:0.8em 0 0 0;">
              <php>
                $icon = '<i class="icon wb-home"></i>';
              </php>
              @foreach ($_now_navs as $_now_nav)
              <li class="breadcrumb-item"><a href="{{ Helper::url($_now_nav['url']) }}">{!! $icon !!}{{ Lang::replaceLang($_now_nav['name'][$locale]) }}</a></li>
              <php>
                $icon = '';
              </php>
              @endforeach
              <li class="breadcrumb-item active">{{ Lang::replaceLang($_now_node['name'][$locale]) }}</li>
            </ol>
          </li>
        </ul>
        <!-- End Navbar Toolbar -->

        <!-- Navbar Toolbar Right -->
        <ul class="nav navbar-toolbar navbar-right navbar-toolbar-right"> 
          <li class="nav-item dropdown">
            <a class="nav-link navbar-avatar" data-toggle="dropdown" href="#" aria-expanded="false" data-animation="scale-up" role="button">
              <span class="avatar avatar-online">
                <img src="{{ Helper::resource('images/avatar.jpg') }}" alt="...">
              </span>
              <span> {{ $login_admin['name'] }}</span>
            </a>
            <div class="dropdown-menu" role="menu">
              <a class="dropdown-item" href="{{ Helper::url('Index/repwd') }}" role="menuitem"><i class="icon wb-user" aria-hidden="true"></i> {{Lang::get("admin.update_pwd")}}</a>
              <div class="dropdown-divider" role="presentation"></div>
              <a class="dropdown-item" href="{{ Helper::url('Public/logout') }}" role="menuitem"><i class="icon wb-power" aria-hidden="true"></i> {{Lang::get("admin.logout")}}</a>
            </div>
          </li>
        </ul>
        <!-- End Navbar Toolbar Right -->
      </div>
      <!-- End Navbar Collapse -->
    </div>
  </nav>
  <div class="site-menubar">
    <div class="site-menubar-body">
      <div>
        <div>
          @include('default._layouts.menu')
        </div>
      </div>
    </div>
  </div>

  <!-- Page -->
  <div class="page" id="pageBox">
    <div class="page-content container-fluid">
@endif
      @yield('body')
@if(!$is_ajax_request)
    </div>
  </div>
  <!-- End Page -->

  <!-- Footer -->
  <footer class="site-footer">
    <div class="site-footer-legal">© 2019 {{ Lang::get('common.site_name') }}</div>
    <div class="site-footer-right"></div>
  </footer>

  <script type="text/tpl" id="confirmModalTpl">
    <div class="modal fade" id="@{{=it.id}}" aria-hidden="true" role="dialog" tabindex="-1">
      <div class="modal-dialog modal-center" style="width:@{{=it.width}}px;">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">@{{=it.title}}</h4>
          </div>
          <div class="modal-body">
            @{{=it.msg}}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            @{{? it.url}}
            <a target="_blank" href="@{{=it.url}}" class="btn btn-primary">@{{=it.confirmText}}</a>
            @{{??}}
            <button type="button" class="btn btn-primary">@{{=it.confirmText}}</button>
            @{{?}}
          </div>
        </div>
      </div>
    </div>
  </script>
  <script type="text/tpl" id="alertModalTpl">
  <div class="modal fade" id="@{{=it.id}}" aria-hidden="true" role="dialog" tabindex="-1">
    <div class="modal-dialog modal-center" style="width:@{{=it.width}}px;">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 class="modal-title">@{{=it.title}}</h4>
        </div>
        <div class="modal-body">
          @{{=it.msg}}
        </div>
      </div>
    </div>
  </div>
  </script>

  <!-- Core  -->
  <script src="{{ Helper::resource('vendor/dot/dot.min.js') }}"></script>
  <script src="{{ Helper::resource('vendor/animsition/animsition.js') }}"></script>
  <script src="{{ Helper::resource('vendor/mousewheel/jquery.mousewheel.js') }}"></script>
  <script src="{{ Helper::resource('vendor/asscrollbar/jquery-asScrollbar.js') }}"></script>
  <script src="{{ Helper::resource('vendor/asscrollable/jquery-asScrollable.js') }}"></script>
  <script src="{{ Helper::resource('vendor/ashoverscroll/jquery-asHoverScroll.js') }}"></script>
  <script src="{{ Helper::resource('vendor/waves/waves.js') }}"></script>

  <!-- Plugins -->
  <script src="{{ Helper::resource('vendor/switchery/switchery.js') }}"></script>
  <script src="{{ Helper::resource('vendor/intro-js/intro.js') }}"></script>
  <script src="{{ Helper::resource('vendor/screenfull/screenfull.js') }}"></script>
  <script src="{{ Helper::resource('vendor/slidepanel/jquery-slidePanel.js') }}"></script>
  <script src="{{ Helper::resource('vendor/jquery-placeholder/jquery.placeholder.js') }}"></script>
  <script src="{{ Helper::resource('vendor/ladda/spin.min.js') }}"></script>
  <script src="{{ Helper::resource('vendor/ladda/ladda.min.js') }}"></script>
  <script src="{{ Helper::resource('vendor/formvalidation/formValidation.min.js') }}"></script>
  <script src="{{ Helper::resource('vendor/formvalidation/framework/bootstrap4.min.js') }}"></script>
  <script src="{{ Helper::resource('vendor/bootstrap-datepicker/bootstrap-datepicker.min.js') }}"></script>
  <script src="{{ Helper::resource('vendor/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js') }}"></script>
  <script src="{{ Helper::resource('vendor/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js') }}"></script>
  <script src="{{ Helper::resource('vendor/jquery.timepicker/jquery.timepicker.js') }}"></script>
  <script src="{{ Helper::resource('vendor/asspinner/jquery-asSpinner.min.js') }}"></script>
  <script src="{{ Helper::resource('vendor/bootstrap-touchspin/bootstrap-touchspin.min.js') }}"></script>

  <script src="{{ Helper::resource('vendor/datatables/datatables.min.js') }}"></script>

  <!-- Scripts -->
  <script src="{{ Helper::resource('js/Component.js') }}"></script>
  <script src="{{ Helper::resource('js/Plugin.js') }}"></script>
  <script src="{{ Helper::resource('js/Base.js') }}"></script>
  <script src="{{ Helper::resource('js/Config.js') }}"></script>

  <script src="{{ Helper::resource('js/Section/Menubar.js') }}"></script>
  <script src="{{ Helper::resource('js/Section/GridMenu.js') }}"></script>
  <script src="{{ Helper::resource('js/Section/Sidebar.js') }}"></script>
  <script src="{{ Helper::resource('js/Section/PageAside.js') }}"></script>
  <script src="{{ Helper::resource('js/Plugin/menu.js') }}"></script>
  <script src="{{ Helper::resource('js/config/colors.js') }}"></script>
  <script src="{{ Helper::resource('js/config/tour.js') }}"></script>

  <!-- Page -->
  <script src="{{ Helper::resource('js/Site.js') }}"></script>
  <script src="{{ Helper::resource('js/Plugin/asscrollable.js') }}"></script>
  <script src="{{ Helper::resource('js/Plugin/slidepanel.js') }}"></script>
  <script src="{{ Helper::resource('js/Plugin/switchery.js') }}"></script>
  <script src="{{ Helper::resource('js/Plugin/jquery-placeholder.js') }}"></script>
  <script src="{{ Helper::resource('js/Plugin/material.js') }}"></script>
  <script src="{{ Helper::resource('js/Plugin/loading-button.js') }}"></script>
  <script src="{{ Helper::resource('js/Plugin/ladda.js') }}"></script>
  <script src="{{ Helper::resource('js/Plugin/asspinner.js') }}"></script>
  <script src="{{ Helper::resource('js/Plugin/bootstrap-touchspin.js') }}"></script>

  @yield('footer')
  <script>
    (function(document, window, $){
      'use strict';
  
      var Site = window.Site;
      $(document).ready(function(){
        Site.run();

        $(".date").datetimepicker({
          format: 'yyyy-mm-dd',
          language:'zh-CN',
          autoclose: true,
          todayBtn: true,
          minView: "month"
        });

        $(".datetime").datetimepicker({
          format: 'yyyy-mm-dd hh:ii:ss',
          language:'zh-CN',
          autoclose: true,
          todayBtn: true,
          showSecond:1,
          minView: 0,
          minuteStep: 1
        });

        $('.daytime').timepicker({
          timeFormat: 'HH:mm',
          interval: 1,
          minTime: '00:00',
          maxTime: '23:59',
          startTime: '00:00',
          dynamic: false,
          dropdown: true,
          scrollbar: true
        });
        
        $('#exportBtn').click(function () {
          var form = $(this).parents('form');
          console.log(form);
          var action = form.attr('action');
          form.attr('target', '_blank');
          form.attr('action', '{!! Helper::url(APP_CONTROLLER_NAME."/export") !!}');
          form.get(0).submit();
          form.attr('target', '_self');
          form.attr('action', action);
        });

        if (RUN_FUNCS.length > 0) {
          for(var i = 0; i < RUN_FUNCS.length; i++) {
            RUN_FUNCS[i].call();
          }
        }

        var verifyCodeLimitTime = {{ Config::get('app.verify_code_limit_time') }};
        $(document).on('click', "#sendMailVerifyCode", function () {
          var ladda = Ladda.create(this);
          ladda.start();
          $.ajaxPost("{{ Helper::url('Index/sendMailVerifyCode') }}", {"action":$(this).data('action')}, (result) => {
            var func = (time) => {
              if (time > 0) {
                $(this).attr('disabled', true);
                $(this).text("{{ Lang::get('admin.send_success') }}" + "(" + time + ")");
                time--;
                setTimeout(function(){
                  func(time);
                }, 1000);
              } else {
                $(this).attr('disabled', false);
                $(this).text("{{ Lang::get('admin.verify.send_code') }}");
              }
            };

            ladda.stop();
            if (result.status) {
              func(verifyCodeLimitTime);
            } else {
              $.showError(result.msg);
              if (typeof result.data.field.time != "undefined") {
                func(result.data.field.time);
              }
            }
          }, function(){
            ladda.stop();
          });
        });

        $('.validate-form').formValidation({
          framework: 'bootstrap4',
          err: {
            clazz: 'invalid-feedback'
          },
          control: {
            valid: 'is-valid',
            invalid: 'is-invalid'
          },
          row: {
            invalid: 'has-danger'
          },
          onSuccess: function(e) {
            var form = $(e.target);
            if (form.hasClass("ajax-form")) {
              e.preventDefault();
              var fv = form.data('formValidation');
              fv.disableSubmitButtons(true);
              KindEditor.sync('.tpl-editor');
              var action = e.target.action;
              var ajaxForm = function(action, form_data) {
                $.ajaxPost(action, form_data, function(result){
                  if (result.status) {
                    var func = function() {
                      if (result.url) {
                        location.href = result.url;
                      } else {
                        location.reload(true);
                      }
                    };
                    $.showSuccess(result.msg, 300, func);
                    setTimeout(function(){
                      func();
                    }, 3000);
                  } else {
                    var result_handle = false;
                    if (typeof APP.validateResult == 'function') {
                      result_handle = APP.validateResult.call(this, form, fv, result.data.field, result.msg);
                    }

                    if (!result_handle) {
                      var field = false;
                      if (result.data.field) {
                        field = form.find("[name='" + result.data.field + "']");
                      }
                      if (field && field.length > 0) {
                        console.log(fv);
                        fv.updateMessage(result.data.field, 'blank', result.msg);
                        fv.updateStatus(result.data.field, 'INVALID', 'blank');
                        field.focus();
                      } else {
                        $.showError(result.msg);
                      }
                    }
                  }
                  fv.disableSubmitButtons(false);
                }, function(){
                  fv.disableSubmitButtons(false);
                  $.showError("{{Lang::get('common.error_msg')}}");
                });
              }

              if (typeof APP.validateForm == 'function') {
                APP.validateForm.call(this, function() {
                  ajaxForm(action, form.serialize());
                });
              } else {
                ajaxForm(action, form.serialize());
              }
            }
          }
        });
      });
    })(document, window, jQuery);
  </script>
</body>
</html>
@endif