<ul class="site-menu margin-top-15">
@foreach ($_admin_navs as $_admin_nav)
  @if(in_array($_admin_nav['id'], $_admin_role['navs']))
  <php>
    $is_child = $_admin_nav['show_count'] > 1;
    $url = $is_child ? 'javascript:void(0)' : Helper::url($_admin_nav['url']);
    $selected = $_admin_nav['id'] == $_now_node['nav_id'] || $_admin_nav['id'] == $_now_node['pnav_id'];
    $css = $is_child ? ' has-sub' : '';
    $css .= $selected ? ' active' . ($is_child ? ' open' : '') : '';
  </php>
  <li class="site-menu-item{{ $css }}">
    <a href="{{ $url }}">
      <i class="site-menu-icon fa fa-{{ $_admin_nav['icon'] }}" aria-hidden="true"></i>
      <span class="site-menu-title">{{ $_admin_nav['name'] }}</span>
      <span class="site-menu-arrow"></span>
    </a>
    @if($_admin_nav['show_count'] > 1)
    <ul class="site-menu-sub">
      @foreach ($_admin_nav['nodes'] as $_node)
      @if(isset($_node['nodes']))
      @if (in_array($_node['id'], $_admin_role['navs']))
      <php>
        $css = $_node['id'] == $_now_node['nav_id'] ? ' active open' : '';
      </php>
      <li class="site-menu-item has-sub{{ $css }}">
        <a href="javascript:void(0)">
          <span class="site-menu-title">{{ $_node['name'] }}</span>
          <span class="site-menu-arrow"></span>
        </a>
        <ul class="site-menu-sub">
          @foreach ($_node['nodes'] as $_child_node)
          @if($_child_node['is_show'] == 1)
          <php>
            $css = $_child_node['id'] == $_now_node['id'] || $_child_node['id'] == $_show_node['id'] ? ' active' : '';
          </php>
          <li class="site-menu-item{{ $css }}" style="text-indent: .5em;">
            <a class="animsition-link" href="{{ Helper::url($_child_node['url']) }}">
              <span class="site-menu-title">{{ $_child_node['name'] }}</span>
            </a>
          </li>
          @endif
          @endforeach
        </ul>
      </li>
      @endif
      @elseif($_node['is_show'] == 1 && in_array($_node['id'], $_admin_role['nodes']))
      <php>
        $css = $_node['id'] == $_now_node['id'] || $_node['id'] == $_show_node['id'] ? ' active' : '';
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
  @endif
@endforeach
</ul>