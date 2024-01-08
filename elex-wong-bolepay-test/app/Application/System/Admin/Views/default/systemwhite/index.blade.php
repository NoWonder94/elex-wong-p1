@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:form action="update">
        <tpl:fitem name="admin_ips" label="%admin.setting.admin_ips" tip="%admin.setting.admin_ips_tip" type="textarea"></tpl:fitem>
        <tpl:fitem name="api_ips" label="%admin.setting.api_ips" tip="%admin.setting.api_ips_tip" type="textarea"></tpl:fitem>
        <tpl:fitem name="bad_client_ips" label="%admin.setting.bad_client_ips" tip="%admin.setting.bad_client_ips_tip" type="textarea">
            <attrs>
                <attr>rows="10" </attr>
            </attrs>
        </tpl:fitem>
        @tpl_include('default._layouts.verify', ['action' => 'systemwhite'])
    </tpl:form>
    @tpl_end
@stop