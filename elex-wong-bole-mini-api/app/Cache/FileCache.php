<?php
namespace App\Cache;

use Illuminate\Cache\FileStore;
use Illuminate\Filesystem\Filesystem;

class FileCache extends FileStore {
    protected $old_directory = '';

    public function __construct(Filesystem $files, $directory) {
        $this->files            = $files;
        $this->directory        = $directory;
        $this->old_directory    = $directory;
    }

    public function setDirectory($directory) {
        $this->directory = $this->old_directory . '/' . $directory;
        if (!file_exists($this->directory)) {
            mkdir($this->directory, 0777, true);
        }
        return $this;
    }
}
