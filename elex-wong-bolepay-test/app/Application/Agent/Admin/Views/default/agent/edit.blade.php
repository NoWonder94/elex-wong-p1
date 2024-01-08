@extends('default._layouts.base')
@section('body')
    @include('default.agent.menu')
    @tpl_begin
    <tpl:form>
        <tpl:fitem name="mobile" label="%admin.mobile" required="true"></tpl:fitem>
        <tpl:fitem name="email" label="%admin.email" required="true"></tpl:fitem>
        <tpl:fitem name="qq" label="%admin.qq"></tpl:fitem>
        <tpl:fitem name="pwd" label="%admin.agent.pwd" tip="%admin.agent.pwd_tip" val="$data['pwd1']"></tpl:fitem>
        @tpl_include('default._layouts.verify', ['action' => 'agentupdate'])
    </tpl:form>
    @tpl_end
@stop