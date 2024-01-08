<?php

namespace App\Application\Api\Controllers;
use App\Application\Api\Services\HomeService;
use Request;

class HomeController extends BaseController {
    public function getList() {
        $rules          = [
            'page'      => 'nullable|integer|min:1',
            'page_size' => 'nullable|integer|min:1'
        ];
        $this->validate($rules);

        $result = HomeService::instance()->getList(
            Request::post('page') ? Request::post('page') : DEFAULT_PAGE,
            Request::post('page_size') ? Request::post('page_size') : DEFAULT_PAGE_SIZE
        );

        $this->success($result);
    }

    public function getDetail() {
        $rules          = [
            'id'        => 'required|integer'
        ];
        $this->validate($rules);

        $result = HomeService::instance()->getDetail(
            Request::post('id')
        );

        $this->success($result);
    }
}

?>
