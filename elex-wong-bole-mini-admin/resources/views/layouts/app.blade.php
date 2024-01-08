<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Page Title-->
    <title>@yield('title') - @lang('globe.site_name')</title>
    <!--  Page Scripts-->
    @yield('script')
    <!--  Page Styles-->
    @yield('style')
</head>
<body>
<div id="app">
    @yield('content')
</div>
</body>
</html>