<thead class="list-thead">
    <tr>
        @if($ListTable['checkbox'])
        <td class="nosort" width="38" data-width="38" style="text-align:center; line-height: normal;">
        	<span class="checkbox-custom checkbox-primary">
            	<input class="selectable-all" type="checkbox" onclick="$.tableCheckHandler(this)">
            	<label></label>
         	</span>
        </td>
        @endif
        {!! $content !!}
    </tr>
</thead>