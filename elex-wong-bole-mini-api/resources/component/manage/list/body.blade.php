{@}foreach({!! Tpl::variable($List['datasource']) !!} as $list_index => $list_item)
<php>
    $list_item_css = $list_index % 2 == 0 ? " even" : " odd"; 
    $list_item_pk  = $list_item[$list_item_key];
</php>
<tbody class="list-tbody list-rawtbody tbody-@{{ $list_item_pk }}@{{ $list_item_css }}" key="@{{ $list_item_pk }}" primary="@{{ $list_item_key }}">
    {!! $content !!}
    <tr><td class="empty-td" colspan="{{ $attrs['colspan'] }}"><div>&nbsp;</div></td></tr>
</tbody>
{@}endforeach