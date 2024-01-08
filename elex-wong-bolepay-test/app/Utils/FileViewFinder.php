<?php
namespace App\Utils;

use Illuminate\View\FileViewFinder as BaseFileViewFinder;

class FileViewFinder extends BaseFileViewFinder {
    public function find($name) {
        if (isset($this->views[$name])) {
            return $this->views[$name];
        }

        if ($this->hasHintInformation($name = trim($name))) {
            return $this->views[$name] = $this->findNamedPathView($name);
        }

        if(strpos($name, 'component.') === 0) {
            $path = APP_SITE_PATH . 'resources';
            return $this->views[$name] = $this->findInPaths($name, $path);
        }
        return $this->views[$name] = $this->findInPaths($name, $this->paths);
    }
}
