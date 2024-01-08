<div class="y-ump-wraper y-ng-scope">
    <div class="y-phone-model fl">
        <div class="y-phone-headset"></div>
        <div class="y-phone-screen">
            <div class="y-ump-preview">
                <div class="y-wp-config">
                    <div class="y-wp-widget"><h1><span>{!! Tpl::output($attrs['title']) !!}</span></h1></div>
                    <div id="previewHtml">
                        {!! Tpl::output($attrs['html']) !!}
                    </div>
                </div>
            </div>
        </div>
        <div class="y-phone-home"></div>
    </div>
    <div class="y-app-sidebar">
        <div class="y-arrow"></div>
        <div class="y-app-sidebar-inner y-widget-mod" id="previewForm">
            {!! Tpl::output($attrs['form']) !!}
        </div>
    </div>
</div>
<script type="text/tpl" id="previewTpl">
{!! Tpl::output($attrs['tpl']) !!}
</script>

<script type="text/javascript">
jQuery(function($){
    $(document).on('change blur', '#previewForm, #previewForm input, #previewForm select, #previewForm textarea', function() {
        var data = $.arrayToObject($('#previewForm form').serializeArray());
        $('#previewHtml').html($.template($("#previewTpl").html(), data));
    });
});
</script>