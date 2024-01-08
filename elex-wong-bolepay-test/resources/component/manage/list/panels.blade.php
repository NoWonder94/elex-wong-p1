<php>
    $list_item_key = @if($List['pk']) '{{ $List['pk'] }}' @else 'id' @endif;
    $panel_id	   = 'panel' . Helper::getSn();
</php>
<div class="row {!! Tpl::output($attrs['css']) !!}">
	{@}foreach({!! Tpl::variable($List['datasource']) !!} as $list_index => $list_item)
    <php>
        $list_item_pk  = $list_item[$list_item_key];
    </php>
    {!! $content !!}
    {@}endforeach
</div>