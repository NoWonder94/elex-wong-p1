<?php 
namespace App\Application\Site\Api\Services; 

use App\Models\Site\Proxy;
use App\Models\Site\ProxyLevel;
use Strings;
class ProxyService extends BaseService { 

    /**
     * 代理会员注册
     * @param  User $user    会员对像 
     * @return             
     */
    public function save($user) { 
        $proxy_level = ProxyLevel::where('status', 1)->orderBy('commission_rate', 'ASC')->first();
        if (empty($proxy_level)) {
            $this->throwException('no proxy level');
        }
        $proxy = Proxy::where('name', $user->name)->first();
        if (!empty($proxy)) {
            $this->throwException('proxy existed');
        }
        $proxy = new Proxy();
        $proxy->site_id = $user->site_id;
        $proxy->name = $user->name;
        do{
            $code = Strings::randString(6);
        } while(Proxy::where('proxy_code', $code)->first());
        $proxy->proxy_code = $code;
        $proxy->level_id = $proxy_level->id;
        $proxy->user_id = $user->id;
        $proxy->create_time = UTC_TIME;
        $proxy->create_date = UTC_DAY;
        $proxy->status = 2;
        $proxy->save();   
    }

}
