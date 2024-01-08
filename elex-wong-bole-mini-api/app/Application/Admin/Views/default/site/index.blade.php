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
                        <column code="name" label="网站名称" width="120"></column>
                        <column code="domain" label="网站代码" width="100"></column>
                        <column code="url" label="网站链接" align="left"></column>
                        <column  label="后台访问链接" align="left">
                        	{{ Helper::url('www#/') }}/{{ $list_item['domain'] }}
                        </column>
                        <column code="status" type="status" label="状态" width="60"></column>
                        <column code="create_time" type="time" label="创建时间" width="150"></column>
                        <actions width="60">
                            <action type="edit"></action>
                        </actions>
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop