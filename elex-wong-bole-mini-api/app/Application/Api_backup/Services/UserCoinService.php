<?php 
namespace App\Application\Site\Api\Services;

use App\Application\Site\Api\Models\UserCoin;
use App\Application\Site\Api\Models\Goods;
use App\Services\Site\UserCoinService as BaseUserCoinService;
use Helper, Time;

class UserCoinService extends BaseUserCoinService {


    public function goods(int $page, $pageSize = 20) {
        $list = Goods::where('status', 1);

        $count = $list->count();

        $offset = max(0, $page - 1) * $pageSize;
        $list = $list->offset($offset)
                     ->limit($pageSize)
                     ->orderBy('sort', 'ASC')
                     ->orderBy('id', 'DESC')
                     ->get();

        return ['lists'=>$list, 'count'=>$count]; 
    }

    public function exchange($user, int $goodsId, string $mobile, string $remark) {
        /*if(empty($mobile)) {
            $this->throwException('common.coin.mobile_required');
        }*/

        $goods = Goods::where('id', $goodsId)->where('status', 1)->first(); 
        if (!$goods) {
            $this->throwException('common.goods.not_exist');
        }

        //判断会员金币是否充足
        if(bccomp($goods->amount, $user->coin) > 0) {
            $this->throwException('common.coin_error');
        }

        $data = [
            'goods_id'   => $goods->id,
            'goods_name' => $goods->name,
            'type'       => 2,
            'mobile'     => $mobile,
            'remark'     => $remark
        ];
        $this->create($user, -$goods->amount, $data);
    }

    public function lists(int $userId, string $beginTime, string $endTime, int $type, int $page = 1, int $pageSize = 20) {
        $list = UserCoin::where('user_id', $userId)->orderBy('create_time', 'DESC');

        $beginTime = Time::toTime($beginTime);
        $endTime   = Time::toTime($endTime);

        if ($beginTime > 0) {
            $list->where('create_time', '>=', $beginTime);
        }

        if ($endTime > 0) {
            $list->where('create_time', '<', $endTime + 86400);
        }

        if ($type > 0) {
            $list->where('type', $type - 1);
        }

        $max_count = 10000;
        $count = $list->count();
        
        if ($count > $max_count) {
            $count = $max_count;
        }

        $page = max(0, $page - 1);
        $offset = $page * $pageSize;
        if ($offset + $pageSize > $max_count) {
            $offset = $max_count - $pageSize;
        }

        $list = $list->offset($offset)->limit($pageSize)->get();
        return ['count' => $count, 'list' => $list];
    }
}