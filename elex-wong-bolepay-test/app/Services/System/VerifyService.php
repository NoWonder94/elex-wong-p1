<?php 
namespace App\Services\System;

use PragmaRX\Google2FA\Google2FA;
use App\Models\System\Verify;
use App\Utils\MessageSend;
use Config;

class VerifyService extends \App\Services\BaseService {
    public function create(int $adminId, string $account, string $action, string $sendType = 'email', int $len = 6) {
        $verify = Verify::where('admin_id', $adminId)
            ->where('type', APP_HOST_TYPE)
            ->where('action', $action)
            ->where('send_type', $sendType)
            ->first();

        if (!$verify) {
            $verify = new Verify();
            $verify->admin_id    = $adminId;
            $verify->type        = APP_HOST_TYPE;
            $verify->action      = $action;
            $verify->send_type   = $sendType;
            $verify->expire_time = 0;
        }

        $verify->account = $account;
        $verify->code = $this->getCode($len);
        $verify->ip   = CLIENT_IP;

        if ($verify->expire_time > UTC_TIME) {
            $time = $verify->expire_time - UTC_TIME;
            $this->throwException(['common.verify_time_limit', $time], ['time' => $time]);
        }
        $verify->expire_time = UTC_TIME + Config::get('app.verify_code_limit_time');

        if ($sendType == 'email') {
            if (!MessageSend::mailVerify($account, $verify->code)) {
                $this->throwException('common.verify_send_error');
            }
        }

        $verify->create_time = UTC_TIME;
        $verify->save();
        return $verify->code;
    }

    public function checkGoogleAndEmail(int $adminId, string $action, string $account, string $code, string $googleSecret, string $googleCode) {
        if (IS_DEV_MODE) {
            return true;
        }

        $ga = new Google2FA();
        $check_result = $ga->verifyKey($googleSecret, $googleCode, 2);
        if (!$check_result) {
            $this->throwException('common.verify_google_error', 'google_code');
        }

        $this->check($adminId, $action, $account, $code, 'email', true);
        return true;
    }

    public function check(int $adminId, string $action, string $account, string $code, string $sendType = 'email', $isThrowException = true) {
        $verify = Verify::where('admin_id', $adminId)
            ->where('type', APP_HOST_TYPE)
            ->where('action', $action)
            ->where('send_type', $sendType)
            ->first();

        if (!$verify) {
            if ($isThrowException) {
                $this->throwException("common.verify_{$sendType}_error_0", $sendType . '_code');
            }
            return false;
        }

        $verify->delete();

        if (strtoupper($verify->code) != strtoupper($code)) {
            if ($isThrowException) {
                $this->throwException("common.verify_{$sendType}_error_1", $sendType . '_code');
            }
            return false;
        }

        if ($account != $verify->account) {
            if ($isThrowException) {
                $this->throwException("common.verify_{$sendType}_error_2", $sendType . '_code');
            }
            return false;
        }

        if (CLIENT_IP != $verify->ip) {
            if ($isThrowException) {
                $this->throwException("common.verify_{$sendType}_error_3", $sendType . '_code');
            }
            return false;
        }

        return true;
    }

    public function getCode($len) {
        $charset = '0123456789';
        $_len = strlen($charset) - 1;
        $code = '';
        for ($i = 0; $i < $len; $i++) {
            $code .= $charset[mt_rand(0, $_len)];
        }
        return $code;
    }
}