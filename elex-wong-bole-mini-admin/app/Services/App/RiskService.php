<?php
	namespace App\Services\App;
	use App\Models\App\GoldLogModel;
	use App\Models\App\UserGameLogModel;
	use App\Models\App\SettlementInfoModel;
	use App\Models\AppLog\SettlementInfoModel as AppLogSettlementInfoModel;
	use App\Models\Coin\Order\GameModel;
	use App\Models\App\LoginLogModel;
	use Illuminate\Support\Facades\DB;
	use Helper\Timed;

	class RiskService {
		public function getList($orgId, $page = 1, $pageSize = 10, $param = array(), $order = 'win_percentage_desc') {
			$basicQuery = GoldLogModel::dbTable('FTGL');

			$basicQueryWhere[] = ['FTGL.operator_id', '=', $orgId];
	        $extraQueryOn[] = ['FTGL.account_id', '=', 'FLHPBD.account_id'];
	        $extraQueryOn[] = ['FTGL.operator_id', '=', 'FLHPBD.org_id'];
	        $extraQueryWhere = 'WHERE TRUE';
	        $loginLogWhereString = '';

	        if (isset($param['datetime']) && !empty($param['datetime'])) {
            	$basicQueryWhere[] = ['FTGL.create_time', '>=', $param['datetime'][0]];
				$basicQueryWhere[] = ['FTGL.create_time', '<=', $param['datetime'][1]];
				$extraQueryWhere .= ' AND timed >= '.$param['datetime'][0].' AND timed <= '.$param['datetime'][1];
				$loginLogWhereString = 'AND create_time >= '.$param['datetime'][0].' AND create_time <= '.$param['datetime'][1];
			} else {
				return [[], 0, 0];
			}

			if (isset($param['game_id']) && !empty($param['game_id'])) {
				$extraQueryWhere .= ' AND game_id = '.$param['game_id'];
			}

			

			$totalQuery = GoldLogModel::dbTable('FTGL')
						->select(DB::raw('SUM(IF(FTGL.gain_gold > 0 AND FTGL.cost_type = 3, FTGL.gain_gold, 0))/COUNT(DISTINCT CASE WHEN FTGL.gain_gold > 0 THEN FTGL.account_id END) AS totalAveRev'))
						->first();
						
			$basicQuery
				->select($this->makeListFields($totalQuery['totalAveRev']))
				->leftJoin(DB::raw('(SELECT account_id, org_id, SUM(bet_num) AS bet_num, SUM(gain_gold) AS gain_gold, timed FROM fierytrees_logs.hs_player_bet_day '.$extraQueryWhere.' GROUP BY account_id) AS FLHPBD'), function($join) use ($extraQueryOn) {
					$join->on($extraQueryOn);
				})
				->where($basicQueryWhere)
				->groupBy('FTGL.account_id');

			$queryCount = clone $basicQuery;
			$queryTotal = clone $basicQuery;
			$count = $queryCount->count();

			$basicQuery
				->offset(($page - 1) * $pageSize)
				->limit($pageSize);

			switch ($order) {
				case 'total_bet_asc':
					$basicQuery->orderBy('bet_gold', 'asc');
					break;
				case 'total_bet_desc':
					$basicQuery->orderBy('bet_gold', 'desc');
					break;
				case 'total_profit_asc':
					$basicQuery->orderBy('gain_gold', 'asc');
					break;
				case 'total_profit_desc':
					$basicQuery->orderBy('gain_gold', 'desc');
					break;
				case 'total_bet_no_asc':
					$basicQuery->orderBy('bet_count', 'asc');
					break;
				case 'total_bet_no_desc':
					$basicQuery->orderBy('bet_count', 'desc');
					break;
				case 'win_percentage_asc':
					$basicQuery->orderBy('win_count', 'asc');
					break;
				case 'win_percentage_desc':
					$basicQuery->orderBy('win_count', 'desc');
					break;
				case 'transfer_in_asc':
					$basicQuery->orderBy('deposits', 'asc');
					break;
				case 'transfer_in_desc':
					$basicQuery->orderBy('deposits', 'desc');
					break;
				case 'transfer_out_asc':
					$basicQuery->orderBy('withdraws', 'asc');
					break;
				case 'transfer_out_desc':
					$basicQuery->orderBy('withdraws', 'desc');
					break;
				default:
					$basicQuery->orderBy('win_count', 'desc');
					break;
			}

			$collection = $basicQuery->get()->toArray();
			$ips = [];
			$temp = [];

			foreach ($collection as $key => $item) {
				$ips[$item['account_id']] = '';
				$temp[$item['account_id']] = '';
				$collection[$key]['ip'] = &$ips[$item['account_id']];
				$collection[$key]['profitTime'] = &$temp[$item['account_id']];
			}

			if (count($ips) > 0) {
				$accountIds = "'".implode("','", array_keys($ips))."'";
				
				$ipList = DB::connection('mysql_game')
							->table(DB::raw('(SELECT * FROM t_user_login_log WHERE account_id IN ('.$accountIds.') '.$loginLogWhereString.' ORDER BY id DESC LIMIT 0, 100000000) AS T'))
							->select('T.account_id', 'T.ip')
							->groupBy('T.account_id')
							->get()
							->toArray();

				foreach ($ipList as $item) {
					$timeQuery = GoldLogModel::dbTable('FTGL')
	 				->leftJoin('t_settlement_log AS SI','FTGL.source_id','=','SI.room_id')
		 			->select(DB::raw('MIN(start_time) AS start, MAX(end_time) AS end'))
		 			->where($basicQueryWhere)
		 			->where('FTGL.account_id','=',$item['account_id'])
		 			// ->where(DB::raw('FTGL.account_id IN ('.$accountIds.')'))
		 			->first();
					$ips[$item['account_id']] = $item['ip'];
					$temp[$item['account_id']] = ($timeQuery['end'] - $timeQuery['start']);
				}	
			}

			// 汇总统计
			$sumTotal = 0;
        	$total = $queryTotal
        				// ->select($this->makeListFields($totalQuery['totalAveRev']))
        				->select(DB::raw('(SUM(IF(FTGL.cost_type = 3 AND FTGL.gain_gold > 0, 1, 0))/SUM(IF(FTGL.cost_type = 3 AND FTGL.gain_gold != 0, 1, 0))) * 100 AS win_count'))
        				->get()
        				->toArray();
        	if (count($total) > 0 ) {			
				foreach ($total as $key => $value) {
					$sumTotal += (floor($value['win_count']));
				}
				$sumTotal = floor($sumTotal/$count);
			}
			
			return array(
            	$collection,
            	$count,
            	$sumTotal
        	);
		}

		protected function makeListFields($totalQuery) {
	        return [
	        	'FTGL.account_id',
				'FLHPBD.bet_num AS bet_gold',
				'FLHPBD.gain_gold AS gain_gold',
				DB::raw('SUM(IF(FTGL.cost_type = 3, 1, 0)) AS bet_count'),
				DB::raw('(SUM(IF(FTGL.cost_type = 3 AND FTGL.gain_gold > 0, 1, 0))/SUM(IF(FTGL.cost_type = 3 AND FTGL.gain_gold != 0, 1, 0))) * 100 AS win_count'),
				DB::raw('SUM(IF(FTGL.cost_type = 2, FTGL.gain_gold, 0)) AS deposits'),
				DB::raw('SUM(IF(FTGL.cost_type = 1, FTGL.gain_gold, 0)) AS withdraws'),
				DB::raw('SUM(IF(FTGL.cost_type = 1, FTGL.gain_gold, 0)) / SUM(IF(FTGL.cost_type = 2, FTGL.gain_gold, 0)) AS transferDiff'),
				DB::raw('SUM(IF(FTGL.gain_gold > 0 AND FTGL.cost_type = 3, FTGL.gain_gold, 0))/SUM(IF(FTGL.cost_type = 3 AND FTGL.gain_gold != 0, 1, 0)) - '.$totalQuery.' AS averageRev'),
	        ];
	    }

		public function getDetail($orgId, $page = 1, $pageSize = 50, $param = array()) {
			//测试
			// $param['datetime'][0] = '1556065351';
			// $param['datetime'][0] = '1556065292';
			// $param['datetime'][1] = '1556068119';
			// $param['game_id'] = '10005';
			// $param['keyword'] = 't1579235f';

			$basicQueryWhere = 'WHERE operator_id = '.$orgId.' AND user_type = 1';
			$extraQueryWhere[] = ['operator_id', '=', $orgId];
			$where[] = ['operator_id', '=', $orgId];

			if (isset($param['datetime']) && !empty($param['datetime'])) {
            	$basicQueryWhere .= ' AND create_time >= '.$param['datetime'][0].' AND create_time <= '.$param['datetime'][1];
            	$extraQueryWhere[] = ['create_time', '>=', $param['datetime'][0]];
				$extraQueryWhere[] = ['create_time', '<=', $param['datetime'][1]];
			}

			if (isset($param['game_id']) && !empty($param['game_id'])) {
				$where[] = ['game_id', '=', $param['game_id']];
			}

			if (isset($param['keyword']) && !empty($param['keyword'])) {
				$basicQueryWhere .= ' AND account_id = "'.$param['keyword'].'"';
				$extraQueryWhere[] = ['account_id', '=', $param['keyword']];
				$where[] = ['account_id', '=', $param['keyword']];
			}

			$query = DB::connection('mysql_game')
								->table(DB::raw('(SELECT create_time, game_id, source_id, cost_type, status, SUM(gain_gold) AS gain_gold, own_gold, ip, devices FROM (SELECT create_time, NULL AS game_id, source_id, cost_type, NULL AS status, gain_gold, own_gold, NULL AS ip, NULL AS devices FROM t_gold_log '.$basicQueryWhere.' ORDER BY id DESC LIMIT 0, 100000000) AS T GROUP BY T.source_id, T.cost_type) AS T1'))
								->unionAll(
									LoginLogModel::dbTable()
													->select($this->makeListFieldsByLoginLog())
													->where($extraQueryWhere)
								)
								// ->orderBy('create_time','desc');
								->orderBy('create_time', $param['order'] == 1 ? 'desc' : 'asc');

			$queryCount = clone $query;
			$count = $queryCount->get()->count();

			$query
				->offset(($page - 1) * $pageSize)
				->limit($pageSize);

			$collection = $query->get()->toArray();

			foreach ($collection as $key => $val) {
				switch ($val['cost_type']) {
					case 1:
					case 2:
						$list = GameModel::dbTable()
											->select('sn', 'status')
											->where('org_order_id', '=', $val['source_id'])
											->first();

						$collection[$key]['source_id'] = $list['sn'];
						$collection[$key]['status'] = $list['status'];
						break;
					case 3:
					case 4:
						$list = UserGameLogModel::dbTable()
													->select('game_id', 'ip', 'devices')
													->where($where)
													->where('create_time', '<=', $val['create_time'])
													->orderBy('create_time', 'desc')
													->first();

						if (!$list) {
							//当根据游戏查询数据不存在时，删掉当前资料，继续查询下一条
							unset($collection[$key]);
							$count--;
							break;
						} else {
							$collection[$key]['game_id'] = $list['game_id'];
							$collection[$key]['ip'] = $list['ip'];
							$collection[$key]['devices'] = $list['devices'];
						}

						$settlementLog = ($val['create_time'] < Timed::getDayCurrentTimed(time() - 86400 * 30) && 
	                $val['create_time'] >= 1537200000) ? AppLogSettlementInfoModel::dbTableByTimed($val['create_time'], 'd') : SettlementInfoModel::dbTable();

						$list = $settlementLog->select('scene_id')
								->where($where)
								->where('room_id', '=', $val['source_id'])
								->orderBy('create_time', 'desc')
								->first();

						$collection[$key]['cost_type'] = $list['scene_id'];			
						break;
					default:
						break;
				}
			}

			// echo "<pre>";
			// print_r($collection);
			// exit;

			return array(
            	$collection,
            	$count
        	);
		}

		protected function makeListFieldsByLoginLog() {
	    	return [
	    		'create_time',
	    		'game_id',
	    		DB::raw('NULL AS source_id'),
	    		DB::raw('NULL AS cost_type'),
	    		DB::raw('NULL AS status'),
				DB::raw('NULL AS gain_gold'),
				DB::raw('NULL AS own_gold'),
				'ip',
				'devices'
	    	];
	    }
	}
?>