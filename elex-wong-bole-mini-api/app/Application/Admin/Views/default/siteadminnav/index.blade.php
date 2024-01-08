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
                        <column code="name" label="名称" align="left">
                            @if($list_item['pid'] == 0)
                            <i class="fa fa-{{ $list_item['icon'] }}" style="width:1em;"></i> 
                            @endif
                            {{ $list_item['showName'] }}
                        </column>
                        <column code="sort" label="排序" width="100"></column>
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