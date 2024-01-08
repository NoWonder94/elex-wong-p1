<?php 
namespace App\Models\Builders;

use Illuminate\Database\Query\Builder;
use Illuminate\Database\ConnectionInterface;
use Illuminate\Database\Query\Grammars\Grammar;
use Illuminate\Database\Query\Processors\Processor;

class BaseBuilder extends Builder {
    protected $isExtendWhere = false;

    public function __construct(ConnectionInterface $connection,
                                Grammar $grammar,
                                Processor $processor) {
        $this->initialize();

        parent::__construct($connection, $grammar, $processor);
    }

    protected function initialize(){

    }

    protected function setExtendWhere() {
        
    }

    private function _setExtendWhere() {
        if (!$this->isExtendWhere) {
            $this->setExtendWhere();
            $this->isExtendWhere = true;
        }
    }

    protected function setExtendData(&$values) {

    }

    protected function unsetExtendData(&$values) {

    }

    protected function bindWheres($wheres) {
        if (count($this->wheres) == 0) {
            foreach ($wheres as $column => $value) {
                $this->where($this->from . '.' . $column, '=', $value);
            }
            return;
        }

        $type       = 'Basic';
        $operator   = '=';
        $boolean    = 'and';
        $wheres = array_reverse($wheres);
        
        foreach ($wheres as $column => $value) {
            $column = $this->from . '.' . $column;
            $where = compact('type', 'column', 'operator', 'value', 'boolean');
            array_unshift($this->wheres, $where);
            array_unshift($this->bindings['where'], $value);
        }
    }

	public function get($columns = ['*']) {
        $this->_setExtendWhere();
        return parent::get($columns);
    }

    public function insert(array $values) {
        $this->setExtendData($values);
        return parent::insert($values);
    }

    public function insertGetId(array $values, $sequence = null) {
        $this->setExtendData($values);
        return parent::insertGetId($values, $sequence);
    }

    public function update(array $values) {
        $this->_setExtendWhere();
        $this->unsetExtendData($values);
        return parent::update($values);
    }

    public function delete($id = null) {
        $this->_setExtendWhere();
        return parent::delete($id);
    }

    public function exists() {
        $this->_setExtendWhere();
        return parent::exists();
    }
}