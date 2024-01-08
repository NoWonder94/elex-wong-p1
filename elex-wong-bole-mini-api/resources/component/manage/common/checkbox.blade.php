<?php
$options 	= isset($attrs['options']) ? $attrs['options'] : '';
$texts 		= isset($attrs['texts']) ? $attrs['texts'] : '';
$checked 	= isset($attrs['checked']) ? $attrs['checked'] : '';
$valuefield = isset($attrs['valuefield']) ? $attrs['valuefield'] : '';
$textfield 	= isset($attrs['textfield']) ? $attrs['textfield'] : '';

if (false === strpos($options, '$')) {
    $options = explode(',', $options);
}

if (!empty($texts) && false === strpos($texts, '$')) {
    $texts = explode(',', $texts);
}

if (false === strpos($checked, '$')) {
    $checked = explode(',', $checked);
}
?>
<php>
$checkbox_options	= @if(is_array($options)) {!! var_export($options, true) !!} @else {!! Tpl::variable($options) !!} @endif;
$checkeds			= @if(is_array($checked)) {!! var_export($checked, true) !!} @else is_array({!! Tpl::variable($checked) !!}) ? {!! Tpl::variable($checked) !!} : [{!! Tpl::variable($checked) !!}] @endif;
@if(!empty($texts))
$checkbox_texts		= @if(is_array($texts)) {!! var_export($texts, true) !!} @else {!! Tpl::variable($texts) !!} @endif;
@endif
</php>
{@}foreach($checkbox_options as $options_key => $options_val)
<label>
@if(!empty($texts))
<php>
$checked = in_array($options_val, $checkeds) ? " checked" : "";
</php>
	<input type="checkbox" class="uniform {!! Tpl::output($attrs['css']) !!}" name="{!! Tpl::output($attrs['name']) !!}" value="@{{ $options_val }}" @{{ $checked }}/>
	<span>@{{ $checkbox_texts[$options_key] }}</span>
@else
@if(!empty($valuefield) && !empty($textfield))
<php>
@if(!empty($valuefield))
$options_key = $options_val[{!! Tpl::variable($valuefield) !!}];
@endif
@if(!empty($textfield))
$options_val = $options_val[{!! Tpl::variable($textfield) !!}];
@endif
$checked = in_array($options_key, $checkeds) ? " checked" : "";
</php>
	<input type="checkbox" class="uniform {!! Tpl::output($attrs['css']) !!}" name="{!! Tpl::output($attrs['name']) !!}" value="@{{ $options_key }}" @{{ $checked }}/>
	<span>@{{ $options_val }}</span>
@else
<php>
$checked = in_array($options_key, $checkeds) ? " checked" : "";
</php>
	<input type="checkbox" class="uniform {!! Tpl::output($attrs['css']) !!}" name="{!! Tpl::output($attrs['name']) !!}" value="@{{ $options_key }}" @{{ $checked }}/>
	<span>@{{ $options_val }}</span>
@endif
@endif
</label>
<span>&nbsp;&nbsp;</span>
{@}endforeach