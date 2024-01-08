<?php
$css    = $attrs['css'];
$order  = isset($attrs['order']) ? (int)$attrs['order'] : false;
$sort   = isset($attrs['sort']) ? $attrs['sort'] : '';
$minwidth  = isset($attrs['minwidth']) ? $attrs['minwidth'] : '';
$halign = isset($attrs['halign']) ? $attrs['halign'] : 'center';
$tip    = isset($attrs['tip']) ? preg_replace("/[\r\n]/", "", $attrs['tip']) : '';
if ($order !== false) {
	$css .= ' sorting';
}
?>
<php>
@if(!empty($tip))
$tabel_head_item_tip_id = 'tabel_head_item_tip' . Helper::getSn();
@endif

$tabel_head_css = "";
$tabel_sort_url = "";

@if($order !== false)
$request_order = Request::get("order");
$request_sort  = strtolower(Request::get("sort"));

$tabel_sort_request = Request::all();
$tabel_sort_request['order'] = "{{ $attrs['code'] }}";
unset($tabel_sort_request['page']);

if ($request_order == "{{ $attrs['code'] }}") {
	$tabel_head_css = "sorting_" . $request_sort;
	$tabel_sort_request['sort'] = $request_sort == 'asc' ? 'desc' : 'asc';
	$tabel_sort_url = Helper::url(APP_CONTROLLER_NAME . '/' . APP_ACTION_NAME, $tabel_sort_request);
} else {
	$tabel_sort_request['sort'] = "{{ $sort }}";
@if($order == 1)
if (empty($request_order)) {
	$tabel_head_css = "sorting_{{ $sort }}";
	$tabel_sort_request['sort'] = "{{ $sort }}" == 'asc' ? 'desc' : 'asc';
}
@endif
	$tabel_sort_url = Helper::url(APP_CONTROLLER_NAME . '/' . APP_ACTION_NAME, $tabel_sort_request);
}
@endif
</php>
<th class="{!! Tpl::output($css) !!} @{{ $tabel_head_css }}"
 style="{!! Tpl::output($attrs['hstyle']) !!};text-align:{!! Tpl::output($halign) !!};white-space:nowrap;@if($minwidth)min-width:{!! $minwidth . 'px' !!} @endif"
 @if($attrs['width']) width="{!! Tpl::output($attrs['width']) !!}" @endif
 code="{!! Tpl::output($attrs['code']) !!}" url="@{{ $tabel_sort_url }}">
	<span>{!! Tpl::output($attrs['label']) !!}</span>
	@if(!empty($tip))
	<a id="@{{ $tabel_head_item_tip_id }}" data-toggle="tooltip" class="icon wb-help-circle nounderline" href="javascript:;"></a>
	@endif
</th>
@if(!empty($tip))
<script>
jQuery(function($){
	$('#@{{ $tabel_head_item_tip_id }}').tooltip({
		"html":"{!! Tpl::output($tip) !!}",
		"title":function(){
            return "{!! Tpl::output($tip) !!}";
        }
	});
});
</script>
@endif