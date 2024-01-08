<?php
namespace App\Http\Controllers\Web;

class IndexController extends Controller
{

    public function index()
    {
        return view('index');
    }
}