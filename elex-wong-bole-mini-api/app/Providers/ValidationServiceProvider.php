<?php 
namespace App\Providers;

use App\Libraries\ValidatorLibrarie;
use Illuminate\Validation\ValidationServiceProvider as BaseValidationServiceProvider;

class ValidationServiceProvider extends BaseValidationServiceProvider {
	protected function registerValidationFactory() {
		$this->app->singleton('validator', function($app) {
			$validator = new ValidatorLibrarie($app['translator'], $app);
			if (isset($app['validation.presence'])) {
				$validator->setPresenceVerifier($app['validation.presence']);
			}
			return $validator;
		});
	}
}