<php>
$admin_controller = $admin_nodes[$controller];
</php>
<fieldset>
    <legend>
        <label>
            <input type="checkbox" class="uniform" />
            <span>{{ $admin_controller['name'] }}</span>
        </label>
    </legend>
    <div class="admin-actions">
        @foreach($nodes as $node)
        <php>
            $admin_action = $admin_controller['nodes'][$node['action']];
            $node_name = $node['name'][$locale];
            if ($node_name != $admin_action['name']) {
                $node_name .= '('.$admin_action['name'].')';
            }

            $checked = '';
            if (in_array($node['id'], $data['access'])) {
                $checked = ' checked';
            }
        </php>
        <label>
            <input class="uniform" type="checkbox" name="access[]" value="{{ $node['id'] }}"{{$checked}} />
            <span>{{ $node_name }}</span>
        </label>
        @endforeach
    </div>
</fieldset>
<div class="blank15"></div>