@extends('default._layouts.base')
@section('body')
<div class="page container support fixed" style="">
	<ol class="b-custom breadcrumb">
		<li><b class="">Support</b></li>
		<li><a href="{{Helper::url('Support/jobseeker')}}">For Job Seeker</a></li>
		<li class="active">For Employer</li>
	</ol>

	<div class="content bg-default">
		<div class="y-question bg-default">
			<div class="title">
				<h5>How much should I pay to use Bossjob?</h5>
				<span class="down"></span>
			</div>
			<p class="answer">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
				et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
				aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
				cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
				culpa qui officia deserunt mollit anim id est laborum.
			</p>
		</div>
		<div class="y-question bg-default">
			<div class="title">
				<h5>Why should I choose Bossjob as my employment helper?</h5>
				<span class="down"></span>
			</div>
			<p class="answer">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
				et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
				aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
				cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
				culpa qui officia deserunt mollit anim id est laborum.
			</p>
		</div>
		<div class="y-question bg-default">
			<div class="title">
				<h5>What kind of employer can you offer?</h5>
				<span class="down"></span>
			</div>
			<p class="answer">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
				et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
				aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
				cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
				culpa qui officia deserunt mollit anim id est laborum.
			</p>
		</div>
		<div class="y-question bg-default">
			<div class="title">
				<h5>How much should I pay to use Bossjob?</h5>
				<span class="down"></span>
			</div>
			<p class="answer">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
				et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
				aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
				cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
				culpa qui officia deserunt mollit anim id est laborum.
			</p>
		</div>
		<div class="y-question bg-default">
			<div class="title">
				<h5>How can I contact with my interested company?</h5>
				<span class="down"></span>
			</div>
			<p class="answer">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
				et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
				aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
				cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
				culpa qui officia deserunt mollit anim id est laborum.
			</p>
		</div>
		<div class="y-question bg-default">
			<div class="title">
				<h5>How much should I pay to use Bossjob?</h5>
				<span class="down"></span>
			</div>
			<p class="answer">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
				et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
				aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
				cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
				culpa qui officia deserunt mollit anim id est laborum.
			</p>
		</div>
		<div class="y-question bg-default">
			<div class="title">
				<h5>How can I share my profiles with my colleagues?</h5>
				<span class="down"></span>
			</div>
			<p class="answer">
				Once you have invited a candidate we will also notify them of your
				interest via email and text. At this point of course the ball is very much in
				the candidate’s court.
			</p>
		</div>
		<div class="y-question bg-default">
			<div class="title">
				<h5>How much should I pay to use Bossjob?</h5>
				<span class="down"></span>
			</div>
			<p class="answer">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
				et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
				aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
				cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
				culpa qui officia deserunt mollit anim id est laborum.
			</p>
		</div>
	</div>
	<p class="text-center mt30 gray3 f-sans">
		Any questions? Please contact <a href="mailto:info@yolotechnology.com">info@yolotechnology.com</a>
	</p>
</div>

<script type="text/javascript">
	$(function () {
		$(".title").click(function () {
			$(this).parents(".y-question").siblings().find("p").hide();
			$(this).parents(".y-question").siblings().find("span").removeClass("up").addClass("down");
			$(this).siblings("p").toggle();
			if($(this).find("span").hasClass("down")){
				$(this).find("span").removeClass("down").addClass("up");
			}else{
				$(this).find("span").removeClass("up").addClass("down");
			}
		});

	});
</script>
@stop
