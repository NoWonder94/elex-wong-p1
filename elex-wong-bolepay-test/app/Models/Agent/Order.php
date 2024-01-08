<?php 
namespace App\Models\Agent;

use App\Models\System\Bank;
use App\Models\System\BankLog;
use App\Services\System\PaymentService;
use App\Services\System\AgentService;
use App\Models\System\Agent;
use App\Utils\Calc;
use Lang;

class Order extends MySqlElasticSearch {

	protected $keyType = 'float';

    public function under() {
        $agent_ids = explode(',', $this->attributes['agent_ids']);
        $index     = array_search(APP_CURRENT_AGENT_ID, $agent_ids);
        $under_id  = $agent_ids[$index + 1];
        return AgentService::instance()->getCacheById($under_id);
    }

    public function agent() {
        return $this->hasOne(Agent::class, 'id', 'parent_agent_id');
    }

    public function fees() {
        $relation = $this->hasMany(OrderFee::class, 'order_sn', 'sn');
        $relation->orderBy('agent_level', 'DESC')->limit(2000);
        return $relation;
    }

    public function fee() {
        $relation = $this->hasOne(OrderFee::class, 'order_sn', 'sn');
        $relation->where('agent_id', APP_CURRENT_AGENT_ID);
        return $relation;
    }

    public function bank() {
        return $this->hasOne(Bank::class, 'id', 'bank_receive_id');
    }

    public function bankLog() {
        return $this->hasOne(BankLog::class, 'sn', 'bank_log_sn');
    }

    public function getPayment() {
        return PaymentService::instance()->get($this->attributes['channel_id']);
    }

    public function getPaymentIsExternal() {
        $payment = $this->getPayment();
        return $payment['is_external'];
    }

    public function getPaymentExternalUrl() {
        $payment = $this->getPayment();
        return $payment['external_url'];
    }

    public function getPaymentNameAttribute() {
        $payment = $this->getPayment();
        return $payment['name'];
    }

    public function getChannelNameAttribute() {
        return Lang::get('common.channel.' . $this->attributes['channel']);
    }

    public function setMoneyAttribute($value) {
        $this->attributes['money'] = Calc::mul($value, 100, 2);
    }

    public function getMoneyAttribute() {
        return Calc::div($this->attributes['money'], 100, 2);
    }

    public function setAgentMoneyAttribute($value) {
        $this->attributes['agent_money'] = Calc::mul($value, 100, 2);
    }

    public function getAgentMoneyAttribute() {
        return Calc::div($this->attributes['agent_money'], 100, 2);
    }

    public function setPayMoneyAttribute($value) {
        $this->attributes['pay_money'] = Calc::mul($value, 100, 2);
    }

    public function getPayMoneyAttribute() {
        return Calc::div($this->attributes['pay_money'], 100, 2);
    }

    public function setProxyFeeAttribute($value) {
        $this->attributes['proxy_fee'] = Calc::mul($value, 100, 2);
    }

    public function getProxyFeeAttribute() {
        return Calc::div($this->attributes['proxy_fee'], 100, 2);
    }

    public function setServiceFeeAttribute($value) {
        $this->attributes['service_fee'] = Calc::mul($value, 100, 2);
    }

    public function getServiceFeeAttribute() {
        return Calc::div($this->attributes['service_fee'], 100, 2);
    }

    public function setCreateFeeAttribute($value) {
        $this->attributes['create_fee'] = Calc::mul($value, 100, 2);
    }

    public function getCreateFeeAttribute() {
        return Calc::div($this->attributes['create_fee'], 100, 2);
    }

    public function setDataAttribute($value) {
        if (is_array($value)) {
            $this->attributes['data'] = json_encode($value);
        } else {
            $this->attributes['data'] = $value;
        }
    }

    public function getDataAttribute() {
        if (empty($this->attributes['data'])) {
            return [];
        }
        return json_decode($this->attributes['data'], 1);
    }

    public function setAdminLogAttribute($value) {
        $this->attributes['admin_log'] = json_encode($value);
    }

    public function getAdminLogAttribute() {
        if (empty($this->attributes['admin_log'])) {
            return [];
        }
        return json_decode($this->attributes['admin_log'], 1);
    }
    
    public function setAddressRateAttribute($value) {
        $this->attributes['address_rate'] = Calc::mul($value, 100, 2);
    }

    public function getAddressRateAttribute() {
        return Calc::div($this->attributes['address_rate'], 100, 2);
    }
    
    public function getAddressAmountAttribute() {
        return (float)$this->attributes['address_amount'];
    }
}