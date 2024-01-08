<?php
namespace App\Application\System\Callback\Controllers;

use OSS\OssClient;
use Config;

class LogController  extends BaseController {

    public function requests() {
        $files = [];
        $path = storage_path('request') . '/';
        $directory = dir($path);
        while($entry = $directory->read()){
            if($entry == '.' || $entry == '..' || strpos($entry, '.log') === false) {
                continue;
            }
            $files[] = $entry;
        }
        $directory->close();

        sort($files);

        $logs = [];
        foreach ($files as $index => $file) {
            if ($index >= 100) {
                break;
            }

            $log = file_get_contents($path . $file);
            if (empty($log)) {
                continue;
            }

            $names = explode('_', $file);
            array_pop($names);
            $name  = implode('/', $names);
            if (isset($logs[$name])) {
                $logs[$name] .= $log;
            } else {
                $logs[$name] = $log;
            }
            unlink($path . $file);
        }

        $config = Config::get('filesystems.disks.s3');
        $client = new OssClient($config['key'], $config['secret'], $config['endpoint']);
        foreach ($logs as $name => $log) {
            $name = 'logs/requests/' . $name . '.txt';
            try {
                $exist = $client->doesObjectExist($config['bucket'], $name);
                if ($exist) {
                    $meta = $client->getObjectMeta($config['bucket'], $name);
                    $position = $meta['x-oss-next-append-position'];
                } else {
                    $position = 0;
                }
            } catch (\Exception $e) {
                $position = 0;
            }
            $client->appendObject($config['bucket'], $name, $log, $position);
        }
        echo 'SUCCESS';
    }
}
