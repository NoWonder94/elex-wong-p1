<?php 
namespace App\Application\Proxy\Services;

use App\Models\Site\Article;
use DB, Time;

class ArticleService extends EloquentService {

    public function getBulletins() { 
        return Article::where('status', 1)->orderBy('id', 'DESC')->get()->toArray();
    } 
}