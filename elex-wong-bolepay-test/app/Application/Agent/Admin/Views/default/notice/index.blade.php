@extends('default._layouts.base')
@section('body')
    @tpl_begin
        <tpl:list>
            <content>
				<table plugin="datatable">
                    <details>
                        <td class="text-left text-break td-detail-show" colspan="2">
                            {!! $list_item->notice->content !!}
                        </td>
                    </details>
                    <columns>
                        <column width="500" halign="left" align="left" label="%admin.title">
                            @if($list_item->is_read == 0)
                            <span class="badge badge-danger">new</span>
                            @endif
                            {{ $list_item->notice->title }}
                        </column>
                        <column code="receiver_time" type="time" halign="left" align="left" label="%admin.notice.receiver_time" minwidth="150"></column>
                    </columns>
                </table>
            </content>
        </tpl:list>
    @tpl_end
@stop

@section('footer')
    <script type="text/javascript">
        APP.LIST_DETAIL_SHOW_FUNC = function (key) {
            $.ajaxPost("{{ Helper::url('Notice/read') }}", {"id":key}, (result) => {
                if (result.status) {
                    $('.list-tbody .tr-' + key + ' .badge').remove();
                }
            });
        };
    </script>
@stop