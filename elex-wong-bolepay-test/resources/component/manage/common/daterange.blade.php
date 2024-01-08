<?php
$datarange_begin_data = $attrs['data'] . "['". $attrs['begin_name'] ."']";
$datarange_end_data   = $attrs['data'] . "['". $attrs['end_name'] ."']";
$pid        = isset($attrs['pid']) ? $attrs['pid'] : ''; 
$pstyle     = isset($attrs['pstyle']) ? $attrs['pstyle'] : '';
$date_css = isset($attrs['date_css']) ? $attrs['date_css'] : 'date';
switch ($date_css) {
    case 'date':
        $width = "103";
        break;

    case 'datetime':
        $width = "163";
        break;
}
?>
<div @if($pid) id="{!! Tpl::output($pid) !!}" @endif class="input-group" style="{!! Tpl::output($pstyle) !!}">
    <input type="text" name="{!! Tpl::output($attrs['begin_name']) !!}" class="form-control {!! Tpl::output($date_css) !!}" value="{!! Tpl::output($datarange_begin_data) !!}" autocomplete="off" style="width: {{ $width }}px;">
    <span class="input-group-addon">～</span>
    <input type="text" name="{!! Tpl::output($attrs['end_name']) !!}" class="form-control {!! Tpl::output($date_css) !!}" value="{!! Tpl::output($datarange_end_data) !!}" autocomplete="off" style="width: {{ $width }}px;">
</div>