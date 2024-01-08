<?php 
namespace App\Database\ElasticSearch;

class TermsAggregation extends \ONGR\ElasticsearchDSL\Aggregation\Bucketing\TermsAggregation {
	private $size = 500000;

	public function setSize($size) {
        $this->size = $size;
    }

    public function getSize() {
        return $this->size;
    }

	public function getArray() {
        $data = parent::getArray();
        $data['size'] = $this->getSize();
        return $data;
    }
}