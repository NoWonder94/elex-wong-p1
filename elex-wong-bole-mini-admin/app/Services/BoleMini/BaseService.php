<?php
	namespace App\Services\BoleMini;
	use Illuminate\Support\Facades\Storage;

	class BaseService {
		public function saveImg($img, $path) {
            $imgName = time().'.png';
            Storage::disk($path)->put($imgName, base64_decode(substr($img, strpos($img, ',') + 1)));

            return $imgName;
        }

        public function saveFile($file, $path) {
        	if (isset($file) && !empty($file)) {
            	$fileName = $file->getClientOriginalName();
            	Storage::disk($path)->put($fileName, file_get_contents($file));

            	return $fileName;
            }

            return null;
        }

        public function getFileFormat($file) {
            $array = explode('.', $file->getClientOriginalName());
            $fileFormat = array_pop($array);
            
            return $fileFormat;
        }
	}
?>