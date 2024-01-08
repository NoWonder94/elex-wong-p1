<?php
$width  = isset($attrs['width']) ? $attrs['width'] : '100%';
$height = isset($attrs['height']) ? $attrs['height'] : '280px';
$type   = isset($attrs['type']) ? $attrs['type'] : 'wap';
$id     = isset($attrs['id']) ? $attrs['id'] : $attrs['name'];

$css_path   = '';
$content    = trim($content);
if (empty($content)) {
    $content = 'resizeType:1';
    if ($type == 'simple') {
        $content .= "allowPreviewEmoticons:false,allowImageUpload:false,allowFileManager:false,
        items:['fontname','fontsize','|','forecolor','hilitecolor','bold','italic','underline',
            'removeformat','|','justifyleft','justifycenter','justifyright','insertorderedlist','insertunorderedlist','|', 'link']";
    } elseif($type == 'wx') {
        $content .= ",allowPreviewEmoticons:false,allowImageUpload:false,allowFileManager:false,
        items:['wxemoticons','wxlink','unlink']";
    } else{
        $content .= ",allowFileManager:false,items: [
'source', 'undo', 'redo', 'plainpaste', 'plainpaste', 'wordpaste', 'clearhtml', 'quickformat', 'selectall', 'fullscreen', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'hr',
'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'table', 'insertorderedlist',
'insertunorderedlist', '|', 'emoticons', 'tplimage', 'link', 'unlink']";
        if ($type == 'wap') {
            $css_path_arr = Config::get('app.wap_editor_css');
            $css_path = [];
            foreach ($css_path_arr as $css_path_item) {
                $css_path[] = Helper::resource($css_path_item) . '?' . SYSTEM_VERSION;
            }

            if (count($css_path) > 0) {
                $css_path = '["' . implode('","', $css_path) . '"]';
            }
        }
    }
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
            cssPath:{!! Tpl::output($css_path) !!},
            {!! Tpl::output($content) !!}
        });
    });
});
</script>