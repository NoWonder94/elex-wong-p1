@extends('default._layouts.base')
@section('body')
<div class="row">
    <div class="widget box">
        <div class="widget-content no-padding">
            <table class="table table-hover table-striped table-bordered table-highlight-head">
                <tbody>
                    <tr>
                        <th class="tright" style="background:#efefef;" width="120">服务器操作系统:</th>
                        <td>{{ PHP_OS }}&nbsp;&nbsp;{{ CLIENT_IP }}</td>
                        <th class="tright" style="background:#efefef;" width="120">Web 服务器:</th>
                        <td>{{ $_SERVER['SERVER_SOFTWARE'] }}</td>
                    </tr>
                    <tr>
                        <th class="tright" style="background:#efefef;">PHP 版本:</th>
                        <td>{{ PHP_VERSION }}</td>
                        <th class="tright" style="background:#efefef;">系统版本:</th>
                        <td>1.0</td>
                    </tr>
                    <tr>
                        <th class="tright" style="background:#efefef;">系统时间:</th>
                        <td>{{ Time::toDate(UTC_TIME) }}</td>
                        <th class="tright" style="background:#efefef;">系统时区:</th>
                        <td>{{ date_default_timezone_get() }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
@stop