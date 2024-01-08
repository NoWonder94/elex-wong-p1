<?php

namespace App\Services;
use App\Services\EmailService;
use App\Models\SystemConfig;
use App\Models\SystemEmailTask;
use App\Models\Home;
use App\Models\News;
use App\Models\Event;
use App\Models\Crypto\Home as CryptoHome;
use App\Models\Crypto\News as CryptoNews;
use App\Models\Crypto\Guides;
use App\Models\Crypto\Exchanges;
use App\Models\Crypto\PriceTracker;
use App\Models\User;
use Config, Lang;

class SystemService extends BaseService {
	public function notifyAll($tableName = '', $tableId = 0) {
		if ($tableName != '' && $tableId > 0) {
			$systemEmailTask 				= new SystemEmailTask();
			$systemEmailTask->table_name 	= $tableName;
			$systemEmailTask->table_id 		= $tableId;
			$systemEmailTask->create_time 	= UTC_CURRENT_TIME;
			$systemEmailTask->is_notify 	= 0;
			$systemEmailTask->save();
		}

		$systemConfigEmailTaskId = SystemConfig::where('column', 'system_email_task_id')
							  		 		   ->get()
									 		   ->first();
		if (empty($systemConfigEmailTaskId)) {
			return false;
		}

		$systemEmailTaskList = SystemEmailTask::where('id', '>=', (int)$systemConfigEmailTaskId['value'])
											  ->where('is_notify', 0)
							 				  ->get()
							 				  ->toArray();
		if (!empty($systemEmailTaskList)) {
			foreach ($systemEmailTaskList as $key => $val) {
				if (!empty($val['table_name']) && (int)$val['table_id'] >= 0) {
					switch ($val['table_name']) {
						case 'home':
							$url 	= Config('site.blog_url');
							$detail = Home::findById($val['table_id']);
							break;
						case 'news':
							$url 	= Config('site.blog_url');
							$detail = News::findById($val['table_id']);
							break;
						case 'event':
							$url 	= Config('site.blog_url');
							$detail = Event::findById($val['table_id']);
							break;
						case 'crypto_home':
							$url 	= Config('site.crypto_url');
							$detail = CryptoHome::findById($val['table_id']);
							break;
						case 'crypto_news':
							$url 	= Config('site.crypto_url');
							$detail = CryptoNews::findById($val['table_id']);
							break;
						case 'crypto_guide':
							$url 	= Config('site.crypto_url');
							$detail = Guides::findById($val['table_id']);
							break;
						case 'crypto_exchange':
							$url 	= Config('site.crypto_url');
							$detail = Exchanges::findById($val['table_id']);
							break;
						case 'crypto_priceTracker':
							$url 	= Config('site.crypto_url');
							$detail = PriceTracker::findById($val['table_id']);
							break;
						default:
							$this->showError([], Lang::get('lang.90000'));
							break;
					}

					if (!empty($detail)) {
						$systemConfigEmailTaskUserId = SystemConfig::where('column', 'system_email_task_user_id')
							  						 			   ->get()
													 			   ->first();
						if ((int)$systemConfigEmailTaskUserId['value'] >= 0) {
							$userList = User::where('id', '>', (int)$systemConfigEmailTaskUserId['value'])
											->where('status', 1)
											->get()
											->toArray();
							if (!empty($userList)) {
								foreach ($userList as $userKey => $userVal) {
									if (!empty($userVal['email'])) {
										$result = EmailService::instance()->notify($userVal['email'], $url);
										if ($result) {
											$systemConfigEmailTaskId->value = $val['id'];
											$systemConfigEmailTaskId->save();

											$systemConfigEmailTaskUserId->value = $userVal['id'];
											$systemConfigEmailTaskUserId->save();
										} else {
											return false;
										}
									}
								}

								$systemEmailTask = SystemEmailTask::findById($val['id']);
								if (!empty($systemEmailTask)) {
									$systemConfigEmailTaskUserId->value = 0;
									$systemConfigEmailTaskUserId->save();

									$systemEmailTask->is_notify = 1;
									$systemEmailTask->save();
								}
							}
						}
					}
				}
			}
		}

		return true;
	}
}