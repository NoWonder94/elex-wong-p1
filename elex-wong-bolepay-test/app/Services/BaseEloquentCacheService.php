<?php 
namespace App\Services;

abstract class BaseEloquentCacheService extends BaseEloquentService {
    use CacheService;
}
