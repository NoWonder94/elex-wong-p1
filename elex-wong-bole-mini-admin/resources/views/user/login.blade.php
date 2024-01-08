@extends('layouts.app')
@section('title', trans('globe.title.login'))
@section('content')
    <auth-login>
    </auth-login>
@endsection
@section('script')
    <script src="https://www.recaptcha.net/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit" async defer>
    </script>
    <script src="{{ mix('/js/user/login.js') }}" defer>
    </script>
@endsection
@section('style')
    <link href="{{ mix('css/user/login.css') }}" rel="stylesheet">
    <link href="/css/user/login_layout.css" rel="stylesheet">
@endsection