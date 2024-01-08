<?php
namespace App\Exceptions;

use Exception;

class SystemException extends Exception {
	protected $detail   = '';

	public function setDetail($detail) {
		$this->detail = $detail;
	}

    public function getDetail() {
    	return $this->detail;
    }
}