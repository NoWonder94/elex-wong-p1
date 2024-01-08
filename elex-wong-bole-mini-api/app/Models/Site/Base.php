<?php 
namespace App\Models\Site;

use App\Models\Builders\SiteBuilder;

class Base extends \App\Models\Base {

	public function __construct(array $attributes = []) {
        parent::__construct($attributes);
        $this->hidden[] = 'site_id';
    }
	
	protected function newBaseQueryBuilder() {
        $conn = $this->getConnection();
        $grammar = $conn->getQueryGrammar();
        return new SiteBuilder($conn, $grammar, $conn->getPostProcessor());
    }
}