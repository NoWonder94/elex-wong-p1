<div class="form-group input-group">
    <span class="input-group-addon" style="width: 112px;">接口地址</span>
    <input type="text" class="form-control" name="data[api_url]" value="{{ $data['data']['api_url'] }}">
</div>
<div class="form-group input-group">
    <span class="input-group-addon" style="width: 112px;">商户编码</span>
    <input type="text" class="form-control" name="data[mer_no]" value="{{ $data['data']['mer_no'] }}">
</div>
<div class="form-group input-group">
    <span class="input-group-addon" style="width: 112px;">商户用户编码</span>
    <input type="text" class="form-control" name="data[mer_user_no]" value="{{ $data['data']['mer_user_no'] }}">
</div>
<div class="form-group input-group">
    <span class="input-group-addon" style="width: 112px;">AesKey</span>
    <input type="text" class="form-control" name="data[aes_key]" value="{{ $data['data']['aes_key'] }}">
</div>
<div class="form-group input-group">
    <span class="input-group-addon" style="width: 112px;">交易私钥</span>
    <textarea class="form-control" name="data[private_key]" rows="10">{{ $data['data']['private_key'] }}</textarea>
</div>
<div class="form-group input-group">
    <span class="input-group-addon" style="width: 112px;">平台公钥</span>
    <textarea class="form-control" name="data[public_key]" rows="10">{{ $data['data']['public_key'] }}</textarea>
</div>
<div class="form-group">
    <div class="input-group">
        <span class="input-group-addon" style="width: 112px;">固定金额</span>
        <input type="text" class="form-control" name="data[fixed_amounts]" value="{{ implode(',', $data['data']['fixed_amounts'] )}}">
    </div>
    <small class="form-text text-danger" style="padding-left: 112px">多个金额以 , 分隔</small>
</div>