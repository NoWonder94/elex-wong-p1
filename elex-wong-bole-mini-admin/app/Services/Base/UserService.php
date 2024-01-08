<?php
namespace App\Services\Base;

use Illuminate\Support\Facades\DB;
use App\Exceptions\Response\Service\ServiceException;
use App\Exceptions\Response\Service\ServiceCode;
use App\Mappers\Base\UserMapper;
use App\Models\Base\UserModel;
use App\Services\Base\Auth\UserService as AuthUserService;

class UserService
{

    /**
     * 获取登录用户数据（id）
     *
     * @param int $id
     * @throws ServiceException
     * @return array
     */
    public function findUserById($id)
    {
        $user = UserModel::findById($id)->shift();
        if (! $user) {
            throw new ServiceException(ServiceCode::SERVICE_NOT_EXIST_USER);
        }
        return $user;
    }

    /**
     * 获取登录用户数据（email）
     *
     * @param string $email
     * @throws ServiceException
     * @return array
     */
    public function findUserByEmail($email)
    {
        $user = UserModel::findByEmail($email)->shift();
        if (! $user) {
            throw new ServiceException(ServiceCode::SERVICE_NOT_EXIST_USER);
        }
        return $user;
    }

    /**
     * 获取查询字段
     *
     * @return string
     */
    protected function makeFields()
    {
        return implode(',', [
            'd.id,d.email,d.nickname,d.avatar,d.status',
            'd.login_first,d.login_last,d.created,d.updated'
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
     * 获取查询字段（详情）
     *
     * @return string
     */
    protected function makeFieldDetail()
    {
        return implode(',', [
            $this->makeFields(),
            'up.name,up.tel,up.tele'
        ]);
    }

    /**
     * 获取列表数据
     *
     * @param int $page            
     * @param int $pageSize            
     * @param array $param            
     * @param int $order            
     * @return array(\Illuminate\Support\Collection, int)
     */
    public function selectList($page = 1, $pageSize = 50, $param = array(), $order = UserModel::ORDER_UPDATED_DESC)
    {
        $queryList = UserModel::dbTable('d');
        $queryCount = clone $queryList;

        $where = array();
        // 状态
        if (isset($param['status']) && ! empty($param['status'])) {
            $where[] = ['d.status', $param['status']];
        }
        // 搜索（邮箱）
        if (isset($param['keyword']) && ! empty($param['keyword'])) {
            $where[] = ['d.email', 'like', '%' . $param['keyword'] . '%'];
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
            case UserModel::ORDER_UPDATED_ASC:
                $queryList->orderBy('d.updated', 'asc');
                break;
            case UserModel::ORDER_UPDATED_DESC:
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
     * 保存数据
     *
     * @param \Illuminate\Http\Request $request      
     * @param int $id             
     * @throws ServiceException
     * @return 1 | id
     */
    public function saveItem($request, $id = null)
    {
        // 验证邮箱是否已存在
        $authUserService = new AuthUserService();
        $authUserService->verifyUserExistedByEmail($request->post('email'), $id);
        
        // 数据映射
        $dataMapper = new UserMapper($request->all());
        $data = $dataMapper->make()->toArray();
        
        // 创建数据
        if (! $id && ! ($number = UserModel::create($data))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }
        // 修改数据
        if ($id && ! ($number = UserModel::update($id, $data))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }
        return $number;
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
        if (! ($number = UserModel::update($id, [
            'status' => $status
        ]))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }
        return (boolean) $number;
    }
}