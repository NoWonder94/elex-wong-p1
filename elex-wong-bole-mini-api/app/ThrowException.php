<?php 
namespace App;

use Helper, Time;

trait ThrowException {
    public function throwException($key, $field = '', $msg = '', $url = '') {
        if (empty($msg)) {
            $data = '';
            if (is_array($key)) {
                $data = $key;
                $key = array_shift($data);
            }
            $msg = Helper::langFormat($key, $data);
        }
        Helper::throwException($msg, $field, $url);
    }

    protected function log($path, $content) {
        file_put_contents(storage_path().'/logs/'.$path, "\r\n".Time::toDate(UTC_TIME)."============================\r\n".$content, FILE_APPEND);
    }
}