<?php
namespace App\Application\Agent\Admin\Controllers;

use PragmaRX\Google2FA\Google2FA;
use Endroid\QrCode\QrCode;
use Session, Lang, Request, Helper, Config;

class AgentController  extends EloquentController {

    public function index() {
        $this->share('data', $this->agent);
        return $this->display();
    }

    public function edit() {
        $this->share('data', $this->agent);
        return $this->display();
    }

    public function update() {
        $this->checkGoogleAndEmail('agentupdate');

        $result = $this->authUpdate();
        if (!empty(Request::get('pwd'))) {
            Session::flush();
            return $this->success(Lang::get('common.update_success'), Helper::url("Public/login"));
        }
        return $result;
    }

    public function google() {
        if (!empty($this->agent->secret)) {
            $this->throwException('admin.google_use_bind');
        }

        $ga = new Google2FA();
        $session_key = 'google2fa_'.$this->agent->name;
        $secret = Session::get($session_key);
        if (!$secret) {
            $secret = $ga->generateSecretKey();
            Session::put($session_key, $secret);
        }
        $url = $ga->getQRCodeUrl(Lang::get('common.site_name_' . $this->agent->type) . ' ' . $this->agent->name, $this->agent->email, $secret);

        $qrcode = new QrCode($url);
        $qrcode->setSize(200);
        $qrcode->setMargin(5);

        $this->share('qrcode', base64_encode($qrcode->writeString()));
        return $this->display();
    }

    public function dogoogle() {
        $secret = Session::get('google2fa_'.$this->agent->name);
        $ga = new Google2FA();
        $check_result = $ga->verifyKey($secret, Request::get('code'), 2);
        if ($check_result) {
            $this->getService()->updateSecret($this->agent->id, $secret);
            return $this->success(Lang::get('common.update_secret_success'), Helper::url("Index/index"));
        } else {
            return $this->success(Lang::get('common.update_secret_error'));
        }
    }

    public function whitelist() {
        $this->share('data', $this->agent);
        return $this->display();
    }

    public function dowhitelist() {
        $this->checkGoogleAndEmail('agentwhitelist');

        $this->getService()->updateIps(Request::all());
        return $this->success(Lang::get('common.update_success'));
    }

    public function appinfo() {
        $this->checkGoogleAndEmail('appinfo');
        return $this->successData(['app_id' => $this->agent->app_id, 'app_secret' => $this->agent->app_secret, 'callback_server_ip'  => Config::get('app.callback_server_ip')]);
    }
}