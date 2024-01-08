<?php

namespace App\Application\Proxy\Controllers;

use App\Application\Proxy\Services\ArticleService;
use Lang, Request, Http, Session, Helper;

class IndexController extends AuthController {
    public function index() {
        $bulletins = ArticleService::instance()->getBulletins();
        $this->share('bulletins', $bulletins);

        $proxy = Session::get('proxy_auth');
        $promoLink = Helper::url('Public/promo', ['code'=>$proxy['proxy_code']]);
        $link = Session::get('link');
        if (empty($link)) {
        	$link = json_decode(Http::get('http://suo.im/api.php?format=json&url='.$promoLink), 1);
            if (empty($link)) {
                $link = $promoLink;
            } else {
                $link = $link['url'];
            }  
        	Session::put('link', $link);
        	Session::save();
        }


        $this->share('link', $promoLink);
    	return $this->display();
    }
}
