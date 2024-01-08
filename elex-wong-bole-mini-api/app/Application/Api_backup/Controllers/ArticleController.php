<?php
namespace App\Application\Site\Api\Controllers;

use App\Application\Site\Api\Services\ArticleService;
use Request;

class ArticleController extends BaseController {
    public function cates() {
		$result = ArticleService::instance()->cates((int)Request::get('id'));
		$this->success($result);
	} 
	
	public function lists() {
		$result = ArticleService::instance()->lists((int)Request::get('cate_id'));
		$this->success($result);
	}

    public function get() {
		$result = ArticleService::instance()->get((int)Request::get('id'), trim(Request::get('code')));
		$this->success($result);
	}

	public function preferentials() {
		$result = ArticleService::instance()->preferentials();
		$this->success($result);
	}
}