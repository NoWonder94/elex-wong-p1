<?php
namespace App\Utils;

use Config;

class Resource {
    protected static function getLibrarie() {
        $class = 'App\\Libraries\\Resource\\'.Config::get('app.resource_type').'ResourceLibrarie';
        return new $class();
    }
    /**
     * 获取表单上传参数
     * @return [type] [description]
     */
    public static function getFormArgs($type = 'image', $dir = '', $callbackUrl = ''){
        $allow_types = [
            'image' => 'jpg'
        ];
        if (!isset($allow_types[$type])) {
            return false;
        }

        $resource = self::getLibrarie();
        $dir  = empty($dir) ? $type . 's/' : $dir . '/' . $type . 's/';
        $path = Time::toDate(UTC_TIME, 'Y/m/d') . '/' . Helper::getSn() . '.' . $allow_types[$type];
        return $resource->getFormArgs($dir, $path, $type, $callbackUrl);
    }

    public static function upload($data, $path){
        $resource = self::getLibrarie();
        return $resource->upload($data, $path);
    }

    /**
     * 删除
     * @param  array $paths 路径数组
     * @return boolean
     */
    public static function remove($paths){
        $resource = self::getLibrarie();
        return $resource->remove($paths);
    }

    /**
     * 移动
     * @param  [type] $formPath [description]
     * @param  [type] $dir      [description]
     * @return [type]           [description]
     */
    public static function move($formPath, $dir){
        $resource = self::getLibrarie();
        return $resource->move($formPath,$dir);
    }

    public static function getImageInfo($img) {
        $image_info = getimagesize($img);
        if ($image_info !== false) {
            $info = array(
                "width"     => $image_info[0],
                "height"    => $image_info[1],
                "size"      => filesize($img)
            );
            return $info;
        } else {
            return false;
        }
    }
}