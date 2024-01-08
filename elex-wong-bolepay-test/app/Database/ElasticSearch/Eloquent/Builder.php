<?php
namespace App\Database\ElasticSearch\Eloquent;

class Builder extends \Illuminate\Database\Eloquent\Builder {

	public function scroll(&$scrollId) {
        $builder = $this->applyScopes();

        $models = $this->model->hydrate(
            $this->query->scroll($scrollId)->all()
        )->all();

        if (count($models) > 0) {
            $models = $builder->eagerLoadRelations($models);
        }

        return $builder->getModel()->newCollection($models);
    }
}
