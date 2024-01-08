<php>
$pane_key = {!! Tpl::variable($attrs['key']) !!};
$pane_selectd = $tabs_selected == $pane_key ? 'on' : '';
</php>
<div class="tab-pane @{{ $pane_selectd }} {!! Tpl::output($attrs['css']) !!}" 
 @if($attrs['id']) id="{!! Tpl::output($attrs['id']) !!}" @endif 
 style="{!! Tpl::output($attrs['style']) !!}" 
 {!! Tpl::output($attrs['attr']) !!}>
    {!! $content !!}
</div>