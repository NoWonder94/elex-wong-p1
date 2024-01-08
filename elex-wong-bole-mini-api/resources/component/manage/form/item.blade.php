<?php
$required   = isset($attrs['required']) ? '<span class="required text-danger">*</span>' : '';
$notitle    = isset($attrs['notitle']) ?  true : false;
$name       = isset($attrs['name']) ? $attrs['name'] : '';
$id         = isset($attrs['id']) ? $attrs['id'] : '';
$val        = isset($attrs['val']) ? $attrs['val'] : '';
$default    = isset($attrs['default']) ? $attrs['default'] : '';
$pid        = isset($attrs['pid']) ? $attrs['pid'] : '';
$pcss       = isset($attrs['pcss']) ? $attrs['pcss'] : '';
$pstyle     = isset($attrs['pstyle']) ? $attrs['pstyle'] : '';
$tip        = isset($attrs['tip']) ? $attrs['tip'] : '';
$ttip       = isset($attrs['ttip']) ? $attrs['ttip'] : '';
$btip       = isset($attrs['btip']) ? $attrs['btip'] : '';
$label      = isset($attrs['label']) ? $attrs['label'] : '';
$append     = isset($attrs['append']) ? true : false;
$css        = isset($attrs['css']) ? $attrs['css'] : '';
$style      = isset($attrs['style']) ? $attrs['style'] : '';
$attr       = isset($attrs['attr']) ? $attrs['attr'] : '';
$placeholder= isset($attrs['placeholder']) ? $attrs['placeholder'] : '';
$type       = $attrs['type'];
$search     = isset($attrs['search']) ? $attrs['search'] : 0;

if (!empty($required)) {
    $attr .= ' data-fv-notempty="true"';
}
?>
@if($name)
<php>
$_input_data = {!! Tpl::variable($val) !!};
@if($default !== '')
$_input_data = isset($_input_data) && $_input_data !== '' ? $_input_data : {!! Tpl::variable($default) !!};
@endif
</php>
@endif
@if($type == 'hidden')
<input type="hidden" id="{!! Tpl::output($id) !!}" name="{!! Tpl::output($name) !!}" value="@{{ $_input_data }}"/>
@else
<div 
 @if($pid) id="{!! Tpl::output($pid) !!}" @else id="{!! Tpl::output($id) !!}-form-item" @endif class="form-group {!! Tpl::output($pcss) !!}" style="{!! Tpl::output($pstyle) !!}" >
    <label for="{!! Tpl::output($name) !!}" class="control-label @if($notitle) none @endif">
        @if(!$notitle) {!! Tpl::output($label) !!}{!! $required !!}: @endif
        @if($tip)<span class="form-tip">{!! Tpl::output($tip, false) !!}</span>@endif
    </label>
    @if($ttip)<p class="form-tip"><b>{!! Tpl::output($ttip, false) !!}</b></p>@endif
    @if($search != 1)
    <div>
    @endif
    @if(empty($content) || $append)
        @if($type == 'imagebtn')
        <div class="image-btn-box">
            <a class="img-upload-btn btn {!! Tpl::output($css) !!}" style="{!! Tpl::output($style) !!}" {!! Tpl::output($attr) !!} href="javascript:;">{{ Lang::get('root::tpl.upload_image') }}</a>
            <input class="image-data" type="hidden" name="{!! Tpl::output($name) !!}" id="{!! Tpl::output($id) !!}" value="@{{ $_input_data }}"/>
        </div>
        @elseif($type == 'image')
        <php>
            $image_id = 'image-' . Helper::getSn();
        </php>
        <div class="image-list {!! Tpl::output($css) !!}" style="{!! Tpl::output($style) !!}" {!! Tpl::output($attr) !!}>
            <div>
                <input name="{!! Tpl::output($name) !!}" type="file" id="@{{ $image_id }}" data-plugin="dropify" data-default-file="@{{ $_input_data }}" />
            </div>
        </div>
        @elseif($type == 'textarea')
        <textarea name="{!! Tpl::output($name) !!}" id="{!! Tpl::output($id) !!}" class="form-control {!! Tpl::output($css) !!}" style="{!! Tpl::output($style) !!}" placeholder="{!! Tpl::output($placeholder) !!}" {!! Tpl::output($attr) !!}>@{{ $_input_data }}</textarea>
        @elseif($type == 'text')
        <p name="{!! Tpl::output($name) !!}" id="{!! Tpl::output($id) !!}" class="form-control-static {!! Tpl::output($css) !!}" style="{!! Tpl::output($style) !!}" {!! Tpl::output($attr) !!}>@{{ $_input_data }}</p>
        @elseif($type == 'password')
        <input type="password" name="{!! Tpl::output($name) !!}" id="{!! Tpl::output($id) !!}" class="form-control {!! Tpl::output($css) !!}" style="{!! Tpl::output($style) !!}" placeholder="{!! Tpl::output($placeholder) !!}" {!! Tpl::output($attr) !!} disableautocomplete autocomplete="off" />
        @elseif($type == 'date')
        <input type="text" name="{!! Tpl::output($name) !!}" id="{!! Tpl::output($id) !!}" class="date form-control {!! Tpl::output($css) !!}" style="{!! Tpl::output($style) !!}" placeholder="{!! Tpl::output($placeholder) !!}" {!! Tpl::output($attr) !!} value="@{{ Time::toDate($_input_data, 'Y-m-d') }}" />
        @elseif($type == 'datetime')
        <input type="text" name="{!! Tpl::output($name) !!}" id="{!! Tpl::output($id) !!}" class="datetime form-control {!! Tpl::output($css) !!}" style="{!! Tpl::output($style) !!}" placeholder="{!! Tpl::output($placeholder) !!}" {!! Tpl::output($attr) !!} value="@{{ Time::toDate($_input_data) }}" />
        @elseif($type == 'file')
        <div class="input-group input-group-file" id="{!! Tpl::output($id) !!}" class="{!! Tpl::output($css) !!}" style="{!! Tpl::output($style) !!}" {!! Tpl::output($attr) !!}>
            <input type="text" class="form-control" readonly="readonly" placeholder="{!! Tpl::output($placeholder) !!}">
            <span class="input-group-btn">
                <span class="btn btn-success btn-file">
                    <i class="icon wb-upload" aria-hidden="true"></i>
                    <input type="file" name="{!! Tpl::output($name) !!}" readonly="readonly" />
                </span>
            </span>
        </div>
        @elseif($type == 'fileUpload')
        <php>
            $file_id = 'file-' . Helper::getSn();
        </php>
        <div class="input-group input-group-file" id="{!! Tpl::output($id) !!}" class="{!! Tpl::output($css) !!}" style="{!! Tpl::output($style) !!}" {!! Tpl::output($attr) !!}>
            <input type="text" id="@{{ $file_id }}-input" class="form-control" readonly="readonly" placeholder="{!! Tpl::output($placeholder) !!}">
            <span class="input-group-btn">
                <a id="@{{ $file_id }}-link" class="btn btn-info" target="_blank" style="display:none;">
                    <i class="icon wb-eye" aria-hidden="true"></i>
                </a>
                <span class="btn btn-success btn-file">
                    <i class="icon wb-upload" aria-hidden="true"></i>
                    <input type="file" id="@{{ $file_id }}" readonly="readonly" />
                </span>
            </span>
        </div>
        <div id="@{{ $file_id }}-progress" class="progress" data-plugin="progress" style="height:2px;">
            <div class="progress-bar progress-bar-warning" role="progressbar"></div>
        </div>
        <script type="text/javascript">
        jQuery(function($){
            $('#@{{ $file_id }}').fileupload({
                url: "{!! Tpl::output($attrs['uploadUrl']) !!}",
                @if(isset($attrs['formData']))
                formData: {!! Tpl::output($attrs['formData']) !!},
                @endif
                dataType: 'json',
                start: function (e, data) {
                    $('#@{{ $file_id }}-progress .progress-bar').css('width', '0%');
                },
                done: function (e, data) {
                    $('#@{{ $file_id }}-input').val(data.result.url);
                    $('#@{{ $file_id }}-link').attr('href', data.result.url).show();
                },
                progressall: function (e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $('#@{{ $file_id }}-progress .progress-bar').css('width', progress + '%');
                }
            });
        });
        </script>
        @else
        <input type="text" name="{!! Tpl::output($name) !!}" id="{!! Tpl::output($id) !!}" class="form-control {!! Tpl::output($css) !!}" style="{!! Tpl::output($style) !!}" placeholder="{!! Tpl::output($placeholder) !!}" {!! Tpl::output($attr) !!} value="@{{ $_input_data }}" />
        @endif
        @if(isset($append))
        {!! $content !!}
        @endif
    @else
        {!! $content !!}
    @endif
    @if(!empty($btip)) <p class="help-block">{!! Tpl::output($btip, false) !!}</p> @endif
    @if($search != 1)
    </div>
    @endif
</div>
@endif