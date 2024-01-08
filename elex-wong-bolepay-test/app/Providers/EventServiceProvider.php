<?php

namespace App\Providers;

use Laravel\Lumen\Providers\EventServiceProvider as ServiceProvider;
use Event;

class EventServiceProvider extends ServiceProvider { 

    protected $subscribe = [
        
    ];

    public function register() {
        parent::register();

        $path = APP_SITE_PATH . 'app/Listeners'; 
        $directory = dir($path);
        while($entry = $directory->read()){
            if($entry != '.' && $entry != '..' && strpos($entry, '.php') != false){
                $entry = str_replace('.php', '', $entry);
                $class_name = 'App\Listeners\\' . $entry;
                Event::subscribe($class_name);
            }
        }
        $directory->close();
        
        $path = APP_NAMESPACE_PATH . 'Listeners';
        if (file_exists($path)) {
            $directory = dir($path);
            while($entry = $directory->read()){
                if($entry != '.' && $entry != '..' && strpos($entry, '.php') != false){
                    $entry = str_replace('.php', '', $entry);
                    $class_name = 'App\Application\\' . APP_CURRENT_NAMESPACE . '\Listeners\\' . $entry;
                    Event::subscribe($class_name);
                }
            }
            $directory->close();
        }
    }
}
