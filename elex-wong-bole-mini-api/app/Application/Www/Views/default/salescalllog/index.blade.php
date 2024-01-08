@extends('default._layouts.base')
@section('body')
    @tpl_begin
        <tpl:list>
            <search>
                <row>
                    <item name="real_name" label="姓名" style="width:100px;"></item>
					<item name="creator" label="拨打人" style="width:100px;"></item>
                    <item label="拨打时间">
                        <tpl:daterange data="$_search_args" begin_name="begin_time" end_name="end_time"></tpl:daterange>
                    </item>
					<item label="状态">
                        <tpl:select name="status" options="all,completed,no-answer,other" texts="所有,成功,未接,其他" selected="$_search_args['status']"></tpl:select>
                    </item>
                    <btn type="search" id="searchBtn"></btn>
					<btn css="btn-info" auth="export" id="exportBtn" label="导出"></btn>
                </row>
            </search>
            <content>
                <table>
                    <columns>
                        <column code="real_name" label="姓名" width="120"></column>
                        <column code="creator" label="拨打人" width="120"></column>
                        <column code="create_time" type="time" label="拨打时间" width="150"></column>
                        <column code="end_time" type="time" label="结束时间" width="150"></column>
                        <column code="duration" label="通话时长" width="100"></column>
                        <column code="status" label="状态" width="100"></column>
                        <column code="remark" label="备注" align="left"></column>
						<column label="语音记录" width="100">
						@if($list_item['status'] == 'completed')
							@if($list_item['send_record_status'] == 1)
							备份成功
							@endif
						@endif
						</column>
						<actions width="150">
							@if($list_item['send_record_status'] == 1)
							<action css="text-success" label="播放">
                                <attrs>
									<click>$.PlayRecord('{!! $list_item['record'] !!}')</click>
                                </attrs>
                            </action>
							<action label="下载" target="_blank">
                                <attrs>
                                    <url>{!! $list_item['record'] !!}</url>
                                </attrs>
                            </action>
							@endif
							@if($list_item['status'] == 'completed')
							<action label="重新备份" css="text-danger">
                                <attrs>
                                    <click>$.ResetSaveRecord('{!! $list_item['sid'] !!}')</click>
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
<script type="text/tpl" id="recordTpl">
<div class="modal fade" id="@{{=it.id}}" aria-hidden="true" role="dialog" tabindex="-1">
  <div class="modal-dialog modal-center" style="width:500px;">
    <div class="modal-content">
      <div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
        <h4 class="modal-title">播放语音记录</h4>
      </div>
      <div class="modal-body" style="padding-top: 0;">
        <audio src="@{{=it.src}}" autoplay controls>
			浏览器不支持语音播放
		</audio>
      </div>
    </div>
  </div>
</div>
</script>
<script type="text/javascript">
jQuery(function($){
	$("#exportBtn").click(function(){
		$("#searchForm").attr('target','_blank')
					    .attr('action', "{!! Helper::url('SalesCallLog/export') !!}")
						.submit();
	});
	
	$("#searchBtn").click(function(){
		$("#searchForm").attr('target','_self')
					    .attr('action', "{!! Helper::url('SalesCallLog/index') !!}")
						.submit();
	});

	$.PlayRecord = function(url) {
		var modalId = $.getId('recordTpl');
		var data = new Object();
		data.id = modalId;
		data.src = url;
		var html = $.template($("#recordTpl").html(), data);
		$("#pageBox").append(html);
		
		var modalBox = $("#" + modalId);
		modalBox.modal('show').on('hidden.bs.modal', function (e) {
			modalBox.remove();
		});
    }
	
	$.ResetSaveRecord = function(sid) {
		$.ajaxPost('{{ Helper::url("callback#Twilio/forceSendRecordToS3") }}', { CallSid:sid }, function(result){
			$.showModel('操作提示', '操作成功，请于1分钟后重新点击播放检测是否备份成功');
		}, null, 'html');
    }
});
</script>
@stop