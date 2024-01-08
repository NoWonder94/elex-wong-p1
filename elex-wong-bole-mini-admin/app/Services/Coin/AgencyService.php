<?php
namespace App\Services\Coin;

use App\Exceptions\Response\Service\ServiceException;
use App\Exceptions\Response\Service\ServiceCode;
use App\Models\Coin\AgencyModel as CoinAgencyModel;

class AgencyService
{

    /**
     * 验证当前持有金币
     *
     * @param int $orgId            
     * @param int $amount            
     * @throws ServiceException
     * @return array
     */
    public function verifyCoinCurrent($orgId, $amount)
    {
        // 获取代理金币
        if (! ($coin = CoinAgencyModel::findByOrgId($orgId)->shift())) {
            throw new ServiceException(ServiceCode::SERVICE_COIN_EMPTY);
        }
        // 检查金币数量是否足够
        if ($coin['current'] < $amount) {
            throw new ServiceException(ServiceCode::SERVICE_COIN_LACK);
        }
        return $coin;
    }

    /**
     * 金币充值（子级）
     *
     * @param int $orgId            
     * @param int $amount            
     * @throws ServiceException
     * @return void
     */
    public function coinIn($orgId, $amount)
    {
        if (CoinAgencyModel::findByOrgId($orgId)->isEmpty()) {
            // 代理不存在金币记录
            $data['org_id'] = $orgId;
            $data['total_in'] = $amount;
            $data['current'] = $amount;
            // 创建代理金币
            if (! ($status = CoinAgencyModel::create($data))) {
                throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
            }
        } else {
            // 代理存在金币记录
            // $data['total_in'] = $coin['total_in'] + $amount;
            // $data['current'] = $coin['current'] + $amount;
            
            // 金币增加【总充值金币】
            // 金币增加【当前持有金币】
            if (! ($status = CoinAgencyModel::coinIn($orgId, $amount))) {
                throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
            }
        }
    }

    /**
     * 金币提现（子级）
     *
     * @param int $orgId            
     * @param int $amount            
     * @throws ServiceException
     * @return void
     */
    public function coinOut($orgId, $amount)
    {
        // 验证当前持有金币
        $this->verifyCoinCurrent($orgId, $amount);
        
        // 制作数据
        // $data['total_out'] = $coin['total_out'] + $amount;
        // $data['current'] = $coin['current'] - $amount;
        
        // 金币增加【总提现金币】
        // 金币扣减【当前持有金币】
        if (! ($status = CoinAgencyModel::coinOut($orgId, $amount))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }
    }

    /**
     * 金币发放代理（父级）
     *
     * @param int $orgId            
     * @param int $amount            
     * @throws ServiceException
     * @return void
     */
    public function coinInAgency($orgId, $amount)
    {
        // 验证当前持有金币
        $this->verifyCoinCurrent($orgId, $amount);
        
        // 制作数据
        // $data['agency'] = $coin['agency'] + $amount;
        // $data['current'] = $coin['current'] - $amount;
        
        // 金币增加【发放代理金币】
        // 金币扣减【当前持有金币】
        if (! ($status = CoinAgencyModel::coinInAgency($orgId, $amount))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }
    }

    /**
     * 金币代理提现（父级）
     *
     * @param int $orgId            
     * @param int $amount            
     * @throws ServiceException
     * @return void
     */
    public function coinOutAgency($orgId, $amount)
    {
        // 制作数据
        // $data['agency'] = $coin['agency'] - $amount;
        // $data['current'] = $coin['current'] + $amount;
        
        // 金币扣减【发放代理金币】
        // 金币增加【当前持有金币】
        if (! ($status = CoinAgencyModel::coinOutAgency($orgId, $amount))) {
            throw new ServiceException(ServiceCode::SERVICE_ACTION_SAVE_ERROR);
        }
    }
}