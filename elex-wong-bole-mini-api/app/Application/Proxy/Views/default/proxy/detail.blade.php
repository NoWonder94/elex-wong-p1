@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <div class="panel form-box " style="">
        <div class="panel-body">
            <form class="validate-form ajax-form fv-form fv-form-bootstrap"  > 
                <div id="name-form-item" class="form-group " style="">
                    <label for="name" class="control-label "> 用户名：<span class="required text-danger"> {{$data['name']}} </span></label>
                    <div></div> 
                </div> 
                <div id="real_name-form-item" class="form-group " style="">
                    <label for="real_name" class="control-label "> 真实姓名：<span class="required text-danger">{{ $data['real_name'] }}</span></label>
                    <div></div> 
                </div>
                <div id="gender-form-item" class="form-group " style="">
                    <label for="gender" class="control-label "> 性别：<span class="required text-danger">{{ $data['gender'] }}</span></label>
                    <div></div> 
                </div>
                <div id="email-form-item" class="form-group " style="">
                    <label for="email" class="control-label "> 邮箱：<span class="required text-danger">{{ $data['email'] }}</span></label>
                    <div></div> 
                </div> 
            </form>
        </div>
    </div>
    <!--tpl:form> 
        <tpl:fitem name="name" label="用户名" type="text"></tpl:fitem> 
        <tpl:fitem name="real_name" label="真实姓名"  type="text" required="true" placeholder="请输入真实姓名">
             <attrs>
                <attr>data-fv-notempty-message="真实姓名不能为空"</attr>
            </attrs>
        </tpl:fitem> 
        <tpl:fitem label="性别"  type="text" required="true">
            <tpl:select name="gender" options="先生,女士" texts="先生,女士" selected="$data['gender']"></tpl:select>
        </tpl:fitem> 
        <tpl:fitem name="email" label="邮箱"  type="text" placeholder="请输入邮箱"></tpl:fitem> 
        <tpl:fitem name="pwd" type="password" label="密码" tip="不修改保留为空" val="$data['pwd1']"></tpl:fitem> 
    </tpl:form-->
    @tpl_end
@stop