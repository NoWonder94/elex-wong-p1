<?php
if (count($paths) < 1) {
	exit;
}
define('APP_SITE_DOMAIN', array_shift($paths));