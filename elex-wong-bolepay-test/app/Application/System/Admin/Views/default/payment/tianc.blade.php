<div class="form-group input-group">
    <span class="input-group-addon" style="width: 108px;">接口地址</span>
    <input type="text" class="form-control" name="data[api_url]" value="{{ $data['data']['api_url'] }}">
</div>
<div class="form-group input-group">
    <span class="input-group-addon" style="width: 108px;">商户号</span>
    <input type="text" class="form-control" name="data[customer_no]" value="{{ $data['data']['customer_no'] }}">
</div>
<div class="form-group input-group">
    <span class="input-group-addon" style="width: 108px;">商户APIKEY</span>
    <input type="text" class="form-control" name="data[api_key]" value="{{ $data['data']['api_key'] }}">
</div>
@if($data['code'] == 'TianCWechatH5')
<div class="form-group">
    <div class="input-group">
        <span class="input-group-addon" style="width: 108px;">固定金额</span>
        <input type="text" class="form-control" name="data[fixed_amounts]" value="{{ implode(',', $data['data']['fixed_amounts'] )}}">
    </div>
    <small class="form-text text-danger" style="padding-left: 108px">多个金额以 , 分隔</small>
</div>
@endif