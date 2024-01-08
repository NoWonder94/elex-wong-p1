<tpl:fitem bcss="form-inline" label="所属代理">
	<tpl:select id="proxySelect" name="$_tpl_name" style="width:180px;"></tpl:select>
	<input type="text" id="searchProxyName" class="form-control" style="width:150px;" placeholder="请输入代理名称" value="" />
	<tpl:btn label="搜索代理" css="btn-primary" id="searchProxyBtn" ></tpl:btn>
</tpl:fitem>

<script>
	$(function(){
		$("#proxySelect").html("<option value='0'>选择代理</option>");

		$("#searchProxyBtn").click(function(){
			var name = $('#searchProxyName').val();
			$.post("{{Helper::url('Proxy/search')}}",{"name":name}, function(result){
				var html = "<option value='0'>选择代理</option>";
				for(var index in result.data) {
					html += "<option value='" + result.data[index].id + "'" + (index == 0 ? " selected" : "") + ">" + result.data[index].name + "</option>";
				}
				$("#proxySelect").html(html);
				$("#proxySelect").trigger('change');
			});
		});
	});
</script>