@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:form action="dopwd">
        <tpl:fitem name="old_pwd" label="原密码" required="true">
             <attrs>
                <attr>data-fv-notempty-message="原密码不能为空"</attr>
            </attrs>
        </tpl:fitem>
        <tpl:fitem name="new_pwd" label="新密码" required="true">
             <attrs>
                <attr>data-fv-notempty-message="新密码不能为空"</attr>
            </attrs>
        </tpl:fitem>
        <tpl:fitem name="confirm_pwd" label="确认密码" required="true">
             <attrs>
                <attr>data-fv-notempty-message="确认密码不能为空" data-fv-identical="true" data-fv-identical-field="new_pwd" data-fv-identical-message="确认密码与新密码不相符"</attr>
            </attrs>
        </tpl:fitem>
    </tpl:form>
    @tpl_end
@stop