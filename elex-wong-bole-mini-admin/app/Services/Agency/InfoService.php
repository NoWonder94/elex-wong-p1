<?php
namespace App\Services\Agency;

use App\Exceptions\Response\Service\ServiceException;
use App\Exceptions\Response\Service\ServiceCode;
use App\Models\Agency\RateModel;
use App\Models\Coin\AgencyModel as CoinAgencyModel;
use Helper\Timed;

class InfoService
{

    /**
     * 代理抽佣比例
     *
     * @return array
     */
    public function getAgencyRate($orgId)
    {
        $collection = RateModel::findByOrgId($orgId);
        
        return $collection->isNotEmpty() ? $collection->shift() : [
            'org_id' => $orgId,
            'rate' => 0,
            'rate_next' => 0
        ];
    }

    /**
     * 代理金币
     *
     * @return array
     */
    public function getAgencyCoin($orgId)
    {
        $collection = CoinAgencyModel::findByOrgId($orgId);
        
        return $collection->isNotEmpty() ? $collection->shift() : [
            'org_id' => $orgId,
            'total_in' => 0,
            'total_out' => 0,
            'current' => 0,
            'game' => 0,
            'agency' => 0
        ];
    }

    /**
     * 保存抽佣比例
     *
     * @param int $orgId            
     * @param number $rateNext            
     * @throws ServiceException
     * @return $this
     */
    public function saveItemRate($orgId, $rateNext)
    {
        if (! ($data = RateModel::findByOrgId($orgId)->shift())) {
            $data['rate_next'] = $data['rate'] = $rateNext;
            // 当月1日0点时间戳
            $data['rate_next_timed'] = Timed::getMonthCurrentTimed();
            
            // 创建数据
            if (! ($id = RateModel::createByOrgId($orgId, $data))) {
                throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
            }
        } else {
            $data['rate_next'] = $rateNext;
            // 下月1日0点时间戳
            $data['rate_next_timed'] = Timed::getMonthNextTimed();
            
            // 修改数据
            if (! ($number = RateModel::updateByOrgId($orgId, $data))) {
                throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
            }
        }
        return $this;
    }
}