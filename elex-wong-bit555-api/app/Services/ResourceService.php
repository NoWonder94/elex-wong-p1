<?php

namespace App\Services;
use Lang, Time, File;

class ResourceService extends BaseService {
	public function upload($type, $resource) {
		$result 		= [
			'resource'	=> ''
		];

		switch ($type) {
			case 'img':
				$path 				= $this->getResourcePath($type);
				$name 				= $this->getResourceName($type);
				$result['resource'] = $path['path'] . $name;
				$this->storeResourceFile($resource, $path['full_path'] . $name);
				break;
            case 'html':
                $path = $this->getResourcePath($type);
				$name = $this->getResourceName($type);
                file_put_contents($path['full_path'] . $name, $resource);
                return $path['path'] . $name;
                break;
			default:
				Lang::get('lang.90011');
				break;
		}

		return $result;
	}

	private function getResourcePath($type) {
		$date 		= Time::convertToDate(UTC_CURRENT_TIME);
		$dateString = str_replace('-', '/', $date);
		$path 		= '/' . $type . '/' . $dateString . '/';
		$fullPath 	= Config('resource.' . $type . '.path') . $path;
		$this->createFolderByPath($fullPath);

		$result 		= [
			'path'		=> $path,
			'full_path'	=> $fullPath
		];

		return $result;
	}

	private function getResourceName($type) {
		return strtoupper($type) . '_' . UTC_CURRENT_TIME . Config('resource.' . $type . '.default_extension');
	}

	private function storeResourceFile($resource, $route) {
		$file = base64_decode(substr($resource, strpos($resource, ',') + 1));

		file_put_contents($route, $file);
	}
}
