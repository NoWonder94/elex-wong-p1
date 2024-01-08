<?php
$id         = isset($attrs['id']) ? $attrs['id'] : 'tplForm';
$pk         = isset($attrs['pk']) ? $attrs['pk'] : 'id';
$enctype    = isset($attrs['file']) ? 'multipart/form-data' : 'application/x-www-form-urlencoded';
$ajaxform   = isset($attrs['noajax']) ? '' : 'ajax-form';
$isbtn      = isset($attrs['nobtn']) ? false : true;
$action     = isset($attrs['action']) ? '"'.$attrs['action'].'"' : '('.$attrs['datasource'].'[\''.$pk.'\'] ? "update" : "create")';
$method     = isset($attrs['method']) ? $attrs['method'] : 'post';
$validate   = isset($attrs['novalidate']) ? '' : 'validate-form';
$target     = isset($attrs['target']) ? $attrs['target'] : '_self';
$url        = isset($attrs['url']) ? $attrs['url'] : '{!! Helper::url(APP_CONTROLLER_NAME."/".'.$action.') !!}';
?>
<div class="panel form-box {!! Tpl::output($attrs['css']) !!}" 
 style="{!! Tpl::output($attrs['style']) !!}" 
 {!! Tpl::output($attrs['attr']) !!}>
    <div class="panel-body">
        <form class="{!! Tpl::output($validate) !!} {!! Tpl::output($ajaxform) !!}" 
         id="{!! Tpl::output($id) !!}" 
         method="{!! Tpl::output($method) !!}" 
         action="{!! Tpl::output($url) !!}" 
         enctype="{!! Tpl::output($enctype) !!}" 
         target="{!! Tpl::output($target) !!}" 
         autocomplete="off">
            {!! $content !!}
            @if($isbtn)
            <div class="form-group" style="margin-top:30px;">
                <button type="submit" class="btn btn-lg btn-primary waves-effect waves-classic" style="padding-left:50px; padding-right:50px;">{{ Lang::get('admin.submit') }}</button>
            </div>
            @endif
            <php>
                $pk_data = {!! Tpl::variable($attrs['datasource']) !!}[{!! Tpl::variable($pk) !!}];
            </php>
            <input type="hidden" value="@{{ $pk_data }}" name="{!! Tpl::output($pk) !!}" />
            <input type="hidden" value="@{{ Request::server("HTTP_REFERER") }}" name="__RETURN_URL__" />
        </form>
    </div>
</div>