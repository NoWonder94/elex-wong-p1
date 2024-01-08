@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:form>
        <tpl:fitem name="code" label="短信代码" required="true" placeholder="请输入短信代码">
             <attrs>
                <attr>data-fv-notempty-message="短信代码不能为空"</attr>
            </attrs>
        </tpl:fitem>
        <tpl:fitem name="content" type="textarea" label="短信内容" required="true" placeholder="请输入短信内容">
            <attrs>
                <attr>data-fv-notempty-message="短信内容不能为空"</attr>
				<btip><![CDATA[<span style="color:#f00;">为确保短信正常发送，请注意：<br/>
1) 网址格式使用：w w w fafa678 点 c0 m<br/>
2) 勿使用敏感词：请在这里过滤 http://www.xiaohexie.com/</span>]]></btip>
            </attrs>
        </tpl:fitem>
    </tpl:form>
    @tpl_end
@stop