<?php
namespace App\Application\Site\Api\Controllers;

use App\Models\Site\UserGameBet;
use App\Models\Site\UserDeposit;
use App\Models\Site\UserBonus;
use BigDB, Helper, Config, Request, Storage;

class ElsController extends BaseController {
    
    public function create() {
        set_time_limit(0);
        $els = include APP_SITE_PATH . 'config/els.php';
        
        /*$params = [
            'index' => "system_{$key}",
            'body' => [
                'mappings' => [ 
                    '_doc' => [
                        '_source' => [
                            'enabled' => true
                        ],
                        'properties' => $data
                    ]
                ]
            ]
        ];
        var_dump("system_{$key}");
        $response = $client->indices()->create($params);
        var_dump($response);

        $client = BigDB::getClient('newsite');
        foreach ($els['system'] as $key => $data) {
            try {
                $params = ['index' => "system_{$key}"];
                $response = $client->indices()->delete($params);
                var_dump($response);
            } catch(\Exception $e) {

            }

            $params = [
                'index' => "system_{$key}",
                'body' => [
                    'mappings' => [ 
                        '_doc' => [
                            '_source' => [
                                'enabled' => true
                            ],
                            'properties' => $data
                        ]
                    ]
                ]
            ];
            var_dump("system_{$key}");
            $response = $client->indices()->create($params);
            var_dump($response);
        }
        exit;*/

        $client = BigDB::getClient('site');
        foreach ($els['site'] as $key => $data) {
            try {
                $params = ['index' => "fafa_site_{$key}"];
                $response = $client->indices()->delete($params);
                var_dump($response);
            } catch(\Exception $e) {

            }

            $params = [
                'index' => "fafafa_site_{$key}",
                'body' => [
                    'mappings' => [ 
                        '_doc' => [
                            '_source' => [
                                'enabled' => true
                            ],
                            'properties' => $data
                        ]
                    ]
                ]
            ];

            var_dump("fafafa_site_{$key}");
            $response = $client->indices()->create($params);
            var_dump($response);
        }
    }

    public function reset() {
        $els = include APP_SITE_PATH . 'config/els.php';
        $client = BigDB::getClient('site');

        $db = Request::get('db');

        $params = ['index' => "fafafa_site_{$db}"];
        $response = $client->indices()->delete($params);
        var_dump($response);

        $params = [
            'index' => "fafafa_site_{$db}",
            'body' => [
                'mappings' => [ 
                    '_doc' => [
                        '_source' => [
                            'enabled' => true
                        ],
                        'properties' => $els['site'][$db]
                    ]
                ]
            ]
        ];
        $response = $client->indices()->create($params);
        var_dump($response);
    }

    public function test() {
        $client = BigDB::getClient('site');
        $els = include APP_SITE_PATH . 'config/els.php';
        $db = Request::get('db');

        try {
            $params = ['index' => "fafa_site_{$db}"];
            $response = $client->indices()->delete($params);
            var_dump($response);
        } catch(\Exception $e) {
            
        }

        $params = [
            'index' => "fafa_site_{$db}",
            'body' => [
                'mappings' => [ 
                    '_doc' => [
                        '_source' => [
                            'enabled' => true
                        ],
                        'properties' => $els['site'][$db]
                    ]
                ]
            ]
        ];
        $response = $client->indices()->create($params);

        var_dump($response);
        exit;

        UserBonus::where('id', 77)
                 ->where('status', '<>', 1)
                 ->get();
        exit;

        /*$data = array (
          'template_id' => 16,
          'money' => 300,
          'bet_money' => 5400,
          'game_platform_code' => '',
          'status' => 1,
          'receive_time' => 1528754986,
          'remark' => 'asdf',
          'admin_id' => 1,
          'admin_name' => 'admin',
        );
        UserBonus::where('id', 77)
                 ->where('status', '<>', 1)
                 ->update($data);
        exit;
        $model = new UserDeposit;
        $model->getConnection()->beginTransaction();
        $model->user_name = 'test';
        $model->save();
        $model->getConnection()->commit();
        exit;

        var_dump(UserGameBet::find(2333478585));
        exit;

        var_dump(UserDeposit::get());
        exit;

        $params = ['index' => 'system_operation_log'];
        $response = $client->indices()->delete($params);
        var_dump($response);
        exit;

        $result = UserGameBet::select('SUM(bets) AS sum_bets, AVG(integral) AS agv_integral, MAX(winning) AS max_winning, MIN(bets) AS min_bets, COUNT(exchange_ratio) AS count_ratio')
                             ->where('create_time', '>', 1510819209)
                             ->where('create_time', '<', 1510819241)
                             ->orderBy('create_time', 'DESC')
                             ->groupBy('game_id')
                             ->groupBy('create_hour')
                             ->get();

        $result = UserGameBet::where('id' ,2333478595)
                             ->orderBy('create_time', 'ASC')
                             ->get();

        var_dump($result->toArray());
        exit;

        $params = ['index' => 'site_user_game_bet'];
        $response = $client->indices()->delete($params);*/

        /*$response = $client->indices()->getMapping(['index'=>'site_login_history']);
        var_dump($response);
        exit;

        $params = ['index' => 'site_user_game_bet1'];
        $response = $client->indices()->delete($params);
        var_dump($response);*/

        $params = [
    'index' => 'site_user_game_bet1',
    'body' => [
        'mappings' => [ 
            '_doc' => [
                '_source' => [
                    'enabled' => true
                ],
                'properties' => [
                    'bet_sn' => [
                        'type' => 'keyword'
                    ],
                    'game_platform_code' => [
                        'type' => 'keyword'
                    ],
                    'user_id' => [
                        'type' => 'integer'
                    ],
                    'user_name' => [
                        'type' => 'keyword'
                    ],
                    'game_id' => [
                        'type' => 'integer'
                    ],
                    'game_name' => [
                        'type' => 'keyword'
                    ],
                    'balance' => [
                        'type' => 'double'
                    ],
                    'bets' => [
                        'type' => 'double'
                    ],
                    'winning' => [
                        'type' => 'double'
                    ],
                    'real_win' => [
                        'type' => 'double'
                    ],
                    'exchange_ratio' => [
                        'type' => 'double'
                    ],
                    'integral' => [
                        'type' => 'double'
                    ],
                    'create_time' => [
                        'type' => 'integer'
                    ],
                    'create_date' => [
                        'type' => 'integer'
                    ],
                    'create_hour' => [
                        'type' => 'short'
                    ],
                    'is_send_integral' => [
                        'type' => 'short'
                    ],
                    'data' => [
                        'type' => 'text',
                        'index' => false
                    ]
                ]
            ]
        ]
    ]
];
        
        $response = $client->indices()->create($params);
        var_dump($response);
        exit;
    }
}