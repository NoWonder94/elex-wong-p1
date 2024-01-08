<?php
$pname = !isset($attrs['pname']) ? 'provinceId' : $attrs['pname'];
$cname = !isset($attrs['cname']) ? 'cityId' : $attrs['cname'];
$aname = !isset($attrs['aname']) ? 'areaId' : $attrs['aname'];

$pid = !isset($attrs['pid']) ? $pname : $attrs['pid'];
$cid = !isset($attrs['cid']) ? $cname : $attrs['cid'];
$aid = !isset($attrs['aid']) ? $aname : $attrs['aid'];

$pval  = !isset($attrs['pval']) ? '' : $attrs['pval'];
$cval  = !isset($attrs['cval']) ? '' : $attrs['cval'];
$aval  = !isset($attrs['aval']) ? '' : $attrs['aval'];
$istip = !isset($attrs['showtip']) ? 0 : 1;
?>
@if($attrs['index'] == 1)
<script type="text/javascript" src="{{ Helper::resource('static/city.js') }}"></script>
@endif
@if(!empty($pname))
	@if(empty($cname)){
<select id="{!! Tpl::output($pid) !!}" name="{!! Tpl::output($pname) !!}" data-val="{!! Tpl::output($pval) !!}" data-showtip="{!! Tpl::output($istip) !!}" class="form-control province-city" style="width:auto; display:inline-block;"></select>
	@else
<select id="{!! Tpl::output($pid) !!}" name="{!! Tpl::output($pname) !!}" data-val="{!! Tpl::output($pval) !!}" data-showtip="{!! Tpl::output($istip) !!}" data-city="#{!! Tpl::output($cid) !!}" class="form-control province-city" style="width:auto; display:inline-block;"></select>
		@if(empty($aname))
<select id="{!! Tpl::output($cid) !!}" name="{!! Tpl::output($cname) !!}" data-val="{!! Tpl::output($cval) !!}" class="form-control" style="width:auto; display:inline-block;"></select>
		@else
<select id="{!! Tpl::output($cid) !!}" name="{!! Tpl::output($cname) !!}" data-val="{!! Tpl::output($cval) !!}" data-area="#{!! Tpl::output($aid) !!}" class="form-control" style="width:auto; display:inline-block;"></select>
<select id="{!! Tpl::output($aid) !!}" name="{!! Tpl::output($aname) !!}" data-val="{!! Tpl::output($aval) !!}" class="form-control" style="width:auto; display:inline-block;"></select>
		@endif
	@endif
@endif
<script type="text/javascript">
jQuery(function($){
	$.regionBind("#{!! Tpl::output($pid) !!}");
});
</script>