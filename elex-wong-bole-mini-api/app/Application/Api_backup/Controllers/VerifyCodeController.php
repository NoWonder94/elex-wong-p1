<?php
namespace App\Application\Site\Api\Controllers;

use App\Services\Site\VerifyCodeService;
use App\Application\Site\Api\Services\UserService;
use App\Application\Site\Api\Requests\VerifyCodeSendRequest;
use App\Utils\Verify;
use Request, Helper;

class VerifyCodeController extends BaseController {
    
    public function image() {
        $service = VerifyCodeService::instance();
        $type    = Request::get('type');

        if (!$service->checkType($type)) {
            $this->error(['common.request_args_error', 'type'], 'type');
        }

        $code = $service->create($this->userId, $this->token['sid'], '', VERIFY_CODE_SEND_TYPE_IMAGE, $type);
        $verify = new Verify();
        $verify->create($code);
        $code = $verify->getCode();

        ob_clean();
        ob_start();
        $verify->display(false);
        $image_data = ob_get_contents();
        ob_end_clean();

        $image_data = 'data:image/png;base64,'.base64_encode($image_data);
        $this->success($image_data);
    }

    public function send(VerifyCodeSendRequest $request) {
        $alisc  = Request::get('alisc');
        if (empty($alisc) || !Helper::validateAlisc($this->token['client'], $alisc)) {
            $this->error('common.user.alisc_required', 'alisc');
        }

        $result = UserService::instance()->sendVerifyCode($request->get('account'), $request->get('type'), $this->user);
        $this->success();
    }
}