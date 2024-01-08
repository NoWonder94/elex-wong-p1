<?php 
namespace App\Application\Proxy\Services;

use App\Models\Remote\UserGameBet; 
use Time, DB;

class UserGameBetService extends EloquentService { 
     
    public function lists($data = []) {   
		$this->model = new UserGameBet();

		$prefix =  $this->model->getConnection()->getTablePrefix();

        $this->listFormatBuilder = function(&$builder, &$data, &$attributes) use ($prefix) {

	        $tableName = $prefix . $this->model->getTable();  

	        $builder->leftJoin('user', function($join) {
	                    $join->on('user.id', '=', 'user_id');
	                 });

	        $builder->leftJoin('user_group', function($join) {
	                    $join->on('user.user_group_id', '=', 'user_group.id');
	                 });

	        $builder->where('user.proxy', APP_CURRENT_PROXY_NAME);   

	        $begin_time = isset($data['begin_time']) ? Time::toTime(trim($data['begin_time'])) : 0;

	        if ($begin_time > 0) {
	            $builder->where('create_time', '>=', $begin_time);
	        }

	        $end_time = isset($data['end_time']) ? Time::toTime(trim($data['end_time'])) : 0;
	        if ($end_time > 0) {
	            $builder->where('create_time', '<=', $end_time);
	        } 

	        if (isset($data['name'])) {
	        	$builder->where('user.name', $data['name']);
	        }

	        $builder->select(DB::raw("{$prefix}user.name,{$prefix}user.real_name,{$prefix}user_group.name as group_name, sum({$prefix}user_game_bet.bets) as bets_money,  sum({$prefix}user_game_bet.winning) as winning_money, (sum(sky_user_game_bet.bets) - sum(sky_user_game_bet.winning)) as profit_money")); 

	        $builder->groupBy('user_id');

	    };

        $this->listFormatPager = function(&$builder, &$data, &$attributes)  {    

	        return count($builder->get());
	    };
        return parent::lists($data);
    }
}