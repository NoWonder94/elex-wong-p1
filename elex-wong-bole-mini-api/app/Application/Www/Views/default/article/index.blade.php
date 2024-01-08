@extends('default._layouts.base')
@section('body')
    @tpl_begin
        <tpl:list>
            <search>
                <row> 
                    <item name="title" label="标题"></item> 
                    <btn type="search"></btn>
                </row>
            </search>
            <content>
                <btns>
                    <linkbtn type="add"></linkbtn> 
                </btns>
                <table>
                    <columns>
                        <column code="title" label="标题" ></column>
                        <column code="brief" label="简介" ></column>
                        <column code="content" label="内容"  width="290"></column>
                        <column code="create_time" label="创建时间" width="190" >
                            {{ Time::toDate($list_item['create_time']) }}
                        </column> 
                        <column code="status" type="toggle" label="状态" ></column>
                        <actions width="120">
                            <action type="edit"></action> 
                            <action type="del"></action>
                        </actions>
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop

@section('footer')
<script type="text/tpl" id="callTpl">
<div class="modal fade" id="@{{=it.id}}" aria-hidden="true" role="dialog" tabindex="-1">
  <div class="modal-dialog modal-center" style="width:500px;">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">拨打电话</h4>
      </div>
      <div class="modal-body" style="padding-top: 0;">
        <p class="call-status">正在拨打电话给「@{{=it.name}}」中...</p>
        <div>
            <textarea placeholder="填写备注" class="form-control remark"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default">结束</button>
        <button type="button" class="btn btn-primary" style="display: none;">提交</button>
      </div>
    </div>
  </div>
</div>
</script>
<script type="text/tpl" id="smsTpl">
<div class="modal fade" id="@{{=it.id}}" aria-hidden="true" role="dialog" tabindex="-1">
  <div class="modal-dialog modal-center" style="width:500px;">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">发送短信</h4>
      </div>
      <div class="modal-body" style="padding-top: 0;">
        <p class="call-status">正在发送短信给「@{{=it.name}}」</p>
        <div>
            <select class="form-control sms-tpls">
                <option value="">请选择短信模板</option>
                @foreach($sms_tpls as $sms_tpl)
                <option value="{{ rawurlencode($sms_tpl['content']) }}">{{ $sms_tpl['code'] }}</option>
                @endforeach
            </select>
        </div>
        <div style="margin-top:15px;">
            <textarea placeholder="请填写要发送的短信内容" class="form-control sms-content" rows="8"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary">发送</button>
      </div>
    </div>
  </div>
</div>
</script>
<script type="text/javascript">
jQuery(function($){
    $.twilioSetup = function() {
        $.ajaxPost(SITE_URL + '/User/token', '', function(result){
            if (result.status) {
                Twilio.Device.setup(result.data);
                setTimeout(function(){
                    $.twilioSetup();
                }, 1800000);
            } else {
                $.showError("初始化语音TOKEN失败，请刷新页面重新加载");
            }
        });
    }
    $.twilioSetup();

    Twilio.Device.ready(function(device) {
        $(".call-btn").show();
    });

    Twilio.Device.error(function(error) {
        console.log(error);
    });

    $.ShowOther = function(id) {
        var html = '<table>' + $("#userTpl" + id).html() + '</table>';
        $.showModel('其他信息', html, 500);
    }

    $.SendCall = function(id, name) {
        $.ajaxPost(SITE_URL + '/User/call', { user_id: id }, function(result){
            if (result.status) {
                var modalId = $.getId('callTpl');
                var data = new Object();
                data.id = modalId;
                data.name = name;
                var html = $.template($("#callTpl").html(), data);
                $("#pageBox").append(html);

                var modalBox = $("#" + modalId);
                var logId    = result.data;

                modalBox.modal('show').on('hidden.bs.modal', function (e) {
                    modalBox.remove();
                });

                var connection = Twilio.Device.connect({ LogId: logId });
                modalBox.find('.btn-default').click(function(){
                    connection.disconnect();
                });

                modalBox.find('.btn-primary').click(function(){
                    var remark = modalBox.find('.remark').val();
                    //modalBox.find('.btn-primary').button('loading');
                    $.ajaxPost(SITE_URL + '/User/callremark', { id:logId, remark:remark }, function(result){
                        modalBox.modal('hide');
                    });
                });

                connection.disconnect(function(conn) {
                    modalBox.find('.call-status').html('通话已结束');
                    modalBox.find('.btn-primary').show();
                    modalBox.find('.btn-default').hide();
                });
            }
        });
    }

    $.SendMsg = function(id, name) {
        var modalId = $.getId('smsTpl');
        var data = new Object();
        data.id = modalId;
        data.name = name;
        var html = $.template($("#smsTpl").html(), data);
        $("#pageBox").append(html);

        var modalBox = $("#" + modalId);
        modalBox.modal('show').on('hidden.bs.modal', function (e) {
            modalBox.remove();
        });

        modalBox.find('.sms-tpls').change(function(){
            modalBox.find('.sms-content').val(decodeURIComponent($(this).val()));
        });

        modalBox.find('.btn-primary').click(function(){
            var content = modalBox.find('.sms-content').val();
            //modalBox.find('.btn-primary').button('loading');
            $.ajaxPost(SITE_URL + '/User/sms', { user_id:id, content:content }, function(result){
                modalBox.modal('hide');
            });
        });
    }
});
</script>
@stop