<?php
namespace App\Services\Agency;

use App\Exceptions\Response\Service\ServiceException;
use App\Exceptions\Response\Service\ServiceCode;
use App\Mappers\Agency\OrgMapper;
use App\Models\Agency\OrgModel;

class OrgService
{

    /**
     * 获取父级数据
     *
     * @param int $id            
     * @throws ServiceException
     * @return array
     */
    public function findParent($id)
    {
        if (! ($item = OrgModel::findById($id)->shift())) {
            throw new ServiceException(ServiceCode::SERVICE_NOT_EXIST_DATA);
        }
        if (! ($data = OrgModel::findById($item['parent_id'])->shift())) {
            throw new ServiceException(ServiceCode::SERVICE_NOT_EXIST_DATA);
        }
        return $data;
    }

    public function getAllIds($id) {
        $ids = [];
        $list = OrgModel::selectAllById($id);
        foreach ($list as $item) {
            $ids[] = $item['id'];
        }
        return $ids;
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
        $dataMapper = new OrgMapper($request->all());
        $data = $dataMapper->make()->toArray();
        // 创建数据
        if (! $id && ! ($number = OrgModel::create($data))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }
        // 修改数据
        if ($id && ! ($number = OrgModel::update($id, $data))) {
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
        if (OrgModel::selectByParentId($id)->isNotEmpty()) {
            throw new ServiceException(ServiceCode::SERVICE_EXISTED_ORG_CHILDREN);
        }

        // 抛出删除组织事件
        \App\Events\Agency\Org\DestroyEvent::dispatch($id);
        
        if (! ($number = OrgModel::destroy($id))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }
        return (boolean) $number;
    }
}