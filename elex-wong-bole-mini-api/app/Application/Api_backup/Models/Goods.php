<?php 
namespace App\Application\Site\Api\Models;

class Goods extends \App\Models\Site\Goods {
	protected $visible = ['id', 'name', 'describe', 'image', 'amount', 'worth'];
}