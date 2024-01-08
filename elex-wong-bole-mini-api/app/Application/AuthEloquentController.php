<?php
namespace App\Application;

use Request, Lang, Helper;

trait AuthEloquentController {
    use EloquentController;

    protected function indexDataShare() {}
    protected function allDataShare($id = 0) {}
    protected function authIndex($tpl = 'index') {
        $this->eloquentLists();
        $this->indexDataShare();
        $this->allDataShare();

        if (Request::ajax()) {
            return $this->display($tpl . '_ajax');
        } else {
            return $this->display($tpl);
        }
    }

    protected function addDataShare() {}
    protected function detailDataShare($id = 0) {}
    protected function authAdd($tpl = 'detail') {
        $this->addDataShare();
        $this->detailDataShare();
        $this->allDataShare();
        return $this->display($tpl);
    }

    protected function editDataShare($id) {}
    protected function authEdit($tpl = 'detail') {
        $id = trim(Request::get('id'));
        if (empty($id)) {
            return $this->error(Lang::get('root::common.not_data'));
        }

        $result = $this->eloquentGet();
        if ($result === false) {
            return $this->error(Lang::get('root::common.not_data'));
        }

        $this->editDataShare($id);
        $this->detailDataShare($id); 
        $this->allDataShare($id);
        $this->share('data', $result);
        return $this->display($tpl);
    }

    protected function authStore() {}
    public function authCreate() {
        $this->authStore();

        $result = $this->eloquentCreate();
        if ($result === false) {
            return $this->error(Lang::get('root::common.create_error'));
        }
        $this->createLog();
        return $this->success(Lang::get('root::common.create_success'), Helper::url(APP_CONTROLLER_NAME.'/add'));
    }

    public function authUpdate() {
        $this->authStore();

        $return_url = Request::get('__RETURN_URL__');

        $result = $this->eloquentUpdate();
        if ($result === false) {
            return $this->error(Lang::get('root::common.update_error'));
        }

        if (empty($return_url)) {
            $return_url = Helper::url(APP_CONTROLLER_NAME.'/index');
        }
        $this->createLog();
        return $this->success(Lang::get('root::common.update_success'), $return_url);
    }

    public function authDelete() {
        $id = Request::get('id');
        if (empty($id)) {
            return $this->error(Lang::get('root::common.not_data'));
        }
        
        $result = $this->eloquentDelete();
        if ($result === false) {
            return $this->error(Lang::get('root::common.delete_error'));
        }
        $this->createLog();
        return $this->success(Lang::get('root::common.delete_success'), urldecode(Request::get('__RETURN_URL__')));
    }

    public function authToggle() {
        $id = Request::get('id');
        if (empty($id)) {
            return $this->error(Lang::get('root::common.not_data'));
        }
        $result = $this->eloquentToggle();
        if ($result === false) {
            return $this->error(Lang::get('root::common.update_error'));
        }
        $this->createLog();
        return $this->success(Lang::get('root::common.update_success'));
    }
}
