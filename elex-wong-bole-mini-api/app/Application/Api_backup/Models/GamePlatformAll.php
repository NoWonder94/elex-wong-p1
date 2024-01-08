<?php 
namespace App\Application\Site\Api\Models;

class GamePlatformAll extends GamePlatform {
	protected $table = 'game_platform';
    protected $visible = ['code', 'name', 'image', 'icon', 'transfer_status', 'type', 'down_url', 'is_mobile', 'status'];
}