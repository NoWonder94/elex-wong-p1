<?php
$id 		= isset($attrs['id']) ? $attrs['id'] : '';
$options 	= isset($attrs['options']) ? $attrs['options'] : '';
$texts 		= isset($attrs['texts']) ? $attrs['texts'] : '';
$valtokey   = isset($attrs['valtokey']) ? true : false;
$selected 	= isset($attrs['selected']) ? $attrs['selected'] : '';
$valuefield = isset($attrs['valuefield']) ? $attrs['valuefield'] : '';
$textfield 	= isset($attrs['textfield']) ? $attrs['textfield'] : '';
$multiple   = isset($attrs['multiple']) ? ' multiple="multiple"' : '';
$size       = isset($attrs['size']) ? ' size="'.$size.'"' : '';
$first		= isset($attrs['first']) ? $attrs['first'] : '';
$firstvalue	= isset($attrs['firstvalue']) ? $attrs['firstvalue'] : '';
$is_locale  = isset($attrs['locale']) ? true : false;

if (false === strpos($options, '$')) {
    $options = explode(',', $options);
}

if (!empty($texts) && false === strpos($texts, '$')) {
    $texts = explode(',', $texts);
}

if (false === strpos($selected, '$')) {
    $selected = explode(',', $selected);
}
?>
<php>
$select_options = @if(is_array($options)) {!! var_export($options, true) !!} @else {!! Tpl::variable($options) !!} @endif;
$selecteds      = @if(is_array($selected)) {!! var_export($selected, true) !!} @else is_array({!! Tpl::variable($selected) !!}) ? {!! Tpl::variable($selected) !!} : [{!! Tpl::variable($selected) !!}] @endif;
@if(!empty($texts))
$select_texts   = @if(is_array($texts)) {!! var_export($texts, true) !!} @else {!! Tpl::variable($texts) !!} @endif;
@endif
</php>
<select id="{!! Tpl::output($id) !!}" name="{!! Tpl::output($attrs['name']) !!}" {!! $multiple !!} {!! $size !!} class="form-control {!! Tpl::output($attrs['css']) !!}" style="{!! Tpl::output($attrs['style']) !!}" {!! Tpl::output($attrs['attr']) !!}>
@if(!empty($first))
<option value="{!! Tpl::output($firstvalue) !!}" >{!! Tpl::output($first) !!}</option>
@endif
{@}foreach($select_options as $options_key => $options_val)
@if(!empty($texts))
<php>
$selected = in_array($options_val, $selecteds) ? " selected" : "";
$disabled = ''; 
@if($is_locale)
$select_text = $select_texts[$options_key][$locale];
@else
$select_text = $select_texts[$options_key];
@endif
</php>
<option@{{ $selected }} value="@{{ $options_val }}">@{{ $select_text }}</option>
@else
@if(!empty($valuefield) && !empty($textfield))
<php>
$disabled = isset($options_val['disabled']) && $options_val['disabled'] ? ' disabled' : '';
@if(!empty($valuefield))
$options_key = $options_val[{!! Tpl::variable($valuefield) !!}];
@endif
@if(!empty($textfield))
@if($is_locale)
$options_val = $options_val[{!! Tpl::variable($textfield) !!}][$locale];
@else
$options_val = $options_val[{!! Tpl::variable($textfield) !!}];
@endif
@endif
$selected = in_array($options_key, $selecteds) ? " selected" : "";
</php>
<option@{{ $selected }} @{{ $disabled }} value="@{{ $options_key }}">@{{ $options_val }}</option>
@else
<php>
@if($is_locale)
$options_val = $options_val[$locale];
@endif

@if($valtokey)
$options_key = $options_val;
$selected = in_array($options_val, $selecteds) ? " selected" : "";
@else
$selected = in_array($options_key, $selecteds) ? " selected" : "";
@endif
</php>
<option@{{ $selected }} value="@{{ $options_key }}">@{{ $options_val }}</option>
@endif
@endif
{@}endforeach
</select>