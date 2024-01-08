<?php
namespace App\Models\Agency;

use App\Models\Model;
use Illuminate\Support\Facades\DB;

class OrgModel extends Model
{

    const TABLENAME = 'hs_agency_org';
    
    /**
     * 根节点ID
     */
    const ROOT_NODE_ID = 1;
    
    /**
     * CQ9 ID
     */
    const CQ9_NODE_ID = 10000;
    
    /**
     * 状态（正常）
     */
    const STATUS_ENABLE = 1;

    /**
     * 状态（禁用）
     */
    const STATUS_DISABLE = 2;

    public static function getStatusList()
    {
        return [
            self::STATUS_ENABLE,
            self::STATUS_DISABLE
        ];
    }

    /**
     * 查询一条数据
     *
     * @param int $id            
     * @param array $fields            
     * @return \Illuminate\Support\Collection
     */
    public static function findById($id, array $fields = [])
    {
        $query = self::dbTable();
        if (count($fields)) {
            $query->select($fields);
        }
        return $query->where('id', $id)->get();
    }

    /**
     * 查询多条数据（父ID）
     *
     * @param int $parentId            
     * @param array $fields            
     * @return \Illuminate\Support\Collection
     */
    public static function selectByParentId($parentId, array $fields = [])
    {
        $query = self::dbTable();
        if (count($fields)) {
            $query->select($fields);
        }
        return $query->where('status', self::STATUS_ENABLE)
            ->where('parent_id', $parentId)
            ->orderBy('sort', 'asc')
            ->get();
    }

    /**
     * 查询所有正常数据
     *
     * @param int $id
     * @return \Illuminate\Support\Collection
     */
    public static function selectAllById($id)
    {
        $path = (self::findById($id, ['path'])->shift())['path'];

        return self::dbTable()->where(function ($query) use ($id, $path) {
                $query->where('path', 'like', $path . '.%')
                    ->orWhere('id', '=', $id);
            })
            ->where('status', self::STATUS_ENABLE)
            ->orderBy('parent_id', 'asc')
            ->orderBy('sort', 'asc')
            ->get();
    }

    /**
     * 创建一条数据
     *
     * @param array $data            
     * @return false | id
     */
    public static function create(array $data = [])
    {
        $id = false;
        
        $data['status'] = self::STATUS_ENABLE;
        $data['created'] = $data['updated'] = time();
        
        DB::transaction(function () use ($data, &$id) {
            // 插入数据并获取ID
            $id = self::dbTable()->insertGetId($data);
            
            // 更新关联字段
            $parent = self::findById($data['parent_id'])->shift();
            
            $item['sort'] = $id;
            $item['path'] = $parent['path'] . '.' . $id;
            
            self::dbTable()->where('id', $id)->update($item);
        });
        
        return $id;
    }

    /**
     * 更新一条数据
     *
     * @param int $id            
     * @param array $data            
     * @return false | 1 | 0
     */
    public static function update($id, array $data = [])
    {
        if (! $id) {
            return false;
        }
        $data['updated'] = time();
        
        return self::dbTable()->where('id', $id)->update($data);
    }

    /**
     * 删除一条数据（逻辑删除）
     *
     * @param int $id            
     * @return false | 1 | 0（删除条数，0未删除）
     */
    public static function destroy($id)
    {
        $data['status'] = self::STATUS_DISABLE;
        
        return self::update($id, $data);
    }
}
