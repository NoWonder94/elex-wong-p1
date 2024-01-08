@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:form>
        <!-- @if(isset($data['id'])) -->
        <tpl:fitem name="name" label="账号" type="text"></tpl:fitem>
        <tpl:fitem name="pwd" label="密码" tip="不修改保留为空" val="$data['pwd1']"></tpl:fitem>
        <!-- @else -->
        <tpl:fitem name="name" label="账号" required="true" placeholder="请输入账号">
             <attrs>
                <attr>data-fv-notempty-message="账号不能为空"</attr>
            </attrs>
        </tpl:fitem>
        <tpl:fitem name="pwd" label="密码" required="true" val="" placeholder="请输入密码">
            <attrs>
                <attr>data-fv-notempty-message="密码不能为空"</attr>
            </attrs>
        </tpl:fitem>
        <!-- @endif -->
        <tpl:fitem label="管理员组" required="true">
            <tpl:select name="role_id" options="$roles" valuefield="id" textfield="name" selected="$data['role_id']"></tpl:select>
        </tpl:fitem>
    </tpl:form>
    @tpl_end
@stop