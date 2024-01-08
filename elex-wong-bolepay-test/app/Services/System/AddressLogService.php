<?php
namespace App\Services\System;
use App\Models\System\AddressLog;
use SystemCache;

class AddressLogService extends \App\Services\BaseEloquentService {

   public function created($currency,$from_address,$address_id,$address,$hash,$amount,$related_key,$related_type) {
        $log = new AddressLog;
        $log->currency     = $currency;
        $log->address_id   = $address_id;
        $log->from_address  = $from_address;
        $log->address      = $address;
        $log->hash         = $hash;
        $log->amount        = $amount;
        $log->related_key  = $related_key;
        $log->related_type = $related_type;
        $log->create_time  = UTC_TIME;
        $log->create_date  = UTC_DAY;
        $log->create_hour       = UTC_HOUR_STR;
        return $log->save();
    }
}