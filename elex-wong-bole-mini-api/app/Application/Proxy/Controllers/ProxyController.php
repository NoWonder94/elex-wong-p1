<?php
namespace App\Application\Proxy\Controllers;
 
use App\Application\Proxy\Services\ProxyService;
use App\Application\Proxy\Services\ProxyBankService;
use Request, Helper;
class ProxyController  extends EloquentController { 

    public function edit() { 
        $request['id'] = APP_CURRENT_PROXY_ID;
        Request::replace($request);
        return $this->authEdit();
    }

    public function apply() { 
    	//查询代理银行卡
    	$proxyBank = ProxyBankService::instance()->getDefaultBank();
    	if (!isset($proxyBank->id)){
    		return $this->error('代理银行卡未添加', Helper::url('ProxyBank/add'));
    	}
    	//查询代理及时信息
    	$proxyInfo = ProxyService::instance()->getProxyInfo();
    	$this->share('proxy_info', $proxyInfo);
    	$this->share('proxy_bank', $proxyBank);
        return $this->display();
    }

    public function doApply() {
    	$result = ProxyService::instance()->withdraw(Request::get('pwd'));
    	if ($result) {
    		return $this->success('创建成功');
    	} else { 
    		return $this->error('创建失败');
    	}
    }

    public function update() {
        return $this->authUpdate();
    } 

}