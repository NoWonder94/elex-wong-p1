<?php
namespace App\Application;

use Request, Lang, Helper, View;

trait AuthEloquentController {
    use EloquentController;

    protected function indexDataShare() {}
    protected function allDataShare($id = 0) {}
    protected function authIndex($tpl = 'index', $data = []) {
        $this->eloquentLists($data);
        $this->indexDataShare();
        $this->allDataShare();

        if (Request::ajax()) {
            return $this->display($tpl . '_ajax');
        } else {
            if (Request::get('no_menu')) {
                $tpl = 'no_'.$tpl;
            } 
            return $this->display($tpl);
        }
    }

    protected function ajaxListItem($data = [], $tpl = 'index') {
        if (isset($data['list'])) {
            $list = $data['list'];
        } else {
            $list = $this->getService()->lists($data);
        }
        $this->share('list', $list);
        $html = $this->display($tpl)->render();
        $html = preg_replace('/[\r\n]/', '', $html);
        preg_match("/<tbody class=\"list-tbody\">.*?<tr.+?>(.+)<\/tr>/", $html, $match);
        return trim($match[1]);
    }

    protected function addDataShare() {}
    protected function detailDataShare($id = 0, $data = []) {}
    protected function authAdd($tpl = 'detail') {
        $this->addDataShare();
        $this->detailDataShare();
        $this->allDataShare(); 
        if (Request::get('no_menu')) {
            $tpl = 'no_'.$tpl;
        } 
        return $this->display($tpl);
    }

    protected function editDataShare($id) {}

    protected function formatEditData(&$data){}
    protected function authEdit($tpl = 'detail') {
        $id = trim(Request::get('id'));
        if (empty($id)) {
            return $this->error(Lang::get('common.not_data'));
        }

        $result = $this->eloquentGet();
        if ($result === false) {
            return $this->error(Lang::get('common.not_data'));
        }
        $this->formatEditData($result);

        $this->editDataShare($id);
        $this->detailDataShare($id, $result); 
        $this->allDataShare($id);
        $this->share('data', $result);
        return $this->display($tpl);
    }

    protected function authStore() {}
    public function authCreate($data = [], $url = '') {
        $this->authStore();

        $result = $this->eloquentCreate($data);
        if ($result === false) {
            return $this->error(Lang::get('common.create_error'));
        }
        $this->createLog();

        if (empty($url)) {
            $url = Helper::url(APP_CONTROLLER_NAME.'/add');
        }
        return $this->success(Lang::get('common.create_success'), $url);
    }

    public function authUpdate($data = [], $url = '') {
        $this->authStore();

        $return_url = Request::get('__RETURN_URL__');

        $result = $this->eloquentUpdate($data);
        if ($result === false) {
            return $this->error(Lang::get('common.update_error'));
        }

        if (!empty($url)) {
            $return_url = $url;
        }

        if (empty($return_url)) {
            $return_url = Helper::url(APP_CONTROLLER_NAME.'/index');
        }
        $this->createLog();
        return $this->success(Lang::get('common.update_success'), $return_url);
    }

    public function authDelete() {
        $id = Request::get('id');
        if (empty($id)) {
            return $this->error(Lang::get('common.not_data'));
        }
        
        $result = $this->eloquentDelete();
        if ($result === false) {
            return $this->error(Lang::get('common.delete_error'));
        }
        $this->createLog();
        return $this->success(Lang::get('common.delete_success'), urldecode(Request::get('__RETURN_URL__')));
    }

    public function authToggle() {
        $id = Request::get('id');
        if (empty($id)) {
            return $this->error(Lang::get('common.not_data'));
        }
        $result = $this->eloquentToggle();
        if ($result === false) {
            return $this->error(Lang::get('common.update_error'));
        }
        $this->createLog();
        return $this->success(Lang::get('common.update_success'));
    }

    public function authExport($tpl = 'export', $data = []) {
        if (Request::ajax()) {
            $result = $this->eloquentExport($data);
            return $this->successData($result);
        } else {
            return $this->display($tpl);
        }
    }
}