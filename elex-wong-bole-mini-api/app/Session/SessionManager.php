<?php
namespace App\Session;

use Illuminate\Session\FileSessionHandler;

class SessionManager extends \Illuminate\Session\SessionManager {
    protected function createNativeDriver() {
        $lifetime = $this->app['config']['session.lifetime'];
		$path = $this->app['config']['session.files'];
		if (defined('APP_SITE_DOMAIN')) {
			$path .= '/' . strtolower(APP_SITE_DOMAIN);
		} else {
			$path .= '/system';
		}
		
		if (!file_exists($path)) {
			mkdir($path, 0777, true);
		}
		
        return $this->buildSession(new FileSessionHandler(
            $this->app['files'], $path, $lifetime
        ));
    }
}
