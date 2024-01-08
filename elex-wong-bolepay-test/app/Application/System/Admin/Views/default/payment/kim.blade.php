<div class="form-group input-group">
    <span class="input-group-addon" style="width: 85px;">接口地址</span>
    <input type="text" class="form-control" name="data[api_url]" value="{{ $data['data']['api_url'] }}">
</div>
<div class="form-group input-group">
    <span class="input-group-addon" style="width: 85px;">接口UID</span>
    <input type="text" class="form-control" name="data[uid]" value="{{ $data['data']['uid'] }}">
</div>
<div class="form-group input-group">
    <span class="input-group-addon" style="width: 85px;">接口密钥</span>
    <input type="text" class="form-control" name="data[secret]" value="{{ $data['data']['secret'] }}">
</div>
<div class="form-group">
    <div class="input-group">
        <span class="input-group-addon" style="width: 85px;">固定金额</span>
        <input type="text" class="form-control" name="data[fixed_amounts]" value="{{ implode(',', $data['data']['fixed_amounts'] )}}">
    </div>
    <small class="form-text text-danger" style="padding-left: 85px">多个金额以 , 分隔</small>
</div>