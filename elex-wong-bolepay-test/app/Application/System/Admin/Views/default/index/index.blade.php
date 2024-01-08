@extends('default._layouts.base')
@section('header')
	<link rel="stylesheet" href="{{ Helper::resource('vendor/c3/c3.css') }}">
@stop

@section('body')
	<style type="text/css">
		.counter{text-align: left;}
		.counter-number-group span{font-size: 18px;}
	</style>
	<div class="row">
		<div class="col-xl-2 col-lg-4">
			<div class="card card-block p-20">
				<div class="counter counter-md">
					<div class="counter-label text-uppercase">今日收入</div>
					<div class="counter-number-group">
						@if($statistic['today'])
						<span class="counter-number text-primary">￥{{ $statistic['today']->fee_income }}</span>
						@else
						<span class="counter-number text-primary">￥0.00</span>
						@endif
					</div>
				</div>
			</div>
		</div>
		<div class="col-xl-2 col-lg-4">
			<div class="card card-block p-20">
				<div class="counter counter-md">
					<div class="counter-label text-uppercase">昨日收入</div>
					<div class="counter-number-group">
						@if($statistic['yesterday'])
						<span class="counter-number text-primary">￥{{ $statistic['yesterday']->fee_income }}</span>
						@else
						<span class="counter-number text-primary">￥0.00</span>
						@endif
					</div>
				</div>
			</div>
		</div>
		<div class="col-xl-2 col-lg-4">
			<div class="card card-block p-20">
				<div class="counter counter-md">
					<div class="counter-label text-uppercase">今日订单支付总额</div>
					<div class="counter-number-group">
						@if($statistic['today'])
						<span class="counter-number text-primary">￥{{ $statistic['today']->pay_money }}</span>
						@else
						<span class="counter-number text-primary">￥0.00</span>
						@endif
					</div>
				</div>
			</div>
		</div>
		<div class="col-xl-2 col-lg-4">
			<div class="card card-block p-20">
				<div class="counter counter-md">
					<div class="counter-label text-uppercase">今日有效订单数</div>
					<div class="counter-number-group">
						@if($statistic['today'])
						<span class="counter-number text-primary">{{ $statistic['today']->pay_num }}</span>
						@else
						<span class="counter-number text-primary">0</span>
						@endif
					</div>
				</div>
			</div>
		</div>
		<div class="col-xl-2 col-lg-4">
			<div class="card card-block p-20">
				<div class="counter counter-md">
					<div class="counter-label text-uppercase">今日代付总额</div>
					<div class="counter-number-group">
						@if($statistic['today'])
						<span class="counter-number text-primary">￥{{ $statistic['today']->withdraw_money }}</span>
						@else
						<span class="counter-number text-primary">￥0.00</span>
						@endif
					</div>
				</div>
			</div>
		</div>
		<div class="col-xl-2 col-lg-4">
			<div class="card card-block p-20">
				<div class="counter counter-md">
					<div class="counter-label text-uppercase">今日代付数</div>
					<div class="counter-number-group">
						@if($statistic['today'])
						<span class="counter-number text-primary">{{ $statistic['today']->withdraw_num }}</span>
						@else
						<span class="counter-number text-primary">0</span>
						@endif
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xxl-6 col-md-12">
			<div class="card card-shadow">
				<div class="card-block h-full">
					<div class="chart-header pb-10">
						<b style="font-size: 16px;">近七日统计</b>
					</div>
					<div id="feeChartBox" class="vertical-align text-center" style="height: 320px; margin-top:20px;">
						<div class="loader vertical-align-middle loader-round-circle"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-xxl-6 col-md-12">
			<div class="card card-shadow" id="chartBarStacked">
				<div class="card-block h-full">
					<div class="chart-header pb-10">
						<b style="font-size: 16px;">近七日通道支付统计</b>
					</div>
					<div id="paymentChartBox" class="vertical-align text-center" style="height: 320px; margin-top:20px;">
						<div class="loader vertical-align-middle loader-round-circle"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
@stop

@section('footer')
	<script src="{{ Helper::resource('vendor/d3/d3.min.js') }}"></script>
	<script src="{{ Helper::resource('vendor/c3/c3.min.js') }}"></script>
	<script>
		jQuery(function ($) {
			$.ajaxPost("{{ Helper::url('Index/charts') }}", [], function (result) {
				c3.generate({
					bindto: '#feeChartBox',
					data: {
						columns: result.data.fee_chart.columns,
						type: 'line'
					},
					axis: {
						x: {
							type: 'category',
							categories: result.data.fee_chart.categories
						}
					},
					grid: {
						x: {
							show: false
						},
						y: {
							show: true
						}
					}
				});

				c3.generate({
					bindto: '#paymentChartBox',
					data: {
						columns: result.data.payment_chart.columns,
						type: 'line'
					},
					axis: {
						x: {
							type: 'category',
							categories: result.data.payment_chart.categories
						}
					},
					grid: {
						x: {
							show: false
						},
						y: {
							show: true
						}
					}
				});
			});
		});
	</script>
@stop