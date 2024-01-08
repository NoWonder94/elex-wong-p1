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
                        <column code="bank_name" label="银行名称"></column> 
                        <column code="bank_account" label="银行帐号"></column>
                        <column code="bank_info" label="开户行"></column>
                        <column code="is_default" label="是否默认" type="status" width="80"></column>
                        <actions width="190"> 
                            <action type="edit"></action>
                            <action type="delete"></action> 
                            <action label="设为默认" css="text-warning call-btn" >
                                <attrs>
                                    <click>$.options({{ $list_item['id'] }})</click>
                                </attrs>
                            </action>
                        </actions>
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop
@section('footer')  
<script type="text/javascript">

function reloading(){
    window.location.reload();
}

jQuery(function($){ 

    $.options = function(id) {  
        var data = new Object();
        data.id = id;
        $.ajaxPost(SITE_URL + '/ProxyBank/option', data, function(result){ 
            if (result.status) {  
                $.showSuccess("修改成功"); 
                setTimeout("reloading()", 1000);
            } else {
                $.showError("修改失败");
            }
        }); 
    }

});
</script>
@stop