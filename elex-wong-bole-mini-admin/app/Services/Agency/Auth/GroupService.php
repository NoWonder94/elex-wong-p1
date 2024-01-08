<?php
namespace App\Services\Agency\Auth;

use App\Exceptions\Response\Service\ServiceException;
use App\Exceptions\Response\Service\ServiceCode;
use App\Mappers\Agency\Auth\GroupMapper;
use App\Models\Agency\Auth\GroupModel;

class GroupService
{

    /**
     * 保存数据
     *
     * @param int $orgId
     * @param \Illuminate\Http\Request $request            
     * @param int $id            
     * @throws ServiceException
     * @return 1 | id
     */
    public function saveItem($orgId, $request, $id = null)
    {
        // 数据映射
        $dataMapper = new GroupMapper($request->all());
        $data = $dataMapper->make()->toArray();
        // 创建数据
        if (! $id && ! ($number = GroupModel::createByOrgId($orgId, $data))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }
        // 修改数据
        if ($id && ! ($number = GroupModel::update($id, $data))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }
        return $number;
    }

    /**
     * 删除数据
     *
     * @param int $id            
     * @throws ServiceException
     * @return boolean
     */
    public function destroy($id)
    {
        if (! ($number = GroupModel::destroy($id))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }
        return (boolean) $number;
    }
}