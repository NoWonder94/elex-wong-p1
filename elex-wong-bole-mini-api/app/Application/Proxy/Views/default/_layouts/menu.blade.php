<ul class="site-menu margin-top-15">
@foreach ($_proxy_navs as $_proxy_nav) 
  <php> 
    $is_child = $_proxy_nav['has_sub'];
    $url = $is_child ? 'javascript:void(0)' : Helper::url($_proxy_nav['url']);
    $selected = in_array(CURRENT_URL, $_proxy_nav['urls']);
    $css = $is_child ? ' has-sub' : '';
    $css .= $selected ? ' active' . ($is_child ? ' open' : '') : '';
  </php>
  <li class="site-menu-item{{ $css }}">
    <a href="{{ $url }}">
      <i class="site-menu-icon fa fa-{{ $_proxy_nav['icon'] }}" aria-hidden="true"></i>
      <span class="site-menu-title">{{ $_proxy_nav['name'] }}</span>
      <span class="site-menu-arrow"></span>
    </a>
    @if($_proxy_nav['has_sub'])
    <ul class="site-menu-sub">
      @foreach ($_proxy_nav['nodes'] as $_node)
      @if($_node['has_sub']) 
      <php>
        $css = in_array(CURRENT_URL, $_node['urls']) ? ' active open' : '';
      </php>
      <li class="site-menu-item has-sub{{ $css }}">
        <a href="javascript:void(0)">
          <span class="site-menu-title">{{ $_node['name'] }}</span>
          <span class="site-menu-arrow"></span>
        </a>
        <ul class="site-menu-sub">
          @foreach ($_node['nodes'] as $_child_node) 
          <php>
            $css = in_array(CURRENT_URL, $_child_node['urls']) ? ' active' : '';
          </php>
          <li class="site-menu-item{{ $css }}" style="text-indent: .5em;">
            <a class="animsition-link" href="{{ Helper::url($_child_node['url']) }}">
              <span class="site-menu-title">{{ $_child_node['name'] }}</span>
            </a>
          </li> 
          @endforeach
        </ul>
      </li> 
      @else
      <php>
        $css = in_array(CURRENT_URL, $_node['urls'])  ? ' active' : '';
      </php>
      <li class="site-menu-item{{ $css }}">
        <a class="animsition-link" href="{{ Helper::url($_node['url']) }}">
          <span class="site-menu-title">{{ $_node['name'] }}</span>
        </a>
      </li>
      @endif
      @endforeach
    </ul>
    @endif
  </li> 
@endforeach
</ul>