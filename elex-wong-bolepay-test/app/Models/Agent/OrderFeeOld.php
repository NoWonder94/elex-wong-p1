<?php 
namespace App\Models\Agent;

class OrderFeeOld extends MySqlElasticSearch {
    protected $table = 'agent_order_fee';

    protected $visible = ['agent_id', 'agent_name', 'agent_level', 'service_rate', 'service_fee', 'create_fee'];
}