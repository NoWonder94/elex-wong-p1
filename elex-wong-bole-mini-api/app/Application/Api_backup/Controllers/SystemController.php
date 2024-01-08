<?php
namespace App\Application\Site\Api\Controllers;

use App\Services\Site\VerifyCodeService;
use App\Application\Site\Api\Services\GamePlatformService;
use App\Application\Site\Api\Services\GameService;
use App\Application\Site\Api\Services\AdvService;
use App\Application\Site\Api\Services\ArticleService;
use App\Application\Site\Api\Services\UserService;
use App\Application\Site\Api\Services\UserDepositService;
use App\Application\Site\Api\Services\UserWithdrawService;
use App\Application\Site\Api\Services\ChatService;

use App\Application\Site\Api\Requests\UserRegRequest;
use App\Application\Site\Api\Requests\RepwdRequest;


use Request, Http, SiteSetting, Helper, Lang;

class SystemController extends BaseController {
    public function init() {
        $this->token['fingerprint'] = Request::header('FINGERPRINT');
    	$data = [
    		'site_name' => SiteSetting::get('site_name'),
    		'site_title' => SiteSetting::get('site_title'),
    		'site_keyword' => SiteSetting::get('site_keyword'),
    		'site_desc' => SiteSetting::get('site_desc'),
            'site_logo' => SiteSetting::get('site_logo'),
            'download_link' => SiteSetting::get('download_link'),
            'download_qrcode' => SiteSetting::get('download_qrcode'),
            'site_email' => SiteSetting::get('site_email'),
            'site_qq' => SiteSetting::get('site_qq'),
            'site_tel' => SiteSetting::get('site_tel'),
            'site_weixin' => SiteSetting::get('site_weixin'),
    		'game_platforms' => GamePlatformService::instance()->lists()->toArray(),
            'banks' => Lang::get('root::common.banks_names')
    	];
        $this->refreshToken();
    	$this->success($data);
    }

    /**
     * 刷新Token,延长有效期
     */
    public function refresh() {
        $this->refreshToken();
        $this->success();
    }

    public function advs() {
        $code = trim(Request::get('code'));
        if (empty($code)) {
            $this->error(['common.request_args_error', 'code']);
        }

        $advs = AdvService::instance()->get($code);
        if (!$advs) {
            $this->error(['common.request_args_error', 'code']);
        }

        $this->success($advs);
    }

    public function notice() {
        $this->success(ArticleService::instance()->getSystemNotice());
    }

    public function statistic() {
        $data = [
            'deposit' => [
                'avg_time' => UserDepositService::instance()->getAvgTime(),
                'success_rate' => UserDepositService::instance()->getSuccessRate(),
            ],
            'withdraw' => [
                'avg_time' => UserWithdrawService::instance()->getAvgTime(),
                'success_rate' => UserWithdrawService::instance()->getSuccessRate(),
            ],
            'wins' => GameService::instance()->getWins($this->token['client']),
            'prizepool' => '--'
        ];
        $xml = Http::get('http://www.tickerassist.co.uk/ProgressiveTickers/WebServiceProgressiveTickerXMLAll.asmx/tickerXMLFeedAll');
        $xml = simplexml_load_string($xml);
        $money = 0;
        foreach ($xml->Counter as $item) {
            $money += (float)$item->jackpotCValue;
        }

        if ($money > 0) {
            $data['prizepool'] = $money;
        }
        $this->success($data);
    }

    public function login() {
    	$name = trim(Request::get('name'));
        $pwd  = trim(Request::get('pwd'));
        $alisc  = Request::get('alisc');
        $verifyCode = trim(Request::get('verify_code'));

        if (empty($name)) {
            $this->error('common.user.name_required', 'name');
        }

        if (empty($pwd)) {
            $this->error('common.user.pwd_required', 'pwd');
        }

        /*if (empty($alisc) || !Helper::validateAlisc($this->token['client'], $alisc)) {
            $this->error('common.user.alisc_required', 'alisc');
        }

        //如果验证码不为空是，进行验证
        if (!empty($verifyCode) && 
            VerifyCodeService::instance()->check($this->userId, $this->sid, VERIFY_CODE_SEND_TYPE_IMAGE, 'login', $verifyCode)) {
            $this->error(['common.user.verify_code_error', 'verify_code']);
        }*/

        $userAgent = Request::header("USER_AGENT");
        $result = UserService::instance()->login($name, $pwd, $userAgent, $this->token['client'], $alisc);
        $this->refreshToken($result['user']);
        $result['user'] = ['name' => $result['user']->name];
        $this->success($result);
    }

    public function reg(UserRegRequest $request) {
        $alisc  = Request::get('alisc');
        if (empty($alisc) || !Helper::validateAlisc($this->token['client'], $alisc)) {
            $this->error('common.user.alisc_required', 'alisc');
        }
        
        UserService::instance()->reg($request->formatAll(), $this->token['source'], $this->token['fingerprint']);
        $this->success();
    }

    public function repwd(RepwdRequest $request) {
        $result = UserService::instance()->repwd($request->get('account'), $request->get('verify_code'), $request->get('pwd'));
        $this->resetToken(0);
        $this->success();
    }

    public function logout() {
        if ($this->user) {
            try {
                UserService::instance()->logout($this->user);
            } catch(\Exception $e) {

            }
        }
        $this->resetToken(0);
        $this->success();
    }

    public function check() {
        $key = (string)Request::get('key');
        if (!in_array($key, ['name', 'email', 'mobile'])) {
            $this->error(['common.request_args_error', 'key']);
        }

        $val = (string)Request::get('value');
        if (empty($val)) {
            $this->error('common.request_args_error', 'value');
        }

        $is_encrypt = $key != 'name';

        $this->success(UserService::instance()->checkByField($key, $val, $is_encrypt));
    }

    public function browse() {
        if (!$this->user) {
            $this->success();
        }

        $link = trim(Request::get('url'));
        if (empty($link)) {
            exit;
        }

        $title = trim(Request::get('title'));
        if (empty($title)) {
            exit;
        }

        UserService::instance()->browse($this->user, $this->token['client'], $link, $title, Request::header("USER_AGENT"));
        $this->success();
    }

    /**
     * 获取聊天链接
     */
    public function getChatUrl(){
        $args = [
            'ip' => $this->token['ip'],
            'site_id' => APP_ROOT_SITE_ID
        ];
        if ($this->user) {
            $args['uid'] = $this->userId;
            $args['name'] = $this->user['name'];
        } else {
            $args['sid'] = $this->token['sid'];
        }
        if (APP_ROOT_SITE_ID == 14) {
            $chatUrl = 'https://lc.chat/now/2307771';
        } else {
            $chatUrl = ChatService::instance()->getUrl($args);
        } 
        $this->success(['chatUrl' => $chatUrl]);
    }
}