<?php 
namespace App\Application\Www\Services;

use Plivo\RestClient;

class PlivoService extends BaseService {
    public function getToken($config) {
        return ['endpoint_user'=>$config['endpoint_user'], 'endpoint_password' => $config['endpoint_password']];
    }

    public function sendSms($config, $mobile, $content) {
		$client = new RestClient($config['auth_id'], $config['auth_token']);
		$result = $client->messages->create(
					$config['sms_number'],
					['86' . $mobile],
					$content
				);
		return $result->messageUuid[0];
    }
}