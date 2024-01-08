<div class="form-group input-group">
    <span class="input-group-addon" style="width: 86px;">接口地址</span>
    <input type="text" class="form-control" name="data[api_url]" value="{{ $data['data']['api_url'] }}">
</div>
<div class="form-group input-group">
    <span class="input-group-addon" style="width: 86px;">商户ID</span>
    <input type="text" class="form-control" name="data[mch_id]" value="{{ $data['data']['mch_id'] }}">
</div>
<div class="form-group input-group">
    <span class="input-group-addon" style="width: 86px;">商户密钥</span>
    <input type="text" class="form-control" name="data[api_key]" value="{{ $data['data']['api_key'] }}">
</div>
<div class="form-group">
    <div class="input-group">
        <span class="input-group-addon" style="width: 86px;">固定金额</span>
        <input type="text" class="form-control" name="data[fixed_amounts]" value="{{ implode(',', $data['data']['fixed_amounts'] )}}">
    </div>
    <small class="form-text text-danger" style="padding-left: 86px">多个金额以 , 分隔</small>
</div>