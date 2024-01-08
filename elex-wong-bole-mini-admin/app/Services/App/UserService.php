<?php
namespace App\Services\App;

use Illuminate\Support\Facades\DB;
use App\Models\App\UserModel;
use App\Models\App\UserGameModel;
use App\Services\Postman\GameService as PostmanGameService;

class UserService
{

    /**
     * 获取查询字段
     *
     * @return string
     */
    protected function makeFields()
    {
        return implode(',', [
            'd.id,d.operator_id,d.account_id,d.nickname,d.create_time,d.create_ip,d.role,d.access',
            'd.gold,d.income_gold,d.login_count,d.login_ip,d.login_time,d.game_count'
        ]);
    }

    /**
     * 获取查询字段（列表）
     *
     * @return string
     */
    protected function makeFieldList()
    {
        return $this->makeFields();
    }

    /**
     * 获取列表数据
     *
     * @param int $orgId            
     * @param int $page            
     * @param int $pageSize            
     * @param array $param            
     * @param int $order            
     * @return array(\Illuminate\Support\Collection, int)
     */
    public function selectList($orgId, $page = 1, $pageSize = 50, $param = array(), $order = UserModel::ORDER_SIGNIN_DESC)
    {
        $queryList = UserModel::dbTable('d');
        $queryCount = clone $queryList;

        $where[] = ['d.operator_id', $orgId];
        // 注册时间
        if (isset($param['create_time']) && ! empty($param['create_time'])) {
            $where[] = ['d.create_time', '>=', $param['create_time'][0]];
            $where[] = ['d.create_time', '<=', $param['create_time'][1]];
        }
        // 登录时间
        if (isset($param['login_time']) && ! empty($param['login_time'])) {
            $where[] = ['d.login_time', '>=', $param['login_time'][0]];
            $where[] = ['d.login_time', '<=', $param['login_time'][1]];
        }
        // 角色
        if (isset($param['role']) && ! empty($param['role'])) {
            $where[] = ['d.role', $param['role']];
        }
        // 状态
        if (isset($param['access']) && ! empty($param['access'])) {
            $where[] = ['d.access', $param['access']];
        }
        // 搜索（运营商平台玩家ID）
        if (isset($param['keyword']) && ! empty($param['keyword'])) {
            $where[] = ['d.account_id', 'like', '%' . $param['keyword'] . '%'];
        }
        
        // 查询数量
        $count = $queryCount->where($where)->count();
        // 构造语句
        $queryList->select(DB::raw($this->makeFieldList()))
            ->where($where)
            ->offset(($page - 1) * $pageSize)
            ->limit($pageSize);
        // 排序
        switch ($order) {
            case UserModel::ORDER_ID_ASC:
                $queryList->orderBy('d.id', 'asc');
                break;
            case UserModel::ORDER_ID_DESC:
                $queryList->orderBy('d.id', 'desc');
                break;
            case UserModel::ORDER_SIGNIN_ASC:
                $queryList->orderBy('d.login_time', 'asc');
                break;
            case UserModel::ORDER_SIGNIN_DESC:
                $queryList->orderBy('d.login_time', 'desc');
                break;
            case UserModel::ORDER_INCOME_ASC:
                $queryList->orderBy('d.income_gold', 'asc');
                break;
            case UserModel::ORDER_INCOME_DESC:
                $queryList->orderBy('d.income_gold', 'desc');
                break;
            default:
                $queryList->orderBy('d.login_time', 'desc');
        }
        // 查询数据
        $collection = $queryList->get();
        
        // 汇总统计
        $sumTotal = $this->sumTotal($where);
        
        return array(
            $collection,
            $count,
            $sumTotal
        );
    }
    
    /**
     * 汇总统计
     *
     * @param $where
     * @return array
     */
    protected function sumTotal($where)
    {
        return UserModel::dbTable('d')->where($where)->sum('gold');
    }
    
    /**
     * 获取玩家信息
     *
     * @param int $uid            
     * @return \Illuminate\Support\Collection
     */
    public function getPlayerDetail($uid)
    {
        return UserGameModel::dbTable()->select('game_id')
            ->where('uid', $uid)
            ->distinct()
            ->get();
    }

    /**
     * 搜索玩家自动补全
     *
     * @param int $orgId
     * @param string $keyword
     * @param int $pageSize
     * @return \Illuminate\Support\Collection
     */
    public function searchAutoList($orgId, $keyword = '', $pageSize = 10)
    {
        $where[] = ['operator_id', $orgId];
        // 搜索（运营商平台玩家ID）
        if (! empty($keyword)) {
            $where[] = ['account_id', 'like', '%' . $keyword . '%'];
        }
        return UserModel::dbTable()->select('account_id as value')
            ->where($where)
            ->limit($pageSize)
            ->get();
    }
    
    /**
     * 保存玩家信息
     *
     * @param \Illuminate\Http\Request $request
     * @throws ServiceException
     * @return void
     */
    public function save($request)
    {
        $gameService = new PostmanGameService();
        
        // 数据映射
        $dataRole['operator_id'] = $request->post('operator_id');
        $dataRole['account_id'] = $request->post('account_id');
        $dataRole['role'] = $request->post('role');
        // 设置玩家角色
        $gameService->setPlayerRole($dataRole);
        
        // 数据映射
        $dataAccess['operator_id'] = $request->post('operator_id');
        $dataAccess['account_id'] = $request->post('account_id');
        $dataAccess['access'] = $request->post('access');
        // 立即踢出
        if ($dataAccess['access'] == UserModel::ACCESS_LOCK && $request->post('isKick', 0) == 1) {
            $dataAccess['isKick'] = 1;
        }
        // 设置玩家访问权限
        $gameService->setPlayerAccess($dataAccess);
    }
}