<?php
	namespace App\Services\BoleMini;
	use Illuminate\Support\Facades\Storage;

	class MediaService extends BaseService {
		private $saveLocation = 'upload_game_screenshot_location';

		public function uploadImg($name, $img) {
			//$imgName = time() . '_' . rand(0, 10000) . '.png';
			Storage::disk($this->saveLocation)->put($name, base64_decode(substr($img, strpos($img, ',') + 1)));

			return true;
		}
	}
?>