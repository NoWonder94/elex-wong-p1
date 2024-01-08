<?php
$id         = isset($attrs['id']) ? $attrs['id'] : '';
$target     = isset($attrs['target']) ? $attrs['target'] : '_self';
$css        = isset($attrs['css']) ? $attrs['css'] : '';
$label      = isset($attrs['label']) ? $attrs['label'] : '';
$url        = isset($attrs['url']) ? $attrs['url'] : '';
$click      = isset($attrs['click']) ? $attrs['click'] : '';
$btnType    = $isLink ? false : 'button';
$action     = $attrs['type'];

switch($attrs['type']){
    case 'submit':
        $css      = empty($css) ? 'btn-success' : $css;
        $label    = empty($label) ? Lang::get('admin.submit') : $label;
        $btnType  = 'submit';
		if (!isset($attrs['auth'])) {
			$attrs['noauth'] = true;
		}
    break;
    case 'search':
        $css      = empty($css) ? 'btn-success btn-bottom-set' : $css;
        $label    = empty($label) ? Lang::get('admin.search') : $label;
        $btnType  = 'submit';
		if (!isset($attrs['auth'])) {
			$attrs['noauth'] = true;
		}
    break;
    case 'add':
        $css    = empty($css) ? 'btn-primary' : $css;
        $label  = empty($label) ? Lang::get('admin.add') : $label;
        $url    = empty($url) ? '{!! Helper::url(APP_CONTROLLER_NAME."/add") !!}' : $url;
    break;
    case 'refresh':
        $css    = empty($css) ? 'btn-info' : $css;
        $label  = empty($label) ? Lang::get('admin.refresh') : $label;
        $click  = empty($click) ? 'location.reload(true);' : $click;
		if (!isset($attrs['auth'])) {
			$attrs['noauth'] = true;
		}
    break;
    case 'export':
        $css    = empty($css) ? 'btn-info btn-bottom-set' : $css;
        $label  = empty($label) ? Lang::get('admin.export') : $label;
        $url    = empty($url) ? '{!! Helper::url(APP_CONTROLLER_NAME."/export") !!}' : $url;
    break;
    case 'import':
        $css    = empty($css) ? 'btn-warning' : $css;
        $label  = empty($label) ? Lang::get('admin.import') : $label;
        $url    = empty($url) ? '{!! Helper::url(APP_CONTROLLER_NAME."/import") !!}' : $url;
    break;
    case 'delete':
        $css    = empty($css) ? 'btn-danger' : $css;
        $label  = empty($label) ? Lang::get('admin.delete') : $label;
        $click  = empty($click) ? '$.removeList(this)' : $click;
    break;
}

$url = empty($click) ? $url : 'javascript:;';
if (!empty($click)) {
	$target = '_self';
}

$auth   = isset($attrs['auth']) ? $attrs['auth'] : $action;
$noauth = isset($attrs['noauth']) ? true : false;
if ($noauth) {
	$auth = '';
}
?>
{@}if(Helper::checkAuth("{{ $auth }}"))
@if($btnType !== false)
<button class="btn {!! Tpl::output($css) !!}" 
 type="{!! $btnType !!}" 
 @if($id) id="{!! Tpl::output($id) !!}" @endif 
 style="{!! Tpl::output($attrs['style']) !!}" 
 {!! Tpl::output($attrs['attr']) !!}
 @if($click) onclick="{!! Tpl::output($click) !!}" @endif>
    {!! Tpl::output($label) !!}
</button>
@else
<a class="btn {!! Tpl::output($css) !!}" 
 href="{!! Tpl::output($url) !!}" 
 @if($click) onclick="{!! Tpl::output($click) !!}" @endif
 target="{!! Tpl::output($target) !!}" 
 @if($id) id="{!! Tpl::output($id) !!}" @endif 
 style="{!! Tpl::output($style) !!}" 
 {!! Tpl::output($attr) !!}>
    {!! Tpl::output($label) !!}
</a>
@endif
{@}endif