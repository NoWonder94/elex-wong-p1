<?php 
namespace App\Application\Www\Services;

use App\Models\Site\CallLog;

class SalesCallLogService extends CallLogService {
	protected $type = 1;
	protected $model = CallLog::class;
}