<?php
namespace App\Cache;

use Illuminate\Cache\FileStore;
use Illuminate\Filesystem\Filesystem;
use SystemCache, Exception;

class AgentFileStore extends FileStore {
    private $systemVersion;

    public function __construct(Filesystem $files, $directory) {
        $this->systemVersion = SystemCache::get('catch_version');
        parent::__construct($files, $directory);
    }

    public function put($key, $value, $seconds) {
        $this->ensureCacheDirectoryExists($path = $this->path($key));

        $result = $this->files->put(
            $path, $this->systemVersion.$this->expiration($seconds).serialize($value), true
        );

        return $result !== false && $result > 0;
    }

    protected function getPayload($key) {
        $path = $this->path($key);

        try {
            $version = substr(
                $contents = $this->files->get($path, true), 0, 10
            );
        } catch (Exception $e) {
            return $this->emptyPayload();
        }

        if ($version != $this->systemVersion) {
            $this->forget($key);
            return $this->emptyPayload();
        }

        $expire = substr($contents, 10, 10);
        if ($this->currentTime() >= $expire) {
            $this->forget($key);
            return $this->emptyPayload();
        }

        try {
            $data = unserialize(substr($contents, 20));
        } catch (Exception $e) {
            $this->forget($key);
            return $this->emptyPayload();
        }

        $time = $expire - $this->currentTime();
        return compact('data', 'time');
    }
}