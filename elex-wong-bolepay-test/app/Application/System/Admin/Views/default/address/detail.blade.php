@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:form>
        <!-- @if(isset($data['id']) && $data['income'] > 0) -->
        <tpl:fitem name="address" label="%admin.address.address" type="text"></tpl:fitem> 
        <!-- @else -->
        <tpl:fitem name="address" label="%admin.address.address" required="true" tip="%admin.address.address_tip"></tpl:fitem>
        <!-- @endif -->
        @if(isset($data['status']) && $data['status'] != 2)
            <tpl:fitem label="%admin.status">
                <tpl:radio name="status" options="$status" checked="$data['status']" default="1"></tpl:radio>
            </tpl:fitem>
        @endif
    </tpl:form>
    @tpl_end
@stop 