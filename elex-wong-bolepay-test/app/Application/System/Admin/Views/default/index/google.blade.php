@extends('default._layouts.base')
@section('body')
    @tpl_begin 
    <tpl:form action="dogoogle">
        <div class="row">
            <div class="col-md-12">
                <h3>{{ Lang::get('admin.google.title') }}</h3>
                <p>{{ Lang::get('admin.google.step_1') }}</p>
                <p style="padding-left:8px;"><img src="{{ Helper::resource('manage/google.png') }}" height="180" /></p>
                <p>{{ Lang::get('admin.google.step_2') }}</p>
                <img src="data:image/png;base64,{{ $qrcode }}"><br/><br/>
            </div>
        </div>
        <tpl:fitem name="code" label="%admin.google.step_3" placeholder="%admin.google.tip" required="true"></tpl:fitem>
    </tpl:form> 
    @tpl_end
@stop