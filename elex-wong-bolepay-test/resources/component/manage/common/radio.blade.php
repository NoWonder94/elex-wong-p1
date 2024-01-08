<?php
$options 	= isset($attrs['options']) ? $attrs['options'] : '';
$texts 		= isset($attrs['texts']) ? $attrs['texts'] : '';
$checked 	= isset($attrs['checked']) ? $attrs['checked'] : '';
$valuefield = isset($attrs['valuefield']) ? $attrs['valuefield'] : '';
$textfield 	= isset($attrs['textfield']) ? $attrs['textfield'] : '';
$default 	= isset($attrs['default']) ? $attrs['default'] : '';
$attr       = isset($attrs['attr']) ? $attrs['attr'] : '';
$disabled       = isset($attrs['disabled']) ? $attrs['disabled'] : '';

if (false === strpos($options, '$')) {
    $options = explode(',', $options);
}

if (!empty($texts) && false === strpos($texts, '$')) {
    $texts = explode(',', $texts);
}
?>
<php>
$radio_options	= @if(is_array($options)) {!! var_export($options, true) !!} @else {!! Tpl::variable($options) !!} @endif;
@if(!empty($texts))
$radio_texts	= @if(is_array($texts)) {!! var_export($texts, true) !!} @else {!! Tpl::variable($texts) !!} @endif;
@else
unset($radio_texts);
@endif

@if(!empty($checked))
$checked		= {!! Tpl::variable($checked) !!};
@else
unset($checked);
@endif

@if($default !== '')
$default		= {!! Tpl::variable($default) !!};
$checked 		= isset($checked) && $checked !== '' ? $checked : $default;
@endif

</php>
<ul class="list-unstyled list-inline">
{@}foreach($radio_options as $options_key => $options_val)
<li class="list-inline-item">
<php>
$radio_id = 'radio' . Strings::getUUID();
</php>
<div class="radio-custom radio-primary">
@if(!empty($texts))
<php>
$checked_attr = $options_val == $checked ? " checked" : "";
</php>
	<input id="@{{ $radio_id }}" type="radio" class="uniform {!! Tpl::output($attrs['css']) !!}" name="{!! Tpl::output($attrs['name']) !!}" value="@{{ $options_val }}" @{{ $checked_attr }} {!! Tpl::output($attr) !!} {{ $disabled }} />
	<label for="@{{ $radio_id }}">@{{ $radio_texts[$options_key] }}</label>
@else
@if(!empty($valuefield) && !empty($textfield))
<php>
@if(!empty($valuefield))
$options_key = $options_val[{!! Tpl::variable($valuefield) !!}];
@endif
@if(!empty($textfield))
$options_val = $options_val[{!! Tpl::variable($textfield) !!}];
@endif
$checked_attr = $options_key == $checked ? " checked" : "";
</php>
	<input id="@{{ $radio_id }}" type="radio" class="uniform {!! Tpl::output($attrs['css']) !!}" name="{!! Tpl::output($attrs['name']) !!}" value="@{{ $options_key }}" @{{ $checked_attr }} {!! Tpl::output($attr) !!}/>
	<label for="@{{ $radio_id }}">@{{ $options_val }}</label>
@else
<php>
$checked_attr = $options_key == $checked ? " checked" : "";
</php>
	<input id="@{{ $radio_id }}" type="radio" class="uniform {!! Tpl::output($attrs['css']) !!}" name="{!! Tpl::output($attrs['name']) !!}" value="@{{ $options_key }}" @{{ $checked_attr }} {!! Tpl::output($attr) !!}/>
	<label for="@{{ $radio_id }}">@{{ $options_val }}</label>
@endif
@endif
</div>
</li>
{@}endforeach
</ul>