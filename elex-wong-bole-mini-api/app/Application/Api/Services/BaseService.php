<?php
	namespace App\Application\Api\Services;

	class BaseService extends \App\Services\BaseService {
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

            if (is_array($data)) {
                $level++;
                foreach ($data as $key => $value) {
                    if (is_object($value) || is_array($value) && $level < 6) {
                        $data[$key] = $this->dataToArray($value, $level);
                    }
                }
            }

            return $data;
        }

        public function error($msg = '', $data = null) {
            $info = [
                'status' => false,
                'data'   => $data,
                'msg'    => $msg
            ];

            $this->output($info);
        }

        public function success($data = null, $msg = '') {
            $info = [
                'status' => true,
                'data'   => $data,
                'msg'    => $msg
            ];

            $this->output($info);
        }

        
	    public function getColumnByLang($table, $lang) {
	    	$column = '';

            switch ($lang) {
                case 'chi':
                    $column = $table . '.chinese';
                    break;
                case 'eng':
                    $column = $table . '.english';
                    break;
                case 'kr':
                    $column = $table . '.korean';
                    break;
                default:
                    $column = $table . '.chinese';
                    break;
            }

            return $column;
	    }

        public function getFileFormat($file) {
            $array = explode('.', $file);
            $fileFormat = array_pop($array);
            
            return $fileFormat;
        }
	}
?>