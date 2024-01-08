<?php 
namespace App\Application\Proxy\Services;

use App\Models\Remote\User;
use App\Models\Remote\UserDeposit;
use App\Models\Remote\UserWithdraw;
use DB, Time;

class UserService extends EloquentService {
    public function lists($data = []) {
        $this->model = new User();
        $user_ids = User::where('proxy', APP_CURRENT_PROXY_NAME)->pluck('id')->toArray(); 
		if (count($user_ids) < 1) {
			return ['lists' => [], 'total_count' => 0];
		}
		
        $prefix =  $this->model->getConnection()->getTablePrefix();
        $begin_time = isset($data['begin_time']) ? Time::toTime(trim($data['begin_time'])) : 0;
        $deposit_begin_time_str = '';
        $withdraw_begin_time_str = '';
        if ($begin_time > 0) {
            $deposit_begin_time_str = "and {$prefix}user_deposit.create_time >= ". $begin_time;
            $withdraw_begin_time_str = "and {$prefix}user_withdraw.create_time >= ". $begin_time;
        }
        $deposit_end_time_str = '';
        $withdraw_end_time_str = '';
        $end_time = isset($data['end_time']) ? Time::toTime(trim($data['end_time'])) : 0;
        if ($end_time > 0) {
            $deposit_end_time_str = "and {$prefix}user_deposit.create_time <= ". $end_time;
            $withdraw_end_time_str = "and {$prefix}user_withdraw.create_time <= ". $end_time;
        }
        $reg_begin_time = isset($data['reg_begin_time']) ? Time::toTime(trim($data['reg_begin_time'])) : 0;
        $reg_begin_time_str = '';
        if($reg_begin_time > 0){
            $reg_begin_time_str = "and {$prefix}user.reg_time >= ". $reg_begin_time;
        }
        $reg_end_time = isset($data['reg_end_time']) ? Time::toTime(trim($data['reg_end_time'])) : 0;
        $reg_end_time_str = '';
        if($reg_end_time > 0){
            $reg_end_time_str = "and {$prefix}user.reg_time <= ". $reg_end_time;
        }
        $countsql = "SELECT count(id) as total_num FROM (
                SELECT
                    {$prefix}user.id,
                    {$prefix}user.name,
                    {$prefix}user.real_name, 
                    {$prefix}user.reg_source,
                    {$prefix}user.reg_time,
                    SUM({$prefix}user_deposit.money) as deposit_money,
                    0 as withdraw_money,
                    0 as bets_money
                FROM {$prefix}user
                LEFT JOIN {$prefix}user_deposit ON {$prefix}user.id = {$prefix}user_deposit.user_id  
                where {$prefix}user.id in (".implode(',', $user_ids).")
                and {$prefix}user_deposit.status = 1
                and {$prefix}user_deposit.deposit_mode <> 'site'
                {$deposit_begin_time_str} {$deposit_end_time_str} {$reg_begin_time_str} {$reg_end_time_str}
                GROUP BY {$prefix}user.id
                UNION
                SELECT
                    {$prefix}user.id,
                    {$prefix}user.name,
                    {$prefix}user.real_name, 
                    {$prefix}user.reg_source,
                    {$prefix}user.reg_time,
                    0 as deposit_money,
                    SUM({$prefix}user_withdraw.money) as withdraw_money,
                    0 as bets_money
                FROM {$prefix}user
                LEFT JOIN {$prefix}user_withdraw ON {$prefix}user.id = {$prefix}user_withdraw.user_id  
                where {$prefix}user.id in (".implode(',', $user_ids).")
                and {$prefix}user_withdraw.status = 1
                {$withdraw_begin_time_str} {$withdraw_end_time_str} {$reg_begin_time_str} {$reg_end_time_str}
                GROUP BY {$prefix}user.id
                UNION
                SELECT
                    {$prefix}user.id,
                    {$prefix}user.name,
                    {$prefix}user.real_name, 
                    {$prefix}user.reg_source,
                    {$prefix}user.reg_time,
                    0 as deposit_money,
                    0 as withdraw_money,
                    SUM({$prefix}user_game_bet.bets) as bets_money
                FROM {$prefix}user
                LEFT JOIN {$prefix}user_game_bet ON {$prefix}user.id = {$prefix}user_game_bet.user_id  
                where {$prefix}user.id in (".implode(',', $user_ids).") 
                {$reg_begin_time_str} {$reg_end_time_str}
                GROUP BY {$prefix}user.id
                ) as new";

        $total_num = $this->model->getConnection()->select($countsql); 

        $total_count = isset($total_num[0]) ? $total_num[0]->total_num : 0;  

        $page = isset($data['page']) ? $data['page'] : 1;

        $page_size = isset($data['page_size']) ? $data['page_size'] : 20;

        $limit = "limit ".($page - 1) * $page_size.", ".$page_size; 

        $sql = "SELECT id, name, real_name, group_name, reg_source, login_time, reg_time, sum(deposit_money) as deposit_money, sum(withdraw_money) as withdraw_money, sum(bets_money) as bets_money  FROM ( SELECT
                    {$prefix}user.id,
                    {$prefix}user.name,
                    {$prefix}user.real_name, 
                    {$prefix}user.reg_source,
                    {$prefix}user.reg_time,
                    {$prefix}user.login_time,
                    {$prefix}user_group.name as group_name,
                    SUM({$prefix}user_deposit.money) as deposit_money,
                    0 as withdraw_money,
                    0 as bets_money
                FROM {$prefix}user
                LEFT JOIN {$prefix}user_deposit ON {$prefix}user.id = {$prefix}user_deposit.user_id  
                LEFT JOIN {$prefix}user_group ON {$prefix}user.user_group_id = {$prefix}user_group.id  
                where {$prefix}user.id in (".implode(',', $user_ids).")
                and {$prefix}user_deposit.status = 1
                and {$prefix}user_deposit.deposit_mode <> 'site'
                {$deposit_begin_time_str} {$deposit_end_time_str} {$reg_begin_time_str} {$reg_end_time_str}
                GROUP BY {$prefix}user.id
                UNION
                SELECT
                    {$prefix}user.id,
                    {$prefix}user.name,
                    {$prefix}user.real_name,  
                    {$prefix}user.reg_source,
                    {$prefix}user.reg_time,
                    {$prefix}user.login_time,
                    {$prefix}user_group.name as group_name,
                    0 as deposit_money,
                    SUM({$prefix}user_withdraw.money) as withdraw_money,
                    0 as bets_money
                FROM {$prefix}user
                LEFT JOIN {$prefix}user_withdraw ON {$prefix}user.id = {$prefix}user_withdraw.user_id  
                LEFT JOIN {$prefix}user_group ON {$prefix}user.user_group_id = {$prefix}user_group.id  
                where {$prefix}user.id in (".implode(',', $user_ids).")
                and {$prefix}user_withdraw.status = 1
                {$withdraw_begin_time_str} {$withdraw_end_time_str} {$reg_begin_time_str} {$reg_end_time_str}
                GROUP BY {$prefix}user.id
                UNION
                SELECT
                    {$prefix}user.id,
                    {$prefix}user.name,
                    {$prefix}user.real_name, 
                    {$prefix}user.reg_source,
                    {$prefix}user.reg_time,
                    {$prefix}user.login_time,
                    {$prefix}user_group.name as group_name,
                    0 as deposit_money,
                    0 as withdraw_money,
                    SUM({$prefix}user_game_bet.bets) as bets_money
                FROM {$prefix}user
                LEFT JOIN {$prefix}user_game_bet ON {$prefix}user.id = {$prefix}user_game_bet.user_id 
                LEFT JOIN {$prefix}user_group ON {$prefix}user.user_group_id = {$prefix}user_group.id  
                where {$prefix}user.id in (".implode(',', $user_ids).") 
                {$reg_begin_time_str} {$reg_end_time_str}
                GROUP BY {$prefix}user.id ) as new GROUP BY new.id order by new.id desc";

        $list = $this->model->getConnection()->select($sql);

        foreach ($list as $key => $value) {
            $list[$key] = (array)$value;
        }

        return ['lists' => $list, 'total_count' => $total_count];
        
    } 
}