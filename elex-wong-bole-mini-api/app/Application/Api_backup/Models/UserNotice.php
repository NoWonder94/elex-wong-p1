<?php 
namespace App\Application\Site\Api\Models;

class UserNotice extends \App\Models\Site\UserNotice {
	protected $visible = ['title', 'content'];
}