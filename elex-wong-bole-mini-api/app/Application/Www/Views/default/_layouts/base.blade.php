<!DOCTYPE html>
<html class="no-js css-menubar" lang="zh">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
  <meta name="description" content="bootstrap admin template">
  <meta name="author" content="">

  <title>{{ $site['name'] }}{{ $site_name }}</title>

  <link rel="shortcut icon" href="{{ Helper::resource('favicon.ico') }}">

  <!-- Stylesheets -->
  <link rel="stylesheet" href="{{ Helper::resource('static/vendor/bootstrap/bootstrap.min.css') }}?{{ $tpl_version }}">
  <link rel="stylesheet" href="{{ Helper::resource('manage/css/bootstrap-extend.min.css') }}?{{ $tpl_version }}">
  <link rel="stylesheet" href="{{ Helper::resource('manage/css/site.min.css') }}?{{ $tpl_version }}">

  <!-- Plugins -->
  <link rel="stylesheet" href="{{ Helper::resource('static/vendor/animsition/animsition.min.css') }}?{{ $tpl_version }}">
  <link rel="stylesheet" href="{{ Helper::resource('static/vendor/asscrollable/asScrollable.min.css') }}?{{ $tpl_version }}">
  <link rel="stylesheet" href="{{ Helper::resource('static/vendor/switchery/switchery.min.css') }}?{{ $tpl_version }}">
  <link rel="stylesheet" href="{{ Helper::resource('static/vendor/intro-js/introjs.min.css') }}?{{ $tpl_version }}">
  <link rel="stylesheet" href="{{ Helper::resource('static/vendor/slidepanel/slidePanel.min.css') }}?{{ $tpl_version }}">
  <link rel="stylesheet" href="{{ Helper::resource('static/vendor/flag-icon-css/flag-icon.min.css') }}?{{ $tpl_version }}">
  <link rel="stylesheet" href="{{ Helper::resource('static/vendor/select2/select2.min.css') }}?{{ $tpl_version }}">

  <!-- Page -->
  <link rel="stylesheet" href="{{ Helper::resource('static/vendor/blueimp-file-upload/jquery.fileupload.min.css') }}?{{ $tpl_version }}">
  <link rel="stylesheet" href="{{ Helper::resource('static/vendor/dropify/dropify.min.css') }}?{{ $tpl_version }}">
  <link rel="stylesheet" href="{{ Helper::resource('static/vendor/formvalidation/formValidation.min.css') }}?{{ $tpl_version }}">
  <link rel="stylesheet" href="{{ Helper::resource('static/vendor/datatables-bootstrap/dataTables.bootstrap.min.css') }}?{{ $tpl_version }}">
  <link rel="stylesheet" href="{{ Helper::resource('static/vendor/datatables-fixedheader/dataTables.fixedHeader.min.css') }}?{{ $tpl_version }}">
  <link rel="stylesheet" href="{{ Helper::resource('static/vendor/datatables-responsive/dataTables.responsive.min.css') }}?{{ $tpl_version }}">
  <link rel="stylesheet" href="{{ Helper::resource('manage/css/uikit/modals.min.css') }}?{{ $tpl_version }}">

  <!-- Fonts -->
  <link rel="stylesheet" href="{{ Helper::resource('static/fonts/web-icons/web-icons.min.css') }}?{{ $tpl_version }}">
  <link rel="stylesheet" href="{{ Helper::resource('static/fonts/glyphicons/glyphicons.min.css') }}?{{ $tpl_version }}">
  <link rel="stylesheet" href="{{ Helper::resource('static/fonts/brand-icons/brand-icons.min.css') }}?{{ $tpl_version }}">
  <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,300italic'>
  <link rel="stylesheet" href="{{ Helper::resource('static/fonts/weather-icons/weather-icons.min.css') }}?{{ $tpl_version }}">
  <link rel="stylesheet" href="{{ Helper::resource('static/fonts/font-awesome/font-awesome.min.css') }}?{{ $tpl_version }}">

  <!-- datepicker -->
  <link rel="stylesheet" href="{{ Helper::resource('static/vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css') }}?{{ $tpl_version }}">
  <link rel="stylesheet" href="{{ Helper::resource('static/vendor/jsgrid/jsgrid.min.css') }}?{{ $tpl_version }}">
  <link rel="stylesheet" href="{{ Helper::resource('static/vendor/dropify/dropify.min.css') }}?{{ $tpl_version }}">
  <link rel="stylesheet" href="{{ Helper::resource('static/vendor/summernote/summernote.min.css') }}?{{ $tpl_version }}">

  <link rel="stylesheet" href="{{ Helper::resource('static/vendor/bootstrap-maxlength/bootstrap-maxlength.min.css') }}?{{ $tpl_version }}">
  <link rel="stylesheet" href="{{ Helper::resource('static/vendor/typeahead-js/typeahead.min.css') }}?{{ $tpl_version }}">


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
  <script src="{{ Helper::resource('static/vendor/modernizr/modernizr.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('static/vendor/breakpoints/breakpoints.min.js') }}?{{ $tpl_version }}"></script>
  <script>
    var RUN_FUNCS = [];
    var SITE_URL  = "{{ Helper::url('/') }}";
    var CURR_CONTROLLER  = "{{ APP_CONTROLLER_NAME }}";
    var CURR_ACTION  = "{{ APP_ACTION_NAME }}";
    Breakpoints();
  </script>
  <style type="text/css">
    .list-table table td, .list-table table th{background:#fff; text-align:center;}
  </style>
  @yield('header')
</head>
<body class="dashboard">
  <!--[if lt IE 8]>
  <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
  <![endif]-->

  <nav class="site-navbar navbar navbar-default navbar-fixed-top navbar-mega" role="navigation">

    <div class="navbar-header">
      <button type="button" class="navbar-toggle hamburger hamburger-close navbar-toggle-left hided"
      data-toggle="menubar">
        <span class="sr-only">Toggle navigation</span>
        <span class="hamburger-bar"></span>
      </button>
      <button type="button" class="navbar-toggle collapsed" data-target="#site-navbar-collapse"
      data-toggle="collapse">
        <i class="icon wb-more-horizontal" aria-hidden="true"></i>
      </button>
      <div class="navbar-brand navbar-brand-center site-gridmenu-toggle" data-toggle="gridmenu">
        <img class="navbar-brand-logo" src="{{ Helper::resource('manage/images/logo.png') }}" title="{{ $site_name }}">
        <span class="navbar-brand-text hidden-xs"> {{ $site['name'] }}{{ $site_name }}</span>
      </div>
      <button type="button" class="navbar-toggle collapsed" data-target="#site-navbar-search"
      data-toggle="collapse">
        <span class="sr-only">Toggle Search</span>
        <i class="icon wb-search" aria-hidden="true"></i>
      </button>
    </div>

    <div class="navbar-container container-fluid">
      <!-- Navbar Collapse -->
      <div class="collapse navbar-collapse navbar-collapse-toolbar" id="site-navbar-collapse">
        <!-- Navbar Toolbar -->
        <ul class="nav navbar-toolbar">
          <li class="hidden-float" id="toggleMenubar">
            <a data-toggle="menubar" href="#" role="button">
              <i class="icon hamburger hamburger-arrow-left">
                  <span class="sr-only">Toggle menubar</span>
                  <span class="hamburger-bar"></span>
                </i>
            </a>
          </li>
          <li class="hidden-xs" id="toggleFullscreen">
            <a class="icon icon-fullscreen" data-toggle="fullscreen" href="#" role="button">
              <span class="sr-only">Toggle fullscreen</span>
            </a>
          </li>
          <li class="hidden-float">
            <ol class="breadcrumb">
              <php>
                $icon = '<i class="icon wb-home"></i>';
              </php>
              @foreach ($_now_navs as $_now_nav)
              <li><a href="{{ Helper::url($_now_nav['url']) }}">{!! $icon !!}{{ $_now_nav['name'] }}</a></li>
              <php>
                $icon = '';
              </php>
              @endforeach
              <li class="active">{{ $_now_node['name'] }}</li>
            </ol>
          </li>
        </ul>
        <!-- End Navbar Toolbar -->

        <!-- Navbar Toolbar Right -->
        <ul class="nav navbar-toolbar navbar-right navbar-toolbar-right">
          <li class="dropdown">
            <a class="navbar-avatar dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false"
            data-animation="scale-up" role="button" style="line-height:28px;">
              <span class="avatar avatar-online">
                <img src="{{ Helper::resource('manage/images/avatar.jpg') }}" alt="...">
              </span>
              <span> {{ $login_admin['name'] }}</span>
            </a>
            <ul class="dropdown-menu" role="menu">
              <li role="presentation">
                <a href="{{ Helper::url('Index/repwd') }}" role="menuitem"><i class="icon wb-user" aria-hidden="true"></i> 修改密码</a>
              </li>
              <li class="divider" role="presentation"></li>
              <li role="presentation">
                <a href="{{ Helper::url('Public/logout') }}" role="menuitem"><i class="icon wb-power" aria-hidden="true"></i> 退出</a>
              </li>
            </ul>
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
      @yield('body')
    </div>
  </div>
  <!-- End Page -->

  <!-- Footer -->
  <footer class="site-footer">
    <div class="site-footer-legal">© 2017 {{ $site['name'] }}{{ $site_name }}</div>
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
            <button type="button" class="btn btn-primary">@{{=it.confirmText}}</button>
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
  <script src="{{ Helper::resource('static/vendor/twilio/twilio.min.js') }}?{{ $tpl_version }}"></script>
  <script type="text/javascript" src="https://cdn.plivo.com/sdk/browser/v2/plivo.min.js"></script>
  <script src="{{ Helper::resource('static/vendor/dot/dot.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('static/vendor/animsition/animsition.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('static/vendor/asscroll/jquery-asScroll.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('static/vendor/mousewheel/jquery.mousewheel.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('static/vendor/asscrollable/jquery.asScrollable.all.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('static/vendor/ashoverscroll/jquery-asHoverScroll.min.js') }}?{{ $tpl_version }}"></script>

  <!-- Plugins -->
  <script src="{{ Helper::resource('static/vendor/switchery/switchery.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('static/vendor/intro-js/intro.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('static/vendor/screenfull/screenfull.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('static/vendor/slidepanel/jquery-slidePanel.min.js') }}?{{ $tpl_version }}"></script>

  <!-- Plugins For This Page -->
  <script src="{{ Helper::resource('static/vendor/jquery-ui/jquery-ui.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('static/vendor/datatables/jquery.dataTables.min.js') }}?{{ $tpl_version . UTC_TIME }}"></script>
  <script src="{{ Helper::resource('static/vendor/datatables/dataTables.autoFill.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('static/vendor/datatables/dataTables.fixedColumns.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('static/vendor/datatables-fixedheader/dataTables.fixedHeader.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('static/vendor/datatables-bootstrap/dataTables.bootstrap.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('static/vendor/blueimp-canvas-to-blob/canvas-to-blob.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('static/vendor/blueimp-file-upload/jquery.fileupload.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('static/vendor/dropify/dropify.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('static/vendor/formvalidation/formValidation.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('static/vendor/formvalidation/framework/bootstrap.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('static/vendor/select2/select2.full.min.js') }}?{{ $tpl_version }}"></script>

  <!-- datepicker -->
  <script src="{{ Helper::resource('static/vendor/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('static/vendor/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('static/vendor/jsgrid/jsgrid.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('static/vendor/summernote/summernote.min.js') }}?{{ $tpl_version }}"></script>

  <!-- Scripts -->
  <script src="{{ Helper::resource('static/vendor/bootstrap-maxlength/bootstrap-maxlength.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('static/vendor/typeahead-js/bloodhound.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('static/vendor/typeahead-js/typeahead.jquery.min.js') }}?{{ $tpl_version }}"></script>

  <script src="{{ Helper::resource('manage/js/core.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('manage/js/site.min.js') }}?{{ $tpl_version }}"></script>

  <script src="{{ Helper::resource('manage/js/sections/menu.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('manage/js/sections/menubar.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('manage/js/sections/gridmenu.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('manage/js/sections/sidebar.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('manage/js/configs/config-tour.min.js') }}?{{ $tpl_version }}"></script>

  <script src="{{ Helper::resource('manage/js/components/asscrollable.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('manage/js/components/animsition.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('manage/js/components/slidepanel.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('manage/js/components/switchery.min.js') }}?{{ $tpl_version }}"></script>

  <script src="{{ Helper::resource('manage/js/plugins/responsive-tabs.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('manage/js/plugins/closeable-tabs.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('manage/js/components/tabs.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('manage/js/components/input-group-file.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('manage/js/components/bootstrap-datepicker.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('manage/js/components/dropify.min.js') }}?{{ $tpl_version }}"></script>
  <script src="{{ Helper::resource('manage/js/components/summernote.min.js') }}?{{ $tpl_version }}"></script>

  @yield('footer')
  <script>
    (function(document, window, $) {
      'use strict';

      var Site = window.Site;

      $.components.register("select2",{mode:"default",defaults:{width:"style"}});

      $(document).ready(function() {
        Site.run();
        $('textarea[maxlength]').maxlength({
            threshold: 1000,
            placement: 'bottom-left-inside'
        });

        $(".datetime").datetimepicker({
          format: 'yyyy-mm-dd hh:ii',
          language:'zh-CN',
          autoclose: true,
          todayBtn: true,
          minuteStep: 1
        });

        if (RUN_FUNCS.length > 0) {
          for(var i = 0; i < RUN_FUNCS.length; i++) {
            RUN_FUNCS[i].call();
          }
        }

        $('.validate-form').formValidation({
            framework: 'bootstrap',
            onSuccess: function(e) {
                var form = $(e.target);
                if (form.hasClass("ajax-form")) {
                    e.preventDefault();
                    var fv = form.data('formValidation');

                    //KindEditor.sync('.tpl-editor');

                    $.ajaxPost(e.target.action, form.serialize(), function(result){
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
                        $.showError("发生错误，请重新提交");
                    });
                }
            }
        });

      });
    })(document, window, jQuery);

  </script>
</body>
</html>