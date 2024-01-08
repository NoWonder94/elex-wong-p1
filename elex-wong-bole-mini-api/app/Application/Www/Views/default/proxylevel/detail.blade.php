@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:form> 
        <tpl:fitem name="name" label="代理等级名称" required="true">
             <attrs>
                <attr>data-fv-notempty-message="代理等级名称不能为空"</attr>
            </attrs>
        </tpl:fitem>
        <tpl:fitem name="commission_rate" label="佣金比率" tip="佣金比率小于1，大于0，如：0.3"  required="true">
             <attrs>
                <attr>data-fv-notempty-message="佣金比率不能为空"</attr>
            </attrs>
        </tpl:fitem> 
        <tpl:fitem name="profit" label="需要达到的利润" tip="需要达到的利润格式（如：0-300 则判断大于等于0且小于等于300， 300 则判断大于等于300）"  required="true">
             <attrs>
                <attr>data-fv-notempty-message="需要达到的利润不能为空"</attr>
            </attrs>
        </tpl:fitem> 
        <tpl:fitem name="effective_user" label="有效会员数量" tip="有效会员数量格式（如：0-10 则判断大于等于0且小于等于10， 10 则判断大于等于10）"  required="true">
             <attrs>
                <attr>data-fv-notempty-message="有效会员数量不能为空"</attr>
            </attrs>
        </tpl:fitem> 
        @if(isset($data['sort']))
        <tpl:fitem name="sort" label="排序" ></tpl:fitem>
        @else
        <tpl:fitem name="sort" label="排序" val="100" ></tpl:fitem>
        @endif
    </tpl:form>
    @tpl_end
@stop