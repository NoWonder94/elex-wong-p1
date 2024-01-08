@extends('default._layouts.base')

@section('body')
    @tpl_begin
    <tpl:form>
        @if(isset($data['id']))
            @if($data->parent)
                <tpl:fitem label="%admin.agent.parent">
                    <p class="form-control-static">{{ $data->parent->name }}</p>
                </tpl:fitem>
            @endif
            <tpl:fitem name="name" label="%admin.agent.name" type="text"></tpl:fitem>
            <tpl:fitem name="pwd" label="%admin.agent.pwd" tip="%admin.agent.pwd_tip" val="$data['pwd1']"></tpl:fitem>
        @else
            @tpl_include('default.proxy.search', ['name' => 'parent_id'])
            <tpl:fitem name="name" label="%admin.agent.name" required="true"></tpl:fitem>
            <tpl:fitem name="pwd" label="%admin.agent.pwd" required="true" val="a123456"></tpl:fitem>
        @endif
        <tpl:fitem name="real_name" label="%admin.agent.real_name"></tpl:fitem>
        <tpl:fitem name="mobile" label="%admin.mobile" required="true"></tpl:fitem>
        <tpl:fitem name="email" label="%admin.email" required="true"></tpl:fitem>
        <tpl:fitem name="qq" label="%admin.qq"></tpl:fitem>
        @tpl_include('default.agent.payments', ['type' => 'proxy'])
        <php>
            $finish_types = Lang::get('admin.agent.finish_types');
        </php>
        @tpl_include('default.agent.withdrawplatform', ['type' => 'proxy'])
        <tpl:fitem label="%admin.agent.finish_type">
            <tpl:radio name="finish_type" options="$finish_types" checked="$data['finish_type']" default="1"></tpl:radio>
        </tpl:fitem>
        @if(isset($data['id']))
            <tpl:fitem label="%admin.agent.reset_google">
                <tpl:radio name="reset_google" options="$is_search" default="1"></tpl:radio>
            </tpl:fitem>
        @endif
        <tpl:fitem name="admin_ips" label="%admin.agent.admin_ips" tip="%admin.agent.admin_ips_tip" type="textarea"></tpl:fitem>
        <tpl:fitem name="api_ips" label="%admin.agent.api_ips" tip="%admin.agent.api_ips_tip" type="textarea"></tpl:fitem>
        @if($data)
        <tpl:fitem label="%admin.agent.app_id">
            <div class="input-group">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                      <span class="checkbox-custom checkbox-primary">
                        <input type="checkbox" id="reset_app_id" name="reset_app_id" value="1">
                        <label for="reset_app_id">重新生成</label>
                      </span>
                    </div>
                </div>
                <input type="text" name="app_id" value="{{ $data['app_id'] }}" class="form-control" disabled="disabled">
            </div>
        </tpl:fitem>
        <tpl:fitem label="%admin.agent.app_secret">
            <div class="input-group">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                      <span class="checkbox-custom checkbox-primary">
                        <input type="checkbox" id="reset_app_secret" name="reset_app_secret" value="1">
                        <label for="reset_app_secret">重新生成</label>
                      </span>
                    </div>
                </div>
                <input type="text" name="app_secret" value="{{ $data['app_secret'] }}" class="form-control" disabled="disabled">
            </div>
        </tpl:fitem>
        @endif
        <tpl:fitem name="remark" label="%admin.remark" type="textarea"></tpl:fitem>
        @tpl_include('default._layouts.verify', ['action' => 'proxy'])
    </tpl:form>
    @tpl_end
@stop