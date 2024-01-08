<ul class="nav nav-tabs {!! Tpl::output($attrs['css']) !!}"
 @if($attrs['id']) id="{!! Tpl::output($attrs['id']) !!}" @endif 
 style="{!! Tpl::output($attrs['style']) !!}" 
 {!! Tpl::output($attrs['attr']) !!}
 data-plugin="nav-tabs"
 role="tablist">
	{!! $content !!}
</ul>