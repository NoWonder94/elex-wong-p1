@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:form>
        @tpl_include('default.agent.payments', ['type' => 'proxy'])
        @tpl_include('default.agent.withdrawplatform', ['type' => 'proxy'])
        @tpl_include('default._layouts.verify', ['action' => 'proxyedit'])
    </tpl:form>
    @tpl_end
@stop