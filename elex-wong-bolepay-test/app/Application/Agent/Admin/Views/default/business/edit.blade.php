@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:form>
        @tpl_include('default.agent.payments', ['type' => 'business'])
        @tpl_include('default.agent.withdrawplatform', ['type' => 'business'])
        @tpl_include('default._layouts.verify', ['action' => 'businessedit'])
    </tpl:form>
    @tpl_end
@stop