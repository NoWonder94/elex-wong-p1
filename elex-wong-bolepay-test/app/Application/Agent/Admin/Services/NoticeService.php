<?php
namespace App\Application\Agent\Admin\Services;

use App\Models\System\Notice;
use App\Models\System\NoticeReceive;

class NoticeService extends EloquentService {
    protected $model = NoticeReceive::class;

    public function readNotice(string $ids){
        $ids = explode(',', $ids);
        NoticeReceive::where('agent_id', APP_CURRENT_AGENT_ID)
                    ->whereIn('id', $ids)
                    ->update([
                        'is_read' => 1
                    ]);
    }

    public function removeNotice(string $ids){
        $ids = explode(',', $ids);
        NoticeReceive::where('agent_id', APP_CURRENT_AGENT_ID)
                    ->whereIn('id', $ids)
                    ->update([
                        'is_show' => 0,
                        'is_read' => 1
                    ]);
    }

    public function receiveNotice(){
        $notices = Notice::where(function($query) {
                            $query->where('end_time', '0')
                            ->orWhere('end_time', '>=', UTC_TIME);
                        })
                        ->whereIn('receive_type', [1, APP_CURRENT_AGENT_TYPE + 1])
                        ->where('status', 1)
                        ->get();

        foreach ($notices as $notice) {
            $notice_receive = NoticeReceive::where('notice_id', $notice->id)
                ->where('agent_id', APP_CURRENT_AGENT_ID)
                ->first();
            if($notice_receive){
                continue;
            }

            if (APP_CURRENT_AGENT_TYPE == 1) {
                if (!empty($notice->proxy_no)) {
                    //禁止接收
                    if (in_array(APP_CURRENT_AGENT_NAME, explode(',', $notice->proxy_no))) {
                        continue;
                    }
                }

                if (!empty($notice->proxy_yes)) {
                    //不在接收列表中
                    if (!in_array(APP_CURRENT_AGENT_NAME, explode(',', $notice->proxy_yes))) {
                        continue;
                    }
                }
            } else {
                if (!empty($notice->business_no)) {
                    //禁止接收
                    if (in_array(APP_CURRENT_AGENT_NAME, explode(',', $notice->business_no))) {
                        continue;
                    }
                }

                if (!empty($notice->business_yes)) {
                    //不在接收列表中
                    if (!in_array(APP_CURRENT_AGENT_NAME, explode(',', $notice->business_yes))) {
                        continue;
                    }
                }
            }

            $noticeReceive = new NoticeReceive();
            $noticeReceive->id            = $notice->id .'_'. APP_CURRENT_AGENT_ID;
            $noticeReceive->agent_id      = APP_CURRENT_AGENT_ID;
            $noticeReceive->notice_id     = $notice->id;
            $noticeReceive->receiver_time = UTC_TIME;
            $noticeReceive->is_read       = 0;
            $noticeReceive->is_show       = 1;
            $noticeReceive->save();
        }

        return NoticeReceive::where('agent_id', APP_CURRENT_AGENT_ID)->where('is_read', 0)->count();
    }

    public function lists($data = []) {
        $this->listFormatBuilder = function(&$builder, &$data, &$attributes) {
            $builder->with('notice')->where('agent_id', APP_CURRENT_AGENT_ID)->where('is_show', 1);
        };

        $this->listFormatOrder = function(&$builder, &$data, &$attributes) {
            $builder->orderBy('receiver_time', 'DESC');
        };

        return parent::lists($data);
    }
}