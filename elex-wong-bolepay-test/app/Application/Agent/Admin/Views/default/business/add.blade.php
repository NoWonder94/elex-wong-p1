@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:form>
        <tpl:fitem name="name" label="%admin.agent.name" required="true"></tpl:fitem>
        <tpl:fitem name="real_name" label="%admin.agent.real_name"></tpl:fitem>
        <tpl:fitem name="pwd" label="%admin.agent.pwd" required="true" val="a123456"></tpl:fitem>
        <tpl:fitem name="mobile" label="%admin.mobile" required="true"></tpl:fitem>
        <tpl:fitem name="email" label="%admin.email" required="true"></tpl:fitem>
        <tpl:fitem name="qq" label="%admin.qq"></tpl:fitem>
        @tpl_include('default.agent.payments', ['type' => 'business'])
        @tpl_include('default.agent.withdrawplatform', ['type' => 'business'])
        <php>
            $finish_types = Lang::get('admin.agent.finish_types');
            $finish_types = array_intersect_key($finish_types, $allow_finish_types);
            $finish_type  = key($finish_types);
        </php>
        <tpl:fitem label="%admin.agent.finish_type">
            <tpl:radio name="finish_type" options="$finish_types" checked="$data['finish_type']" default="$finish_type"></tpl:radio>
        </tpl:fitem>
        <tpl:fitem name="remark" label="%admin.remark" type="textarea"></tpl:fitem>
        @tpl_include('default._layouts.verify', ['action' => 'businessadd'])
    </tpl:form>
    @tpl_end
@stop