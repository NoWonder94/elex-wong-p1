<?php

namespace App\Application\Admin\Controllers;

use App\Services\DataApi\SearchService;
use App\Services\DataApi\CompanyService;
use App\Services\DataApi\RecruiterService;
use View,Request,Http,Response;
class SearchController extends BaseController {


    public function index() {
        $data =  (new SearchService())->JobList();
        if($data['message'] == "OK"){
            View::share('joblist', $data['data']);
        }
    	return $this->display();
    }
    public function detail() {
        $id = Request::get('id');
        $data =  (new SearchService())->jobCompaniesById($id);
        if($data['message'] == "OK")
        {
            $company = (new CompanyService())->getById($data['data']['company_id']);
            $recruiter = (new RecruiterService())->getById($data['data']['recruiter_id']);
            View::share('company', $company['data']);
            View::share('recruiter', $recruiter['data']);
            View::share('data', $data['data']);
        }

        return $this->display();
    }
    public function map() {
        $args = Request::all();
        $url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=1000&type=restaurant&key=AIzaSyAR87VWzFuZdb_jWWVjnOH2ZWAZNo4A0Z8&location='.$args['location'].'&keyword='.$args['keyword'];
        $response = Http::get($url);
        $response = json_decode($response,true);
        if($response['status'] == "OK"){
            $results =  $response['results'];
            return Response::json($results);
        }
        return null;
    }

}