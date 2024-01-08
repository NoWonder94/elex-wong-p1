@extends('default._layouts.base')
@section('body')
<div class="alert alert-icon alert-danger alert-dismissible" role="alert">
	<i class="icon md-notifications" aria-hidden="true"></i>
	<h4>{{ Lang::get('admin.error_tip') }}</h4>
	<p class="mt-15">{{ $msg }}</p>
	<p class="mt-15">
		{!! Lang::format('admin.jump_tip', 3) !!}
		@if (empty($url))
			<a href="javascript:history.back();">{{ Lang::get('admin.jump_click') }}</a>
		@else
			<a href="{{ $url }}">{{ Lang::get('admin.jump_click') }}</a>
		@endif
	</p>
</div>
<script type="text/javascript">
jQuery(function($){
	var wait = 3;
	var func = function(){
		wait--;
		if(wait < 1){
			@if (empty($url))
			history.back();
			@else
			location.href = "{{ $url }}";
			@endif
		}else{
			$("#wait").html(wait);
			setTimeout(func,1000);
		}
	}
	setTimeout(func,1000);
});
</script>
@stop