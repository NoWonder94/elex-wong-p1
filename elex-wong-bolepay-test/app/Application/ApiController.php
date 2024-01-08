<?php

namespace App\Application;

use App\Events\RequestErrorEvent;
use Event;

abstract class ApiController extends BaseController {

    public function __construct() {
        parent::__construct();
        $controller = $this;
        Event::listen(RequestErrorEvent::class, function($event) use ($controller) {
            $error  = $event->getError();
            $field  = isset($error['field']) ? $error['field'] : '';
            $response = $controller->error($error['msg'], $field);
            die($response);
        });
    }

    /**
     * 输出状态码
     * @param  int $code 状态码
     * @return void
     */
    public function error($msg = '', $data = null) {
        $info = [
            'status' => false,
            'data'   => null,
            'msg'    => $msg
        ];
        $this->output($info);
    }

    /**
     * 输出数据
     * @param  array $data 数据
     * @return void
     */
    public function success($data = null, $msg = '') {
        $info = [
            'status' => true,
            'data'   => $data,
            'msg'    => $msg
        ];
        $this->output($info);
    }

    /**
     * 输出API数据
     * @param  array $info 输出信息
     * @return void
     */
    protected function output($info) {
        if ($info['data']) {
            if (is_object($info['data']) || is_array($info['data'])) {
                $info['data'] = $this->dataToArray($info['data']);
            }
        }
        die(json_encode($info));
    }

    protected function dataToArray($data, $level = 0) {
        if (is_object($data)) {
            $data = $data->toArray();
        }

        if(is_array($data)) {
            $level++;
            foreach ($data as $key => $value) {
                if (is_object($value) || is_array($value) && $level < 6) {
                    $data[$key] = $this->dataToArray($value, $level);
                }
            }
        }

        return $data;
    }
}
