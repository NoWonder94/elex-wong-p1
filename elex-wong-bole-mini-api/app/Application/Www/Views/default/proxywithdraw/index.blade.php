@extends('default._layouts.base')
@section('body')
    @tpl_begin
        <tpl:list>
            <search method="get">
                <row>
                    <item name="sn" label="流水号"></item>
                    <item name="name" label="用户名"></item>
                    <item label="状态">
                        <tpl:select name="status" options="0,1,2,3,4,5" texts="所有,付款失败,拒绝,待处理,审核成功,支付成功" selected="$_search_args['status']"></tpl:select>
                    </item>
                </row>
                <row style="margin-top:10px;">
                    <item label="查询时间">
                        <tpl:daterange data="$_search_args" begin_name="begin_time" end_name="end_time"></tpl:daterange>
                    </item>
                    <btn type="search"></btn>
                </row> 
            </search>
            <content> 
                <table>
                    <columns>
                        <column code="sn" sort="true" defaultorder="true" label="流水号" ></column>
                        <column code="" label="代理账户" >
                            {{$list_item['proxy']['name']}}
                        </column>
                        <column code="money" sort="true" defaultorder="true" label="金额" ></column>
                        <column code="bank_name" label="银行名称" ></column>
                        <column code="bank_user" label="收款人" ></column>
                        <column code="bank_account" label="银行帐号" ></column>
                        <column code="create_time" sort="true" type="time" label="创建日期" width="190" ></column> 
                        <column code="status" label="状态" >
                        {{Lang::get('root::common.proxy_withdraw_status.'.$list_item['status']) }}
                        </column>
                        <actions width="120"> 
                            @if($list_item['status'] >= 0 && $list_item['status'] < 2 )
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
        <h4 class="modal-title">代理提现审核</h4>
      </div>
      <div class="modal-body" style="padding-top: 0;"> 
        <div>
            <select class="form-control info-status">
                @foreach(Lang::get('root::common.proxy_withdraw_status') as $key  => $value)
                <option value="{{$key}}">{{$value}}</option>
                @endforeach
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
            $.ajaxPost(SITE_URL + '/ProxyWithdraw/option', info, function(result){
                modalBox.modal('hide');
                if (result.status) {  
                    $.showSuccess("修改成功");
                    // window.location.reload();
                } else {
                    $.showError("修改失败");
                }
            });
        });
 
    }

});
</script>
@stop