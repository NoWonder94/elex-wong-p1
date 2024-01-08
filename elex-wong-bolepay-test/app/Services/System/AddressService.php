<?php
namespace App\Services\System;
use App\Models\System\Address;
use Illuminate\Database\Query\Expression;
use SystemCache;

class AddressService extends \App\Services\BaseEloquentService {

   public function updateIncome($address,$money) {
       $address = Address::where('address',$address)->first();
       if(!$address){
           return false;
       }
       $address->income = new Expression("income + {$money}");
       $address->income_num = new Expression("income_num + 1");
       $address->save();
       return true;
    }
}