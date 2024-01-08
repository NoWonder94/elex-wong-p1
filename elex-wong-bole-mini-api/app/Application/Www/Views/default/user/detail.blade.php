@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:form>
        <!-- @if(isset($data['id'])) -->
        <tpl:fitem name="name" label="用户名" type="text"></tpl:fitem>
        <!-- @else -->
        <tpl:fitem name="name" label="用户名" required="true" placeholder="请输入用户名">
             <attrs>
                <attr>data-fv-notempty-message="用户名不能为空"</attr>
            </attrs>
        </tpl:fitem>
        <!-- @endif -->
        <tpl:fitem name="last_name" label="姓" required="true" placeholder="请输入姓">
             <attrs>
                <attr>data-fv-notempty-message="姓不能为空"</attr>
            </attrs>
        </tpl:fitem>
        <tpl:fitem name="first_name" label="名" required="true" placeholder="请输入名">
             <attrs>
                <attr>data-fv-notempty-message="名不能为空"</attr>
            </attrs>
        </tpl:fitem>
        <tpl:fitem label="性别" required="true">
            <tpl:select name="gender" options="先生,女士" texts="先生,女士" selected="$data['gender']"></tpl:select>
        </tpl:fitem>
        <!-- @if(isset($data['id'])) -->
        <tpl:fitem name="mobile" label="手机号码" tip="不修改保留为空" val="$data['mobile1']" placeholder="$data['auth_mobile']"></tpl:fitem>
        <tpl:fitem name="email" label="邮箱" tip="不修改保留为空" val="$data['email']" placeholder="$data['auth_email']"></tpl:fitem>
        <!-- @else -->
        <tpl:fitem name="mobile" label="手机号码" required="true" placeholder="请输入手机号码">
             <attrs>
                <attr>data-fv-notempty-message="手机号码不能为空"</attr>
            </attrs>
        </tpl:fitem>
        <tpl:fitem name="email" label="邮箱" placeholder="请输入邮箱"></tpl:fitem>
        <!-- @endif -->
    </tpl:form>
    @tpl_end
@stop