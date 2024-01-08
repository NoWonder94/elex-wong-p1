@extends('default._layouts.base')
@section('body')
    @tpl_begin
        <tpl:list>
            <content>
                <btns>
                    <linkbtn type="add"></linkbtn>
                </btns>
                <table pager="no">
                    <columns>
                        <column code="name" label="等级名称"></column>
                        <column code="commission_rate" label="佣金比率"></column>
                        <column code="profit" label="需要达到的利润"></column>
                        <column code="effective_user" label="有效会员数量"></column>
                        <column code="sort" label="排序" ></column> 
                        <column code="create_time" type="time" label="创建时间" ></column>
                        <column code="status" label="状态" type="toggle" width="80"></column>
                        <actions width="100">
                            <action type="edit"></action> 
                            <action type="delete"></action> 
                        </actions>
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop