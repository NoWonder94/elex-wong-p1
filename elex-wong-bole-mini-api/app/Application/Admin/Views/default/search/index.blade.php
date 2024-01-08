@extends('default._layouts.base')
@section('body')
    <div class="container page-news search-item">
        <div class="search-item-input">
            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 show-col-lg-5-cx">
                <div class="form-group has-success has-feedback">
                    <div class="input-group input-group-lefet-border " style="">
                        <span class="input-group-addon"><img src="{{ Helper::resource('www/images/ico-search.svg')}}"></span>
                        <input type="text" class="form-control developer f16"  placeholder="Enter keywords" value="{{$joblist[0]['name']}}" style="padding-top: 12px;border: none;">
                        <span class="input-group-addon" style="padding-top: 15px;padding-bottom: 0;"><p style=" width: 1px; height: 15px; background-color: #d8d8d8;"></p></span>
                    </div>
                    <ul class="dropdown-menu dropdown-menu-developer" style="width: 90%">
                        @foreach($joblist as $key => $val)
                            @if($key <= 4)
                                @if($key == 0)
                                    <li><a href="#"><span>{{$val['name']}}</span></a></li>
                                @else
                                    <li><a href="#"><span></span>{{$val['name']}}</a></li>
                                @endif
                            @endif
                        @endforeach
                    </ul>
                    <div class="none joblistsval" data-code="{{ json_encode($joblist)  }}"></div>
                </div>
            </div>
            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 show-col-lg-5-cx show-col-md-5-cx" style="margin-left: -1.88px !important">
                <div class="form-group has-success has-feedback">
                    <div class="input-group input-group-right-border" style="z-index: 99999;border-radius: 0;">
                        <span class="input-group-addon"><img src="{{ Helper::resource('www/images/ico-adds.svg')}}"></span>
                        <input type="text" class="form-control manila-city f16" placeholder="Select your City" value="" style="padding-top: 12px;border: none;">
                    </div>
                    <ul class="dropdown-menu dropdown-menu-manila-city" style="width: 100%">
                        <li class="my-share">
                            <p class="gray9">MY LOCATION</p>
                            <span class="share-location blue">Share my current location <img class="fr mr10 manila-city-bnt manila-city-bnt-360" src="{{ Helper::resource('www/images/res.svg')}}"></span>
                            <span class="gray9 my-location loding-gif none"><img class="fl mr10 manila-city-bnt" width="20" height="20" src="{{ Helper::resource('www/images/loding.gif')}}"></span>
                            <span class="gray9 my-locations none">Share my current location<img class="fr mr10 manila-city-bnt show-shuaxin" width="20" height="20" src="{{ Helper::resource("www/images/res.svg")}}" style="margin-top: -5px;"></span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 show-col-lg-2-cx"  style="margin-left: -19px">
                <div class="form-group has-success has-feedback">
                    <div class="input-group  input-group-search-border search-btn-wp">
                        <a class="btn btn-default" href="#" role="button">Search</a>
                    </div>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    </div>
    <div class="page container page-news">
        <div class="mt16">
            <div class="col-xs-3 col-item-xs-left">
                <div class="pb-bg-item">
                    <p class="salary-range">Salary Range (Month)</p>
                    <div id="slider-range" class="mt20"></div>
                    <p class=" clear salary-range gray9 mb30 mt20" id="amount">PHP 20k - PHP 50k</p>
                </div>
                <div class="pb-bg-item">
                    <p>Experience</p>
                    <div class="checkbox">
                        <label>
                            <input checked="checked" type="checkbox">&nbsp;&nbsp;
                            All
                        </label>
                    </div>
                    @foreach($config_init['filters']['work_xps'] as $key => $val)
                        <div class="checkbox">
                            <label>
                                <input type="checkbox">&nbsp;&nbsp;
                                @foreach($val as $i => $v)
                                    {{$v}}
                                @endforeach
                            </label>
                        </div>
                    @endforeach
                </div>
                <div class="pb-bg-item">
                    <p>Education</p>
                    <div class="checkbox">
                        <label>
                            <input checked="checked"  type="checkbox">&nbsp;&nbsp;
                            All
                        </label>
                    </div>
                    @foreach($config_init['filters']['educations'] as $key => $val)
                        <div class="checkbox">
                            <label>
                                <input type="checkbox">&nbsp;&nbsp;
                                @foreach($val as $i => $v)
                                    {{$v}}
                                @endforeach
                            </label>
                        </div>
                    @endforeach
                </div>
                <div class="pb-bg-item">
                    <p>Company Size</p>
                    <div class="checkbox">
                        <label>
                            <input checked="checked" type="checkbox">&nbsp;&nbsp;
                            All
                        </label>
                    </div>
                    @foreach($config_init['inputs']['company_sizes'] as $key => $val)
                        <div class="checkbox">
                            <label>
                                <input type="checkbox">&nbsp;&nbsp;
                                @foreach($val as $i => $v)
                                    {{$v}}
                                @endforeach
                            </label>
                        </div>
                    @endforeach
                </div>
            </div>
            <div class="col-xs-9 col-item-xs-right">
                <ul class="nav nav-tabs sort">
                    <li role="presentation" class="tab first-child-nav text-left"" data-id="0"><a href="#">Sort by:</a></li>
                    <li role="presentation" class="tab active text-left" data-id="0"><a href="#">A.I.Recommend</a></li>
                    <li role="presentation" class="tab text-center" data-id="1"><a href="#">Highest Salary</a></li>
                    <li role="presentation" class="tab text-center" data-id="2"><a href="#">Most Recent</a></li>
                    <li role="presentation" class="tab text-right" data-id="3"><a href="#">Distance</a></li>
                </ul>
                <div class="col-xs-11 show-xs-11-cx">
                    @foreach($joblists as $val)
                        <article data-key="1" class="item search-thumbnail">
                            <div class="row col-sm-3 col-md-2 col-lg-2 col-xs-12">
                                <img src="{{$val['logo']}}">
                            </div>
                            <div class="row col-sm-8 col-md-9 col-lg-9 col-xs-12">
                                <div class="pl-col-zdy">
                                    <p>{{$val['name']}}</p>
                                    <p class="k-14k">{{$val['job_title']}}</p>
                                    <div class="k-14k-99">
                                        <span>{{$val['country']}} - {{$val['location']}}</span>|
                                        <span>{{ $val['xp_lvl_key'] }}</span>|
                                        <span>{{$val['degree']}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row col-sm-3 col-md-2 col-lg-2 col-xs-12 k-50k">
                                @foreach($val['salary_range_filters'] as $v)
                                    @foreach($v as $vs)
                                        <p>{{$vs}}</p>
                                    @endforeach
                                @endforeach
                            </div>
                            <div class="clear"></div>
                        </article>
                    @endforeach
                    <article data-key="2" class="item search-thumbnail">
                        <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                        </div>
                        <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <div class="pl-col-zdy">
                                <p>Java Developer</p>
                                <p class="k-14k">Yolo Technology Pte Ltd</p>
                                <div class="k-14k-99">
                                    <span>Manila City</span><i></i>
                                    <span>3-5 Years</span><i></i>
                                    <span>Degree</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                            20k -50k
                        </div>
                        <div class="clear"></div>
                    </article>
                    <article data-key="3" class="item search-thumbnail">
                        <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                        </div>
                        <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <div class="pl-col-zdy">
                                <p>Java Developer</p>
                                <p class="k-14k">Yolo Technology Pte Ltd</p>
                                <div class="k-14k-99">

                                    <span>Manila City</span><i></i>
                                    <span>3-5 Years</span><i></i>
                                    <span>Degree</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                            20k -50k
                        </div>
                        <div class="clear"></div>
                    </article>
                    <article data-key="4" class="item search-thumbnail">
                        <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                        </div>
                        <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <div class="pl-col-zdy">
                                <p>Java Developer</p>
                                <p class="k-14k">Yolo Technology Pte Ltd</p>
                                <div class="k-14k-99">

                                    <span>Manila City</span><i></i>
                                    <span>3-5 Years</span><i></i>
                                    <span>Degree</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                            20k -50k
                        </div>
                        <div class="clear"></div>
                    </article>
                    <article data-key="5" class="item search-thumbnail">
                        <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                        </div>
                        <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <div class="pl-col-zdy">
                                <p>Java Developer</p>
                                <p class="k-14k">Yolo Technology Pte Ltd</p>
                                <div class="k-14k-99">

                                    <span>Manila City</span><i></i>
                                    <span>3-5 Years</span><i></i>
                                    <span>Degree</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                            20k -50k
                        </div>
                        <div class="clear"></div>
                    </article>
                    <article data-key="1" class="item search-thumbnail">
                        <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                        </div>
                        <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <div class="pl-col-zdy">
                                <p>Java Developer</p>
                                <p class="k-14k">Yolo Technology Pte Ltd</p>
                                <div class="k-14k-99">

                                    <span>Manila City</span><i></i>
                                    <span>3-5 Years</span><i></i>
                                    <span>Degree</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                            20k -50k
                        </div>
                        <div class="clear"></div>
                    </article>
                    <article data-key="1" class="item search-thumbnail">
                        <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                        </div>
                        <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <div class="pl-col-zdy">
                                <p>Java Developer</p>
                                <p class="k-14k">Yolo Technology Pte Ltd</p>
                                <div class="k-14k-99">

                                    <span>Manila City</span><i></i>
                                    <span>3-5 Years</span><i></i>
                                    <span>Degree</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                            20k -50k
                        </div>
                        <div class="clear"></div>
                    </article>
                    <article data-key="1" class="item search-thumbnail">
                        <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                        </div>
                        <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <div class="pl-col-zdy">
                                <p>Java Developer</p>
                                <p class="k-14k">Yolo Technology Pte Ltd</p>
                                <div class="k-14k-99">

                                    <span>Manila City</span><i></i>
                                    <span>3-5 Years</span><i></i>
                                    <span>Degree</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                            20k -50k
                        </div>
                        <div class="clear"></div>
                    </article>
                    <article data-key="1" class="item search-thumbnail">
                        <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                        </div>
                        <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <div class="pl-col-zdy">
                                <p>Java Developer</p>
                                <p class="k-14k">Yolo Technology Pte Ltd</p>
                                <div class="k-14k-99">

                                    <span>Manila City</span><i></i>
                                    <span>3-5 Years</span><i></i>
                                    <span>Degree</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                            20k -50k
                        </div>
                        <div class="clear"></div>
                    </article>
                    <article data-key="1" class="item search-thumbnail">
                        <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                        </div>
                        <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <div class="pl-col-zdy">
                                <p>Java Developer</p>
                                <p class="k-14k">Yolo Technology Pte Ltd</p>
                                <div class="k-14k-99">

                                    <span>Manila City</span><i></i>
                                    <span>3-5 Years</span><i></i>
                                    <span>Degree</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                            20k -50k
                        </div>
                        <div class="clear"></div>
                    </article>
                    <article data-key="1" class="item search-thumbnail">
                        <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                        </div>
                        <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <div class="pl-col-zdy">
                                <p>Java Developer</p>
                                <p class="k-14k">Yolo Technology Pte Ltd</p>
                                <div class="k-14k-99">

                                    <span>Manila City</span><i></i>
                                    <span>3-5 Years</span><i></i>
                                    <span>Degree</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                            20k -50k
                        </div>
                        <div class="clear"></div>
                    </article>
                    <article data-key="1" class="item search-thumbnail">
                        <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                        </div>
                        <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <div class="pl-col-zdy">
                                <p>Java Developer</p>
                                <p class="k-14k">Yolo Technology Pte Ltd</p>
                                <div class="k-14k-99">

                                    <span>Manila City</span><i></i>
                                    <span>3-5 Years</span><i></i>
                                    <span>Degree</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                            20k -50k
                        </div>
                        <div class="clear"></div>
                    </article>
                    <article data-key="1" class="item search-thumbnail">
                        <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                        </div>
                        <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <div class="pl-col-zdy">
                                <p>Java Developer</p>
                                <p class="k-14k">Yolo Technology Pte Ltd</p>
                                <div class="k-14k-99">

                                    <span>Manila City</span><i></i>
                                    <span>3-5 Years</span><i></i>
                                    <span>Degree</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                            20k -50k
                        </div>
                        <div class="clear"></div>
                    </article>
                    <article data-key="1" class="item search-thumbnail">
                        <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                        </div>
                        <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <div class="pl-col-zdy">
                                <p>Java Developer</p>
                                <p class="k-14k">Yolo Technology Pte Ltd</p>
                                <div class="k-14k-99">

                                    <span>Manila City</span><i></i>
                                    <span>3-5 Years</span><i></i>
                                    <span>Degree</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                            20k -50k
                        </div>
                        <div class="clear"></div>
                    </article>
                    <article data-key="1" class="item search-thumbnail">
                        <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                        </div>
                        <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <div class="pl-col-zdy">
                                <p>Java Developer</p>
                                <p class="k-14k">Yolo Technology Pte Ltd</p>
                                <div class="k-14k-99">

                                    <span>Manila City</span><i></i>
                                    <span>3-5 Years</span><i></i>
                                    <span>Degree</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                            20k -50k
                        </div>
                        <div class="clear"></div>
                    </article>
                    <article data-key="1" class="item search-thumbnail">
                        <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                        </div>
                        <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <div class="pl-col-zdy">
                                <p>Java Developer</p>
                                <p class="k-14k">Yolo Technology Pte Ltd</p>
                                <div class="k-14k-99">

                                    <span>Manila City</span><i></i>
                                    <span>3-5 Years</span><i></i>
                                    <span>Degree</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                            20k -50k
                        </div>
                        <div class="clear"></div>
                    </article>
                    <article data-key="1" class="item search-thumbnail">
                        <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                        </div>
                        <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <div class="pl-col-zdy">
                                <p>Java Developer</p>
                                <p class="k-14k">Yolo Technology Pte Ltd</p>
                                <div class="k-14k-99">

                                    <span>Manila City</span><i></i>
                                    <span>3-5 Years</span><i></i>
                                    <span>Degree</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                            20k -50k
                        </div>
                        <div class="clear"></div>
                    </article>
                    <article data-key="1" class="item search-thumbnail">
                        <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                        </div>
                        <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <div class="pl-col-zdy">
                                <p>Java Developer</p>
                                <p class="k-14k">Yolo Technology Pte Ltd</p>
                                <div class="k-14k-99">

                                    <span>Manila City</span><i></i>
                                    <span>3-5 Years</span><i></i>
                                    <span>Degree</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                            20k -50k
                        </div>
                        <div class="clear"></div>
                    </article>
                    <article data-key="1" class="item search-thumbnail">
                        <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                        </div>
                        <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <div class="pl-col-zdy">
                                <p>Java Developer</p>
                                <p class="k-14k">Yolo Technology Pte Ltd</p>
                                <div class="k-14k-99">

                                    <span>Manila City</span><i></i>
                                    <span>3-5 Years</span><i></i>
                                    <span>Degree</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                            20k -50k
                        </div>
                        <div class="clear"></div>
                    </article>
                    <article data-key="1" class="item search-thumbnail">
                        <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                        </div>
                        <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <div class="pl-col-zdy">
                                <p>Java Developer</p>
                                <p class="k-14k">Yolo Technology Pte Ltd</p>
                                <div class="k-14k-99">

                                    <span>Manila City</span><i></i>
                                    <span>3-5 Years</span><i></i>
                                    <span>Degree</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                            20k -50k
                        </div>
                        <div class="clear"></div>
                    </article>
                    <article data-key="1" class="item search-thumbnail">
                        <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                        </div>
                        <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                            <div class="pl-col-zdy">
                                <p>Java Developer</p>
                                <p class="k-14k">Yolo Technology Pte Ltd</p>
                                <div class="k-14k-99">

                                    <span>Manila City</span><i></i>
                                    <span>3-5 Years</span><i></i>
                                    <span>Degree</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                            20k -50k
                        </div>
                        <div class="clear"></div>
                    </article>

                    <div class="none show-pager-item">
                        <article data-key="1" class="item search-thumbnail">
                            <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                            </div>
                            <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <div class="pl-col-zdy">
                                    <p>Java Developer</p>
                                    <p class="k-14k">Yolo Technology Pte Ltd</p>
                                    <div class="k-14k-99">

                                        <span>Manila City</span><i></i>
                                        <span>3-5 Years</span><i></i>
                                        <span>Degree</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                                20k -50k
                            </div>
                            <div class="clear"></div>
                        </article>
                        <article data-key="1" class="item search-thumbnail">
                            <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                            </div>
                            <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <div class="pl-col-zdy">
                                    <p>Java Developer</p>
                                    <p class="k-14k">Yolo Technology Pte Ltd</p>
                                    <div class="k-14k-99">

                                        <span>Manila City</span><i></i>
                                        <span>3-5 Years</span><i></i>
                                        <span>Degree</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                                20k -50k
                            </div>
                            <div class="clear"></div>
                        </article>
                        <article data-key="1" class="item search-thumbnail">
                            <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                            </div>
                            <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <div class="pl-col-zdy">
                                    <p>Java Developer</p>
                                    <p class="k-14k">Yolo Technology Pte Ltd</p>
                                    <div class="k-14k-99">

                                        <span>Manila City</span><i></i>
                                        <span>3-5 Years</span><i></i>
                                        <span>Degree</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                                20k -50k
                            </div>
                            <div class="clear"></div>
                        </article>
                        <article data-key="1" class="item search-thumbnail">
                            <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                            </div>
                            <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <div class="pl-col-zdy">
                                    <p>Java Developer</p>
                                    <p class="k-14k">Yolo Technology Pte Ltd</p>
                                    <div class="k-14k-99">

                                        <span>Manila City</span><i></i>
                                        <span>3-5 Years</span><i></i>
                                        <span>Degree</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                                20k -50k
                            </div>
                            <div class="clear"></div>
                        </article>
                        <article data-key="1" class="item search-thumbnail">
                            <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                            </div>
                            <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <div class="pl-col-zdy">
                                    <p>Java Developer</p>
                                    <p class="k-14k">Yolo Technology Pte Ltd</p>
                                    <div class="k-14k-99">

                                        <span>Manila City</span><i></i>
                                        <span>3-5 Years</span><i></i>
                                        <span>Degree</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                                20k -50k
                            </div>
                            <div class="clear"></div>
                        </article>
                        <article data-key="1" class="item search-thumbnail">
                            <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                            </div>
                            <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <div class="pl-col-zdy">
                                    <p>Java Developer</p>
                                    <p class="k-14k">Yolo Technology Pte Ltd</p>
                                    <div class="k-14k-99">

                                        <span>Manila City</span><i></i>
                                        <span>3-5 Years</span><i></i>
                                        <span>Degree</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                                20k -50k
                            </div>
                            <div class="clear"></div>
                        </article>
                        <article data-key="1" class="item search-thumbnail">
                            <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                            </div>
                            <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <div class="pl-col-zdy">
                                    <p>Java Developer</p>
                                    <p class="k-14k">Yolo Technology Pte Ltd</p>
                                    <div class="k-14k-99">

                                        <span>Manila City</span><i></i>
                                        <span>3-5 Years</span><i></i>
                                        <span>Degree</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                                20k -50k
                            </div>
                            <div class="clear"></div>
                        </article>
                        <article data-key="1" class="item search-thumbnail">
                            <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                            </div>
                            <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <div class="pl-col-zdy">
                                    <p>Java Developer</p>
                                    <p class="k-14k">Yolo Technology Pte Ltd</p>
                                    <div class="k-14k-99">

                                        <span>Manila City</span><i></i>
                                        <span>3-5 Years</span><i></i>
                                        <span>Degree</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                                20k -50k
                            </div>
                            <div class="clear"></div>
                        </article>
                        <article data-key="1" class="item search-thumbnail">
                            <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                            </div>
                            <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <div class="pl-col-zdy">
                                    <p>Java Developer</p>
                                    <p class="k-14k">Yolo Technology Pte Ltd</p>
                                    <div class="k-14k-99">

                                        <span>Manila City</span><i></i>
                                        <span>3-5 Years</span><i></i>
                                        <span>Degree</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                                20k -50k
                            </div>
                            <div class="clear"></div>
                        </article>
                        <article data-key="1" class="item search-thumbnail">
                            <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                            </div>
                            <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <div class="pl-col-zdy">
                                    <p>Java Developer</p>
                                    <p class="k-14k">Yolo Technology Pte Ltd</p>
                                    <div class="k-14k-99">

                                        <span>Manila City</span><i></i>
                                        <span>3-5 Years</span><i></i>
                                        <span>Degree</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                                20k -50k
                            </div>
                            <div class="clear"></div>
                        </article>
                        <article data-key="1" class="item search-thumbnail">
                            <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                            </div>
                            <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <div class="pl-col-zdy">
                                    <p>Java Developer</p>
                                    <p class="k-14k">Yolo Technology Pte Ltd</p>
                                    <div class="k-14k-99">

                                        <span>Manila City</span><i></i>
                                        <span>3-5 Years</span><i></i>
                                        <span>Degree</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                                20k -50k
                            </div>
                            <div class="clear"></div>
                        </article>
                        <article data-key="1" class="item search-thumbnail">
                            <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                            </div>
                            <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <div class="pl-col-zdy">
                                    <p>Java Developer</p>
                                    <p class="k-14k">Yolo Technology Pte Ltd</p>
                                    <div class="k-14k-99">

                                        <span>Manila City</span><i></i>
                                        <span>3-5 Years</span><i></i>
                                        <span>Degree</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                                20k -50k
                            </div>
                            <div class="clear"></div>
                        </article>
                        <article data-key="1" class="item search-thumbnail">
                            <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                            </div>
                            <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <div class="pl-col-zdy">
                                    <p>Java Developer</p>
                                    <p class="k-14k">Yolo Technology Pte Ltd</p>
                                    <div class="k-14k-99">

                                        <span>Manila City</span><i></i>
                                        <span>3-5 Years</span><i></i>
                                        <span>Degree</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                                20k -50k
                            </div>
                            <div class="clear"></div>
                        </article>
                        <article data-key="1" class="item search-thumbnail">
                            <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                            </div>
                            <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <div class="pl-col-zdy">
                                    <p>Java Developer</p>
                                    <p class="k-14k">Yolo Technology Pte Ltd</p>
                                    <div class="k-14k-99">
                                        <span>Manila City</span><i></i>
                                        <span>3-5 Years</span><i></i>
                                        <span>Degree</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                                20k -50k
                            </div>
                            <div class="clear"></div>
                        </article>
                        <article data-key="1" class="item search-thumbnail">
                            <div class="col-sm-3 col-md-2 col-lg-2 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <img src="{{ Helper::resource('www/images/company/grab.png')}}">
                            </div>
                            <div class="col-sm-7 col-md-8 col-lg-7 col-xs-12" style="padding-left: 0px;padding-right: 0px">
                                <div class="pl-col-zdy">
                                    <p>Java Developer</p>
                                    <p class="k-14k">Yolo Technology Pte Ltd</p>
                                    <div class="k-14k-99">

                                        <span>Manila City</span><i></i>
                                        <span>3-5 Years</span><i></i>
                                        <span>Degree</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 col-md-2 col-lg-3 col-xs-12 k-50k" style="padding-left: 0px;padding-right: 0px">
                                20k -50k
                            </div>
                            <div class="clear"></div>
                        </article>
                    </div>
                </div>
                <div class="clear load-more text-center load-more-show">Load more</div>
                <div class="clear text-center load-more-none none">
                    <nav aria-label="Page navigation">
                        <ul class="pagination pagination-lg mt30">
                            <li>
                                <a href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li class="active"><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                            <li>
                                <a href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>

@stop
@section('js')
    <script type="text/javascript">
        var latLngData = "{{ Config::get('app.map.point') }}";
        $(function(){

            $(document).on('click', '.load-more-show',function(){
                if($("article").length >= 30){
                    $(".show-pager-item").removeClass("none");
                    $(".load-more-none").removeClass("none");
                    $(this).addClass("none");
                }else{
                    $(".show-pager-item").removeClass("none");
                }
            });
            $(document).on('click', '.mask',function(){
                $(this).addClass("none");
                $(".dropdown-menu-manila-city").hide();
                $(".dropdown-menu-developer").hide();
            });
            $(document).on('click', '.nav-tabs .tab',function(){
                if($(this).index() != 0){
                    $(this).parents(".nav-tabs").find(".tab").removeClass("active");
                    $(this).addClass("active");
                }
            });
            $(document).on('click', '.developer',function(){
                $(".mask").removeClass("none");
                $(".dropdown-menu-manila-city").hide();
                $(".dropdown-menu-developer").show();
            });

            $(document).on('click', 'article p',function(){
                var id = $(this).parents().parents().parents("article").attr('data-key');
                if(id){
                    window.location.href = "{{Helper::url('Search/detail')}}?id="+id;
                }
                return false;
            });
            $(document).on('click', '.dropdown-menu li a',function(){
                $(".mask").addClass("none");
                times = 0;
                $(".manila-city-bnt").removeClass("time").css("transform", "rotateZ(360deg)");
                if($(this).hasClass("keyword-c-name")){
                    var vlu = $(this).find("#c-name").text();
                }else{
                    var vlu = $(this).text();                    
                }
                $(this).parents().parents().parents(".form-group").find("input").val(vlu);
                $(".dropdown-menu-manila-city").hide();
                $(".dropdown-menu-developer").hide();
            });
            var times = 0;
            $(document).on('click', '.share-location',function(){

                $(".loding-gif").removeClass("none");
                $(".share-location").addClass("none");
                $(".show-shuaxin").attr("src","http://www.bossjob.com/www/images/loding.gif");
                $.functionPosition();
                
            });
            $(document).on('click', '.show-shuaxin',function(){
                $(".share-location").addClass("none");
                $(".show-shuaxin").attr("src","http://www.bossjob.com/www/images/loding.gif");
                $.functionPosition();
                
            });
            $( "#slider-range" ).slider({
                range: true,
                min: 0,
                max: 10,
                values: [ 0, 10 ],
                slide: function( event, ui ) {
                    var text = "";
                    if(ui.values[ 0 ] == 0){
                        text = "PHP " + ui.values[ 0 ] + "k - PHP " + ui.values[ 1 ]+"0k";
                    }else{
                        text = "PHP " + ui.values[ 0 ] + "0k - PHP " + ui.values[ 1 ]+"0k";
                    }
                    $( "#amount" ).text(text);
                }
            });
            $( "#amount" ).text( "PHP " + $( "#slider-range" ).slider( "values", 0 ) + "k - PHP " + $( "#slider-range" ).slider( "values", 1 )+"0k" );

            $(".developer").keyup(function(){
                var keys = $(this).val();
                var job_lists = eval( $(".joblistsval").attr("data-code"));
                var arr = [];
                for(var i=0;i<job_lists.length;i++){
                    if(job_lists[i].name.indexOf(keys)>=0){
                        if(arr.length == 5){
                            break;
                        }
                        arr.push(job_lists[i].name);
                    }
                }
                var html = "";
                $.each( arr,function(i,v){
                    html += "<li><a href='#'><span>"+keys+"</span>"+v.replace(keys,"")+"</a></li>";
                });
                $(".dropdown-menu-developer").html("");
                $(".dropdown-menu-developer").html(html);
            });
            $(".manila-city").keyup(function(){
                var keyword = $(this).val();
                 $.postCdata(keyword);

            })
            $(".manila-city").click(function(){
                $(".mask").removeClass("none");
                //$.postCdata($(this).val());
                $(".dropdown-menu-manila-city").show();
                $(".dropdown-menu-developer").hide();
            });

            
            $.postCdata = function(keyword){
                if(!keyword){
                    return false;
                }     
                $(".share-location").addClass("none");
                $(".loding-gif").removeClass("none");
                 $.ajax({
                    type:"post",
                    url:"{{Helper::url('Search/map')}}",
                    data:{
                        keyword : keyword,
                        location : latLngData
                    },
                    dataType: "json",
                    async:true,
                    success:function(data){
                        var html = '<li class="my-share"><p class="gray9">MY LOCATION</p><span class="share-location blue">Share my current location <img class="fr mr10 manila-city-bnt manila-city-bnt-360" src="{{ Helper::resource('www/images/res.svg')}}"></span><span class="gray9 my-location loding-gif none"><img class="fl mr10 manila-city-bnt" width="20" height="20" src="{{ Helper::resource('www/images/loding.gif')}}"></span><span class="gray9 my-locations none">Share my current location<img class="fr mr10 manila-city-bnt show-shuaxin" width="20" height="20" src="{{ Helper::resource("www/images/res.svg")}}" style="margin-top: -5px;"></span></li>';

                        $.each( data,function(i,v){
                            if(i < 5){
                                html += "<li><a href='#' class='keyword-c-name'><span class='blue'>"+keyword+"</span> <span id='c-name'>"+v.name.replace(keyword,"")+"</span> </a></li>";
                            }else{

                            }
                        });
                        $(".dropdown-menu-manila-city").html("");
                        $(".dropdown-menu-manila-city").html(html);
                    }
                });  
            }
            
            $(document).on('click', '.manila-city-bnt',function(){
               $.functionPosition();
            });
            $.functionPosition = function(){

                var getOptions = {
                      //是否使用高精度设备，如GPS。默认是true
                      enableHighAccuracy:true,
                      //超时时间，单位毫秒，默认为0
                      timeout:5000,
                      //使用设置时间内的缓存数据，单位毫秒
                      //默认为0，即始终请求新数据
                      //如设为Infinity，则始终使用缓存数据
                      maximumAge:0
                 };
                  
                if (navigator.geolocation) {
                    //获取当前地理位置信息 
                    navigator.geolocation.getCurrentPosition(showPosition, showError,getOptions);
                 } else {
                      alert("你的浏览器不支持HTML5来获取地理位置信息。");
                }
            };

            function showPosition(position){
                var  html;
                latLngData = position.coords.latitude+","+position.coords.longitude;
                html += '<img class="fr mr10 manila-city-bnt show-shuaxin" width="20" height="20" src="{{ Helper::resource("www/images/res.svg")}}" style="margin-top: -5px;">';
                obj.html(html);
            }
            function showError(error){
                var obj = $(".my-locations"), html;
                switch(error.code){
                      case error.PERMISSION_DENIED:
                        html  = "User denied the request for Geolocation.";
                       break;
                      case error.POSITION_UNAVAILABLE:
                       html  = "Location information is unavailable.";
                       break;
                      case error.TIMEOUT:
                       html  = "The request to get user location timed out.";
                       break;
                      case error.UNKNOWN_ERROR:
                       html  = "An unknown error occurred.";
                       break;
                  }
                html += '<img class="fr mr10 manila-city-bnt show-shuaxin" width="20" height="20" src="{{ Helper::resource("www/images/res.svg")}}" style="margin-top: -5px;">';
                obj.html(html);
                $(".loding-gif").addClass("none");
                $(".my-locations").removeClass("none");
            }
        });
    </script>
    <script async defer
            src="https://maps.googleapis.com/maps/api/js?key={{ Config::get('app.map.key') }}">
    </script>
@stop