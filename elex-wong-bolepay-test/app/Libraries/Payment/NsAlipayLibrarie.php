<?php 
namespace App\Libraries\Payment;

/**
 * 南山支付宝扫码
 */
class NsAlipayLibrarie extends NsLibrarie {
    protected $type = '10';
	protected $is_fixed = true;

    public function check($agentId, $money) {
        if (!in_array($money, $this->payment['data']['fixed_amounts'])) {
            $this->throwException(['common.order.fixed_amount_error', implode(' , ', $this->payment['data']['fixed_amounts'])]);
        }
        parent::check($agentId, $money);
    }
	
	public function getMoney($money){
		$real_fixed_amounts = explode(',',$this->payment['data']['real_fixed_amounts']);
		$diff = [];
		foreach($real_fixed_amounts as $key => $val){
			$diff[$key] = abs($money - $val);
		}
		asort($diff,1);
		return (float)$real_fixed_amounts[key($diff)];
	}
}