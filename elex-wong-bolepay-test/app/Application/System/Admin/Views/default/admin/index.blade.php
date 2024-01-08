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
                        <column width="120" code="name" label="%admin.admin.name"></column>
                        <column width="120" code="role" label="%admin.admin.admin_group">
                            {{ $roles[$list_item['role_id']]['name'] }}
                        </column>
                        <column code="email" width="200" label="%admin.email"></column>
                        <column width="80" label="%admin.admin.google_verify">
                            {{ !empty($list_item['secret']) ? Lang::get('admin.admin.validate') : Lang::get('admin.admin.not_validate') }}
                        </column>
                        <column code="login_time" type="time" label="%admin.admin.last_login_time" width="150"></column>
                        <column code="login_ip" label="%admin.admin.last_login_ip" width="150"></column>
                        <column code="login_count" label="%admin.admin.login_count" width="80"></column>
                        <column code="create_time" type="time" label="%admin.create_time" width="150"></column>
                        <column code="status" label="%admin.status" type="toggle" readonly="is_system" width="80"></column>
                        <actions minwidth="60" align="left" halign="left">
                            @if($list_item['id'] != 1)
                            <action type="edit"></action>
                            @endif
                        </actions>
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop 
@section('footer') 
<script type="text/javascript">
jQuery(function($){ 
    
    $.clear = function(id) {
        $.ajaxPost('{{ Helper::url("Admin/clear") }}', { id:id }, function(result){
            if(result.status) {
                $.showSuccess(result.msg);
                setTimeout(reload(), 2000);
            } else {
                $.showError(result.msg);
            }
        }, null, 'json');
    }
});
</script>
@stop