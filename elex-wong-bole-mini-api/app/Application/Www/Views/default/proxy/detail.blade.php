@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:form>
        <!-- @if(isset($data['id'])) -->
        <tpl:fitem name="name" label="用户名" type="text"></tpl:fitem>
        <tpl:fitem name="proxy_code" label="代理码" type="text"></tpl:fitem>
        <!-- @else -->
        <tpl:fitem name="name" label="用户名" type="text" placeholder="请输入用户名">
             <attrs>
                <attr>data-fv-notempty-message="用户名不能为空"</attr>
            </attrs>
        </tpl:fitem>
        <!-- @endif -->
        <tpl:fitem name="real_name" label="真实姓名" type="text" placeholder="请输入真实姓名">
             <attrs>
                <attr>data-fv-notempty-message="真实姓名不能为空"</attr>
            </attrs>
        </tpl:fitem> 
        <div id="gender-form-item" class="form-group " style="">
            <label for="gender" class="control-label "> 性别：{{ $data['gender'] }}</label>
            <div></div> 
        </div>
        <!--tpl:fitem label="性别" type="text">
            <tpl:select name="gender" options="先生,女士" texts="先生,女士" selected="$data['gender']"></tpl:select>
        </tpl:fitem--> 
        <tpl:fitem name="mobile" label="手机号码" type="text" placeholder="请输入手机号码">
             <attrs>
                <attr>data-fv-notempty-message="手机号码不能为空"</attr>
            </attrs>
        </tpl:fitem>
        <tpl:fitem name="email" label="邮箱" type="text" placeholder="请输入邮箱"></tpl:fitem> 
        <tpl:fitem name="qq" label="QQ" type="text" placeholder="请输入QQ"></tpl:fitem> 
        <tpl:fitem name="remark" label="备注" placeholder="请输入备注信息"></tpl:fitem>
        <tpl:fitem label="代理等级">
            <tpl:select name="level_id" options="$level_keys" texts="$level_values" selected="$data['level_id']"></tpl:select>
        </tpl:fitem>
        @if($data['update_level_id'] > 0)
        <div>
            <p style="color: #f96363;">
                代理等级已于{{Time::toDate($data['update_level_time'])}}修改到{{$data['update_level']['name']}}，将于{{ Time::toDate(Time::getMonthLastDay()) }}生效。
            </p>
        </div>
        @endif
    </tpl:form>
    @tpl_end
@stop