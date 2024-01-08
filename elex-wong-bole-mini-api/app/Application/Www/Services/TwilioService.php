<?php 
namespace App\Application\Www\Services;

use Twilio\Rest\Client;
use Twilio\Jwt\ClientToken;

class TwilioService extends BaseService {
    public function getToken($config) {
        $identity = APP_SITE_DOMAIN . '_' . APP_CURRENT_ADMIN_NAME . '_' . str_replace('.', '_', CLIENT_IP);
        $capability = new ClientToken($config['account_sid'], $config['auth_token']);
        $capability->allowClientOutgoing($config['app_sid']);
        $capability->allowClientIncoming($identity);
        return $capability->generateToken();
    }

    public function sendSms($config, $mobile, $content) {
        $client = new Client($config['account_sid'], $config['auth_token']);
        $result = $client->messages->create('+86' . $mobile, [
            "from" => $config['sms_number'],
            "body" => $content
        ]);
		return $result->sid;
    }
}