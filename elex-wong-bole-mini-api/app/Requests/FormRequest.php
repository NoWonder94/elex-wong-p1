<?php 
namespace App\Requests;

use App\Events\RequestErrorEvent;
use App\Utils\FormRequest as BaseFormRequest;
use Lang, Event;

class FormRequest extends BaseFormRequest {
	protected function getValidatorInstance() {
		return parent::getValidatorInstance();
	}

	public function authorize() {
		return true;
	}

	public function rules() {
		return [];
	}

	public function messages() {
		return [];
	}

	public function response(array $errors) {
		$error 		= current($errors);
    	$field		= key($error);
    	$lang_code	= explode('.', current(current($error)));
        Event::fire(new RequestErrorEvent([
                'code'  => 99995, 
                'field' => $field,
                'msg'   => Lang::get($lang_code[0] . '.code.' . $lang_code[1])
            ]));
		Event::fire(new RequestErrorEvent($errors));
	}

	public function formatAll() {
		return $this->all();
	}
}