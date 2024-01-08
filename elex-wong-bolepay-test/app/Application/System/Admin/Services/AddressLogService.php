<?php 
namespace App\Application\System\Admin\Services;

use App\Models\System\AddressLog;
use Strings;

class AddressLogService extends EloquentService {
    protected $model = AddressLog::class;
    
    public function lists($data = []) {
        $this->listFormatBuilder = function(&$builder, &$data, &$attributes) {
            $address = isset($data['address']) ? trim($data['address']) : '';
            if (!empty($address)) {
                $builder->where('address', $address);
            }
            
            $hash = isset($data['hash']) ? trim($data['hash']) : '';
            if (!empty($hash)) {
                $builder->where('hash', $hash);
            }
            
            $sn = isset($data['sn']) ? trim($data['sn']) : '';
            if (!empty($sn)) {
                $builder->where('related_key', $sn);
            }
        };

        return parent::lists($data);
    }

}
