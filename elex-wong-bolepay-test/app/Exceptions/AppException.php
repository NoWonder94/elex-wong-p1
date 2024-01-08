<?php
namespace App\Exceptions;

use Exception;

class AppException extends Exception {
	protected $url    = '';
	protected $field  = '';

	public function setUrl($url) {
		$this->url = $url;
	}

    public function getUrl() {
    	return $this->url;
    }

    public function setField($field) {
		$this->field = $field;
	}

    public function getField() {
    	return $this->field;
    }
}