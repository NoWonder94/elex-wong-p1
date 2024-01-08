@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:form file="true" noajax="true" action="doimport">
        <tpl:fitem notitle="true">
            <p>批量文件: <a href="{{ Helper::resource('resources/user.xls') }}" target="_blank">下载文件</a>，每次最多处理1000条数据</p>
            <p><input type="file" name="users" class="form-control" /></p>
        </tpl:fitem>
    </tpl:form>
    @tpl_end
@stop