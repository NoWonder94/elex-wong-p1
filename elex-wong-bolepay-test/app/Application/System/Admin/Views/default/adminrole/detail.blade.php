@extends('default._layouts.base')

@section('header')
<style>
.admin-nav-box{
    border:1px solid #d2d6de;
    border-top:3px solid #d2d6de;
    box-shadow:none;
    margin:0 0 10px 0;
}
.admin-nav-box .box-header{padding:7px 10px; border-bottom:1px solid #d2d6de; position: relative;}
.admin-nav-box .box-body{padding:15px 10px 0 10px;}
.admin-nav-box div.checker{margin-right:2px;}
.admin-nav-box .box-title{font-size:14px; padding-left:5px; line-height: 14px;}
.admin-nav-box .box-title div.checker{margin-right:0;}
.admin-nav-box .box-title label span{vertical-align:middle; font-weight:normal;}
.admin-nav-box .box-tools{position: absolute; top:6px; right:8px;}
.admin-nav-box .box-tools a{color:#ccc;}
.admin-nav-box .admin-child-navs{margin:10px;}

.admin-nav-box fieldset {
    border:solid 1px #d2d6de;
    border-radius: 0 0 3px 3px;
    font-size:14px;
}
.admin-nav-box fieldset legend {
    padding:0 10px 0 5px;
    width:auto;
    border:none;
    margin:0;
    font-size:14px;
    display: inline-block;
    line-height: 16px;
}
.admin-nav-box fieldset legend label{font-weight:normal;}
.admin-nav-box fieldset legend label span{vertical-align:middle;}
.admin-nav-box fieldset div.admin-actions {
    padding: 5px 5px;
    line-height: 16px;
}
.admin-nav-box fieldset div label{display:inline-block; margin-right:15px; font-weight:normal; line-height: 16px;}
.admin-nav-box fieldset div label span{vertical-align:middle;}
.blank15 {
    height: 15px;
    line-height: 10px;
    clear: both;
    visibility: hidden;
}
.admin-actions label{margin-right:10px!important;}
</style>
@stop

@section('body')
    @tpl_begin
    <tpl:form>
        <tpl:fitem name="name" label="%admin.name" required="true"></tpl:fitem>
        <tpl:fitem label="%admin.admin_role.auth">
            @foreach($admin_navs as $admin_nav)
            <div class="admin-nav-box">
                <div class="box-header">
                    <div class="box-title">
                        <label>
                            <input type="checkbox" class="uniform" />
                            <span>{{ $admin_nav['name'][$locale] }}</span>
                        </label>
                    </div>
                    <div class="box-tools">
                        <a href="javascript:;"> <i class="fa fa-minus"></i></a>
                    </div>
                </div>
                <div class="box-body">
                @foreach($admin_nav['controllers'] as $node_key => $admin_node)
                    <!--有子级时-->
                    @if(isset($admin_node['controllers']))
                        <fieldset>
                            <legend>
                                <label>
                                    <input type="checkbox" class="uniform" />
                                    <span>{{ $admin_node['name'][$locale] }}</span>
                                </label>
                            </legend>
                            <div class="admin-child-navs">
                                @foreach($admin_node['controllers'] as $controller => $nodes)
                                    @tpl_include('default.adminrole.controller')
                                @endforeach
                            </div>
                        </fieldset>
                        <div class="blank15"></div>
                    @else
                        <php>
                            $controller = $node_key;
                            $nodes = &$admin_node;
                        </php>
                        @tpl_include('default.adminrole.controller')
                    @endif
                @endforeach
                </div>
            </div>
            @endforeach
        </tpl:fitem>
        @tpl_include('default._layouts.verify', ['action' => 'adminrole'])
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