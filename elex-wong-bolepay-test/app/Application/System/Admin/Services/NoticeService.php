<?php 
namespace App\Application\System\Admin\Services;

use App\Models\System\NoticeReceive;

class NoticeService extends EloquentService {
    public function lists($data = []) { 
        $this->listFormatBuilder = function(&$builder, &$data, &$attributes){ 
            
            $title = isset($data['title']) ? trim($data['title']) : '';
            if (!empty($title)) {
                $builder->where('title', 'like', "%{$title}%");
            } 
        };

        return parent::lists($data); 
    }

    public function delete($key, $data = []) {
        $this->deleteExtend = function(&$model, &$key, &$data) {
            NoticeReceive::where('notice_id', $key)->delete();
        };
        return parent::delete($key, $data);
    }
}