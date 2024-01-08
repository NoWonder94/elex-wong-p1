<?php

namespace App\Application\Api\Models;

class Event extends \App\Models\Event {
    public static function findById($id) {
        return Event::where('id', $id)->where('status', '=', 1)->get()->first();
    }
}
?>
