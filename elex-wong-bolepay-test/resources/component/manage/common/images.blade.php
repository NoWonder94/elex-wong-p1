<?php
$id         = isset($attrs['id']) ? $attrs['id'] : 'image-list-'.$attrs['index'];
$maxcount   = isset($attrs['maxcount']) ? $attrs['maxcount'] : '-1';
?>
<php>
$_images_list = @if(isset($attrs['images'])) {!! Tpl::variable($attrs['images']) !!} @else [] @endif;
</php>
<ul id="{!! Tpl::output($id) !!}" class="image-list" data-input-name="{!! Tpl::output($attrs['name']) !!}" data-maxcount="{!! Tpl::output($maxcount) !!}">
    {@}foreach($_images_list as $image)
    <li class="image-box">
        <a class="image-item" href="@{{ $image }}" target="_blank"><img src="@{{ $image }}" alt=""></a>
        <a class="image-upload-btn" href="javascript:;">
            <i class="fa fa-plus"></i> {{ Lang::get('admin.upload_image') }}
        </a>
        <a href="javascript:;" class="image-delete fa fa-times"></a>
        <input type="hidden" class="image-data" name="{!! Tpl::output($attrs['name']) !!}" value="@{{ $image }}"/>
    </li>
    {@}endforeach
    <li class="image-add-box">
        <a class="image-add-btn" href="javascript:;">
            <i class="fa fa-plus"></i> {{ Lang::get('admin.upload_image') }}
        </a>
    </li>
</ul>