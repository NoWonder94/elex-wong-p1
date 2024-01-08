<div class="nav-tabs-horizontal" data-plugin="tabs">
    <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="presentation">
            <a class="nav-link {{ APP_ACTION_NAME == 'index' ? 'active' : '' }}" href="{{ Helper::url('Agent/index') }}">{{ Lang::get('admin.agent.index') }}</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link {{ APP_ACTION_NAME == 'edit' ? 'active' : '' }}" href="{{ Helper::url('Agent/edit') }}">{{ Lang::get('admin.agent.edit') }}</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link {{ APP_ACTION_NAME == 'whitelist' ? 'active' : '' }}" href="{{ Helper::url('Agent/whitelist') }}">{{ Lang::get('admin.agent.whitelist') }}</a>
        </li>
    </ul>
</div>
