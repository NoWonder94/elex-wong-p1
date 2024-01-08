@extends('default._layouts.base') 
@section('body')
    @tpl_begin
    <tpl:form>
        <tpl:fitem name="bank_name" label="银行名称" required="true" placeholder="请输入银行名称">
             <attrs>
                <attr>data-fv-notempty-message="名称不能为空"</attr>
            </attrs>
        </tpl:fitem> 
        <tpl:fitem name="bank_account" label="银行帐号" required="true" placeholder="请输入银行卡号">
             <attrs>
                <attr>data-fv-notempty-message="名称不能为空"</attr>
            </attrs>
        </tpl:fitem> 
        <tpl:fitem name="bank_info" label="开户行" ></tpl:fitem>  
    </tpl:form>
    @tpl_end
@stop

@section('footer')
<script type="text/javascript">
jQuery(function($){
    $(".box-tools a").click(function(){
        $(this).parents('.admin-nav-box').find('.box-body').slideToggle("fast");
    });

    $('.box-title input').change(function(){
        var parent = $(this).parents('.admin-nav-box');
        parent.find('input').prop('checked',this.checked);
    });

    $('fieldset legend input').change(function(){
        var parent = $(this).parent().parent().parent();
        parent.find('input').prop('checked',this.checked);
        $.checkInputsChecked(this);
    });

    $('.admin-actions input').change(function(){
        $.checkInputsChecked(this);
    });

    $.checkInputsChecked = function(input) {
        var parent = $(input).parents('.admin-nav-box');
        var checked;

        parent.find('fieldset').each(function(){
            checked = $(this).find('.admin-actions input').length == $(this).find('.admin-actions input:checked').length;
            $(this).find('legend input').prop('checked',checked);
        });

        checked = parent.find('fieldset input').length == parent.find('fieldset input:checked').length;
        parent.find('.box-title input').prop('checked',checked);
    }

    $('.admin-nav-box fieldset').each(function(){
        $.checkInputsChecked(this);
    });
});
</script>
@stop