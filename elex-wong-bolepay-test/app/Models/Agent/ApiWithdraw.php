<?php 
namespace App\Models\Agent;

use App\Services\System\WithdrawPlatformService;
use App\Services\System\AgentService;
use App\Models\System\Agent;
use App\Utils\Calc;

class ApiWithdraw extends MySqlElasticSearch {
	protected $keyType = 'float';
        
    public function under() {
        $agent_ids = explode(',', $this->attributes['agent_ids']);
        $index     = array_search(APP_CURRENT_AGENT_ID, $agent_ids);
        $under_id  = $agent_ids[$index + 1];
        return AgentService::instance()->getCacheById($under_id);
    }

    public function agent() {
        return $this->hasOne(Agent::class, 'id', 'agent_id');
    }

 
    
    public function getPayment() {
        return WithdrawPlatformService::instance()->get($this->attributes['channel_id']);
    }
	
	public function getPaymentNameAttribute() {
        $payment = $this->getPayment();
        return $payment['name'];
    }
	
    public function getPaymentIsExternal() {
        $payment = $this->getPayment();
        return $payment['is_external'];
    }

    public function getPaymentExternalUrl() {
        $payment = $this->getPayment();
        return $payment['external_url'];
    }

    public function setMoneyAttribute($value) {
        $this->attributes['money'] = Calc::mul($value, 100, 2);
    }

    public function getMoneyAttribute() {
        return Calc::div($this->attributes['money'], 100, 2);
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

    public function setAdminLogAttribute($value) {
        $this->attributes['admin_log'] = json_encode($value);
    }

    public function getAdminLogAttribute() {
        if (empty($this->attributes['admin_log'])) {
            return [];
        }
        return json_decode($this->attributes['admin_log'], 1);
    }

    public function setPaymentPlatformsAttribute($value) {
        $this->attributes['payment_platforms'] = json_encode($value);
    }


    public function setAgentFeesAttribute($value) {
        $this->attributes['agent_fees'] = json_encode($value);
    }

    public function getAgentFeesAttribute() {
        if (empty($this->attributes['agent_fees'])) {
            return [];
        }
        return json_decode($this->attributes['agent_fees'], 1);
    }
}