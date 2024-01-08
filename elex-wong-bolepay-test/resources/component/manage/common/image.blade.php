<?php
$image  = isset($attrs['image']) ? $attrs['image'] : '';
$width  = isset($attrs['width']) ? (int)$attrs['width'] : 64;
$height = isset($attrs['height']) ? (int)$attrs['height'] : 64;
?>
<php>
$image = {!! Tpl::variable($image) !!};
</php>
<span class="image-upload-btn image-item image-preview" data-img="@{{ $image }}">
    {@}if(empty($image))
    <img src="{{ Helper::resource('manage/images/no-photo.png') }}" width="{!! Tpl::output($width) !!}" height="{!! Tpl::output($height) !!}" />
    {@}else
    <img src="@{{ $image }}" width="{!! Tpl::output($width) !!}" height="{!! Tpl::output($height) !!}" />
    {@}endif
    <input type="hidden" class="image-data" name="{!! Tpl::output($attrs['name']) !!}" value="@{{ $image }}"/>
</span>