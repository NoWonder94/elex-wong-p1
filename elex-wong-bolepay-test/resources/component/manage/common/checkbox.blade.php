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
<ul class="list-unstyled list-inline">
{@}foreach($checkbox_options as $options_key => $options_val)
<li class="list-inline-item">
<php>
$check_id = 'check' . Strings::getUUID();
</php>
<div class="checkbox-custom checkbox-primary">
@if(!empty($texts))
<php>
$checked = in_array($options_val, $checkeds) ? " checked" : "";
</php>
	<input id="@{{ $check_id }}" type="checkbox" class="uniform {!! Tpl::output($attrs['css']) !!}" name="{!! Tpl::output($attrs['name']) !!}" value="@{{ $options_val }}" @{{ $checked }}/>
	<label for="@{{ $check_id }}">@{{ $checkbox_texts[$options_key] }}</label>
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
	<input id="@{{ $check_id }}" type="checkbox" class="uniform {!! Tpl::output($attrs['css']) !!}" name="{!! Tpl::output($attrs['name']) !!}" value="@{{ $options_key }}" @{{ $checked }}/>
	<label for="@{{ $check_id }}">@{{ $options_val }}</label>
@else
<php>
$checked = in_array($options_key, $checkeds) ? " checked" : "";
</php>
	<input id="@{{ $check_id }}" type="checkbox" class="uniform {!! Tpl::output($attrs['css']) !!}" name="{!! Tpl::output($attrs['name']) !!}" value="@{{ $options_key }}" @{{ $checked }}/>
	<label for="@{{ $check_id }}">@{{ $options_val }}</label>
@endif
@endif
</div>
</li>
{@}endforeach
</ul>