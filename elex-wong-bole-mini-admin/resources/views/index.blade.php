<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <!--
        <title>
            @lang('globe.site_name')
        </title>
        -->
        <title>
            博乐小后台
        </title>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <!--
        <link href="{{ mix('css/app.css') }}" rel="stylesheet">
        -->
        <link href="{{ mix('css/vue.css') }}" rel="stylesheet">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
        <script src="{{ mix('js/app.js') }}" defer>
        </script>
    </head>
    <body>
        <div id="app">
        </div>
    </body>
</html>