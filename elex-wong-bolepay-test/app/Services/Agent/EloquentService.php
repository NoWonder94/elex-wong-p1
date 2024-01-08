<?php
namespace App\Services\Agent;

abstract class EloquentService extends \App\Services\BaseEloquentService {
    public function lists($data = []) {
        if ($this->listFormatBuilder === null || is_array($this->listFormatBuilder)) {
            $this->listFormatBuilder[] = function(&$builder, &$data, &$attributes) {
                $builder->where('agent_id', APP_CURRENT_AGENT_ID);
            };
        }
        return parent::lists($data);
    }

    public function get($key, $data = []) {
        if ($this->getFormatBuilder === null || is_array($this->getFormatBuilder)) {
            $this->getFormatBuilder[] = function(&$builder, $key, &$data) {
                $builder->where('agent_id', APP_CURRENT_AGENT_ID);
            };
        }
        return parent::get($key, $data);
    }

    public function save($data, $type) {
        if ($this->saveFormatModel === null || is_array($this->saveFormatModel)) {
            $this->saveFormatModel[] = function(&$model, &$data, &$attributes) {
                $model->where('agent_id', APP_CURRENT_AGENT_ID);
            };
        }

        if ($this->saveFormatData === null || is_array($this->saveFormatData)) {
            $this->saveFormatData[] = function(&$model, &$data, &$attributes) use ($type) {
                if ($type == 'update') {
                    unset($data['agent_id']);
                } else {
                    $data['agent_id'] = APP_CURRENT_AGENT_ID;
                }
            };
        }
        return parent::save($data, $type);
    }

    public function delete($key, $data = []) {
        if ($this->deleteFormatBuilder === null || is_array($this->deleteFormatBuilder)) {
            $this->deleteFormatBuilder[] = function(&$builder, &$key, &$data) {
                $builder->where('agent_id', APP_CURRENT_AGENT_ID);
            };
        }
        return parent::delete($key, $data);
    }

    public function toggle($data) {
        if ($this->toggleFormatBuilder === null || is_array($this->toggleFormatBuilder)) {
            $this->toggleFormatBuilder[] = function(&$builder, &$attributes, $primary_key) {
                $builder->where('agent_id', APP_CURRENT_AGENT_ID);
            };
        }
        return parent::toggle($data);
    }
}