@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:form>
        <tpl:fitem name="name" label="站点名称" required="true" placeholder="请输入站点名称">
            <attrs>
                <attr>data-fv-notempty-message="站点名称不能为空"</attr>
            </attrs>
        </tpl:fitem>
        <tpl:fitem name="domain" label="站点代码" required="true" placeholder="请输入站点代码">
            <attrs>
                <attr>data-fv-notempty-message="站点代码不能为空"</attr>
            </attrs>
        </tpl:fitem>
        <tpl:fitem name="url" label="站点链接" required="true" placeholder="请输入站点链接">
            <attrs>
                <attr>data-fv-notempty-message="站点链接不能为空"</attr>
            </attrs>
        </tpl:fitem>
        @if($data)
        <tpl:fitem name="url" label="APP ID">
            <div class="input-group col-md-12">
                <span class="input-group-addon" style="width: 138px;">
                    <input class="uniform" type="checkbox" name="reset_app_id" value="1"/>&nbsp;重新生成　
                </span>
                <input type="text" name="app_id" value="{{ $data['app_id'] }}" class="form-control" disabled="disabled">
            </div>
        </tpl:fitem>
        <tpl:fitem name="url" label="APP SECRET">
            <div class="input-group col-md-12">
                <span class="input-group-addon" style="width: 138px;">
                    <input class="uniform" type="checkbox" name="reset_app_secret" value="1"/>&nbsp;重新生成
                </span>
                <input type="text" name="app_secret" value="{{ $data['app_secret'] }}" class="form-control" disabled="disabled">
            </div>
        </tpl:fitem>
        @endif
		<tpl:fitem label="语音平台" required="true">
            <tpl:select name="config[type]" options="twilio,plivo" texts="Twilio,Plivo" selected="$data['config']['type']"></tpl:select>
        </tpl:fitem>
        <tpl:fitem name="twilio_config" label="TWILIO配置" required="true">
            <div class="form-group input-group col-md-12">
                <span class="input-group-addon" style="width: 138px;">ACCOUNT SID</span>
                <input type="text" class="form-control" name="config[twilio][account_sid]" value="{{ $data['config']['twilio']['account_sid'] }}">
            </div>
            <div class="form-group input-group col-md-12">
                <span class="input-group-addon" style="width: 138px;">AUTH TOKEN</span>
                <input type="text" class="form-control" name="config[twilio][auth_token]" value="{{ $data['config']['twilio']['auth_token'] }}">
            </div>
            <div class="form-group input-group col-md-12">
                <span class="input-group-addon" style="width: 138px;">APP SID</span>
                <input type="text" class="form-control" name="config[twilio][app_sid]" value="{{ $data['config']['twilio']['app_sid'] }}">
            </div>
            <div class="form-group input-group col-md-12">
                <span class="input-group-addon" style="width: 138px;">PHONE NUMBER</span>
                <input type="text" class="form-control" name="config[twilio][phone_number]" value="{{ $data['config']['twilio']['phone_number'] }}">
            </div>
			<div class="form-group input-group col-md-12">
                <span class="input-group-addon" style="width: 138px;">SMS NUMBER</span>
                <input type="text" class="form-control" name="config[twilio][sms_number]" value="{{ $data['config']['twilio']['sms_number'] }}">
            </div>
        </tpl:fitem>
		<tpl:fitem name="plivo_config" label="PLIVO配置" required="true">
            <div class="form-group input-group col-md-12">
                <span class="input-group-addon" style="width: 138px;">AUTH ID</span>
                <input type="text" class="form-control" name="config[plivo][auth_id]" value="{{ $data['config']['plivo']['auth_id'] }}">
            </div>
            <div class="form-group input-group col-md-12">
                <span class="input-group-addon" style="width: 138px;">AUTH TOKEN</span>
                <input type="text" class="form-control" name="config[plivo][auth_token]" value="{{ $data['config']['plivo']['auth_token'] }}">
            </div>
            <div class="form-group input-group col-md-12">
                <span class="input-group-addon" style="width: 138px;">ENDPOINT USER</span>
                <input type="text" class="form-control" name="config[plivo][endpoint_user]" value="{{ $data['config']['plivo']['endpoint_user'] }}">
            </div>
			<div class="form-group input-group col-md-12">
                <span class="input-group-addon" style="width: 138px;">ENDPOINT PWD</span>
                <input type="text" class="form-control" name="config[plivo][endpoint_password]" value="{{ $data['config']['plivo']['endpoint_password'] }}">
            </div>
            <div class="form-group input-group col-md-12">
                <span class="input-group-addon" style="width: 138px;">PHONE NUMBER</span>
                <input type="text" class="form-control" name="config[plivo][phone_number]" value="{{ $data['config']['plivo']['phone_number'] }}">
            </div>
			<div class="form-group input-group col-md-12">
                <span class="input-group-addon" style="width: 138px;">SMS NUMBER</span>
                <input type="text" class="form-control" name="config[plivo][sms_number]" value="{{ $data['config']['plivo']['sms_number'] }}">
            </div>
        </tpl:fitem>
    </tpl:form>
    @tpl_end
@stop