<nav class="pagination-nav">
    <ul class="pagination">
        <li class="page-item">
            <span class="page-link">
                @if ($pager['total_count'] > 0) 
                {{ sprintf(Lang::get('admin.pager.total'), $pager['total_count'], $pager['page_count'])  }}
                @else
                {{ Lang::get('admin.pager.nodata') }}
                @endif
            </span>
        </li>
        @if ($pager['page'] > 1) 
        <li class="page-item">
            <a class="page-link" href="{{ $pager['page_prev'] }}" page="{{ $pager['prev_page'] }}">{{ Lang::get('admin.pager.prev') }}</a>
        </li>
        @endif
        @foreach ($pager['page_nums'] as $page_num) 
            @if ($pager['page'] == $page_num['name']) 
            <li class="page-item active"><a class="page-link" href="javascript:;" page="{{ $page_num['name'] }}">{{ $page_num['name'] }}</a></li>
            @elseif($page_num['name'] == '...')
            <li class="page-item"><span class="page-link">...</span></li>
            @else
            <li class="page-item"><a class="page-link" href="{{ $page_num['url'] }}" page="{{ $page_num['name'] }}">{{ $page_num['name'] }}</a></li>
            @endif
        @endforeach
        @if ($pager['page'] < $pager['page_count']) 
        <li class="page-item"><a class="page-link" href="{{ $pager['page_next'] }}" page="{{ $pager['page_count'] }}">{{ Lang::get('admin.pager.next') }}</a></li>
        @endif
		@if ($pager['page_count'] > 15) 
		<li class="page-item"><input type="text" id="pageInput" class="form-control" style="width:70px;float:left;border-radius:0;text-align:center;" value="{{ $pager['page'] }}"></li>
		<li class="page-item"><button class="btn btn-success" style="border-radius:0;" data-url="{!! $pager['page_url'] !!}" onclick="$.goToPage(this)">{{ Lang::get('admin.pager.goto') }}</button></li>
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