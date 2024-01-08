<?php
namespace App\Utils;

use Illuminate\Session\FileSessionHandler;

class SessionManager extends \Illuminate\Session\SessionManager {
    protected function createNativeDriver() {
        $lifetime = $this->app['config']['session.lifetime'];
		$path = $this->app['config']['session.files'];
		$path .= '/' . strtolower(APP_HOST_TYPE) . '/' . strtolower(APP_CURRENT_NAMESPACE);

		if (!file_exists($path)) {
			mkdir($path, 0777, true);
		}
		
        return $this->buildSession(new FileSessionHandler(
            $this->app['files'], $path, $lifetime
        ));
    }
}
