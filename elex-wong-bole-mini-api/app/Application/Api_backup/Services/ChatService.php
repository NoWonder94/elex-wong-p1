<?php 
namespace App\Application\Site\Api\Services;


use App\Utils\Http;
use App\Utils\Strings;
use Config;

class ChatService extends BaseService {

    /**
     * 获取聊天的token
     */
    public function getToken($data) {
        $token_url = Config::get('app.chat.token_url');
        $sid = isset($data['sid']) ? $data['sid'] : 0;
        $image = isset($data['image']) ? $data['image'] : '';
        $username = isset($data['name']) ? $data['name'] : '游客';
        $uid = isset($data['uid']) ? $data['uid'] : 0;
        $site_id = isset($data['site_id']) ? $data['site_id'] : 0;
        $args = [
            'uid' => $uid,
            'sid' => $sid,
            'image' => $image,
            'username' => $username,
            'admin_role' => 0,
            'site_id' => $site_id
        ];
        $result = @json_decode(Http::post($token_url, $args), true);
        return $result['code'] == 0 ? $result['data'] : '';
    }

    /**
     * 获取聊天链接
     */
    public function getUrl($data){
        if((int)$data['site_id'] == 14){
            $username = isset($data['name']) ? $data['name'] : '游客';
            $uid = isset($data['uid']) ? $data['uid'] : time() . Strings::randString(4,1);
            $url = 'http://113.52.133.29/index/index/chat?group=1&id=' . $uid . '&name=' . $username . '&avatar=/static/customer/images/avatar.jpeg';
        }else{
            $token = $this->getToken($data);
            $url = Config::get('app.chat.chat_url') . '?token=' . $token;
        }
        return $url;
    }
}
