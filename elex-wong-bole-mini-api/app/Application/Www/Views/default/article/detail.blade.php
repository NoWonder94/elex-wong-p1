@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:form> 
        <tpl:fitem name="title" label="公告标题" placeholder="请输入公告标题"></tpl:fitem> 
        <tpl:fitem name="brief" label="公告简介" placeholder="请输入公告简介"></tpl:fitem> 
        <tpl:fitem name="content" label="公告内容" type="textarea" placeholder="请输入公告内容"></tpl:fitem> 
    </tpl:form>
    @tpl_end
@stop