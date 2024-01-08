<?php 
namespace App\Utils;

use Exception;

class Encrypter {
    protected $key;
    protected $iv;
    protected $cipher = 'AES-256-CBC';

    public function __construct($key, $iv) {
        $this->key  = $key;
        $this->iv   = $iv;
    }

    public function encrypt($value) {
        $value = openssl_encrypt(json_encode($value), $this->cipher, $this->key, 0, $this->iv);
        if ($value === false) {
            throw new Exception('Could not encrypt the data.');
        }
        return rawurlencode($value);
    }

    public function decrypt($value){
        $value = rawurldecode($value);
        $value = openssl_decrypt($value, $this->cipher, $this->key, 0, $this->iv);
        if ($value === false) {
            throw new Exception('Could not decrypt the data.');
        }
        return json_decode($value, true);
    }
}