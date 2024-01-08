<?php
$datarange_begin_data = $attrs['data'] . "['". $attrs['begin_name'] ."']";
$datarange_end_data   = $attrs['data'] . "['". $attrs['end_name'] ."']";
?>
<div class="input-group">
    <input type="text" name="{!! Tpl::output($attrs['begin_name']) !!}" class="form-control datetime" value="{!! Tpl::output($datarange_begin_data) !!}" style="width: 140px;">
    <span class="input-group-addon">～</span>
    <input type="text" name="{!! Tpl::output($attrs['end_name']) !!}" class="form-control datetime" value="{!! Tpl::output($datarange_end_data) !!}" style="width: 140px;">
</div>