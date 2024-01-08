@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <php>
        if ($login_admin['role_id'] != 1) {
            foreach($roles as $key => $role) {
                if ($role['id'] == 1){
                    unset($roles[$key]);
                }
            }
        } 
    </php>
    <tpl:form>
        <!-- @if(isset($data['id'])) -->
        <tpl:fitem name="name" label="%admin.admin.name" type="text"></tpl:fitem> 
        @if ($data['id'] != $login_admin['id']) 
        <tpl:fitem name="pwd" label="%admin.admin.pwd" tip="%admin.admin.pwd_tip" val="$data['pwd1']"></tpl:fitem>
        @endif
        <!-- @else -->
        <tpl:fitem name="name" label="%admin.admin.name" required="true"></tpl:fitem>
        <tpl:fitem name="pwd" label="%admin.admin.pwd" required="true" val=""></tpl:fitem>
        <!-- @endif -->
        <tpl:fitem name="email" label="%admin.email" required="true"></tpl:fitem>
        <tpl:fitem label="%admin.admin.admin_group" required="true">
            <tpl:select name="role_id" options="$roles" valuefield="id" textfield="name" selected="$data['role_id']"></tpl:select>
        </tpl:fitem>
        @if(isset($data['id']))
        <tpl:fitem label="%admin.admin.reset_google_verify">
            <tpl:radio name="reset_google" options="$is_search" default="1"></tpl:radio>
        </tpl:fitem>
        @endif
            @tpl_include('default._layouts.verify', ['action' => 'admin'])
    </tpl:form>
    @tpl_end
@stop 