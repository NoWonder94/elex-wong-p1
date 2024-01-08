<?php 
namespace App\Application\Site\Api\Services;

use App\Models\Site\LoginHistory;
use App\Models\Site\UserStatistic;
use App\Models\Site\UserDeposit;
use App\Services\System\IpRegionService;
use SiteSetting, Time;

class LoginHistoryService extends BaseService {

    public function login($user, string $userAgent, string $client) {
        $this->logout($user);

        //获取地理位置信息
        $ip_result = IpRegionService::instance()->getRegionByIp(CLIENT_IP);
        $userStatistic = UserStatistic::find($user->id);

        if (empty($userStatistic)) { 
            $user_statistic_data = [
                'user_id' => $user->id, 
                'site_id' => $user->site_id,
                'proxy_id' => $user->proxy_id,
            ];
            //创建会员统计数据
            UserStatistic::create($user_statistic_data);
            $userStatistic = UserStatistic::find($user->id);
        }

        $loginHistory = new LoginHistory();
        $loginHistory->site_id             = $user->site_id;
        $loginHistory->user_id             = $user->id;
        $loginHistory->user_name           = $user->name;
        $loginHistory->login_time          = UTC_TIME;
        $loginHistory->login_date          = UTC_DAY;
        $loginHistory->login_ip            = CLIENT_IP; 
        $loginHistory->login_country       = $ip_result['country']; 
        $loginHistory->login_province      = $ip_result['province']; 
        $loginHistory->login_city          = $ip_result['city']; 
        $loginHistory->login_user_agent    = $userAgent;
        $loginHistory->login_total_bet     = $userStatistic->bets;
        $loginHistory->logout_time         = 0;
        $loginHistory->logout_total_bet    = 0;
        $loginHistory->is_game             = 0;
        $loginHistory->is_deposit          = 0;
        $loginHistory->view                = $client;
        $loginHistory->is_app_login        = $client == 'app' ? 1 : 0;
        $loginHistory->save();

        return $loginHistory;
    }

    public function logout($user) {
        $loginHistory = LoginHistory::where('user_id', $user->id)
                                  ->orderBy('login_time', 'desc')
                                  ->first();
                                  
        if($loginHistory && (int)$loginHistory->logout_time <= 0){
            $userStatistic = UserStatistic::find($user->id);

            $loginHistory->logout_time      = UTC_TIME;
            $loginHistory->logout_total_bet = $userStatistic->bets;
            $loginHistory->is_game          = $loginHistory->logout_total_bet > $loginHistory->login_total_bet ? 1 : 0;
            $loginHistory->is_deposit       = UserDeposit::where('user_id', $user->id)
                                                         ->where('create_time', '>=', $loginHistory->login_time)
                                                         ->where('create_time', '<=', $loginHistory->logout_time)
                                                         ->where('status', 1)
                                                         ->count() > 0 ? 1 : 0;

            
            $loginHistory->save();
        } 
    }
}
