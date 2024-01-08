<?php
$id         = isset($attrs['id']) ? $attrs['id'] : '';
$addrname = $attrs['name'];
$addrval  = $attrs['name'];
$mapname = $attrs['name'];
$mapval  = $attrs['name'];

$key        = Config::get('app.baidu_map.browser_key');
$address    = !isset($attrs['address']) ? Config::get('app.qq_map.address') : $attrs['address']
$point       = !isset($attrs['point']) ? Config::get('app.qq_map.point') : $attrs['point'];
?>
<php>
$map_point = {!! Tpl::variable($mapval) !!};
$map_point = empty($map_point) ? Config::get('app.baidu_map.point') : $map_point;
<php>
<div class="input-group">
    <input type="text" name="{!! Tpl::output($addrname) !!}" class="form-control" value="{!! Tpl::output($addrval) !!}" autocomplete="off"/>
    <span class="input-group-btn">
        <button class="btn btn-default" type="button"><i class="fa fa-map-marker"></i> 定位</button>
    </span>
</div>
<div>
    <div id="mapContainer" style="width:540px; height:300px; border:1px solid #ccc;"></div>
    <input type="hidden" name="{!! Tpl::output($mapname) !!}" id="mapPintInput" value="{!! Tpl::output($mapval) !!}"/>
    <script charset="utf-8" src="http://api.map.baidu.com/api?v=2.0&ak={!! Tpl::output($key) !!}"></script>
    <script type="text/javascript">
        var qqGeocoder,qqMap,qqMarker = null;
        jQuery(function($){
            $(window).load(function(){
                var map = new BMap.Map("mapContainer");
                var mapCenter, mapMarker, mapGeocoder;
                var isInit = false;
                var mapPoint  = $.trim($("#mapPintInput").val());

                var mapInit = function() {
                    isInit = true;
                    map.centerAndZoom(mapCenter, 12);
                    map.addControl(new BMap.MapTypeControl());
                    map.enableScrollWheelZoom(true);

                    mapMarker = new BMap.Marker(mapCenter);
                    map.addOverlay(mapMarker);
                    mapMarker.enableDragging();

                    mapGeocoder = new BMap.Geocoder();
                }

                if (mapPoint != '') {
                    mapCenter = new BMap.Point({!! Tpl::output($mapval) !!});
                    mapInit();
                } else {
                    var mapCity = new BMap.LocalCity();
                    mapCity.get(function(result){
                        mapCenter = result.center;
                        mapInit();
                    });
                }
                

                

                

                var 
                

                
                qqMap = new qq.maps.Map(document.getElementById("qqMapContainer"),{
                    center: mapCenter,
                    zoom: 14
                });
                qqMarker = new qq.maps.Marker({
                    map:qqMap,
                    draggable:true,
                    position: mapCenter
                });

                qq.maps.event.addListener(qqMarker, "dragend", function(event) {
                    $("#point").val(event.latLng.getLat() + "," + event.latLng.getLng());
                });
                qq.maps.event.addListener(qqMap, "click", function(event) {
                    qqMarker.setPosition(event.latLng);
                    $("#point").val(event.latLng.getLat() + "," + event.latLng.getLng());
                });

                <?php if($point == ""){ ?>
                var cityLocation = new qq.maps.CityService({
                    complete : function(result){
                        qqMap.setCenter(result.detail.latLng);
                        qqMarker.setPosition(result.detail.latLng);
                        $("#point").val(result.detail.latLng.getLat() + "," + result.detail.latLng.getLng());
                    },
                });
                <?php } ?>

                qqGeocoder = new qq.maps.Geocoder({
                    complete : function(result){
                        qqMap.setCenter(result.detail.location);
                        qqMarker.setPosition(result.detail.location);
                        $("#point").val(result.detail.location.getLat() + "," + result.detail.location.getLng());
                    }
                });

                $("#lbs_btn").click(function(){
                    if($.trim($("#'.$name.'").val()) != ""){
                        qqGeocoder.getLocation($("#'.$name.'").val());
                    }
                });
            })
        })
    </script>
</div>

<div class="clearfix u-fitem clearfix"><span class="f-tt fl">'.$label.'</span>
    <div class="f-boxr">
        <div class="u-iptboxct fl mr15">
            <input type="text" name="'.$name.'" id="'.$name.'" class="form-control" value="'.$address.'" autocomplete="off"/>
            <span>&nbsp;</span>
            <button type="button" id="lbs_btn" class="btn btn-primary">
                <span class="glyphicon glyphicon-map-marker"></span><i class="fa fa-map-marker"></i>定位</a>
            </button>
        </div>
    </div>
</div>
<div class="u-fitem clearfix">
    <span class="f-tt">地图</span>
    <div title="地图" required="'.$required.'" class="f-boxr">
        <div id="mapContainer" style="width:540px; height:300px; border:1px solid #ccc;"></div>
        <input type="hidden" name="point" id="point" value="'.$point.'"/>
        <script charset="utf-8" src="http://api.map.baidu.com/api?v=2.0&ak={!! Tpl::output($key) !!}"></script>
        <script type="text/javascript">
        var qqGeocoder,qqMap,qqMarker = null;
        jQuery(function($){
            $(window).load(function(){
                var mapCenter = new qq.maps.LatLng('.$point.');
                qqMap = new qq.maps.Map(document.getElementById("qqMapContainer"),{
                    center: mapCenter,
                    zoom: 14
                });
                qqMarker = new qq.maps.Marker({
                    map:qqMap,
                    draggable:true,
                    position: mapCenter
                });

                qq.maps.event.addListener(qqMarker, "dragend", function(event) {
                    $("#point").val(event.latLng.getLat() + "," + event.latLng.getLng());
                });
                qq.maps.event.addListener(qqMap, "click", function(event) {
                    qqMarker.setPosition(event.latLng);
                    $("#point").val(event.latLng.getLat() + "," + event.latLng.getLng());
                });

                <?php if($point == ""){ ?>
                var cityLocation = new qq.maps.CityService({
                    complete : function(result){
                        qqMap.setCenter(result.detail.latLng);
                        qqMarker.setPosition(result.detail.latLng);
                        $("#point").val(result.detail.latLng.getLat() + "," + result.detail.latLng.getLng());
                    },
                });
                <?php } ?>

                qqGeocoder = new qq.maps.Geocoder({
                    complete : function(result){
                        qqMap.setCenter(result.detail.location);
                        qqMarker.setPosition(result.detail.location);
                        $("#point").val(result.detail.location.getLat() + "," + result.detail.location.getLng());
                    }
                });

                $("#lbs_btn").click(function(){
                    if($.trim($("#'.$name.'").val()) != ""){
                        qqGeocoder.getLocation($("#'.$name.'").val());
                    }
                });
            })
        })
        </script>
    </div>
</div>