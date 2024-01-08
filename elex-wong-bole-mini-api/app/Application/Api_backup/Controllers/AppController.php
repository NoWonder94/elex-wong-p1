<?php
namespace App\Application\Site\Api\Controllers;

use App\Models\UserGameBet;

use App\Models\Remote\User as RemoteUser;
use App\Models\Remote\UserLoginHistory as UserLoginHistory;
use App\Models\Remote\GamePlatform as RemoteGamePlatform;
use App\Models\Remote\Game as RemoteGame;

use App\Models\Site\User;
use App\Models\Site\LoginHistory;
use App\Models\Site\Game;

use App\Models\System\Game as SystemGame;
use App\Models\System\GamePlatform;

use App\Application\Site\Api\Services\ChatService;
use Request, Helper, BigDB, DB, Time,Session;

class AppController extends BaseController { 

    protected function checkToken() {
        return true;
    }
    
    public function token() {
        $sid = Request::get('sid');
        if (empty($sid) || strlen($sid) != 32) {
            exit;
        }

        $client = Request::get('client');
        if (empty($client) || !in_array($client, ['pc', 'wap', 'app'])) {
            exit;
        }
        
        $ip  = Request::get('ip');
        if (empty($ip) || ip2long($ip) == 0) {
            exit;
        }
        
        $host      = trim(Request::get('host'));
        $source    = trim(Request::get('source'));
        $viewfrom  = trim(Request::get('viewfrom'));
        $pushtoken = trim(Request::get('pushtoken'));

        $data = [
            'rand'   => mt_rand(),
            'ip'     => $ip,
            'uid'    => 0,
            'sid'    => $sid,
            'view'   => $viewfrom,
            'push'   => $pushtoken,
            'host'   => $host,
            'source' => $source,
            'client' => $client,
            'time'   => UTC_TIME
        ];
        echo Helper::encryptData($data);
    }

    public function test() {
        var_dump($_SERVER);
        exit;

        var_dump(Helper::decryptData('OXR1RVRIbzNZRDkrL2dZajN5ZTVYcFJrbVZ2TSthK0h3WUJkcm1GcENNdVlZMEFWWmI4UFpKTklIcC9FSVo4TEd0ZWxET3U2YmgwN0xMKzV5TDZCL0xFZzIrR3dvTkw2T2dMSndINWV5bHdlWmZGQ0FUNXE3WWx3ZFU1bVNxU3dNSWdlR1JQcUlJT2Y2Y3o4QjZpL25XZ2Q2UU1nL0xXeTAyTXdFdndBUmFMR2tPU0ZVcXlzOXByTzMrZXI0YVdNQ240S3FDeGQyZm9OM29tbW42OXBrYnpmR2sxT0U1anVROTJtdTFUYnR6Y0svSGRtU093ZHZTcnA2MWJSblZPUg%3D%3D'));
        exit;


        echo Time::getTimelag(1934690, "i_iL_s_sL_");
        exit;
        
        var_dump(\App\Services\System\IpRegionService::instance()->getRegionByIp('103.13.134.138'));
        exit;
        echo \App\Services\Site\UserGameService::instance()->updateIntegral(555, 'Netent', -50, true);
    }

    public function els() {
        set_time_limit(0);
        $index = (int)Request::get('index');
        $num   = 10000;
        $list  = UserGameBet::orderBy('id', 'ASC')->skip($index * $num)->take($num)->get();
        $params = ['body' => []];
        foreach ($list as $item) {
            $params['body'][] = [
                'index' => [
                    '_index' => 't9bet_site_user_game_bet',
                    '_type'  => '_doc',
                    '_id'    => $item->id
                ]
            ];

            $params['body'][] = [
                'bet_sn' => $item->bet_sn,
                'game_platform_code' => 'EGame',
                'user_id' => 17,
                'user_name' => 'test05281',
                'game_id' => $item->game_id,
                'game_name' => $item->game_name,
                'balance' => $item->balance,
                'bets' => $item->bets,
                'winning' => $item->winning,
                'exchange_ratio' => $item->exchange_ratio,
                'integral' => $item->integral,
                'create_time' => $item->create_time,
                'create_date' => $item->create_date,
                'create_hour' => $item->create_hour,
                'is_send_integral' => 1,
                'data' => $item->data
            ];
        }

        if (count($list) > 0) {
            $client = BigDB::getClient();
            // $client->bulk($params); 
        }

        if (count($list) < $num) {
            die('OK');
        }

        $index++;
        echo '<script>
            setTimeout(function(){
                location.href = "http://api.gameopen.net/App/els?index='.$index.'";
            }, 100);
        </script>';
    }

    public function testChatUrl(){
        $args = [
            'sid' => 'c11a678785091b7f1334c24a4123ee77',
            'ip' => CLIENT_IP,
            'site_id' => 1
        ];
        $url = ChatService::instance()->getUrl($args);
        echo $url;
    }

}