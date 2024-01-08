<?php
$url	= isset($attrs['url']) ? $attrs['url'] : 'javascript:;';
$target	= isset($attrs['target']) ? $attrs['target'] : '_self';
?>
<php>
$nav_key = {!! Tpl::variable($attrs['key']) !!};
$nav_selectd = $tabs_selected == $nav_key ? 'active' : '';
</php>
<li class="@{{ $nav_selectd }} {!! Tpl::output($attrs['css']) !!}" 
 @if($attrs['id']) id="{!! Tpl::output($attrs['id']) !!}" @endif 
 style="{!! Tpl::output($attrs['style']) !!}" 
 {!! Tpl::output($attrs['attr']) !!}>
    @if(empty($content))
    <a href="{!! Tpl::output($url) !!}" target="{!! Tpl::output($target) !!}" data-toggle="tab" role="tab">{!! Tpl::output($attrs['label']) !!}</a>
    @else
    {!! $content !!}
    @endif
</li>