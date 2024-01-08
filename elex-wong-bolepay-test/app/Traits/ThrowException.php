<?php 
namespace App\Traits;

use Helper, Lang;

trait ThrowException {
    public function throwException($key, $field = '', $msg = '', $url = '') {
        if (empty($msg)) {
            $msg = Lang::format($key);
        }
        Helper::throwException($msg, $field, $url);
    }

    public function checkValidator($validator) {
        if ($validator->fails()) {
            $messages = $validator->errors()->messages();
            Helper::throwException(current(current($messages)), key($messages));
        }
    }

    protected function log($name, $content) {
    	Helper::log($name, $content);
    }
}