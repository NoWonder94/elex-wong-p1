<?php 
namespace App\Application\Site\Api\Models;

class UserGame extends \App\Models\Site\UserGame {
	protected $visible = ['game_platform_code', 'game_account'];
}