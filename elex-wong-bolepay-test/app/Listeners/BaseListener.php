<?php
namespace App\Listeners;
  

class BaseListener {

    protected $event;
 
    public function subscribe($events) { 
        $events->listen($this->event,  get_class($this).'@handle');
    }
}
