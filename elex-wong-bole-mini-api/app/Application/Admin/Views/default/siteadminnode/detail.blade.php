@extends('default._layouts.base')
@section('body')
    @tpl_begin
    <tpl:form>
    	<tpl:fitem label="选择操作" required="true">
			<select id="controllerAction" name="controllerAction" class="form-control" data-plugin="select2" data-placeholder="请选择操作" data-fv-notempty="true" data-fv-notempty-message="必须选择操作">
				@foreach($admin_nodes as $controller => $admin_node)
				<option></option>
				<optgroup label="{{ $admin_node['name'] }}">
					@foreach($admin_node['nodes'] as $action => $node)
					<php>
						$selected = '';
						if ($controller == $data['controller'] && $action == $data['action']) {
							$controllerAction = $node;
							$selected = ' selected';
						}
					</php>
					<option value="{{ $controller }}/{{ $action }}"{{ $selected }}>{{ $node['name'] }}</option>
					@endforeach
				</optgroup>
				@endforeach
			</select>
		</tpl:fitem>
		<tpl:fitem name="name" label="名称" required="true" placeholder="请输入名称">
            <attrs>
                <attr>data-fv-notempty-message="名称不能为空"</attr>
            </attrs>
        </tpl:fitem>
		<tpl:fitem label="所属菜单">
			<tpl:select name="nav_id" options="$navs" textfield="showName" valuefield="id" first="不选择" firstvalue="0" selected="$data['nav_id']"></tpl:select>
		</tpl:fitem>
		<tpl:fitem name="icon" label="图标">
            <attrs>
                <tip><![CDATA[<a class="text-info" href="http://fontawesome.io/icons/" target="_blank">查看图标</a>]]></tip>
            </attrs>
        </tpl:fitem>
		<tpl:fitem name="sort" label="排序" default="100"></tpl:fitem>
    </tpl:form>
    @tpl_end
@stop

@section('footer')
<script>
jQuery(function($){
	$("#controllerAction").change(function(){
		$("#name").val($('option:selected', this).text());
	});
})
</script>
@stop

