<?php 
namespace App\Models\Builders;

use Illuminate\Database\Eloquent\Builder;

class SafeBuilder extends Builder {
    public function safeUpdate(array $values) {
        $values = $this->model->filterAttributes($values);
        if (count($values) == 0) {
            return false;
        }
        return $this->update($values);
    }

    public function safeToggle($filed, $val) {
        if (!$this->model->checkToggleAttributes($filed)) {
            return false;
        }
        return $this->update([$filed => $val]);
    }

    public function getOne($filed) {
        $result = $this->pluck($filed);
        if ($result) {
            return $result->get(0);
        }
        return $result;
    }

    public function withHidden($attributes) {
        return $this->model->makeVisible($attributes);
    }

    public function addHidden($attributes) {
        $this->model->addHidden($attributes);
        return $this;
    }

    public function removeVisible($attributes) {
        return $this->model->removeVisible($attributes);
    }

    public function setVisible($attributes) {
        return $this->model->setVisible($attributes);
    }

    public function getTable() {
        return $this->model->getTable();
    }

    public function getConnection() {
        return $this->model->getConnection();
    }
}