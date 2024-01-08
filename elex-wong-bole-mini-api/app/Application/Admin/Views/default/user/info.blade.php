@extends('default._layouts.base')

@section('body')
<div class="page container login-manage">
	<div class="mt16 mb10">
		<div class="">
			<div class="col-sm-8 col-md-8 col-lg-8 col-xs-12 profile-brief" style="padding-left: 0;">
				<div class="wp bg-default">
					<div class="rectangle-left-txt">
						<div class="fl">
							<p class="txt-html f-sans">{{$data['first_name']}} {{$data['last_name']}} . {{$data['age']}}</p>
							<p class="gray6 text-capitalize">{{$data['employment_status_key']}}</p>
						</div>
						<div class="text-center fr rectangle-left-portrait mb10">
							<img src="{{$data['avatar']}}" class="img-circle" width="80" height="80">
						</div>
						<div class="clear" ></div>
						<div class="years-experiences mt30 mb30">
							<div><i class="icon-experience"></i><p>{{$data['xp_lvl']}}</p></div>
							@if($data['latest_education'])
							<div><i class="icon-degree"></i><p>{{$data['latest_education']['degree']}}</p></div>
							@endif
							@if($data['latest_preference'])
							<div><i class="icon-experience_2"></i><p>{{$data['latest_preference']['salary_range_from']/1000}}k - $data['latest_preference']['salary_range_to']/1000}}k</p></div>
							@endif
							<div class="clear"></div>
						</div>
					</div>
				</div>
			</div>
			<?php
				//print_r(end($data['resumes'])['url']);exit;
			?>
			<form id="files_show"  name="index_form" role="form" method="post" class="form-horizontal" enctype="multipart/form-data">
				<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12" style="padding-left: 0;padding-right: 0;">
					<div class="wp bg-default">
						<div class="rectangle-right-txt">
							<p class="my-resume">My Resume</p>
							<div class="text-center mt10">
								<p><img src="{{ Helper::resource('www/images/icon_file_3x.png') }}"></p>
								<span class="show-change-hidden @if($data['resumes']) none @endif">PDF or JPEG File</span>
								<span class="show-change @if(!$data['resumes']) none @endif show-change-none ">
									<i class="file">
									{{ basename(end($data['resumes'])['url']) }}
									</i>
									<i class="ml10 x-click"></i> </span>
								<div class="">
									<button type="button" class="btn btn-sm change-resume show-change @if(!$data['resumes']) none @endif show-change-padding" style="width: 94px;height:26px;">
										Change
									</button>
									<button type="button" class="btn btn-sm btn-info upload-item @if($data['resumes']) none @endif" style="width: 94px;height:26px;">
										Upload
									</button>
								</div>
								<input type="file" name="file" id="upresume" accept="application/pdf,application/msword"  style="display: none;"/>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
		<div class="clear"></div>
	</div>
	<div class="experience-item">
		<div class="center-item clear">
			Experience
			<div class="line"></div>
		</div>
		<div class="center-item-show-ul">
			@if($data['work_xps'])
			<ul class="nav nav-item-cent-first">
				@foreach($data['work_xps'] as $key => $val)
				<li class="li-img @if($key) mt40 @endif">
					<i></i>
					<ul class="nav nav-item-cen">
						<li class="fl">
							<p class="f-sans">{{$val['job_title']}}</p>
							<span class="product-manager-show-16">{{$val['company']}}</span>
						</li>
						<li  class="fr">
							{{$val['study_period_from']}} - {{$val['study_period_to']}}
						</li>
					</ul>
					<div class="mt20 nav-item-div">
						<p>
							{{$val['description']}}
						</p>
					</div>
				</li>
				@endforeach

			</ul>
			@else
			<div class="empty"></div>
			@endif
		</div>
	</div>
	<div class="experience-item">
		<div class="center-item clear">
			Enducation
			<div class="line"></div>
		</div>
		<div class="center-item-show-ul">
			@if($data['educations'])
			<ul class="nav nav-item-cent-first">

					@foreach($data['educations'] as $val)
					<li class="li-img">
						<i></i>
						<ul class="nav nav-item-cen">
							<li class="fl">
								<p class="f-sans">{{$val['school']}}</p>
								<span class="product-manager-show-16">{{$val['degree']}}</span>
							</li>
							<li  class="fr">
								{{$val['study_period_from']}} - {{$val['study_period_to']}}
							</li>
						</ul>
						<div class="mt20 nav-item-div">
							<p>How many free autoresponders have you tried? Really how many? And how many emails did you get through using them? How do you know? </p>

							<p class="mt20">My point here is that if you have no clue for the answers above you probably are not operating a followup campaign successfully. These are crucial element that must be explored when you are choosing an autoresponder.</p>
						</div>
					</li>
					@endforeach

			</ul>
			@else
			<div class="empty"></div>
			@endif

		</div>
	</div>

	<div class="experience-item">
		<div class="center-item clear">
			Job Preference
			<div class="line"></div>
		</div>
		<div class="center-item-show-ul">
			<ul class="nav ml30 nav-item-cen">
				<li class="pb30 mt10">
					<p class="f-sans">Product Manager</p>
					<span class="product-manager-show">All types, Manila of Philippines, 20-30K</span>
				</li>
			</ul>
		</div>
	</div>

	<div class="experience-item">
		<div class="center-item clear">
			Attach Link
			<div class="line"></div>
		</div>
		<div class="center-item-show-ul">
			<ul class="nav ml30">
				<li class="pb30">
					<span class="product-manager-show-bold-16">{{$data['website']}}</span>
				</li>
			</ul>
		</div>
	</div>
</div>



<div class="bos-modal-overlay"></div>
<div class="modal-del-confirm" style="display: none;">
	<div class="inner">
		<div class="t">Delete this file?</div>
		<div class="d">It won’t be able to undo this action,
			Ready to delete it?
		</div>
		<a href="javascript:;" class="btn btn-sm btn-default yes">Yes</a>
		<a href="javascript:;" class="btn btn-sm btn-info no">No</a>
	</div>
</div>
<div class="modal-uploaded" style="display: none;">
	<div class="inner">
		<p>Resume has been uploaded!</p>
		<a href="javascript:;" class="btn btn-sm btn-info continue">Continue</a>
	</div>
</div>
@stop
@section('js')
	<script src="{{ Helper::resource('www/jquery.form.js')}}"></script>
	<script type="text/javascript">
		$(function(){

			$(document).on("click",".modal-uploaded a",function(){
				$("#files_show").ajaxSubmit({
					url: "{{ Helper::url('User/updateFile')  }}",
					type: "POST",
					enctype: 'multipart/form-data',
					success: function(ajaxobj){
						if(ajaxobj.status_code != 0){
							$(".show-change").addClass("none");
							$(".show-change-hidden").removeClass("none");
							$(".upload-item").removeClass("none");
							$("#upresume").val("");
							$.confirm(ajaxobj.message);
						}
					},
					error: function (error) { alert(error); }
				});
			});
			$(".upload-item").click(function(){
				$("#upresume").trigger("click");
			});
			$(".change-resume").click(function(){
				$("#upresume").trigger("click");
			});
			$(document).on("change","#upresume",function(){
				if($("#upresume").val() != ""){
					$(".show-change i.file").html($("#upresume").val().split('\\')[$("#upresume").val().split('\\').length - 1]);
					$(".show-change-hidden").addClass("none");
					$(".upload-item").addClass("none");
					$(".show-change").removeClass("none");
					$(".bos-modal-overlay").show();
					$(".modal-uploaded").show();
				}
			});
			$(".x-click").click(function(){
				$(".bos-modal-overlay").show();
				$(".modal-del-confirm").show();
			});
			$(document).on("click",".modal-del-confirm a",function(){
				$(".bos-modal-overlay").hide();
				$(".modal-del-confirm").hide();
			});
			$(document).on("click",".modal-del-confirm .yes",function(){
				$(".show-change").addClass("none");
				$(".show-change-hidden").removeClass("none");
				$(".upload-item").removeClass("none");
				$("#upresume").val("");
			});
			$(document).on("click",".modal-uploaded a",function(){
				$(".bos-modal-overlay").hide();
				$(".modal-uploaded").hide();
			});
		});
	</script>
@stop