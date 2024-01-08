<?php
if (strtolower($_SERVER['REQUEST_SCHEME']) != 'https') {
	$url = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header('Location:'.$url);
	exit;
}

if (count($paths) < 1) {
	exit;
}
define('APP_SITE_DOMAIN', array_shift($paths));