@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <php>
        $receive_types = Lang::get('admin.notice.receive_types');
    </php>
	<tpl:form>
		<tpl:fitem name="title" label="%admin.title" required="true"></tpl:fitem>
		<tpl:fitem label="%admin.content" required="true">
			<tpl:Editor name="content" value="{{$data['content']}}"></tpl:Editor> 
		</tpl:fitem>
		<tpl:fitem name="end_time" label="%admin.notice.end_time" type="datetime" required="true" tip="%admin.notice.end_time_tip"></tpl:fitem>
		<tpl:fitem label="%admin.notice.receive_type">
			<tpl:radio name="receive_type" css="receive_type" options="$receive_types" checked="$data['receive_type']" default="1"></tpl:radio>
		</tpl:fitem>
		<tpl:fitem name="proxy_yes" pcss="receive_type_1 receive_type_2" label="%admin.notice.proxy_yes" type="textarea" tip="%admin.notice.proxy_yes_tip"></tpl:fitem>
		<tpl:fitem name="proxy_no" pcss="receive_type_1 receive_type_2"  label="%admin.notice.proxy_no" type="textarea" tip="%admin.notice.proxy_no_tip"></tpl:fitem>
		<tpl:fitem name="business_yes" pcss="receive_type_1 receive_type_3" label="%admin.notice.business_yes" type="textarea" tip="%admin.notice.business_yes_tip"></tpl:fitem>
		<tpl:fitem name="business_no" pcss="receive_type_1 receive_type_3"  label="%admin.notice.business_no" type="textarea" tip="%admin.notice.business_no_tip"></tpl:fitem>
		@tpl_include('default._layouts.verify', ['action' => 'notice'])
	</tpl:form>
    @tpl_end
	<script>
		jQuery(function ($) {
			$('.receive_type').change(function () {
				var type = $('.receive_type:checked').val();
				if (type > 1) {
					$('.receive_type_1').hide();
					$('.receive_type_' + type).show();
				} else {
					$('.receive_type_1').show();
				}
			}).trigger('change');
		})
	</script>
@stop 