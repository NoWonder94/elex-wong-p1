<?php
	namespace App\Http\Controllers\Api;
	use App\Exceptions\Response\Service\ServiceException;
    use App\Exceptions\Response\Service\ServiceCode;
    use Config;

	class BaseController extends Controller {
		public function checkImgFormat($img) {
            if (!preg_match('/^data:image\/(\w+);base64,/', $img)) {
                throw new ServiceException(ServiceCode::ERROR_IMG_FORMAT);
            }
        }

        public function checkFileFormat($file) {
            $array = explode('.', $file->getClientOriginalName());
            $fileFormat = array_pop($array);

            if (!in_array($fileFormat, Config::get('app.file_format'))) {
                throw new ServiceException(ServiceCode::ERROR_FILE_FORMAT);
            }
        }
	}
?>