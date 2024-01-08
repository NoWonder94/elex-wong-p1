<?php 
namespace App\Application\Site\Api\Models;

use App\Application\Site\Api\Services\PaymentService;
use Helper;

class Payment extends \App\Models\Site\Payment {
	protected $visible = ['id', 'type', 'name', 'min_deposit', 'max_deposit', 'tips', 'html', 'fields'];
	protected $appends = ['html', 'fields'];
	protected static $paymentFields = [];

	public function getHtmlAttribute() {
		if ($this->attributes['type'] == 1) {
			return '';
		}
		return $this->attributes['data'];
	}

	public function getFieldsAttribute() {
		$code = $this->attributes['code'];
		if (!isset(self::$paymentFields[$code])) {
			$payment_lib = PaymentService::instance()->getLibrarie($this);
			if (!$payment_lib) {
				return [];
			}
			self::$paymentFields[$code] = $payment_lib->getFormFields();
		}
		return self::$paymentFields[$code];
	}

	public function getDataAttribute() {
		if ($this->attributes['type'] == 2) {
			return [];
		}
		return Helper::jsonDecode($this->attributes['data']);
	}
}