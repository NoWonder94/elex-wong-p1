@extends('default._layouts.base')
@section('body')
    <div class="container fixed search-result-detail">
        <div class="abstract bg-default mt16">
            <div class="col-sm-8 col-md-8 col-lg-8 col-xs-12 profile-brief" style="padding-left: 0;">
                <div class="wp bg-default">
                    <div class="">
                        <div class="fl title">
                            <span>{{$data['job_title']}}</span>
                        </div>
                        <div class="clear" ></div>
                        <div class="years-experiences mt25">
                            <div><i class="icon-locate"></i><p>{{$data['job_location']}}</p></div>
                            <div><i class="icon-experience"></i><p>3-5 Years</p></div>
                            <div><i class="icon-degree"></i><p>{{$data['degree']}}</p></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 col-xs-12" style="padding-left: 0;padding-right: 0;">
                <div class="wp bg-default">
                    <div class="salary">
                        <span>{{ end( $data['salary_range_filters'])[array_keys(end( $data['salary_range_filters']))[0]]}}</span>
                    </div>
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <div class="details mt16 mb10">
            <div class="col-sm-8 col-md-8 col-lg-8 col-xs-12 left mb20 bg-default" style="">
                <div class="wp">
                    <div class="requirements">
                        <h3 class="">Requirments</h3>
                        <p>{{$data['job_description']}} </p>
                    </div>
                    <div class="address mt40 pb20">
                        <h3>Address <a href="http://map.google.com" target="_blank">See Map</a></h3>
                        <p>
                            {{$data['company_location']}}, {{$data['company_address']}}
                        </p>
                    </div>
                    <hr class="mt22 mb32">
                    <div class="related bt40">
                        <h3>Related Jobs <a href="search.php" class="gray">More</a></h3>
                        <div class="mt20">
                            <div class="col-sm-6 col-md-6 col-lg-6 col-xs-12 item" style="">
                                <div class="wp">
                                    <div class="c-logo">
                                        <a href="#"><img src="{{ Helper::resource('www/images/company/grab.png')}}" alt="" /></a>
                                    </div>
                                    <div class="c-details">
                                        <span class="title"><a href="#">Graphic Designer Graphic Designer Graphic Designer...</a></span>
                                        <span class="salary">20-50k</span>
                                        <span class="company">Purple Technology Pt..</span>
                                    </div>
                                    <div class="clear"></div>
                                </div>

                            </div>
                            <div class="col-sm-6 col-md-6 col-lg-6 col-xs-12 item last" style="">
                                <div class="wp">
                                    <div class="c-logo">
                                        <a href="#"><img src="{{ Helper::resource('www/images/company/facebook.png')}}" alt="" /></a>
                                    </div>
                                    <div class="col-md-8 c-details">
                                        <span class="title"><a href="#">Graphic Designer Graphic Designer Graphic Designer...</a></span>
                                        <span class="salary">20-50k</span>
                                        <span class="company">Purple Technology Pt..</span>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 right" style="padding-right: 0;">
                <div class="company-detals c-box bg-default">
                    <div class="inner">
                        <div class="logo mt15"><img src="{{$company['logo']}}" alt=""></div>
                        <div class="name gray6 f14">
                            <span>{{$company['name']}}</span>
                        </div>
                        <div class="scrap gray-9 f12">
                            <ul>
                                <li class="gray9 f12">{{$company['industry']}}</li>
                                <li class="gray9 f12">{{$company['company_size']}} Staffs</li>
                                <li class="gray9 f12">{{$company['website']}}</li>
                            </ul>
                        </div>
                        @if($company['is_verify'])
                        <img src="{{ Helper::resource('www/images/svg/icon-verify.svg')}}" alt="verify" class="verify" width="50" />
                        @endif
                    </div>
                </div>
                <div class="company-boss c-box bg-default mt16">
                    <h4>Boss</h4>
                    <div class="inner mt20">
                        <img src="{{$recruiter['avatar']}}" alt="" class="avatar mb10" width="60">
                        <span class="gray6 f14">{{$recruiter['first_name'] }} {{$recruiter['last_name']}}</span>
                        <span class="gray9 f12">{{ end($recruiter['roles'])['display_name'] }}</span>
                        <a href="#" class="btn btn-sm btn-blue btn-chat mt30" style="color: #ffffff;">Chat now</a>
                    </div>
                </div>
            </div>
            <div class="clear"></div>
        </div>

    </div>
@stop


@section('js')
    <script type="text/javascript">
        $(function(){

            $(".upload-item").click(function(){
                $(this).addClass("none");
                $(".show-change").removeClass("none");
                $(".show-change-hidden").addClass("none");
            });

            $(".x-click").click(function(){
                $(this).removeClass("none");
                $(".show-change").addClass("none");
                $(".show-change-hidden").removeClass("none");
                $(".upload-item").removeClass("none");

            });
        });

    </script>
@stop