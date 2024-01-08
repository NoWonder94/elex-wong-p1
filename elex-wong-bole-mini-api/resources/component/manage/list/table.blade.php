<php>
    $list_item_key = @if($List['pk']) '{{ $List['pk'] }}' @else 'id' @endif;
    $table_id	   = 'tabel' . Helper::getSn();
</php>
<table id="@{{ $table_id }}" 
 @if($attrs['controller']) controller="{!! Tpl::output($attrs['controller']) !!}" @endif 
 @if($attrs['module']) module="{!! Tpl::output($attrs['module']) !!}" @endif 
 @if($attrs['action']) action="{!! Tpl::output($attrs['action']) !!}" @endif 
 border="0" cellpadding="6" cellspacing="1"
 class="table table-bordered {!! Tpl::output($attrs['css']) !!} @if($attrs['checkbox']) checkListTable @endif"
 style="{!! Tpl::output($attrs['style']) !!}" 
 {!! Tpl::output($attrs['attr']) !!}>
    {!! $content !!}
</table>
<?php
$minwidth = isset($attrs['minwidth']) ? $attrs['minwidth'] : 0;
$pager    = !isset($attrs['pager']) ? 'pager' : ($attrs['pager'] == 'no' ? '' : $attrs['pager']);
?>
@if(!empty($pager))
{@}include('component.manage.common.{!! Tpl::output($pager) !!}')
@endif
