<?php 
namespace App\Events;

class RequestErrorEvent extends Event {

	private $_error;

	/**
	 * Create a new event instance.
	 *
	 * @return void
	 */
	public function __construct($error) {
		$this->_error = $error;
	}

	public function getError() {
		return $this->_error;
	}
}
