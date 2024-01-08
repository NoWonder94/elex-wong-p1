<?php 

namespace App\Utils;
use Config;

class Encrypter {
    protected $key;
    protected $iv;
    protected $cipher;

    public function __construct($key, $iv) {
        $this->key      = $key;
        $this->iv       = $iv;
        $this->cipher   = Config('app.encrypter.cipher');
    }

    public function encrypt($value) {
        $value = openssl_encrypt(json_encode($value), $this->cipher, md5($this->key), 0, md5($this->iv, true));
        if ($value === false) {
            die('Could not encrypt the data.');
        }
        return rawurlencode(base64_encode($value));
    }

    public function decrypt($value){
        $value = base64_decode(rawurldecode($value));
        $value = openssl_decrypt($value, $this->cipher, md5($this->key), 0, md5($this->iv, true));
        if ($value === false) {
            die('Could not decrypt the data.');
        }
        return json_decode($value, true);
    }
}