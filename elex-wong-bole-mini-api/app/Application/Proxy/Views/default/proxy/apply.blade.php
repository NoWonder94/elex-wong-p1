@extends('default._layouts.base')
@section('body')
    @tpl_begin
    @if ($proxy_info['last_commission_time'] === 0 || $proxy_info['commission'] <= 0)
    <div class="panel form-box " style="">
        <div class="panel-body">
            <form class="validate-form ajax-form fv-form fv-form-bootstrap"  > 
                <div id="real_name-form-item" class="form-group " style="">
                    <label for="real_name" class="control-label "> 上次结算时间：<span class="required text-danger">@if($proxy_info['last_commission_time'] !== 0) {{$proxy_info['last_commission_time']}} @else 暂无结算 @endif</span></label>
                    <div></div> 
                </div> 
                <div id="real_name-form-item" class="form-group " style="">
                    <label for="real_name" class="control-label "> 待审核佣金：<span class="required text-danger">{{ $proxy_info['commission'] }}</span>元</label>
                    <div></div> 
                </div>
                <div id="real_name-form-item" class="form-group " style="">
                    <label for="real_name" class="control-label "> 银行名称：<span class="required text-danger">{{ $proxy_bank['bank_name'] }}</span></label>
                    <div></div> 
                </div>
                <div id="real_name-form-item" class="form-group " style="">
                    <label for="real_name" class="control-label "> 银行卡号：<span class="required text-danger">{{ $proxy_bank['bank_account'] }}</span></label>
                    <div></div> 
                </div>
                <div id="real_name-form-item" class="form-group " style="">
                    <label for="real_name" class="control-label "> 开户行：<span class="required text-danger">{{ $proxy_bank['bank_info'] }}</span></label>
                    <div></div> 
                </div> 
            </form>
        </div>
    </div>
    @else
    <tpl:form action="doApply">  
        <div id="real_name-form-item" class="form-group " style="">
            <label for="real_name" class="control-label "> 上次结算时间：<span class="required text-danger">{{ $proxy_info['last_commission_time'] }}</span></label>
            <div></div> 
        </div> 
        <div id="real_name-form-item" class="form-group " style="">
            <label for="real_name" class="control-label "> 待审核佣金：<span class="required text-danger">{{ $proxy_info['commission'] }}</span>元</label>
            <div></div> 
        </div>
        <div id="real_name-form-item" class="form-group " style="">
            <label for="real_name" class="control-label "> 银行名称：<span class="required text-danger">{{ $proxy_bank['bank_name'] }}</span></label>
            <div></div> 
        </div>
        <div id="real_name-form-item" class="form-group " style="">
            <label for="real_name" class="control-label "> 银行卡号：<span class="required text-danger">{{ $proxy_bank['bank_account'] }}</span></label>
            <div></div> 
        </div>
        <div id="real_name-form-item" class="form-group " style="">
            <label for="real_name" class="control-label "> 开户行：<span class="required text-danger">{{ $proxy_bank['bank_info'] }}</span></label>
            <div></div> 
        </div> 
        <tpl:fitem name="pwd" type="password" label="登录密码" required="true" placeholder="请输入登录密码">
            <attrs>
                <attr>data-fv-notempty-message="登录密码不能为空"</attr>
            </attrs>
        </tpl:fitem>
    </tpl:form>
    @endif
    @tpl_end
@stop