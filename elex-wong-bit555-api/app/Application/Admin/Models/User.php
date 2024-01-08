<?php

namespace App\Application\Admin\Models;

class User extends \App\Models\User {
    protected $hidden = ['pwd'];
}