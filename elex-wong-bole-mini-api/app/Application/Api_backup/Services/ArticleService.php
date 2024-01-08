<?php 
namespace App\Application\Site\Api\Services;

use App\Application\Site\Api\Models\Article;
use App\Application\Site\Api\Models\ArticleCate;
use SiteCache;

class ArticleService extends BaseService {
    public function getSystemNotice() {
        $caches = SiteCache::get(CACHE_SYSTEM_NOTICE);
        if (!$caches) {
            $list = Article::select('id', 'site_ids', 'title', 'brief', 'content')
                        ->where('cate_id', ARTICLE_TYPE_SYSTEM_NOTICE)
                        ->where('status', 1)
                        ->orderBy('sort', 'asc')
                        ->orderBy('id', 'desc')
                        ->get();

            $caches = [];
            foreach ($list as $item) {
                foreach ($item->site_ids as $site_id) {
                    $caches[$site_id][] = $item;
                }
            }
            SiteCache::put(CACHE_SYSTEM_NOTICE, $caches, 5);
        }

        if (!isset($caches[APP_CURRENT_SITE_ID])) {
            return [];
        }
        return $caches[APP_CURRENT_SITE_ID];
    }
    
    public function cates(int $pid) {
        return ArticleCate::where('pid', $pid)
                          ->where('status', 1)
                          ->orderBy('sort', 'ASC')
                          ->orderBy('id', 'DESC')
                          ->get();
    }
    
    public function lists(int $cateId) {
        return Article::where('cate_id', $cateId)
                      ->whereRaw("FIND_IN_SET(" . APP_CURRENT_SITE_ID . ", site_ids)")
                      ->where('status', 1)
                      ->orderBy('sort', 'ASC')
                      ->orderBy('id', 'DESC')
                      ->get();
    }
    
    public function get(int $id, string $code) {
        $query = Article::where('status', 1)->whereRaw("FIND_IN_SET(" . APP_CURRENT_SITE_ID . ", site_ids)");
        if ($id > 0) {
            $query->where('id', $id);
        } elseif (!empty($code)) {
            $query->where('rewrite', $code);
        } else {
            $this->throwException('common.article.not_exist');
        }
        return $query->first();
    }
    
    public function preferentials() {
        return ArticleCate::with('lists')
                          ->where('pid', ARTICLE_TYPE_PREFERENTIAL)
                          ->whereRaw("FIND_IN_SET(" . APP_CURRENT_SITE_ID . ", site_ids)")
                          ->where('status', 1)
                          ->get();
    }
}