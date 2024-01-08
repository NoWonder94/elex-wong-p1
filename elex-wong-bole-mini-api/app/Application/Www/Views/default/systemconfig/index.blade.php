@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:form action="update"> 
        <tpl:fitem name="pc_link" required="true" label="PC端推广地址" placeholder="请输入PC端推广地址"> 
             <attrs>
                <attr>data-fv-notempty-message="PC端推广地址不能为空"</attr>
            </attrs>
        </tpl:fitem> 
        <tpl:fitem name="wap_link" required="true" label="WAP端推广地址" placeholder="请输入WAP端推广地址">
             <attrs>
                <attr>data-fv-notempty-message="WAP端推广地址不能为空"</attr>
            </attrs>
        </tpl:fitem>  
        <tpl:fitem name="month_deposit" required="true" label="有效会员月存款金额" placeholder="请输入有效会员月存款金额">
             <attrs>
                <attr>data-fv-notempty-message="有效会员月存款金额不能为空"</attr>
            </attrs>
        </tpl:fitem>  
        <tpl:fitem name="month_bet" required="true" label="有效会员月投注金额" placeholder="请输入有效会员月投注金额">
             <attrs>
                <attr>data-fv-notempty-message="有效会员月投注金额不能为空"</attr>
            </attrs>
        </tpl:fitem>  
        <tpl:fitem name="effective_num_min" required="true" label="提款有效会员必须达到的数量" placeholder="请输入提款有效会员数量">
             <attrs>
                <attr>data-fv-notempty-message="提款有效会员数量不能为空"</attr>
            </attrs>
        </tpl:fitem>  
        <tpl:fitem name="withdraw_money_min" required="true" label="最小提款金额" placeholder="请输入最小提款金额">
             <attrs>
                <attr>data-fv-notempty-message="最小提款金额不能为空"</attr>
            </attrs>
        </tpl:fitem>  
    </tpl:form>
    @tpl_end
@stop