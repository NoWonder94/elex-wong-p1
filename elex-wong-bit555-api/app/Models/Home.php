<?php
    namespace App\Models;
    use Config, Time;

    class Home extends Base {
        protected $table    = 'home';
        protected $appends  = ['img', 'create_time_datetime', 'update_time_datetime'];

        public function getImgAttribute() {
            if (isset($this->attributes['img']) && !empty($this->attributes['img'])) {
                return Config('resource.img.url') . $this->attributes['img'];
            }

            return null;
        }

        public function getCreateTimeDatetimeAttribute() {
            if (isset($this->attributes['create_time']) && !empty($this->attributes['create_time'])) {
                return Time::convertToDateTime($this->attributes['create_time']);
            }

            return null;
        }

        public function getUpdateTimeDatetimeAttribute() {
            if (isset($this->attributes['update_time']) && !empty($this->attributes['update_time'])) {
                return Time::convertToDateTime($this->attributes['update_time']);
            }

            return null;
        }

        public static function findById($id) {
            return Home::where('id', $id)->get()->first();
        }

        public static function findIsTopById($id = 0) {
            $where          = [];
            $where[]        = ['is_top', '=', 1];
            if ($id > 0) {
                $where[]    = ['id', '!=', $id];
            }

            return Home::where($where)->get()->first();
        }
    }
?>