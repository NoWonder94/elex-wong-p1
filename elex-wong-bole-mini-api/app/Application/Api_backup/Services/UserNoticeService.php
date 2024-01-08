<?php 
namespace App\Application\Site\Api\Services;

use App\Application\Site\Api\Models\UserNoticeReceive; 
use App\Application\Site\Api\Models\UserNotice; 
use App\Models\Site\UserNoticeUserGroup; 
use App\Models\Site\UserNoticeUserYes; 
use App\Models\Site\UserNoticeUserNo;

/**
 * 会员消息服务类
 */
class UserNoticeService extends BaseService { 

	public static function readUserNotice(int $userId, string $ids){
		$ids = explode(',', $ids);
		UserNoticeReceive::where('user_id', $userId)
				    ->whereIn('id', $ids)
				    ->update([
						'status' => 0
					]); 	
	}

	public static function removeUserNotice(int $userId, string $ids){
		$ids = explode(',', $ids);
		UserNoticeReceive::where('user_id', $userId)
				    ->whereIn('id', $ids)
				    ->update([
						'is_show' => 0,
						'status' => 0
					]); 
	}

    public static function receiveNotice($user){
        $user_notices = UserNotice::where('end_time', '>=', UTC_TIME)
                                  ->whereRaw("FIND_IN_SET({$user->site_id}, site_ids)")
                                  ->where('status', 1)
                                  ->get();

        foreach ($user_notices as $notice) {
            $is_send = false;
            $user_notice_receive = UserNoticeReceive::where('user_notice_id', $notice->id)
                                                    ->where('user_id', $user->id)
                                                    ->first();
            if($user_notice_receive){
                continue;
            }
            $in_user_no = UserNoticeUserNo::where('user_notice_id', $notice->id)
                                          ->where('user_id', $user->id)
                                          ->first();
            //不在发送列表
            if($in_user_no){
                continue;
            }

            //在会员组中去搜索
            $in_user_group = UserNoticeUserGroup::where('user_notice_id', $notice->id)
                                                ->where('user_group_id', $user->user_group_id)
                                                ->first(); 
            if($in_user_group){
                $is_send = true;
            } else {
                $in_user_yes = UserNoticeUserYes::where('user_notice_id', $notice->id)
                                                ->where('user_id', $user->id)
                                                ->first();
                if($in_user_yes){
                    $is_send = true;
                }
            }

            if($is_send){ 
                $userNoticeReceive = new UserNoticeReceive();
                $userNoticeReceive->user_id         = $user->id;
                $userNoticeReceive->user_notice_id  = $notice->id;
                $userNoticeReceive->receiver_time   = UTC_TIME;
                $userNoticeReceive->status          = 1;
                $userNoticeReceive->is_show         = 1;
                $userNoticeReceive->save();
            }
        }

        return UserNoticeReceive::where('user_id', $user->id) 
                                ->where('status', 1)
                                ->count(); 
    }

    /**
     * [lists 会员消息列表]
     * @param  [int] $userId    [会员编号]
     * @param  [int] $page      [页码]
     * @param  [int] $pageSize  [数量]
     * @return [array]         [返回数组]
     */
    public static function lists($userId, $page, $pageSize = 20){
    	$list = UserNoticeReceive::where('user_id', $userId)
                        ->with('notice') 
                        ->where('is_show', 1);

        $count = $list->count();

        $offset = max(0, $page - 1) * $pageSize;
        $list = $list->offset($offset)
                     ->limit($pageSize)
					 ->orderBy('id', 'DESC')
                     ->get();

        return ['lists'=>$list, 'count'=>$count]; 
    }
 
}
