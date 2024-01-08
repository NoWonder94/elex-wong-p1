<?php

namespace App\Services;
use Hash, Lang, File, Config;

class BaseService {
	protected static $instances = [];

	public static function instance() {
        $class = get_called_class();
        if (isset(self::$instances[$class])) {
            return self::$instances[$class];
        }

        return new static;
    }

    protected function showSuccess($data = [], $msg = '') {
        $result         = [
            'status'    => true,
            'data'      => $data,
            'msg'       => $msg
        ];

        die(json_encode($result));
    }

    protected function showError($data = [], $msg = '') {
        $result         = [
            'status'    => false,
            'data'      => $data,
            'msg'       => $msg
        ];

        die(json_encode($result));
    }

    protected function encryptPwd($pwd) {
        return Hash::make($pwd);
    }

    protected function verifyPwd($pwd, $dbPwd) {
        return Hash::check($pwd, $dbPwd);
    }

    protected function calulateTotalList($list) {
        return count($list);
    }

    protected function paginateList($list, $page, $pageSize) {
        return array_slice($list, ($page - 1) * $pageSize, $pageSize);
    }

    protected function formatList($list, $totalList, $page, $pageSize) {
        $result         = [
            'list'      => $list,
            'total_list'=> $totalList,
            'total_page'=> ceil($totalList / $pageSize),
            'page'      => (int)$page,
            'page_size' => (int)$pageSize,
        ];

        return $result;
    }

    public function storeHTML($content, $folder, $id) {
        $fullPath = $this->getHtmlFullPath($folder, $id);
        file_put_contents($fullPath, $content);
    }

    public function getHTML($folder, $id) {
        $fullPath = $this->getHtmlFullPath($folder, $id);
        if (file_exists($fullPath)) {
            return file_get_contents($fullPath);
        }

        return null;
    }

    public function deleteHTML($folder, $id) {
        $fullPath = $this->getHtmlFullPath($folder, $id);
        if (file_exists($fullPath)) {
            File::delete($fullPath);
        }
    }

    private function getHtmlFullPath($folder, $id) {
        $folderPath = Config('resource.html.path') . '/' . $folder . '/';
        $this->createFolderByPath($folderPath);

        return $folderPath . $id;
    }

    protected function createFolderByPath($fullPath) {
        $fullPathArray = explode('/', $fullPath);
        if (count($fullPathArray) > 0) {
            $path = '/';
            foreach ($fullPathArray as $key => $val) {
                if ($val == '') {
                    continue;
                } else {
                    $path = $path . $val . '/';
                    if (!File::isDirectory($path)) {
                        File::makeDirectory($path, 0777, true, true);
                    }
                }
            }
        }
    }

    protected function formatImg($img) {
        if (str_contains($img, Config('resource.img.url'))) {
            $img = str_replace(Config('resource.img.url'), '', $img);
        }

        return $img;
    }

    protected function formatHtml($html) {
        if(file_exists(Config('resource.html.path') . $html)) {
            return file_get_contents(Config('resource.html.path') . $html);
        }
        return null;
    }

    protected function removeHtml($html) {
        if(file_exists(Config('resource.html.path') . $html)) {
            File::delete(Config('resource.html.path') . $html);
        }
    }
}
