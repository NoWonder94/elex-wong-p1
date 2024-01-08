@extends('default._layouts.base')
@section('body')
    @tpl_begin
        <tpl:list>
            <search>
                <row>
                    <item name="real_name" label="姓名"></item>
                    <item name="name" label="用户名"></item>
                    <item name="email" label="邮箱"></item>
                    <item name="mobile" label="电话"></item>
                </row>
                <row style="margin-top:10px;">
                    <item label="性别">
                        <tpl:select name="gender" options="all,先生,女士" texts="所有,先生,女士" selected="$_search_args['gender']"></tpl:select>
                    </item>
                    <item label="注册时间">
                        <tpl:daterange data="$_search_args" begin_name="reg_begin_time" end_name="reg_end_time"></tpl:daterange>
                    </item>
                    <item label="代理级别">
                        <tpl:select name="level" options="$level_keys" texts="$level_values" selected="$_search_args['level']"></tpl:select>
                    </item>
                    <item label="状态">
                        <tpl:select name="status" options="0,1,2,3" texts="所有,关闭,开启,待审核" selected="$_search_args['status']"></tpl:select>
                    </item>
                    <btn type="search"></btn>
                </row>
            </search>
            <content> 
                <table>
                    <columns>
                        <column code="name" label="用户信息" align="left">
                            用户名：{{ $list_item['name'] }}（{{$list_item['proxy_level']['name']}}）<br/>
                            姓　名：{{ $list_item['real_name'] }} {{ $list_item['gender'] }}
                        </column>
                        <column code="reg_info" label="注册信息" align="left">
                            邮箱：{{$list_item['email']}}<br/>
                            电话：{{$list_item['mobile']}} 
                        </column> 
                        <column code="proxy_code" label="代理码" ></column>
                        <column code="register_date" type="time" label="注册/登录日期" width="190" align="left">
                            注册：{{ Time::toDate($list_item['create_time']) }}<br/>
                            登录：{{ Time::toDate($list_item['login_time']) }}
                        </column>  
                        <column code="effective_user" label="有效会员数" ></column>
                        <column code="already_user" label="总会员数" ></column>
                        @if($list_item['status'] != '2')
                        <column code="status" type="toggle" label="状态" ></column>
                        @else
                        <column code="status" label="状态" >
                        {{Lang::get('root::common.proxy_status.'.$list_item['status']) }}
                        </column>
                        @endif
                        <actions width="120">
                            <action type="edit"></action>
                            @if($list_item['status'] == '2')
                            <action label="操作" css="text-warning call-btn" >
                                <attrs>
                                    <click>$.options({{ $list_item['id'] }})</click>
                                </attrs>
                            </action>
                            @endif 
                        </actions>
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop

@section('footer') 
<script type="text/tpl" id="optionsTpl">
<div class="modal fade" id="@{{=it.id}}" aria-hidden="true" role="dialog" tabindex="-1">
  <div class="modal-dialog modal-center" style="width:500px;">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">代理账户审核</h4>
      </div>
      <div class="modal-body" style="padding-top: 0;"> 
        <div>
            <select class="form-control info-status">
                <option value="1">通过审核</option> 
                <option value="0">残忍拒绝</option> 
            </select>
        </div> 
        <div style="margin-top:15px;">
            <textarea placeholder="请填写备注信息" class="form-control info-remark" rows="8"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary">确定</button>
      </div>
    </div>
  </div>
</div>
</script>
<script type="text/javascript">

function reloading(){
    window.location.reload();
}

jQuery(function($){ 

    $.options = function(id) { 
        var modalId = $.getId('optionsTpl');
        var data = new Object();
        data.id = modalId;
        data.name = name;
        var html = $.template($("#optionsTpl").html(), data);
        $("#pageBox").append(html); 
        var modalBox = $("#" + modalId);
        modalBox.modal('show').on('hidden.bs.modal', function (e) {
            modalBox.remove();
        }); 
        modalBox.find('.btn-primary').click(function(){
            var status = modalBox.find('.info-status').val();
            var remark = modalBox.find('.info-remark').val();
            var info = new Object();
            info.id = id;
            info.status = status;
            info.remark = remark; 
            $.ajaxPost(SITE_URL + '/Proxy/option', info, function(result){
                modalBox.modal('hide');
                if (result.status) {  
                    $.showSuccess("修改成功");
                    setTimeout("reloading()", 1000);
                } else {
                    $.showError("修改失败");
                }
            });
        });
 
    }

});
</script>
@stop