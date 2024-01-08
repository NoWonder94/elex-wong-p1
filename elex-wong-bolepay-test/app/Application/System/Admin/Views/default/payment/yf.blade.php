<div class="form-group input-group">
    <span class="input-group-addon" style="width: 85px;">接口地址</span>
    <input type="text" class="form-control" name="data[url]" value="{{ $data['data']['url'] }}">
</div>
<div class="form-group input-group">
    <span class="input-group-addon" style="width: 85px;">商户号</span>
    <input type="text" class="form-control" name="data[pid]" value="{{ $data['data']['pid'] }}">
</div>
<div class="form-group input-group">
    <span class="input-group-addon" style="width: 85px;">接口KEY</span>
    <input type="text" class="form-control" name="data[key]" value="{{ $data['data']['key'] }}">
</div>
<div class="form-group">
    <div class="input-group">
        <span class="input-group-addon" style="width: 85px;">固定金额</span>
        <input type="text" class="form-control" name="data[fixed_amounts]" value="{{ implode(',', $data['data']['fixed_amounts'] )}}">
    </div>
    <small class="form-text text-danger" style="padding-left: 85px">多个金额以 , 分隔</small>
</div>