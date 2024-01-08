<?php 
namespace App\Application\Admin\Services;

use App\Services\EloquentService as BaseEloquentService;

abstract class EloquentService extends BaseService {
	use BaseEloquentService;
}