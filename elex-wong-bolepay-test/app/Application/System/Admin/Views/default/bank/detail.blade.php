@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:form>
        <tpl:fitem name="type" label="%admin.bank.type" required="true">
            <tpl:select name="type" options="$types" selected="$data['type']"></tpl:select>
        </tpl:fitem>
        <tpl:fitem label="%admin.bank.auto_type" required="true">
            <tpl:select name="auto_type" options="$auto_types" selected="$data['auto_type']"></tpl:select>
        </tpl:fitem>
        <tpl:fitem name="card" label="%admin.bank.card" required="true"></tpl:fitem>
        @if($mode == 'receive')
            <tpl:fitem name="name" label="%admin.bank.payee" required="true"></tpl:fitem>
        @else
            <tpl:fitem name="name" label="%admin.bank.payer" required="true"></tpl:fitem>
        @endif
        <tpl:fitem name="account" label="%admin.bank.account" required="true"></tpl:fitem>
        <tpl:fitem name="pwd" label="%admin.bank.pwd" tip="%admin.bank.pwd_tip" val="$data['pwd1']"></tpl:fitem>
        <tpl:fitem type="textarea" name="data" label="%admin.bank.data"></tpl:fitem>
        <tpl:fitem label="%admin.status">
            <tpl:radio name="status" options="$status_txts" checked="$data['status']" default="1"></tpl:radio>
        </tpl:fitem>
        @tpl_include('default._layouts.verify', ['action' => 'bank'])
        @if($data)
            <tpl:fitem type="hidden" name="mode" val="$data['mode']"></tpl:fitem>
        @else
            <tpl:fitem type="hidden" name="mode" val="$mode"></tpl:fitem>
        @endif
    </tpl:form>
    @tpl_end
@stop