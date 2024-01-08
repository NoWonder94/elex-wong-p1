<?php 
namespace App\Models\Builders;

trait BaseEloquentBuilder {
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
}