@extends('default._layouts.base')
@section('header')
<style type="text/css">
    #loading{width: 100%;padding: 30px 0px;}
    #loadMsg{padding: 10px;font-size: 12px;display: none;}
    #loadingImg{display: none;}
    #loadingImgDiv{text-align: center;height: 15px;}
</style>
@stop

@section('body')
    @tpl_begin
        <tpl:btn label="%admin.cache.clear" id="clear_server" css="btn-primary"></tpl:btn>
        <div id="loading">
            <p id="loadMsg"></p>
        </div>
    @tpl_end
@stop

@section('footer') 
<script type="text/javascript">
jQuery(function($){
    var loadingImg = $("#loadingImg");
    var msg = $("#loadMsg");
    $("#clear_server").click(function(){
        msg.show();
        loadingImg.show();
        msg.append("<p>{{Lang::get('admin.cache.clear_ing')}}</p>");
        $.post("{{ Helper::url('Cache/clear') }}",function(result){
            loadingImg.hide();
            if(result.status){
                msg.append("<p>{{Lang::get('admin.cache.success')}}</p>");
            }
            else{
                msg.append("<p>{{Lang::get('admin.cache.fail')}}</p>");
            }
        });
    })
})
</script>
@stop