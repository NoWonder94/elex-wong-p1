@extends('default._layouts.base')
@section('body')
<div class="m-tip mb15">
	<div style="padding-bottom:15px;">
		<img src="{{ Helper::resource('manage/images/error.png') }}" alt="" class="imgfl">
		<div class="m-tipct">
			<p>错误提示</p>
			<p>{{ $msg }}</p>
		</div>
	</div>
	<p style="padding-top:20px;">
		系统将在 <span id="wait">3</span> 秒后自动跳转，
		@if (empty($url))
		<a href="javascript:history.back();">点击直接跳转</a>
		@else
		<a href="{{ $url }}">点击直接跳转</a>
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

