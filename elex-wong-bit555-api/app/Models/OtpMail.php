<?php

namespace App\Models;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OtpMail extends Mailable {
    use Queueable, SerializesModels;

    public $email;
    public $code;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($email, $code) {
        $this->email    = $email;
        $this->code     = $code;
    }

    /**
     * Build the message.
     * from: sender email
     * view: email template
     * @return $this
     */
    public function build() {
        return $this->from('noreply@bit555.com', 'Bit555.io')->subject('🔑 Secure code for Bit555.io')->view('emails.mail');
    }
}