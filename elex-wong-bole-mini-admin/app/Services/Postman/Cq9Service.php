<?php
namespace App\Services\Postman;

use Illuminate\Support\Facades\App;
use App\Exceptions\Response\Cq9\Cq9Exception;
use App\Exceptions\Response\Cq9\Cq9Code;
use Zttp\Zttp;

class Cq9Service
{
    
    const AuthCodeTest = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnYW1laGFsbCI6ImNxOSIsInRlYW0iOiJCSiIsImp0aSI6IjM1OTI0MDIzMiIsImlhdCI6MTU0NDY2OTczNSwiaXNzIjoiQ3lwcmVzcyIsInN1YiI6IkdTVG9rZW4ifQ.98qcEsKlaYm6hcqnlasdZgfT75xE8ZI8cr1fr8fW1WY';
    
    const AuthCodePro = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnYW1laGFsbCI6ImNxOSIsInRlYW0iOiJCSiIsImp0aSI6IjM2NjM0Nzc2MiIsImlhdCI6MTU1MzU3OTMwMywiaXNzIjoiQ3lwcmVzcyIsInN1YiI6IkdTVG9rZW4ifQ.1UK-pQGLwLGwAP-ITbgODhRTtgqsIbi7Bg0ro9UQBSw';
    
    /**
     * 域名（测试）
     *
     * @var string
     */
    const URI_DOMAIN_TEST = 'http://api.cqgame.games';

    /**
     * 域名（正式）
     *
     * @var string
     */
    const URI_DOMAIN_PROD = 'https://apia.cqgame.cc';

    /**
     * 根据 Detail Token 获取玩家信息
     *
     * @var string
     */
    const URI_GAME_DETAILTOKEN = '/gamepool/cq9/game/detailtoken';

    /**
     * 制作链接地址
     *
     * @param string $uri            
     * @return string
     */
    protected static function makeUri($uri)
    {
        if (App::environment('cq9')) {
            return self::URI_DOMAIN_PROD . $uri;
        } else {
            return self::URI_DOMAIN_TEST . $uri;
        }
    }

    /**
     * 制作 CURL 对象
     *
     * @return \Zttp\Zttp
     */
    protected static function makeZttp()
    {
        $header['Authorization'] = App::environment('cq9') ? self::AuthCodePro :  self::AuthCodeTest;
        
        // 超时时间 10 秒
        return Zttp::timeout(10)->asFormParams()->withHeaders($header);
    }

    /**
     * POST 公共请求
     *
     * @param string $uri            
     * @param array $data            
     * @return array
     * @throws Cq9Exception
     */
    protected static function post($uri, $data)
    {
        try {
            $response = self::makeZttp()->post($uri, $data);
        } catch (\Zttp\ConnectionException $e) {
            throw new Cq9Exception(Cq9Code::HTTP_UNAUTHORIZED);
        }
        // HTTP错误
        if (! $response->isOk()) {
            throw new Cq9Exception(Cq9Code::HTTP_UNAUTHORIZED);
        }
        // 返回数据
        $result = $response->json();
        
        // 游戏服务错误
        if (isset($result['status']) && $result['status']['code'] > 0) {
            throw new Cq9Exception(Cq9Code::HTTP_UNAUTHORIZED);
        }
        
        return $result;
    }

    /**
     * 验证 detail token 并获取CQ9信息
     *
     * @param string $token            
     * @throws Cq9Exception
     * @return array
     */
    public static function getCq9DataByDetailToken($token)
    {
        $uri = self::makeUri(self::URI_GAME_DETAILTOKEN);
        
        $result = self::post($uri, [
            'token' => $token
        ]);
        
        return $result['data'];
    }

    /**
     * 获取详情页辅助信息
     *
     * @param string $token            
     * @throws Cq9Exception
     * @return array
     */
    public static function getAuxDetailByToken($token)
    {
        $data = self::getCq9DataByDetailToken($token);
        
        list ($aux['uid'], $aux['game_id'], $aux['room_id']) = explode('A', substr($data['roundid'], 2));
        
        $aux['report_id'] = $aux['room_id'];
        
        return array(
            'data' => $data,
            'aux' => $aux
        );
    }
}