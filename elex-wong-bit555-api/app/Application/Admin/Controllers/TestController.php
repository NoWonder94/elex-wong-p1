<?php

namespace App\Application\Admin\Controllers;
use Hash;

class TestController {
	public function test() {
		echo Hash::make('123456');
		exit;
	}
}