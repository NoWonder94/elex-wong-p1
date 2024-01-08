<?php 
namespace App\Utils;

use Config;

class MessageSend {
	public static function mailVerify($email, $code) {
	    $config = Config::get('app.submail');
	    $template = $config['templates']['email']['verify_code'];
	    unset($config['templates']);
        $submail = new \MAILXsend($config);
        $submail->AddTo($email);
        $submail->SetProject($template);
        $submail->AddVar('code', $code);
        $result = $submail->xsend();
        return isset($result['status']) && $result['status'] == 'success';
    }
}
