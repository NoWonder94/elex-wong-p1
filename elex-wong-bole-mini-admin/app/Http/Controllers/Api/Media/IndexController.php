<?php
    namespace App\Http\Controllers\Api\Media;
    use App\Http\Controllers\Api\BaseController;
    use App\Services\BoleMini\MediaService;
    use App\Exceptions\Response\Service\ServiceException;
    use App\Exceptions\Response\Service\ServiceCode;
    use Illuminate\Http\Request;
    use Cache;

    class IndexController extends BaseController {
        public function uploadImg(Request $request) {
            $this->validate($request, [

            ]);

            $name = $request->name;
            $img = $request->img;
            $this->checkImgFormat($img);

            $service = new MediaService();
            $result = $service->uploadImg($name, $img);

            return $this->response->setResponseData($result)->getResponse();
        }
    }
?>