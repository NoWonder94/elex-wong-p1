<?php 
namespace App\Application\Proxy\Services;

use App\Models\Site\ProxyBank;
use Time, DB;

class ProxyBankService extends EloquentService { 
    public function lists($data = []) { 

        $this->listFormatBuilder = function(&$builder, &$data, &$attributes) {
            $builder->where('proxy_id', APP_CURRENT_PROXY_ID);  
        };
        return parent::lists($data);
    } 
    
    public function get($key, $data = []) { 
        $this->getFormatBuilder = function(&$builder, &$key, &$data) {
            return $builder->where('id', $key)->where('proxy_id', APP_CURRENT_PROXY_ID)->first();
        };
        return parent::get($key, $data);
    }

    public function getDefaultBank() {
        $proxyBank = ProxyBank::where('is_default', 1)->where('proxy_id', APP_CURRENT_PROXY_ID)->first();
        if (isset($proxyBank->id)) {
            return $proxyBank;
        } else {
            return ProxyBank::where('proxy_id', APP_CURRENT_PROXY_ID)->first();
        }
    }
    
    public function save($data, $type) {
        $that = $this; 
        
        $this->saveFormatData = function(&$model, &$data, &$attributes) use ($type, $that) {
            $count = ProxyBank::where('is_default', 1)->count(); 
            $data['proxy_id'] = APP_CURRENT_PROXY_ID;
            $data['is_default'] = $count > 0 ? 0 : 1;
            if ($type != 'update') {
                $total = ProxyBank::where('proxy_id', APP_CURRENT_PROXY_ID)->count();
                if ($total >= 5) {
                    $this->throwException('common.proxy.bank_add_limited');
                }
                $data['create_time'] = UTC_TIME; 
            }  
        };
        return parent::save($data, $type);
    }
    
    public function option($id) {  
        try {
            DB::connection()->beginTransaction();
            ProxyBank::where('proxy_id', APP_CURRENT_PROXY_ID)->update(['is_default'=>0]);
            ProxyBank::where('proxy_id', APP_CURRENT_PROXY_ID)->where('id', $id)->update(['is_default'=>1]); 
            DB::connection()->commit();
        } catch(\Exception $e) {
            DB::connection()->rollback();
            throw $e;
        }
        return true;
    }
    
    public function delete($key, $data = []) { 
        $this->deleteFormatBuilder = function(&$builder, &$key, &$data) {
            $builder->where('id', $key);
        };
        if (parent::delete($key, $data)) {
            $count = ProxyBank::where('is_default', 1)->where('proxy_id', APP_CURRENT_PROXY_ID)->count(); 
            if ($count <= 0) {
                $proxyBank = ProxyBank::where('proxy_id', APP_CURRENT_PROXY_ID)->first();
                $proxyBank->is_default = 1;
                $proxyBank->save();
            }
            return true;
        } else {
            return false;
        }
    } 
}