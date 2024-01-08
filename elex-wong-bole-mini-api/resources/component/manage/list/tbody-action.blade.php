<?php
$css    = isset($attrs['css']) ? $attrs['css'] : '';
$label  = isset($attrs['label']) ? $attrs['label'] : '';
$url    = isset($attrs['url']) ? $attrs['url'] : '';
$target = isset($attrs['target']) ? $attrs['target'] : '_self';
$click  = isset($attrs['click']) ? $attrs['click'] : '';
$tip    = isset($attrs['tip']) ? $attrs['tip'] : '';
$action = isset($attrs['action']) ? $attrs['action'] : '';

switch ($attrs['type']) {
    case 'edit':
        $action = empty($action) ? 'edit' : $action;
        $css    = empty($css) ? 'text-info' : $css;
        $url    = empty($url) ? '{!! Helper::url(APP_CONTROLLER_NAME."/'.$action.'",["id" => $list_item_pk]) !!}' : $url;
        $label  = empty($label) ? Lang::get('root::tpl.edit') : $label;
    break;
    
    case 'delete':
        $action = empty($action) ? 'delete' : $action;
        $css    = empty($css) ? 'text-danger' : $css;
        $url    = empty($url) ? '{!! Helper::url(APP_CONTROLLER_NAME."/'.$action.'",["id" => $list_item_pk, "__RETURN_URL__" => Request::fullUrl()]) !!}' : $url;
        $label  = empty($label) ? Lang::get('root::tpl.delete') : $label;
        $tip    = empty($tip) ? Lang::get('root::tpl.confirm_delete') : $tip;
        $click  = empty($click) ? '$.removeItem(this, \''.$url.'\', \''.$tip.'\')' : $click;
    break;
}
$url    = !empty($click) ? 'javascript:;' : $url;
$auth   = isset($attrs['auth']) ? $attrs['auth'] : $action;
$noauth = isset($attrs['noauth']) ? true : false;
if ($noauth) {
	$auth = '';
}
?>
{@}if(Tpl::checkAuth("{{ $auth }}"))
<a href="{!! Tpl::output($url) !!}" 
 class="{!! Tpl::output($css) !!}" 
 data-pk="@{{ $list_item_pk }}" 
 target="{!! Tpl::output($target) !!}" 
 style="{!! Tpl::output($attrs['style']) !!}" 
 @if($click) onclick="{!! Tpl::output($click) !!}" @endif 
 {!! Tpl::output($attrs['attr']) !!}>
    {!! $label !!}
</a>
{@}endif