@extends('default._layouts.base')
@section('body')
    @tpl_begin
        <tpl:list>
            <search>
                <row>
                    <item name="real_name" label="姓名"></item>
                    <item label="性别">
                        <tpl:select name="gender" options="all,先生,女士" texts="所有,先生,女士" selected="$_search_args['gender']"></tpl:select>
                    </item>
                    <item label="创建时间">
                        <tpl:daterange data="$_search_args" begin_name="reg_begin_time" end_name="reg_end_time"></tpl:daterange>
                    </item>
					<btn type="search"></btn>
                </row>
            </search>
            <content>
                <btns>
                    <linkbtn type="add"></linkbtn>
                    <linkbtn type="import"></linkbtn>
                </btns>
                <table>
                    <columns>
                        <column code="real_name" label="姓名"></column>
						<column code="gender" label="性别"></column>
                        <column code="create_time" type="time" label="创建时间"></column>
                        <column code="last_call_time" type="time" label="最后电话时间"></column>
                        <column code="last_sms_time" type="time" label="最后短信时间"></column>
                        <actions width="160">
                            <action label="电话" css="text-success call-btn" auth="call" style="display:none;">
                                <attrs>
                                    <click>$.SendCall({{ $list_item['id'] }}, '{{ $list_item['real_name'] }}')</click>
                                </attrs>
                            </action>
                            <action label="短信" css="text-warning" auth="sms">
                                <attrs>
                                    <click>$.SendMsg({{ $list_item['id'] }}, '{{ $list_item['real_name'] }}')</click>
                                </attrs>
                            </action>
                            <action type="edit"></action>
							<action type="delete"></action>
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
		<p class="help-block"><span style="color:#f00;">为确保短信正常发送，请注意：<br>
1) 网址格式使用：w w w fafa678 点 c0 m<br>
2) 勿使用敏感词：请在这里过滤 http://www.xiaohexie.com/</span></p>
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
        $.ajaxPost(SITE_URL + '/SalesUser/token', '', function(result){
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
        $.ajaxPost(SITE_URL + '/SalesUser/call', { user_id: id }, function(result){
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
                    $.ajaxPost(SITE_URL + '/SalesUser/callremark', { id:logId, remark:remark }, function(result){
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
            $.ajaxPost(SITE_URL + '/SalesUser/sms', { user_id:id, content:content }, function(result){
                modalBox.modal('hide');
            });
        });
    }
});
</script>
@stop