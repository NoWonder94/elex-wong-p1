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
        <tpl:btn label="清除服务器缓存" id="clear_server" css="btn-primary"></tpl:btn>
        <div id="loading">
            <div id="loadingImgDiv">
                <img src="{{ Helper::resource('manage/images/loading_e.gif') }}" alt="" id="loadingImg">
            </div>
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
        msg.append('<p>正在清除服务器缓存,请稍等...</p>');
        $.post("{{ Helper::url('Cache/clear') }}",function(result){
            loadingImg.hide();
            if(result.status){
                msg.append('<p>服务器缓存 清除完毕！</p>');
            }
            else{
                msg.append('<p>服务器缓存 清除失败！</p>');
            }
        });
    })
})
</script>
@stop