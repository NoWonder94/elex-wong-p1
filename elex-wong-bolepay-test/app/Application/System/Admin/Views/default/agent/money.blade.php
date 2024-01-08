<script type="text/tpl" id="moneyModifyTpl">
<?php
    $label_width = 143;
    ?>
    <form class="form-horizontal" id="moneyModifyForm">
        <div class="form-group row">
            <label class="col-md-4 form-control-label" style="flex: 0 0 {{ $label_width }}px;"></label>
        <div class="col-md-8 text-danger" style="font-size: 12px">
            {{ Lang::get('admin.agent.now_money') }}：￥@{{=it.money }}
        </div>
    </div>
	<div class="form-group row">
        <label class="col-md-4 form-control-label" style="flex: 0 0 {{ $label_width }}px;">调整方式: </label>
        <div class="col-md-8">
            <ul class="list-unstyled list-inline">
				<li class="list-inline-item">
					<div class="radio-custom radio-primary">
						<input id="radiod-type-order" type="radio" class="uniform money-type" name="type" value="order" checked>
						<label for="radiod-type-order">订单补单</label>
					</div>
				</li>
				<li class="list-inline-item">
					<div class="radio-custom radio-primary">
						<input id="radiod-type-payment" type="radio" class="uniform money-type" name="type" value="payment">
						<label for="radiod-type-payment">通道补单</label>
					</div>
				</li>
				<li class="list-inline-item">
					<div class="radio-custom radio-primary">
						<input id="radiod-type-other" type="radio" class="uniform money-type" name="type" value="other">
						<label for="radiod-type-other">其他</label>
					</div>
				</li>
			</ul>
        </div>
    </div>
    <div class="form-group row type-row type-row-order">
        <label class="col-md-4 form-control-label" style="flex: 0 0 {{ $label_width }}px;">订单流水号<span class="required text-danger">*</span>: </label>
        <div class="col-md-8">
            <input id="orderSn" name="order_sn" value="" class="form-control" placeholder="请输入订单流水号，不是商家订单号"/>
        </div>
    </div>
	<div class="form-group row type-row type-row-payment" style="display:none;">
        <label class="col-md-4 form-control-label" style="flex: 0 0 {{ $label_width }}px;">支付通道<span class="required text-danger">*</span>: </label>
        <div class="col-md-8">
			<select name="payment" id="paymentSelect" class="form-control">
			    <option value="">正在加载中...</option>
            </select>
        </div>
    </div>
    <div class="form-group row" style="margin-bottom:5px;">
        <label class="col-md-4 form-control-label" style="flex: 0 0 {{ $label_width }}px;">{{ Lang::get('admin.agent.modify_amount') }}<span class="required text-danger">*</span>: </label>
        <div class="col-md-8">
            <input type="number" id="modifyAmount" name="amount" value="" class="form-control" placeholder="{{ Lang::get('admin.agent.modify_amount_tip') }}" />
        </div>
    </div>
    <div class="form-group row">
        <label class="col-md-4 form-control-label" style="flex: 0 0 {{ $label_width }}px;"></label>
        <div class="col-md-8 text-danger" style="font-size: 12px">  如果是补单操作，请输入实际支付金额，系统会自动扣除服务费  </div>
    </div>
    <div class="form-group row">
        <label class="col-md-4 form-control-label" style="flex: 0 0 {{ $label_width }}px;">{{ Lang::get('admin.remark') }}<span class="required text-danger">*</span>: </label>
        <div class="col-md-8">
            <textarea id="modifyRemark" name="remark" class="form-control"></textarea>
        </div>
    </div>
    @tpl_include('default._layouts.verify_min', ['action' => 'agentmoney', 'width' => $label_width])
    <input type="hidden" name="id" value="@{{=it.id }}" />
</form>
</script>
<script type="text/javascript">
    function moneyModify(btn, id, money) {
        var html = $.template($("#moneyModifyTpl").html(), {
            "id":id, "money":money
        });

        $.showConfirm(html, function(hiddenFunc){
            var type = $(".money-type:checked").val();
            if (type == "order") {
                var orderSn = $.trim($('#orderSn').val());
                if (orderSn == '') {
                    $.showTooltip($('#orderSn'), "请输入订单流水号", null, 'right', 3000, 'danger');
                    return false;
                }
            }

            var amount = parseFloat($('#modifyAmount').val());
            if (amount == 0 || isNaN(amount)) {
                $.showTooltip($('#modifyAmount'), "{{ Lang::get('common.agent.amount_error') }}", null, 'right', 3000, 'danger');
                return false;
            }

            if (type != "other" && amount < 0) {
                $.showTooltip($('#modifyAmount'), "订单补单和通道补单不能为负数", null, 'right', 3000, 'danger');
                return false;
            }

            var remark = $.trim($('#modifyRemark').val());
            if (remark == '') {
                $.showTooltip($('#modifyRemark'), "{{ Lang::get('common.agent.remark_required') }}", null, 'right', 3000, 'danger');
                return false;
            }

            @tpl_include('default._layouts.verify_js')

            var ladda = Ladda.create(this);
            ladda.start();

            var form = $("#moneyModifyForm");

            $.ajaxPost("{{ Helper::url(APP_CONTROLLER_NAME . '/money') }}", form.serialize(), (result) => {
                ladda.stop();
                if (result.status) {
                    hiddenFunc();

                    $.updateListRow(id, result.data);

                    var row = APP.NOW_DATA_TABLE.row('.tr-' + id).node();
                    $(row).html(result.data);
                    APP.NOW_DATA_TABLE.draw(false);

                    $.showSuccess("{{Lang::get('common.handler_success')}}", 300, null, 2000);
                } else {
                    if (result.data.field != '') {
                        $.showTooltip($("[name='" + result.data.field + "']", form), result.msg, null, 'right', 3000, 'danger');
                    } else {
                        $.showTooltip($(this), result.msg, null, 'right', 3000, 'danger');
                    }
                }
            }, () => {
                ladda.stop();
                $.showTooltip($(this), "{{Lang::get('common.handler_error')}}", null, 'right', 2000, 'danger');
            });
        }, null, function () {
            $.post("{!! Helper::url( APP_CONTROLLER_NAME . '/payments') !!}",{"proxy_id":id, 'is_return_enables':1}, function(result){
                $("#paymentSelect").html(result.data);
            });

            $(".money-type").change(function () {
                var type = $(".money-type:checked").val();
                $(".type-row").hide();
                $(".type-row-" + type).show();
            });
        }, null, 500, "{{ Lang::get('admin.agent.money_modify') }}");
    }
</script>