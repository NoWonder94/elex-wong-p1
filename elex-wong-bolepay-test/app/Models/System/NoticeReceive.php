<?php 
namespace App\Models\System;

class NoticeReceive extends ElasticSearch {
    public function notice() {
        return $this->hasOne(Notice::class, 'id', 'notice_id');
    }
}