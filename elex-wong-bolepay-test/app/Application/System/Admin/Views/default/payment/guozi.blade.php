<div class="form-group input-group">
    <span class="input-group-addon" style="width: 85px;">接口地址</span>
    <input type="text" class="form-control" name="data[api_url]" value="{{ $data['data']['api_url'] }}">
</div>
<div class="form-group input-group">
    <span class="input-group-addon" style="width: 85px;">商户ID</span>
    <input type="text" class="form-control" name="data[mch_id]" value="{{ $data['data']['mch_id'] }}">
</div>
<div class="form-group input-group">
    <span class="input-group-addon" style="width: 85px;">接口密钥</span>
    <input type="text" class="form-control" name="data[api_key]" value="{{ $data['data']['api_key'] }}">
</div>
<div class="form-group">
    <div class="input-group">
        <span class="input-group-addon" style="width: 85px;">回调IP</span>
        <input type="text" class="form-control" name="data[notify_ip]" value="{{ implode(',', $data['data']['notify_ip'] )}}">
    </div>
    <small class="form-text text-danger" style="padding-left: 85px">多个IP以 , 分隔；为空则不限制</small>
</div>