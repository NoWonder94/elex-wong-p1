@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:form>
		<tpl:fitem name="name" label="会员账号" val="$data['name']"></tpl:fitem>
        <tpl:fitem name="total_deposit" label="存款金额" val="$data['total_deposit']"></tpl:fitem>
        <tpl:fitem name="total_withdraw" label="取款金额" val="$data['total_withdraw']"></tpl:fitem>
        <tpl:fitem name="leave_days" label="未存款天数" val="$data['leave_days']" ></tpl:fitem>
    </tpl:form>
    @tpl_end
@stop