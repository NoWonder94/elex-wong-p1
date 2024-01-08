<?php
$id			= isset($attrs['id']) ? $attrs['id'] : 'searchForm';
$method		= isset($attrs['method']) ? $attrs['method'] : 'post';
$target		= isset($attrs['target']) ? $attrs['target'] : '_self';
$action		= isset($attrs['action']) ? $attrs['action'] : APP_ACTION_NAME;
$url		= isset($attrs['url']) ? $attrs['url'] : '{!! Helper::url(APP_CONTROLLER_NAME."/".'.$action.') !!}';
$form_css	= isset($attrs['ajax']) ? 'ajax-form' : '';
?>
<php>
$_search_args = Request::all();
</php>
<div class="panel panel-bordered list-table-search {!! Tpl::output($attrs['css']) !!}" 
 style="{!! Tpl::output($attrs['style']) !!}" 
 {!! Tpl::output($attrs['attr']) !!}>
	<div class="panel-body" style="padding:15px 15px 5px 15px;">
		<form class="search-form {!! Tpl::output($form_css) !!}"
	     id="{!! Tpl::output($id) !!}" 
	     name="{!! Tpl::output($id) !!}" 
	     method="{!! Tpl::output($method) !!}" 
	     action="{!! Tpl::output($url) !!}" 
	     target="{!! Tpl::output($target) !!}">
	        {!! $content !!}
	    </form>
	</div>
</div>