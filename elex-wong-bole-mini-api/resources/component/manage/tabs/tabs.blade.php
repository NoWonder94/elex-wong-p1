<div class="nav-tabs-horizontal nav-tabs-inverse {!! Tpl::output($attrs['css']) !!}" 
 @if($attrs['id']) id="{!! Tpl::output($attrs['id']) !!}" @endif 
 style="{!! Tpl::output($attrs['style']) !!}" 
 {!! Tpl::output($attrs['attr']) !!}>
	<php>
	$tabs_selected = {!! Tpl::variable($attrs['selected']) !!};
	</php>
    {!! $content !!}
</div>