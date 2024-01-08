<tbody class="list-tbody">
    {@}foreach({!! Tpl::variable($List['datasource']) !!} as $list_index => $list_item)
    <php>
        $list_item_css = $list_index % 2 == 0 ? " even" : " odd";
        $list_item_pk  = $list_item[$list_item_key];
    </php>
    <tr
     class="tr-@{{ $list_item_pk }}@{{ $list_item_css }}"
     key="@{{ $list_item_pk }}"
     primary="@{{ $list_item_key }}">
        @if($ListTable['checkbox'])
        <td width="38" style="text-align:center; line-height: normal;">
            <span class="checkbox-custom checkbox-primary">
                <input class="selectable-item" type="checkbox"  name="key" id="row-@{{ $list_item_pk }}" value="@{{ $list_item_pk }}" {@}if($list_item["checked_disabled"] == 1) disabled {@}endif />
                <label for="row-@{{ $list_item_pk }}"></label>
            </span>
        </td>
        @endif
        {!! $content !!}
    </tr>
    {@}endforeach
</tbody>