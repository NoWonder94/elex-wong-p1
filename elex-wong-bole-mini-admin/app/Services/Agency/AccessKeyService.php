<?php
namespace App\Services\Agency;

use App\Exceptions\Response\Service\ServiceException;
use App\Exceptions\Response\Service\ServiceCode;
use App\Models\Agency\AccessKeyModel;
use Illuminate\Support\Str;

class AccessKeyService
{

    /**
     * 制作 AccessKeyId
     *
     * @return string
     */
    public function makeAccessKeyId()
    {
        return Str::orderedUuid();
    }

    /**
     * 制作 AccessKeySecret
     *
     * @param int $accessKeyId            
     * @return string
     */
    public function makeAccessKeySecret($accessKeyId)
    {
        $saltSring = AccessKeyModel::ACCESS_KEY_SALT . Str::random() . $accessKeyId;
        
        return strtoupper(sha1($saltSring));
    }

    /**
     * 创建数据
     *
     * @param int $orgId            
     * @throws ServiceException
     * @return boolean
     */
    public function create($orgId)
    {
        $data['org_id'] = $orgId;
        $data['access_key_id'] = $this->makeAccessKeyId();
        $data['access_key_secret'] = $this->makeAccessKeySecret($data['access_key_id']);
        
        if (! ($number = AccessKeyModel::create($data))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }
        return (boolean) $number;
    }

    /**
     * 更新数据
     *
     * @param int $orgId            
     * @throws ServiceException
     * @return boolean
     */
    public function update($orgId)
    {
        $data['access_key_id'] = $this->makeAccessKeyId();
        $data['access_key_secret'] = $this->makeAccessKeySecret($data['access_key_id']);
        
        if (! ($number = AccessKeyModel::update($orgId, $data))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }
        return (boolean) $number;
    }

    /**
     * 删除数据
     *
     * @param int $orgId            
     * @throws ServiceException
     * @return boolean
     */
    public function destroy($orgId)
    {
        if (! ($number = AccessKeyModel::destroy($orgId))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }
        return (boolean) $number;
    }

    /**
     * 修改状态
     *
     * @param int $orgId            
     * @param int $status            
     * @throws ServiceException
     * @return boolean
     */
    public function saveItemStatus($orgId, $status)
    {
        if (! ($number = AccessKeyModel::update($orgId, [
            'status' => $status
        ]))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }
        return (boolean) $number;
    }

    /**
     * 获取详情数据
     *
     * @param int $orgId            
     * @throws ServiceException
     * @return array
     */
    public function findDetail($orgId)
    {
        $collection = AccessKeyModel::findByOrgId($orgId);
        if ($collection->isEmpty()) {
            throw new ServiceException(ServiceCode::SERVICE_NOT_EXIST_DATA);
        }
        return $collection;
    }
}