<?php 
namespace App\Events;

class RequestErrorEvent extends Event {

	private $_error;
	
	public function __construct($error) {
		$this->_error = $error;
	}

	public function getError() {
		return $this->_error;
	}
}
