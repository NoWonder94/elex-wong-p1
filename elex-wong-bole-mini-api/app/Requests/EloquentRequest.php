<?php 
namespace App\Requests;

use App\Events\RequestErrorEvent;
use Illuminate\Http\Request;
use Validator, Event, Lang;

class EloquentRequest extends Request {
	protected $action;

	public function validator($action) {
		$this->action = $action;
		$action = '_'.$action;
		if (method_exists($this, $action)) {
			$info = $this->$action();
			if ($info) {
				$validator = Validator::make($this->all(), $info[0], $info[1]);
	            if ($validator->fails()) {
	            	$error 		= $validator->errors();
	            	$field		= key($error);
	            	$lang_code	= explode('.', current(current($error)));
	                Event::fire(new RequestErrorEvent([
		                    'code'  => $lang_code[1], 
		                    'field' => $field, 
		                    'msg'   => Lang::get($lang_code[0] . '.code.' . $lang_code[1])
		                ]));
	                return false;
	            }
			}
        }

        return true;
	}

	public function output($field, $lang, $code) {
		Event::fire(new RequestErrorEvent([
	            'code'  => $code, 
	            'field' => $field, 
	            'msg'   => Lang::get($lang . '.code.' . $code)
	        ]));
	}

	public function formatAll() {
		return $this->all();
	}
}