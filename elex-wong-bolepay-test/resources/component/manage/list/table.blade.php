<php>
    $list_item_key = @if($List['pk']) '{{ $List['pk'] }}' @else 'id' @endif;
    $table_id	   = 'tabel' . Helper::getSn();
</php>
<?php
$css = isset($attrs['noborder']) ? '' : 'table-bordered';
$plugin = isset($attrs['plugin']) ? $attrs['plugin'] : '';
$datatable_options = isset($attrs['datatable-options']) ? $attrs['datatable-options'] : 0;
?>
<div id="@{{ $table_id }}-box">
    <table id="@{{ $table_id }}"
     @if($attrs['controller']) controller="{!! Tpl::output($attrs['controller']) !!}" @endif
     @if($attrs['module']) module="{!! Tpl::output($attrs['module']) !!}" @endif
     @if($attrs['action']) action="{!! Tpl::output($attrs['action']) !!}" @endif
     border="0" cellpadding="6" cellspacing="1"
     class="table {!! Tpl::output($css) !!} {!! Tpl::output($attrs['css']) !!} @if($attrs['checkbox']) checkListTable @endif"
     style="{!! Tpl::output($attrs['style']) !!}"
     {!! Tpl::output($attrs['attr']) !!}>
        {!! $content !!}
    </table>
</div>
<script>
@if($plugin == "datatable")
jQuery(function ($) {
    APP.NOW_DATA_TABLE = $('#@{{ $table_id }}').DataTable({
        //"autoWidth": false,
        "ordering":false,
        "paging":false,
        "info":false,
        "searching":false
        @if($datatable_options)
        ,{!! $datatable_options !!}
        @endif
    });

    $('#@{{ $table_id }}-box').on('click', 'th.sorting', function () {
        location.href = $(this).attr("url");
    });

    $('#@{{ $table_id }}-box').on('click', '.td-details', function () {
        var tr   = $(this).parent();
        var icon = $('i', this);
        var key  = tr.attr('key');

        @if(isset($attrs['detail-new-row']))
        var prow = APP.NOW_DATA_TABLE.row('.tr-' + key).node();
        var drow = APP.NOW_DATA_TABLE.row('.tr-' + key + '-detail').node();
        var html = $('script', prow).html();

        if (icon.hasClass('wb-zoom-out')) {
            $(drow).css('display', 'none').html(html);
            APP.NOW_DATA_TABLE.draw(false);
            APP.NOW_DATA_TABLE.fixedColumns().update();
            $('.DTFC_LeftBodyWrapper .list-tbody .tr-' + key + ' .td-details i').removeClass('wb-zoom-out').addClass('wb-zoom-in');
        } else {
            $(drow).css('display', '').html(html);
            APP.NOW_DATA_TABLE.draw(false);
            APP.NOW_DATA_TABLE.fixedColumns().update();
            $('.DTFC_LeftBodyWrapper .list-tbody .tr-' + key + ' .td-details i').removeClass('wb-zoom-in').addClass('wb-zoom-out');
            if(typeof APP.LIST_DETAIL_SHOW_FUNC == "function"){
                APP.LIST_DETAIL_SHOW_FUNC.call(this, key);
            }
        }
        @else
        var row = APP.NOW_DATA_TABLE.row('.tr-' + key);
        if (row.child.isShown()) {
            icon.removeClass('wb-zoom-out').addClass('wb-zoom-in');
            row.child.hide();
        } else {
            var html = $($('script', this).html());
            row.child(html).show();
            icon.removeClass('wb-zoom-in').addClass('wb-zoom-out');
            if(typeof APP.LIST_DETAIL_SHOW_FUNC == "function"){
                APP.LIST_DETAIL_SHOW_FUNC.call(this, key);
            }
        }
        @endif
    });
});
@endif
</script>
<?php
$minwidth = isset($attrs['minwidth']) ? $attrs['minwidth'] : 0;
$pager    = !isset($attrs['pager']) ? 'pager' : ($attrs['pager'] == 'no' ? '' : $attrs['pager']);
?>
@if(!empty($pager))
{@}include('component.manage.common.{!! Tpl::output($pager) !!}')
@endif