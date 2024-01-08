<?php

namespace App\Models;

class SystemEmailTask extends Base {
    protected $table = 'system_email_task';

    public static function findById($id) {
        return SystemEmailTask::where('id', $id)->get()->first();
    }
}