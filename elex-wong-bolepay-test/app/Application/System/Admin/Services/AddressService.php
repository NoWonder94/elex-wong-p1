<?php 
namespace App\Application\System\Admin\Services;

use App\Models\System\Address;
use Strings;

class AddressService extends EloquentService {
    protected $model = Address::class;
    
    public function lists($data = []) {
        $this->listFormatBuilder = function(&$builder, &$data, &$attributes) {
            $address = isset($data['address']) ? trim($data['address']) : '';
            if (!empty($address)) {
                $builder->where('address', $address);
            }
        };

        return parent::lists($data);
    }
    
    
    public function save($data, $type) {
        $this->saveFormatData = function(&$model, &$data, &$attributes) use ($type) {
            if(substr($data['address'],0,2) != '0x'){
                $this->throwException('common.address.address_error');
            }
            if ($type == 'update' && $model->status == 2) {
                $this->throwException('common.address.status_error');
            }
        };
        return parent::save($data, $type);
    }
}
