<?php 
namespace App\Utils;

use Laravel\Lumen\Routing\UrlGenerator;

class Url extends UrlGenerator {
    protected $forcedRoot;

	public function forceRootUrl($root) {
        $this->forcedRoot = rtrim($root, '/');
        $this->cachedRoot = null;
    }

    protected function getRootUrl($scheme, $root = null) {
        if (is_null($root)) {
            if (is_null($this->cachedRoot)) {
                $this->cachedRoot = $this->forcedRoot ?: $this->app->make('request')->root();
            }
            $root = $this->cachedRoot;
        }
        $start = starts_with($root, 'http://') ? 'http://' : 'https://';
        return preg_replace('~'.$start.'~', $scheme, $root, 1);
    }
}
?>