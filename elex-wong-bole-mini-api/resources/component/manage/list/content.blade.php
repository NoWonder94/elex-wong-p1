<div
 class="panel {!! Tpl::output($attrs['css']) !!}" 
 @if($attrs['id']) id="{!! Tpl::output($attrs['id']) !!}" @endif 
 style="{!! Tpl::output($attrs['style']) !!}" 
 {!! Tpl::output($attrs['attr']) !!}>
 	<div class="panel-body">
		{!! $content !!}
 	</div>
</div>