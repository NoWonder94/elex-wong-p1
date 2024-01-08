<?php
namespace App\Models\Coin\Order;

use App\Models\Model;
use App\Exceptions\Response\Service\ServiceException;
use App\Exceptions\Response\Service\ServiceCode;
use Exception;

class AgencyErrorModel extends Model
{

    const TABLENAME = 'hs_coin_order_agency_error';

    /**
     * 创建一条数据
     *
     * @param int $orderId            
     * @param Exception $e            
     * @return array
     */
    public static function create($orderId, Exception $e)
    {
        $data['order_id'] = $orderId;
        $data['cause'] = self::makeErrorCause($e);
        $data['created'] = time();
        
        self::dbTable()->insert($data);
    }

    /**
     * 制作错误原因
     *
     * @param Exception $e            
     * @return string | null
     */
    private static function makeErrorCause(Exception $e)
    {
        $cause = $e->getMessage();
        if ($e instanceof ServiceException) {
            switch ($e->getCode()) {
                case ServiceCode::SERVICE_COIN_EMPTY:
                    $cause = '持有金币为空';
                    break;
                case ServiceCode::SERVICE_COIN_LACK:
                    $cause = '持有金币不足';
                    break;
                case ServiceCode::SERVICE_ACTION_SAVE_ERROR:
                    $cause = '订单处理失败';
                    break;
            }
        }
        return $cause;
    }
}
