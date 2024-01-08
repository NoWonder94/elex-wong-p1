<tbody class="list-tbody">
    {@}foreach({!! $List['datasource'] or '$list' !!} as $list_index => $list_item)
    <php>
        $list_item_css = $list_index % 2 == 0 ? " even" : " odd"; 
        $list_item_pk  = $list_item["{!! $List['pk'] or 'id' !!}"];
    </php>
    {!! $content !!}
    {@}endforeach
</tbody>