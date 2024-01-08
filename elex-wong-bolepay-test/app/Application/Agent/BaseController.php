<?php
namespace App\Application\Agent;

use App\Models\Builders\AgentBuilder;

trait BaseController {

    protected $agent;

    public function setAgent($agent) {
        $this->agent = $agent;
        define('APP_CURRENT_AGENT_ID', $agent->id);
        define('APP_CURRENT_AGENT_NAME', $agent->name);
        define('APP_CURRENT_AGENT_TYPE', $agent->type);
    }
}
