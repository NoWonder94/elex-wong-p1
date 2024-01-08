<div style="width:500px;">
	<div class="progress">
		<div id="exportProgress" class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style="width:0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
	</div>
	<div>
		<a id="downBtn" href="#" class="btn btn-primary waves-effect waves-classic disabled">正在导出中...</a>
	</div>
</div>
<script>
jQuery(function ($) {
	var exportSearch = {!! json_encode(Request::all()) !!};
	var exportFunc = function(offset) {
		exportSearch.offset = offset;
		$.ajaxPost("{{ Helper::url(APP_CONTROLLER_NAME . '/export') }}", exportSearch, (result) => {
			if (result.status) {
				if (result.data.is_complete) {
					$("#exportProgress").css('width', '100%');
					$("#exportProgress").html('100%');
					$('#downBtn').removeClass('disabled').attr('href', result.data.file).html('下载文件');
				} else {
					var progress = parseInt(result.data.offset / result.data.total_count * 100);
					$("#exportProgress").css('width', progress + '%');
					$("#exportProgress").html(progress + '%');
					exportSearch.file = result.data.file;
					if (result.data.scroll_id) {
						exportSearch.scroll_id = result.data.scroll_id;
					}
					setTimeout(function(){
						exportFunc(result.data.offset);
					}, 500);
				}
			} else {
				$.showError(result.msg);
			}
		}, () => {
			$.showError("{{Lang::get('common.handler_error')}}");
		});
	}
	exportFunc(0);
});
</script>