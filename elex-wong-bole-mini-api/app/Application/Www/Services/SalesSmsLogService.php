<?php 
namespace App\Application\Www\Services;

use App\Models\Site\SmsLog;

class SalesSmsLogService extends SmsLogService {
	protected $type = 1;
	protected $model = SmsLog::class;
}