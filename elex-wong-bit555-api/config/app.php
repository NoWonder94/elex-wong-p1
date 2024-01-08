<?php

return [
	'debug'                 		=> env('APP_DEBUG', false),
	'encrypter' 					=> [
		'key'						=> 'OwS9gnL21xsRlsdF8c7mBS6bJMLKBNvI',
		'iv'						=> 'KXpZE8BUYOSsdLA8',
		'cipher'					=> 'AES-256-CBC',
	],
	'available_device_type_list'	=> [
		'pc',
		'mobile',
		'app',
	],
	'default_settings'				=> [
		'page'						=> 1,
		'page_size'					=> 20,
	],
];