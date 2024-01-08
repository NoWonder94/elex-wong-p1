<?php
	namespace App\Application\Api\Controllers;

	class SystemController extends BaseController {
		public function init() {
			$data = [];

			if ($this->user) {
				$data = [
					'email' => $this->user->customer_email,
					'name' => $this->user->customer_name
				];
			}

			$this->success($data);
		}
	}
?>