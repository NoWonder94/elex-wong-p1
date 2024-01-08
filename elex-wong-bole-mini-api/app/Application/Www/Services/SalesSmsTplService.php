<?php 
namespace App\Application\Www\Services;

use App\Application\Www\Models\SmsTpl;

class SalesSmsTplService extends SmsTplService {
	protected $type = 1;
	protected $model = SmsTpl::class;
}