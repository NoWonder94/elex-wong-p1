<?php

namespace App\Application\Admin\Controllers;

use App\Services\DataApi\UserService;
use View, Request,Response;

class UserController extends AuthController {
    
    public function index() {
    	return $this->display();
    }

    public function info() {
        $data =  (new UserService())->getByUserId($this->userId);
        View::share('data', $data['data']);
    	return $this->display();
    }

    public function updateFile(){
        $file = Request::file('file');
        $status = [
            'status_code'=> -1,
            'message' => "file does not exist"
        ];
       if($file){
            if (!in_array($file->guessClientExtension(), ["pdf", "doc", "docx"])) {
                $status ['message'] = "The resume must be a file of type: pdf, doc, docx.";
                return Response::json($status);
            }
           $datas = [
               'resume' => fopen($file->getRealPath(), 'r')
           ];
           $result = (new UserService())->updateFile($this->userId, $datas);
           return Response::json($result);

       }else{
           return Response::json($status);
       }
    }
}