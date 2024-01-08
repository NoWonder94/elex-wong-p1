<tbody class="list-tbody">
{@}foreach({!! Tpl::variable($List['datasource']) !!} as $list_index => $list_item)
<php>
    $list_item_css = $list_index % 2 == 0 ? " rodd" : " reven";
    $list_item_pk  = $list_item[$list_item_key];
</php>
<tr class="tr-@{{ $list_item_pk }}@{{ $list_item_css }}"
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
    @if($ListTable['details'])
    <td class="td-details" data-details-id="tr-detail-@{{ $list_item_pk }}">
        <i class="wb-zoom-in"></i>
        <script type="text/tpl">
            @if(isset($ListTable['detail-new-row']))
            @if($ListTable['checkbox'])
            <td></td>
            @endif
            <td></td>
            {!! $ListTable['details'] !!}
            @else
            <tr class="@{{ $list_item_css }}">
                @if($ListTable['checkbox'])
                <td></td>
                @endif
                <td></td>
                {!! $ListTable['details'] !!}
            </tr>
            @endif
        </script>
    </td>
    @endif
    {!! $content !!}
</tr>
@if($ListTable['details'] && isset($ListTable['detail-new-row']))
<tr class="tr-@{{ $list_item_pk }}-detail@{{ $list_item_css }}"
    key="@{{ $list_item_pk }}"
    primary="@{{ $list_item_key }}" style="display:none;">
    @if($ListTable['checkbox'])
    <td></td>
    @endif
    <td></td>
    {!! $ListDetails['base'] !!}
</tr>
@endif
{@}endforeach
</tbody>