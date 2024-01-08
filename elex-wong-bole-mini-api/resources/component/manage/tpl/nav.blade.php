<!--<div class="panel-component panel-editing">
	<div class="focus"></div>
	<section>
		
	</section>
	<i class="panel-del fa fa-trash-o" data-message="确认删除？"></i>
</div>-->
<script type="text/tpl" id="componentNavTpl">
<ul class="component-nav {{data.display_icon}}" ng-if="data.type=='nav'">
    <li ng-repeat="nav in data.lists" ng-style="{background:nav.bg_color}">
        <a href="{{nav.url}}">
            <i ng-style="{width:nav.icon_size,height:nav.icon_size}" ng-if="nav.display_icon != 'no-icon'"><img ng-src="{{nav.img}}"></i>
            <span ng-style="{color:nav.font_color}">{{nav.title}}</span>
        </a>
    </li>
</ul>
<ul class="component-nav component-nav-group" ng-if="nav.type=='group'">
    <li ng-repeat="nav in data.lists">
        <a ng-style="{background:nav.bg_color,'line-height':nav.icon_size+'px'}" class="clearfix" href="{{nav.url}}">
            <img ng-style="{width:nav.icon_size,height:nav.icon_size}" ng-src="{{nav.img}}">
            <span ng-style="{color:nav.font_color}">{{nav.title}}</span>
        </a>
    </li>
</ul>
</script>
