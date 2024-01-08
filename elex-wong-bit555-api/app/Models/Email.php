<?php

namespace App\Models;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Email extends Mailable {
    use Queueable, SerializesModels;

    public $email;
    public $url;
    public $template;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($email, $url, $template = 'news') {
        $this->email    = $email;
        $this->url      = $url;
        $this->template = 'emails.' . $template;
    }

    /**
     * Build the message.
     * from: sender email
     * view: email template
     * @return $this
     */
    public function build() {
        return $this->from('noreply@bit555.com', 'Bit555.io')->subject('🔑 Bit555.io')->view($this->template);
    }
}