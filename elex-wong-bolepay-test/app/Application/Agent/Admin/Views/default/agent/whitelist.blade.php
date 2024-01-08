@extends('default._layouts.base')
@section('body')
    @include('default.agent.menu')
    @tpl_begin
    <tpl:form action="dowhitelist">
        <tpl:fitem name="admin_ips" label="%admin.agent.admin_ips" tip="%admin.agent.admin_ips_tip" type="textarea"></tpl:fitem>
        <tpl:fitem name="api_ips" label="%admin.agent.api_ips" tip="%admin.agent.api_ips_tip" type="textarea"></tpl:fitem>
        @tpl_include('default._layouts.verify', ['action' => 'agentwhitelist'])
    </tpl:form>
    @tpl_end
@stop
