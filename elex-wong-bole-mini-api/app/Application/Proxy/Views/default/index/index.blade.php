@extends('default._layouts.base')
@section('body')
<div class="row">
    <h4 class="text-success">系统信息</h4>
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
    <h4 class="text-info">邀请信息</h4>
    <div class="widget box">
        <div class="widget-content no-padding">
            <table class="table table-hover table-striped table-bordered table-highlight-head">
                <tbody> 
                    <tr>
                        <th style="background:#efefef; width: 150px; text-align: left;">我的邀请码:</th>
                        <td>{{ $login_proxy['proxy_code'] }}</td> 
                    </tr>
                    <tr>
                        <th style="background:#efefef; width: 150px; text-align: left;">推广链接:</th>
                        <td>{{ $link }}</td> 
                    </tr>
                    <!--tr>
                        <th style="background:#efefef; width: 150px; text-align: left;">手机端邀请链接:</th>
                        <td>{{ $wap_link }}</td> 
                    </tr-->
                </tbody>
            </table>
        </div>
    </div>
    <h4 class="text-warning">系统公告</h4>
    <div class="widget box">
        <div class="widget-content no-padding">
            <table class="table table-hover table-striped table-bordered table-highlight-head">
                <tbody>
                    <tr>
                        <th style="background:#efefef;" >内容</th>
                        <th style="width: 20%;background:#efefef;" >创建时间</th>
                    </tr>
                    @foreach($bulletins as $bulletin)
                    <tr> 
                        <td>{{ $bulletin['content'] }}</td>
                        <td>{{ Time::toDate($bulletin['create_time']) }}</td> 
                    </tr> 
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>
@stop