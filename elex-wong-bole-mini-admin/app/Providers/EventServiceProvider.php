<?php
namespace App\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Database\Events\StatementPrepared;

class EventServiceProvider extends ServiceProvider
{

    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'App\Events\Event' => [
            'App\Listeners\EventListener'
        ],
        'App\Events\User\Auth\UpdateEvent' => [
            'App\Listeners\User\Auth\UpdateListener'
        ],
        'App\Events\Agency\Org\DestroyEvent' => [
            'App\Listeners\Agency\Org\DestroyListener'
        ],
        'App\Events\App\Game\Mahjong\ConfigUpdateEvent' => [
            'App\Listeners\App\Game\Mahjong\ConfigUpdateListener'
        ],
        'App\Events\App\Game\Mohjong\ConfigUpdateEvent' => [
            'App\Listeners\App\Game\Mohjong\ConfigUpdateListener'
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();
        
        // 修改 PDO Fetch Mode
        Event::listen(StatementPrepared::class, function ($event) {
            $event->statement->setFetchMode(\PDO::FETCH_ASSOC);
        });
    }
}
