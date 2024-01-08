<?php 
namespace App\Models\Builders;

use Exception, Lang;

class SiteBuilder extends BaseBuilder {
    protected function initialize(){
        if (!defined('APP_CURRENT_SITE_ID') || APP_CURRENT_SITE_ID < 1) {
            throw new Exception('not define APP_CURRENT_SITE_ID');
        }
    }

    protected function setExtendWhere() {
        $this->bindWheres(['site_id' => APP_CURRENT_SITE_ID]);
    }

    protected function setExtendData(&$values) {
        $values['site_id'] = APP_CURRENT_SITE_ID;
    }

    protected function unsetExtendData(&$values) {
        unset($values['site_id']);
    }
}