@extends('default._layouts.base')
@section('body')
    @tpl_begin
        <tpl:list>
            <content>
                <btns>
                    <linkbtn type="add"></linkbtn>
                </btns>
                <table>
                    <columns>
                        <column code="name" label="管理员"></column>
                        <column code="role" label="所属组">
                            {{ $roles[$list_item['role_id']]['name'] }}
                        </column>
                        <column code="login_time" type="time" label="最后登陆时间" width="150"></column>
                        <column code="login_ip" label="最后登陆IP" width="150"></column>
                        <column code="login_count" label="登陆次数" width="100"></column>
                        <column code="create_time" type="time" label="创建时间" width="150"></column>
                        <column code="status" label="状态" type="toggle" readonly="is_system" width="80"></column>
                        <actions width="100">
                            <action type="edit"></action>
                            @if($list_item['is_system'] != 1)
                            <action type="delete"></action>
                            @endif
                        </actions>
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop