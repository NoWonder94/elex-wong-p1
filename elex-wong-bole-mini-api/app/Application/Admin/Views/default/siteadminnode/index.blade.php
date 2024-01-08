@extends('default._layouts.base')
@section('body')
    @tpl_begin
        <tpl:list>
            <content>
                <btns>
                    <linkbtn type="add"></linkbtn>
                </btns>
                <table>
                    <columns>
						<column code="name" label="名称" align="left">
							@if(!empty($list_item['icon']))
							<i class="fa fa-{{ $list_item['icon'] }}" style="width:1em;"></i> 
							@else
							<i class="fa" style="width:1em;">&nbsp;</i>
							@endif
							{{ $list_item['name'] }}
						</column>
						<column label="所属菜单">
							@if($list_item['nav_id'] > 0) 
								{{ $navs[$list_item['nav_id']]['pathName'] }}
							@endif
						</column>
						<column code="controller" label="控制器"></column>
						<column code="action" label="操作"></column>
						<column code="is_show" label="显示" type="toggle" readonly="is_disabled_show" width="90"></column>
						<column code="is_log" label="日志" type="toggle" readonly="is_disabled_log" width="90"></column>
						<column code="sort" label="排序" width="90"></column>
						<actions width="90">
							<action type="edit"></action>
							<action type="delete"></action>
						</actions>
					</columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop