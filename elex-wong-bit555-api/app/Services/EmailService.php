<?php

namespace App\Services;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Models\Email;
use App\Models\OtpMail;
use App\Models\User;

class EmailService extends BaseService {
    /*
    public function sendOTP($email, $code) {
        try {
            Mail::to($email)->send(new OtpMail($email, $code));

            return true;
        } catch (\Throwable $th) {
            $this->showError('Failed', 'Failed');
        }
    }
    */

    public function notify($email, $url) {
        try {
            Mail::to($email)->send(new Email($email, $url));

            return true;
        } catch (\Throwable $e) {
            die($e);
        }

        return false;
    }
}