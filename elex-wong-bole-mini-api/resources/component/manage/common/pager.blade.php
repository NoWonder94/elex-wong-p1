<nav class="pagination-nav">
    <ul class="pagination">
        <li>
            <span>
                @if ($pager['total_count'] > 0) 
                {{ sprintf(Lang::get('root::tpl.pager.total'), $pager['total_count'], $pager['page_count'])  }}
                @else
                {{ Lang::get('root::tpl.pager.nodata') }}
                @endif
            </span>
        </li>
        @if ($pager['page'] > 1) 
        <li>
            <a href="{{ $pager['page_prev'] }}" page="{{ $pager['prev_page'] }}">{{ Lang::get('root::tpl.pager.prev') }}</a>
        </li>
        @endif
        @foreach ($pager['page_nums'] as $page_num) 
            @if ($pager['page'] == $page_num['name']) 
            <li class="active"><a href="javascript:;" page="{{ $page_num['name'] }}">{{ $page_num['name'] }}</a></li>
            @elseif($page_num['name'] == '...')
            <li><span>...</span></li>
            @else
            <li><a href="{{ $page_num['url'] }}" page="{{ $page_num['name'] }}">{{ $page_num['name'] }}</a></li>
            @endif
        @endforeach
        @if ($pager['page'] < $pager['page_count']) 
        <li><a href="{{ $pager['page_next'] }}" page="{{ $pager['page_count'] }}">{{ Lang::get('root::tpl.pager.next') }}</a></li>
        @endif
		@if ($pager['page_count'] > 15) 
		<li><input type="text" id="pageInput" class="form-control" style="width:70px;padding:20px 5px;float:left;border-radius:0;text-align:center;" value="{{ $pager['page'] }}"></li>
		<li><button class="btn btn-success" style="padding:9px 15px;border-radius:0;" data-url="{!! $pager['page_url'] !!}" onclick="$.goToPage(this)">转到</button></li>
		@endif
		<li>
    </ul>
</nav>
<script>
jQuery(function($){
	$.goToPage = function(obj) {
		location.href = $(obj).data('url').replace('__PAGE__', $("#pageInput").val());
	}
});
</script>