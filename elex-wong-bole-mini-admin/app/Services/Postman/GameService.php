<?php
namespace App\Services\Postman;

use Illuminate\Support\Facades\App;
use App\Exceptions\Response\Service\ServiceException;
use App\Exceptions\Response\Service\ServiceCode;
use App\Models\App\SystemStateModel;
use Zttp\Zttp;

class GameService
{

    /**
     * 游戏配置更新通知
     *
     * @var string
     */
    const URI_GAME_CONFIG_UPDATE = '/gm/clientApi/flushOperatorConfig';

    /**
     * 获取机器人数量【游戏中】
     *
     * @var string
     */
    const URI_GAME_ING_ROBOT_COUNT = '/gm/clientApi/getGamingAICount';

    /**
     * 获取玩家数量【游戏中】
     *
     * @var string
     */
    const URI_GAME_ING_PLAYER_COUNT = '/gm/clientApi/getGamingPlayerCount';

    /**
     * 获取玩家数量【在线】
     *
     * @var string
     */
    const URI_GAME_ONLINE_PLAYER_COUNT = '/gm/clientApi/getOnlinePlayerCount';

    /**
     * 获取游戏详情【麻将】
     *
     * @var string
     */
    const URI_GAME_PLAYBACK = '/gm/clientApi/getPlaybackInfo';
    
    /**
     * 设置玩家访问权限
     *
     * @var string
     */
    const URI_GAME_PLAYER_SET_ACCESS = '/gm/clientApi/setPlayerAccess';
    
    /**
     * 设置玩家角色
     *
     * @var string
     */
    const URI_GAME_PLAYER_SET_ROLE = '/gm/clientApi/setPlayerRole';
    
    /**
     * 制作链接地址
     *
     * @param string $uri            
     * @return string
     */
    protected static function makeUri($uri)
    {
        return rtrim(config('app.domain.game'), '/') . $uri;
    }

    /**
     * 制作 CURL 对象
     *
     * @throws ServiceException
     * @return \Zttp\Zttp
     */
    protected static function makeZttp()
    {
        $token = SystemStateModel::findByType(SystemStateModel::TYPE_GM_TOKEN)->shift();
        // 游戏服务 token 不存在
        if (empty($token)) {
            throw new ServiceException(ServiceCode::SERVICE_GAME_SERVICE_NOT_EXIST_TOKEN);
        }
        // 超时时间 10 秒
        return Zttp::timeout(10)->asFormParams()->withHeaders([
            'token' => (json_decode($token['info'], true))['token']
        ]);
    }

    /**
     * POST 公共请求
     *
     * @param string $uri            
     * @param array $data            
     * @return array
     * @throws ServiceException
     */
    protected static function post($uri, $data)
    {
        try {
            $response = self::makeZttp()->post($uri, $data);
        } catch (\Zttp\ConnectionException $e) {
            throw new ServiceException(ServiceCode::SERVICE_GAME_SERVICE_REQUEST_TIMEOUT);
        }
        // HTTP错误
        if (! $response->isOk()) {
            throw new ServiceException(ServiceCode::SERVICE_GAME_SERVICE);
        }
        // 返回数据
        $result = $response->json();
        
        // 游戏服务错误
        if (isset($result['error'])) {
            if ($result['error']['code'] == - 8) {
                throw new ServiceException(ServiceCode::SERVICE_GAME_SERVICE_SYSTEM_ERROR);
            } else {
                throw new ServiceException(ServiceCode::SERVICE_GAME_SERVICE, $result['error']['msg']);
            }
        }
        
        return $result;
    }

    /**
     * 游戏配置更新通知
     *
     * @param array $data            
     * @throws ServiceException
     * @return boolean
     */
    public static function configUpdate($data)
    {
        $uri = self::makeUri(self::URI_GAME_CONFIG_UPDATE);
        
        $result = self::post($uri, $data);
        
        return true;
    }

    /**
     * 获取机器人数据【游戏中】
     *
     * @param array $data            
     * @throws ServiceException
     * @return array
     */
    public static function gameRobotCount(array $data = [])
    {
        $uri = self::makeUri(self::URI_GAME_ING_ROBOT_COUNT);
        
        $result = self::post($uri, $data);
        
        return $result['data'];
    }

    /**
     * 获取玩家数据【游戏中】
     *
     * @param array $data            
     * @throws ServiceException
     * @return array
     */
    public static function gamePlayerCount(array $data = [])
    {
        $uri = self::makeUri(self::URI_GAME_ING_PLAYER_COUNT);
        
        $result = self::post($uri, $data);
        
        return $result['data'];
    }

    /**
     * 获取玩家数据【在线】
     *
     * @param array $data            
     * @throws ServiceException
     * @return array
     */
    public static function onlinePlayerCount(array $data = [])
    {
        $uri = self::makeUri(self::URI_GAME_ONLINE_PLAYER_COUNT);
        
        $result = self::post($uri, $data);
        
        return $result['data'];
    }

    /**
     * 获取游戏回放
     *
     * @param array $data            
     * @throws ServiceException
     * @return array
     */
    public static function gamePlayback(array $data = [])
    {
        $uri = self::makeUri(self::URI_GAME_PLAYBACK);
        
        $result = self::post($uri, $data);
        
        return $result['data'];
    }
    
    /**
     * 设置玩家访问权限
     *
     * @param array $data
     * @throws ServiceException
     * @return boolean
     */
    public static function setPlayerAccess($data)
    {
        $uri = self::makeUri(self::URI_GAME_PLAYER_SET_ACCESS);
        
        $result = self::post($uri, $data);
        
        return true;
    }
    
    /**
     * 设置玩家角色
     *
     * @param array $data
     * @throws ServiceException
     * @return boolean
     */
    public static function setPlayerRole($data)
    {
        $uri = self::makeUri(self::URI_GAME_PLAYER_SET_ROLE);
        
        $result = self::post($uri, $data);
        
        return true;
    }
}