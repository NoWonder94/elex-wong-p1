<?php
$css   = $attrs['css'];
$tip   = isset($attrs['tip']) ? preg_replace("/[\r\n]/", "", $attrs['tip']) : '';
$sort  = isset($attrs['sort']) ? ($attrs['sort'] === 'true' ? 'desc' : $attrs['sort']) : false;
$defaultorder = isset($attrs['defaultorder']) ? true : false;
if ($sort) {
	$css .= 'table-td-sort';
}
?>
<php>
@if(!empty($tip))
$tabel_head_item_tip_id = 'tabel_head_item_tip' . Helper::getSn();
@endif

@if($sort)
$tabel_sort_type = "{{ $sort }}";
$tabel_head_item_sort = 'wb-sort-vertical';
$request_order = Request::get("order");
$request_sort  = strtolower(Request::get("sort"));

@if($defaultorder)
if (empty($request_sort)) {
	$tabel_sort_type = "{{ $sort }}" == 'asc' ? 'desc' : 'asc';
	$tabel_head_item_sort = "{{ $sort }}" == 'asc' ? 'wb-triangle-up' : 'wb-triangle-down';
}
if (empty($request_order)) {
	$request_order = "{{ $attrs['code'] }}";
}
@endif
if ($request_order == "{{ $attrs['code'] }}") {
	if (!empty($request_sort)) {
		if ($request_sort == 'asc') {
			$tabel_head_item_sort = 'wb-triangle-up';
			$tabel_sort_type = 'desc';
		} else {
			$tabel_head_item_sort = 'wb-triangle-down';
			$tabel_sort_type = 'asc';
		}
	}
	$tabel_head_item_sort .= ' active';
}
$tabel_sort_request = Request::all();
$tabel_sort_request['order'] = "{{ $attrs['code'] }}";
$tabel_sort_request['sort']  = $tabel_sort_type;
unset($tabel_sort_request['page']);
$tabel_sort_url = Helper::url(APP_CONTROLLER_NAME . '/' . APP_ACTION_NAME, $tabel_sort_request);
@else
$tabel_head_item_sort = '';
@endif
</php>
<td class="{!! Tpl::output($css) !!}" 
 style="text-align:center;white-space:nowrap;" 
 @if($attrs['width']) width="{!! Tpl::output($attrs['width']) !!}" @endif 
 code="{!! Tpl::output($attrs['code']) !!}" 
 @if($sort) sorturl="@{!! $tabel_sort_url !!}" @endif>
	<span>{!! Tpl::output($attrs['label']) !!}</span>
	@if(!empty($tip))
	<a id="@{{ $tabel_head_item_tip_id }}" data-toggle="tooltip" class="icon wb-help-circle nounderline" href="javascript:;"></a>
	@endif
	@if($sort)
	<a class="table-a-sort icon @{{ $tabel_head_item_sort }} nounderline" href="javascript:;"></a>
	@endif
</td>
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