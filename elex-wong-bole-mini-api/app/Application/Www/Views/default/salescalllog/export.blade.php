@extends('default._layouts.base')
@section('body')
<div class="panel">
    <div class="panel-heading">
		<h3 class="panel-title">成功生成文件</h3>
    </div>
    <div class="alert alert-danger alert-dismissible" role="alert">
		请及时下载文件，最多只保留一天时间
    </div>
    <div class="panel-body">
        <p>
			<a class="btn btn-success" href="{{ $url }}" target="_blank">立即下载</a>
		</p>
    </div>
</div>
@stop