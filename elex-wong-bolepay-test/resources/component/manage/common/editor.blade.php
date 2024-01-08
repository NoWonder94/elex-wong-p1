<?php
$width  = isset($attrs['width']) ? $attrs['width'] : '100%';
$height = isset($attrs['height']) ? $attrs['height'] : '280px';
$type   = isset($attrs['type']) ? $attrs['type'] : 'wap';
$id     = isset($attrs['id']) ? $attrs['id'] : $attrs['name'];

$css_path   = '';
$content    = trim($content);
if (empty($content)) { 
    $content = "resizeType:1,allowFileManager:false,items: [
'source', 'undo', 'redo', 'plainpaste', 'plainpaste', 'wordpaste', 'clearhtml', 'quickformat', 'selectall', 'fullscreen', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'hr',
'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'table', 'insertorderedlist',
'insertunorderedlist', '|', 'emoticons', 'tplimage', 'link', 'unlink']";
}
?>
<div id="{!! Tpl::output($attrs['name']) !!}-tip">
    <textarea data-tip-rel="#{!! Tpl::output($attrs['name']) !!}-tip" id="{!! Tpl::output($id) !!}-editor" class="tpl-editor {!! Tpl::output($attrs['css']) !!}" name="{!! Tpl::output($attrs['name']) !!}">{!! Tpl::output($attrs['val']) !!}</textarea>
</div>
<script>
jQuery(function($){
    KindEditor.ready(function(K){
        var {!! $id !!}editor = KindEditor.create("#{!! Tpl::output($id) !!}-editor",{
            afterBlur:function() { if( typeof kindEditorCallback === 'function' ){kindEditorCallback();} }, 
            width:"{!! Tpl::output($width) !!}",
            minWidth:"{!! Tpl::output($width) !!}",
            height:"{!! Tpl::output($height) !!}",
            syncType:"auto",
            {!! Tpl::output($content) !!}
        });
    });
});
</script>