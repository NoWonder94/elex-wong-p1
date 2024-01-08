<?php
namespace App\Models\App\Multi;

use App\Models\App\Model;

class SettlementLogModel extends Model
{

    const TABLENAME = 't_settlement_multi_log';

    /**
     * 查询一条数据（房间ID）
     *
     * @param int $reportId            
     * @param array $fields            
     * @return \Illuminate\Support\Collection
     */
    public static function findByReportId($reportId, array $fields = [])
    {
        $query = self::dbTable();
        if (count($fields)) {
            $query->select($fields);
        }
        return $query->where('report_id', $reportId)->get();
    }
    
    /**
     * 获取游戏详情（一条）
     *
     * @param int $reportId
     * @return array
     */
    public static function getRecordDetails($reportId)
    {
        $data = self::findByReportId($reportId)->shift();
        
        return empty($data) ? [] : json_decode($data['details'], true);
    }
    
    /**
     * 获取玩家游戏明细（一条）
     *
     * @param int $uid            
     * @param int $reportId            
     * @return array
     */
    public static function getPlayerRecord($uid, $reportId)
    {
        $data = self::findByReportId($reportId)->shift();
        
        return empty($data) ? [] : json_decode($data['details'], true)[$uid];
    }
}
