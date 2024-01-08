<?php
namespace App\Application\System\Admin\Controllers;

use Request;

class PaymentPlatformController extends EloquentController {

    public function index() {
        return $this->authIndex();
    }

    public function withdraw() {
        $data = $this->getService()->withdraw((float)Request::get('money'), Request::get('code'));
        return $this->successData($data);
    }
	
	public function update(){
		$data = $this->getService()->modifyBalance(Request::get('code'), (float)Request::get('money'));
        return $this->successData($data);
	}
}