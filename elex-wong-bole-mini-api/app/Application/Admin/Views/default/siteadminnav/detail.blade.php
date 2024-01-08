@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:form>
        <tpl:fitem name="name" label="名称" required="true" placeholder="请输入名称">
            <attrs>
                <attr>data-fv-notempty-message="名称不能为空"</attr>
            </attrs>
        </tpl:fitem>
        <tpl:fitem label="所属菜单">
            <tpl:select name="pid" options="$navs" textfield="name" valuefield="id" first="不选择" firstvalue="0" selected="$data['pid']"></tpl:select>
        </tpl:fitem>
        <tpl:fitem name="icon" label="图标" default="th">
            <attrs>
                <tip><![CDATA[<a class="text-info" href="http://fontawesome.io/icons/" target="_blank">查看图标</a>]]></tip>
            </attrs>
        </tpl:fitem>
        <tpl:fitem name="sort" label="排序" default="100"></tpl:fitem>
    </tpl:form>
    @tpl_end
@stop