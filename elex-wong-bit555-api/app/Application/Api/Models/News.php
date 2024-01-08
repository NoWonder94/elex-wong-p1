<?php

namespace App\Application\Api\Models;

class News extends \App\Models\News {
    public static function findById($id) {
        return News::where('id', $id)->where('status', '=', 1)->get()->first();
    }
}

?>
