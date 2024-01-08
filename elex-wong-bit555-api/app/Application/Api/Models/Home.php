<?php

namespace App\Application\Api\Models;

class Home extends \App\Models\Home {
	public static function findById($id) {
        return Home::where('id', $id)->where('status', '=', 1)->get()->first();
    }
}