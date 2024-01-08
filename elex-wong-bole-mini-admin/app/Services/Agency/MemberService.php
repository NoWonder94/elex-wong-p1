<?php
namespace App\Services\Agency;

use Illuminate\Support\Facades\DB;
use App\Exceptions\Response\Service\ServiceException;
use App\Exceptions\Response\Service\ServiceCode;
use App\Mappers\Agency\MemberMapper;
use App\Models\Agency\MemberModel;
use App\Services\Base\UserService;
use App\Services\Base\Auth\UserService as AuthUserService;
use App\Models\Base\UserModel;
use App\Models\Agency\OrgModel;

class MemberService
{

    /**
     * 获取登录代理人数据
     *
     * @param int $userId
     * @throws ServiceException
     * @return array
     */
    public function findMemberByUserId($userId)
    {
        $member = MemberModel::findByUserId($userId)->shift();
        if (! $member) {
            throw new ServiceException(ServiceCode::SERVICE_NOT_EXIST_MEMBER);
        }
        return $member;
    }

    /**
     * 获取查询字段
     *
     * @return string
     */
    protected function makeFields()
    {
        return 'd.id,d.org_id,d.user_id,d.type,d.name,d.tel,d.tele,d.status';
    }

    /**
     * 获取查询字段（列表）
     *
     * @return string
     */
    protected function makeFieldList()
    {
        return implode(',', [
            $this->makeFields(),
            'd.created,d.updated',
            'u.email as user_email,u.nickname as user_nickname',
            'o.name as org_name'
        ]);
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
    public function selectList($orgId, $page = 1, $pageSize = 50, $param = array(), $order = MemberModel::ORDER_UPDATED_DESC)
    {
        $queryList = MemberModel::dbTable('d');
        $queryCount = clone $queryList;
        
        $where = array();
        // 组织
        $where[] = ['d.org_id', $orgId];
        // 类型
        if (isset($param['type']) && ! empty($param['type'])) {
            $where[] = ['d.type', $param['type']];
        }
        // 状态
        if (isset($param['status']) && ! empty($param['status'])) {
            $where[] = ['d.status', $param['status']];
        }
        // 搜索（姓名、邮箱）
        if (isset($param['keyword']) && ! empty($param['keyword'])) {
            $queryCount->join(UserModel::TABLENAME . ' as u', 'u.id', '=', 'd.user_id');
            $queryCount->where(function ($query) use ($param) {
                $query->where('d.name', 'like', '%' . $param['keyword'] . '%')
                    ->orWhere('u.email', 'like', '%' . $param['keyword'] . '%');
            });
            $queryList->where(function ($query) use ($param) {
                $query->where('d.name', 'like', '%' . $param['keyword'] . '%')
                    ->orWhere('u.email', 'like', '%' . $param['keyword'] . '%');
            });
        }

        // 排除org被删除的成员
        $queryCount->join(OrgModel::TABLENAME . ' as o', function ($join) {
            $join->on('o.id', '=', 'd.org_id')
                ->where('o.status', '=', OrgModel::STATUS_ENABLE);
        });
        $queryList->join(OrgModel::TABLENAME . ' as o', function ($join) {
            $join->on('o.id', '=', 'd.org_id')
                ->where('o.status', '=', OrgModel::STATUS_ENABLE);
        });

        // 查询数量
        $count = $queryCount->where($where)->count();
        // 构造语句
        $queryList->select(DB::raw($this->makeFieldList()))
            ->join(UserModel::TABLENAME . ' as u', 'u.id', '=', 'd.user_id')
            ->where($where)
            ->offset(($page - 1) * $pageSize)
            ->limit($pageSize);
        // 排序
        switch ($order) {
            case MemberModel::ORDER_ID_ASC:
                $queryList->orderBy('d.id', 'asc');
                break;
            case MemberModel::ORDER_ID_DESC:
                $queryList->orderBy('d.id', 'desc');
                break;
            case MemberModel::ORDER_UPDATED_ASC:
                $queryList->orderBy('d.updated', 'asc');
                break;
            case MemberModel::ORDER_UPDATED_DESC:
                $queryList->orderBy('d.updated', 'desc');
                break;
            default:
                $queryList->orderBy('d.updated', 'desc');
        }
        // 查询数据
        $collection = $queryList->get();
        
        return array(
            $collection,
            $count
        );
    }

    /**
     * 创建用户和代理人
     *
     * @param \Illuminate\Http\Request $request            
     * @param array $data            
     * @return id | false
     */
    public function create($request, array $data)
    {
        $id = false;
        
        DB::transaction(function () use ($request, $data, &$id) {
            $userService = new UserService();
            // 创建用户
            $data['user_id'] = $userService->saveItem($request);
            // 创建代理人
            $id = MemberModel::create($data);
        });
        return $id;
    }
    
    /**
     * 保存数据
     *
     * @param \Illuminate\Http\Request $request            
     * @param int $id            
     * @throws ServiceException
     * @return 1 | id
     */
    public function saveItem($request, $id = null)
    {
        // 数据映射
        $dataMapper = new MemberMapper($request->all());
        $data = $dataMapper->make()->toArray();
        // 创建数据
        if (! $id && ! ($number = $this->create($request, $data))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }
        // 修改数据
        if ($id) {
            DB::transaction(function () use ($request, $id, $data) {
                // 代理信息
                if (! ($number = MemberModel::update($id, $data))) {
                    throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
                }
                // 重置密码
                if (($userId = $request->post('user_id')) && ($password = $request->post('password'))) {
                    $authUserService = new AuthUserService();
                    $authUserService->updatePassword($userId, $password);
                }
            });
        }
        return $id ?: $number;
    }

    /**
     * 修改状态
     *
     * @param int $id
     * @param int $status
     * @throws ServiceException
     * @return boolean
     */
    public function saveItemStatus($id, $status)
    {
        if (! ($number = MemberModel::update($id, [
            'status' => $status
        ]))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }

        return (boolean) $number;
    }

    /**
     * 修改状态（多条）
     *
     * @param int $orgId
     * @param int $status
     * @throws ServiceException
     * @return boolean
     */
    public function saveListStatus($orgId, $status)
    {
        if (! ($number = MemberModel::updateByOrgId($orgId, [
            'status' => $status
        ]))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }

        return (boolean) $number;
    }
}