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
                        <column code="proxy_name" label="代理名称">
                            {{$list_item['proxy']['name']}}
                        </column>
                        <column code="level" label="当前等级">
                            {{$list_item['level']['name']}}
                        </column>
                        <column code="proxy_name" label="修改前等级">
                            {{$list_item['before_level']['name']}}
                        </column> 
                        <column code="create_time" type="time" label="创建时间" ></column>
                        <column code="update_time" type="time" label="修改时间" ></column>
                        <column code="modifier"  label="修改人" ></column>
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop