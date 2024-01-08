<?php
$datasource = isset($attrs['datasource']) ? $attrs['datasource'] : (isset($List['datasource']) ? $List['datasource'] : '$list');
$list_pk = isset($attrs['pk']) ? $attrs['pk'] : (isset($List['pk']) ? $List['pk'] : 'id');
?>
<tbody class="list-tbody">
    {@}foreach({!! $datasource !!} as $list_index => $list_item)
    <php>
        $list_item_css = $list_index % 2 == 0 ? " even" : " odd"; 
        $list_item_pk  = $list_item["{!! $list_pk !!}"];
    </php>
    {!! $content !!}
    {@}endforeach
</tbody>