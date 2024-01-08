<ul class="site-menu margin-top-15">
  <li class="site-menu-item has-sub">
    <a href="{{ Helper::url('Index/index') }}">
      <i class="site-menu-icon wb-dashboard" aria-hidden="true"></i>
      <span class="site-menu-title">概览</span>
      <span class="site-menu-arrow"></span>
    </a>
  </li>
  <li class="site-menu-item has-sub">
    <a href="javascript:void(0)">
      <i class="site-menu-icon wb-grid-9" aria-hidden="true"></i>
      <span class="site-menu-title">站点管理</span>
      <span class="site-menu-arrow"></span>
    </a>
    <ul class="site-menu-sub">
      <li class="site-menu-item">
        <a href="{{ Helper::url('Site/index') }}">
          <span class="site-menu-title">站点列表</span>
        </a>
      </li>
      <li class="site-menu-item">
        <a href="{{ Helper::url('SiteAdminNav/index') }}">
          <span class="site-menu-title">站点管理菜单</span>
        </a>
      </li>
      <li class="site-menu-item">
        <a href="{{ Helper::url('SiteAdminNode/index') }}">
          <span class="site-menu-title">站点权限节点</span>
        </a>
      </li>
    </ul>
  </li>
  <li class="site-menu-item has-sub">
    <a href="javascript:void(0)">
      <i class="site-menu-icon wb-settings" aria-hidden="true"></i>
      <span class="site-menu-title">系统</span>
      <span class="site-menu-arrow"></span>
    </a>
    <ul class="site-menu-sub">
      <li class="site-menu-item">
        <a class="animsition-link" href="{{ Helper::url('SystemConfig/index') }}">
          <span class="site-menu-title">系统设置</span>
        </a>
      </li>
      <li class="site-menu-item">
        <a class="animsition-link" href="{{ Helper::url('Admin/index') }}">
          <span class="site-menu-title">管理员管理</span>
        </a>
      </li>
    </ul>
  </li>
</ul>