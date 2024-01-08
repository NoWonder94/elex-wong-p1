<?php
namespace App\Models\Coin\Order;

use App\Models\Model;
use Illuminate\Support\Facades\DB;

class AgencyAuxModel extends Model
{

    const TABLENAME = 'hs_coin_order_agency_aux';

    private $year;

    private $month;

    /**
     * 查询一条数据
     *
     * @param int $orgId            
     * @return \Illuminate\Support\Collection
     */
    public function findByCurrent($orgId)
    {
        return self::dbTable()->where('org_id', $orgId)
            ->where('year', $this->year)
            ->where('month', $this->month)
            ->get();
    }

    /**
     * 创建一条数据
     *
     * @param int $orgId            
     * @return array
     */
    public function create($orgId)
    {
        $data['org_id'] = $orgId;
        $data['year'] = $this->year;
        $data['month'] = $this->month;
        $data['number'] = 1;
        
        self::dbTable()->insert($data);
        
        return $data;
    }

    /**
     * 数据自增
     *
     * @param int $orgId            
     * @return false | 1 | 0
     */
    public function inc($orgId)
    {
        self::dbTable()->where('org_id', $orgId)
            ->where('year', $this->year)
            ->where('month', $this->month)
            ->increment('number');
    }

    /**
     * 获取订单计数（以月为单位）
     *
     * @return false | string
     */
    public function getNumber($orgId)
    {
        if (! $orgId) {
            return false;
        }
        $this->year = date('Y');
        $this->month = date('m');
        
        $number = false;
        
        DB::transaction(function () use ($orgId, &$number) {
            if ($this->findByCurrent($orgId)->isEmpty()) {
                $this->create($orgId);
            } else {
                $this->inc($orgId);
            }
            $number = (self::findByCurrent($orgId)->shift())['number'];
        });
        
        return $number;
    }
}
