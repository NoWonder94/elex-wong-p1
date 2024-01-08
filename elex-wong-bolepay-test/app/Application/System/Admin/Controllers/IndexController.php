<?php
namespace App\Application\System\Admin\Controllers;

use App\Application\System\Admin\Services\AdminService;
use App\Application\System\Admin\Services\StatisticService;
use App\Services\System\VerifyService;
use App\Utils\Helper;
use Endroid\QrCode\QrCode;
use PragmaRX\Google2FA\Google2FA;
use Request, Lang, Session;

class IndexController extends AuthController {
    public function index() {
        $this->share('statistic', StatisticService::instance()->info());
    	return $this->display();
    }

    public function charts() {
        $data = StatisticService::instance()->chart();
        return $this->successData($data);
    }

    public function repwd() {
    	return $this->display();
    }

    public function dopwd() {
        AdminService::instance()->changePwd($this->adminId , Request::get('old_pwd'), Request::get('new_pwd'));
        $this->createLog();
        $this->setAdminAuth(null);
        return $this->success(Lang::get('root::common.update_success'), Helper::url("Public/login"));
    }

    public function sendMailVerifyCode() {
        VerifyService::instance()->create($this->adminId, $this->admin['email'], Request::get('action'));
        return $this->success();
    }

    public function google() {
        if (!empty($this->admin['secret'])) {
            $this->throwException('admin.google_use_bind');
        }

        $ga = new Google2FA();
        $session_key = 'google2fa_'.$this->admin['name'];
        $secret = Session::get($session_key);
        if (!$secret) {
            $secret = $ga->generateSecretKey();
            Session::put($session_key, $secret);
        }
        $url = $ga->getQRCodeUrl(Lang::get('common.site_name') . ' ' . $this->admin['name'], $this->admin['email'], $secret);

        $qrcode = new QrCode($url);
        $qrcode->setSize(200);
        $qrcode->setMargin(5);

        $this->share('qrcode', base64_encode($qrcode->writeString()));
        return $this->display();
    }

    public function dogoogle() {
        $secret = Session::get('google2fa_'.$this->admin['name']);
        $ga = new Google2FA();
        $check_result = $ga->verifyKey($secret, Request::get('code'), 2);
        if ($check_result) {
            AdminService::instance()->updateSecret($this->admin['id'], $secret);

            $this->admin['secret'] = $secret;
            Session::put('admin_auth', $this->admin);
            Session::save();

            return $this->success(Lang::get('common.update_secret_success'), Helper::url("Index/index"));
        } else {
            return $this->success(Lang::get('common.update_secret_error'));
        }
    }
}