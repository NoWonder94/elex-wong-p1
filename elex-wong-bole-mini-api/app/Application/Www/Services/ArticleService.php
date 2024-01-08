<?php 
namespace App\Application\Www\Services;

use App\Models\Site\Article;
use DB, Time;

class ArticleService extends EloquentService {

    public function lists($data = []) {
        $this->listFormatBuilder = function(&$builder, &$data, &$attributes) {
            $title = isset($data['title']) ? trim($data['title']) : '';
            if (!empty($title)) {
                $builder->where('title', 'like', "%{$title}%");
            } 
        };
        return parent::lists($data);
    }

    public function save($data, $type) {
    	$that = $this;
        $this->saveFormatData = function(&$model, &$data, &$attributes) use ($type, $that) {
            if ($type == 'update') { 
                $data['modifier'] = APP_CURRENT_ADMIN_NAME;
                $data['modify_time'] = UTC_TIME;
            } else { 
            	$data['creator'] = APP_CURRENT_ADMIN_NAME;
                $data['create_time'] = UTC_TIME;
            } 
        };
        return parent::save($data, $type);
    } 
}