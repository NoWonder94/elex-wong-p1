<?php
    namespace App\Application\Api\Controllers;
    use Illuminate\Http\Request;

    class BoleController extends BaseController { 
        public function getList() {
            $url = 'https://api.cdmolo.com:16800/v1/activity/get_race_list?';
            $accessKeyId = '8c1c0f56-7067-4817-86a9-ac8c18d47d48';
            $accessKeySecret = '28BD552311A8E07F0F1BA519DFEF06CD13AE28A1';
            $time = time();
            $nonce = $time;
            $timestamp = $time;
            $sign = strtolower(sha1($accessKeySecret . $nonce . $timestamp));
            $startTime = '1514736000';
            $endTime = '1609689600';
            $pageSize = 10000;

            $urlParams = 'AccessKeyId=' . $accessKeyId . '&AccessKeySecret=' . $accessKeySecret . '&Timestamp=' . $timestamp . '&Nonce=' . $nonce . '&Sign=' . $sign . '&start_time=' . $startTime . '&end_time=' . $endTime . '&page_size=' . $pageSize;

            $curl = curl_init();
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $urlParams);
            $result = curl_exec($curl);
            curl_close($curl);

            $list = [];
            if (!empty($result)) {
                $list = json_decode($result, true);
            }

            return $this->success($list);
        }

        public function getRankList() {
            $url = 'https://api.cdmolo.com:16800/v1/activity/get_race_log_all?';
            $accessKeyId = '8c1c0f56-7067-4817-86a9-ac8c18d47d48';
            $accessKeySecret = '28BD552311A8E07F0F1BA519DFEF06CD13AE28A1';
            $time = time();
            $nonce = $time;
            $timestamp = $time;
            $sign = strtolower(sha1($accessKeySecret . $nonce . $timestamp));
            $startTime = '1514736000';
            $endTime = '1609689600';
            $pageSize = 10000;

            $urlParams = 'AccessKeyId=' . $accessKeyId . '&AccessKeySecret=' . $accessKeySecret . '&Timestamp=' . $timestamp . '&Nonce=' . $nonce . '&Sign=' . $sign . '&start_time=' . $startTime . '&end_time=' . $endTime . '&page_size=' . $pageSize;

            $curl = curl_init();
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $urlParams);
            $result = curl_exec($curl);
            curl_close($curl);

            $list = [];
            if (!empty($result)) {
                $pool = [2000, 3000];
                $result = json_decode($result, true);
                $result = $result['resp_data']['data'];
                foreach ($result as $key => $val) {
                    if (in_array($val['total_pool_gold'], $pool)) {
                        $val['activity_time'] = gmdate("Y-m-d", $val['activity_time']);
                        if (!array_key_exists($val['activity_time'], $list)) {
                            $list[$val['activity_time']] = [];
                        }

                        if (isset($val['ext']['reward']) && !empty($val['ext']['reward'])) {
                            foreach ($val['ext']['reward'] as $playerKey => $playerVal) {
                                $firstName = substr($playerVal['account_id'], 0, 3);
                                $lastName = substr($playerVal['account_id'], -3);
                                $fullName = $firstName . '******' . $lastName;
                                array_push($list[$val['activity_time']], $fullName);
                            }
                        }
                    }
                }
            }

            return $list;
        }

        public function getRankListNew() {
            $url = 'https://api.cdmolo.com:16800/v1/activity/get_race_log_all?';
            //$accessKeyId = '8c1c0f56-7067-4817-86a9-ac8c18d47d48';
            //$accessKeySecret = '28BD552311A8E07F0F1BA519DFEF06CD13AE28A1';
            $time = time();
            $nonce = $time;
            $timestamp = $time;
            $sign = strtolower(sha1($nonce . $timestamp));
            $startTime = '1514736000';
            $endTime = '1609689600';
            $pageSize = 10000;

            $urlParams = 'Timestamp=' . $timestamp . '&Nonce=' . $nonce . '&Sign=' . $sign . '&start_time=' . $startTime . '&end_time=' . $endTime . '&page_size=' . $pageSize;

            $curl = curl_init();
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
            curl_setopt($curl, CURLOPT_POST, 1);
            //curl_setopt($curl, CURLOPT_POSTFIELDS, $urlParams);
            $result = curl_exec($curl);
            curl_close($curl);

            $result = json_decode($result, true);
            $result = $result['resp_data']['data'];
            echo '<pre>';
            print_r($result);
            exit;

            $list = [];
            if (!empty($result)) {
                $pool = [2000, 3000];
                $result = json_decode($result, true);
                $result = $result['resp_data']['data'];
                foreach ($result as $key => $val) {
                    if (in_array($val['total_pool_gold'], $pool)) {
                        $val['activity_time'] = gmdate("Y-m-d", $val['activity_time']);
                        if (!array_key_exists($val['activity_time'], $list)) {
                            $list[$val['activity_time']] = [];
                        }

                        if (isset($val['ext']['reward']) && !empty($val['ext']['reward'])) {
                            foreach ($val['ext']['reward'] as $playerKey => $playerVal) {
                                $firstName = substr($playerVal['account_id'], 0, 3);
                                $lastName = substr($playerVal['account_id'], -3);
                                $fullName = $firstName . '******' . $lastName;
                                array_push($list[$val['activity_time']], $fullName);
                            }
                        }
                    }
                }
            }

            return $list;
        }
    }
?>