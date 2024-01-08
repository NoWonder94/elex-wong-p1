<?php 
namespace App\Application\Www\Services;

use App\Models\Remote\User;
use App\Models\Remote\UserTrade;
use App\Models\Remote\UserDeposit;
use App\Models\Remote\UserWithdraw;
use Time, DB;

class UserTradeService extends EloquentService { 
     
    public function lists($data = []) {  
        $type = isset($data['type']) ? $data['type'] : 0;

        if ($type == 0) {
            $this->model = new UserTrade();
        } elseif ($type == 1){
            $this->model = new UserDeposit();
        } else {
            $this->model = new UserWithdraw();
        } 

        $prefix =  $this->model->getConnection()->getTablePrefix();

        if ((!isset($data['proxy']) && isset($data['name'])) ||  (empty($data['proxy']) && empty($data['name']))) {
            return ['lists' => [], 'total_count' => 0];
        }  

        if ($type == 0) {

            $condition_str = '';

            if ((isset($data['name']) && !empty($data['name']) && (!isset($data['proxy']) || empty($data['proxy'])))) {
                $user = User::where('name', $data['name'])->first();
                if (!isset($user->id)) {
                    return ['lists' => [], 'total_count' => 0];
                } 
                $condition_str = "{$prefix}user_trade.user_id = {$user->id} and";
            } else {
                $users = User::where('proxy', $data['proxy'])->pluck('id')->toArray();
                $user_ids = implode(',', $users);
                if (empty($user_ids)) {
                    return ['lists' => [], 'total_count' => 0];
                }
                if (isset($data['name']) && !empty($data['name'])) {
                    $user = User::where('name', $data['name'])->first();
                    if (!isset($user->id)) {
                        return ['lists' => [], 'total_count' => 0];
                    } else {
                        $condition_str = "{$prefix}user_trade.user_id in ({$user->id}) and";
                    }
                } else {
                    $condition_str = "{$prefix}user_trade.user_id in ($user_ids) and";
                }
            }  

            $begin_time = isset($data['begin_time']) ? Time::toTime(trim($data['begin_time'])) : 0;
            $begin_time_str = '';

            if ($begin_time > 0) {
                $begin_time_str = "and {$prefix}user_trade.create_time >= ". $begin_time;
            }

            $end_time_str = '';

            $end_time = isset($data['end_time']) ? Time::toTime(trim($data['end_time'])) : 0;
            if ($end_time > 0) {
                $end_time_str = "and {$prefix}user_trade.create_time <= ". $end_time;
            }

            $countsql = "SELECT count(sn) as total_num FROM (SELECT
                    {$prefix}user_deposit.sn,
                    {$prefix}user_deposit.money,
                    {$prefix}user_deposit.create_time,
                    {$prefix}user.proxy as proxy_name,
                    {$prefix}user.name as user_name,
                    {$prefix}user.real_name,
                    {$prefix}user_group.name as group_name,
                    'deposit' as type
                FROM
                    {$prefix}user_trade
                LEFT JOIN {$prefix}user_deposit ON {$prefix}user_deposit.sn = {$prefix}user_trade.related_key
                LEFT JOIN {$prefix}user ON {$prefix}user.id = {$prefix}user_trade.user_id
                LEFT JOIN {$prefix}user_group ON {$prefix}user_group.id = {$prefix}user.user_group_id
                where {$condition_str} {$prefix}user_deposit.status = 1
                {$begin_time_str} {$end_time_str}
                UNION
                SELECT
                    {$prefix}user_withdraw.sn,
                    {$prefix}user_withdraw.money,
                    {$prefix}user_withdraw.create_time,
                    {$prefix}user.proxy as proxy_name,
                    {$prefix}user.name as user_name,
                    {$prefix}user.real_name,
                    {$prefix}user_group.name as group_name,
                    'withdraw' as type
                FROM
                    {$prefix}user_trade
                LEFT JOIN {$prefix}user_withdraw ON {$prefix}user_withdraw.sn = {$prefix}user_trade.related_key
                LEFT JOIN {$prefix}user ON {$prefix}user.id = {$prefix}user_trade.user_id
                LEFT JOIN {$prefix}user_group ON {$prefix}user_group.id = {$prefix}user.user_group_id
                where {$condition_str} {$prefix}user_withdraw.status = 1
                {$begin_time_str} {$end_time_str}) as new";

            $total_num = $this->model->getConnection()->select($countsql);

            $total_count = isset($total_num[0]) ? $total_num[0]->total_num : 0;  

            $page = isset($data['page']) ? $data['page'] : 1;

            $page_size = isset($data['page_size']) ? $data['page_size'] : 20;

            $limit = "limit ".($page - 1) * $page_size.", ".$page_size; 

            $sql = "SELECT * FROM (SELECT
                    {$prefix}user_deposit.sn,
                    {$prefix}user_deposit.money,
                    {$prefix}user_deposit.create_time,
                    {$prefix}user.proxy as proxy_name,
                    {$prefix}user.name as user_name,
                    {$prefix}user.real_name,
                    {$prefix}user_group.name as group_name,
                    'deposit' as type
                FROM
                    {$prefix}user_trade
                LEFT JOIN {$prefix}user_deposit ON {$prefix}user_deposit.sn = {$prefix}user_trade.related_key
                LEFT JOIN {$prefix}user ON {$prefix}user.id = {$prefix}user_trade.user_id
                LEFT JOIN {$prefix}user_group ON {$prefix}user_group.id = {$prefix}user.user_group_id
                where {$condition_str} {$prefix}user_deposit.status = 1
                {$begin_time_str} {$end_time_str}
                UNION
                SELECT
                    {$prefix}user_withdraw.sn,
                    {$prefix}user_withdraw.money,
                    {$prefix}user_withdraw.create_time,
                    {$prefix}user.proxy as proxy_name,
                    {$prefix}user.name as user_name,
                    {$prefix}user.real_name,
                    {$prefix}user_group.name as group_name,
                    'withdraw' as type
                FROM
                    {$prefix}user_trade
                LEFT JOIN {$prefix}user_withdraw ON {$prefix}user_withdraw.sn = {$prefix}user_trade.related_key
                LEFT JOIN {$prefix}user ON {$prefix}user.id = {$prefix}user_trade.user_id
                LEFT JOIN {$prefix}user_group ON {$prefix}user_group.id = {$prefix}user.user_group_id
                where {$condition_str} {$prefix}user_withdraw.status = 1
                {$begin_time_str} {$end_time_str}) as new order by new.create_time DESC {$limit}";

            $list = $this->model->getConnection()->select($sql);

            foreach ($list as $key => $value) {
            	$list[$key] = (array)$value;
            }

            return ['lists' => $list, 'total_count' => $total_count];
        } else {
            $this->listFormatBuilder = function(&$builder, &$data, &$attributes) use ($type, $prefix) {

            $tableName = $prefix . $this->model->getTable();  

            $builder->leftJoin('user', function($join) {
                        $join->on('user.id', '=', 'user_id');
                     });

            $builder->leftJoin('user_group', function($join) {
                        $join->on('user.user_group_id', '=', 'user_group.id');
                     });

            if (isset($data['proxy']) && !empty($data['proxy'])) {
                $builder->where('user.proxy', $data['proxy']); 
            }  

            if (isset($data['name']) && !empty($data['name'])) {
                $builder->where('user.name', $data['name']); 
            }  

            $builder->where($this->model->getTable() . '.status', 1);

            $begin_time = isset($data['begin_time']) ? Time::toTime(trim($data['begin_time'])) : 0;
            if ($begin_time > 0) {
                $builder->where('create_time', '>=', $begin_time);
            }

            $end_time = isset($data['end_time']) ? Time::toTime(trim($data['end_time'])) : 0;
            if ($end_time > 0) {
                $builder->where('create_time', '<=', $end_time);
            }

            $type_str = [
                '1' => 'deposit',
                '2' => 'withdraw'
            ];

            $builder->select(DB::raw("{$tableName}.sn,{$tableName}.create_time,{$tableName}.money,{$prefix}user.proxy as proxy_name,{$prefix}user.name as user_name,{$prefix}user.real_name,'{$type_str[$type]}' as type,{$prefix}user_group.name as group_name")); 


        };
        return parent::lists($data);
        }
    } 
}