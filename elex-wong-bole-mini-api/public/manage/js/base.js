var APP = new Object();

jQuery(function($){
    $.template = function(html,data){
        return doT.template(html).apply(null,[data]);
    }

    $.getId = function(prefix) {
        return prefix + (new Date()).getTime();
    }

    $.arrayToObject = function(data) {
        var obj = new Object();
        $.each(data, function(index, item){
            if (item.name) {
                obj[item.name] = item.value;
            }
        });
        return obj;
    }
    
    $.checkUploadSize = function(obj){
        if($(obj).val() != "" && typeof(obj.files) !== "undefined") {
            var file = obj.files[0];
            if(file.size > 2097152){
                alert("请选择小于 2M 的图片");
                event.stopPropagation();
                event.stopImmediatePropagation();
                return false;
            }
        }
    }
    
	$.ajaxPost = function(url, data, success, error, type) {
		if(typeof type == "undefined"){
			type = "json";
		}

		$.ajax({
			"type": "POST",
			"url": url,
			"data": data,
			"dataType": type, 
			"success": success,
			"error": error
		});
	}

    $.setLoading = function(box, isHide) {
        if (isHide == 1) {
            $('.loading', box).remove();
        } else {
            box.append('<div class="loading"></div>');
            $('.loading', box).height(box.height());
        }
    }

    $.scrollShowFocus = function(element, isforcus) {
        $('html, body').scrollTop(element.offset().top - 150);
        if(typeof isforcus == "undefined" || isforcus){
            element.focus();
        }
    }

    $.imagePreview = function(element, container, placement) {
        if (!element.data('img')) {
            return;
        }

        var options = {
            "html":true,
            "title":function(){
                return '<a href="' + element.data('img') + '" target="_blank"><img src="' + element.data('img') + '" style="max-width:80px; max-height:80px; margin:10px;" /></a>';
            },
            "trigger":"manual"
        };

        if(typeof container != "undefined" && container != null){
            options["container"] = container;
        }

        if(typeof placement == "undefined" || placement == null){
            placement = "auto top";
        }
        options["placement"] = placement;

        element.tooltip(options);

        element.on('shown.bs.tooltip', function () {
            setTimeout(function(){
                element.tooltip('destroy');
            }, 2000);
        })
        element.tooltip('show');
    }

    $.showTooltip = function(element, title, container, placement, time) {
        element.data('tip', title);
        if (typeof element.data('original-title') == "undefined") {
            var options = {
                "title":function(){
                    return element.data('tip');
                },
                "trigger":"manual"
            };

            if(typeof container != "undefined" && container != null){
                options["container"] = container;
            }

            if(typeof placement == "undefined" || placement == null){
                placement = "auto right";
            }
            options["placement"] = placement;

            element.tooltip(options);

            element.on('shown.bs.tooltip', function () {
                if(typeof time == "undefined"){
                    time = 1500;
                }
                setTimeout(function(){
                    element.tooltip('hide');
                }, time);
            })
        }
        element.tooltip('show');
        element.focus();
    }

    /**
     * 提示
     * @param string   msg    提示内容
     * @param int      width  提示框宽度,默认300
     * @param function func   关闭时回调方法
     */
    $.showModel = function(title, msg, width, func){
        if(typeof width == "undefined"){
            width = 300;
        }

        var id = $.getId('showModal');
        var data = new Object();
        data.id = id;
        data.width = width;
        data.title = title;
        data.msg = msg;
        var html = $.template($("#alertModalTpl").html(), data);
        $("#pageBox").append(html);

        $("#" + id).modal('show').on('hidden.bs.modal', function (e) {
            if(typeof func == "function"){
                func.call(this);
            }
            $("#" + id + "").remove();
        });
        return id;
    }
	
	/**
     * 错误提示
     * @param string   msg    提示内容
     * @param int      width  提示框宽度,默认300
     * @param function func   关闭时回调方法
     */
    $.showError = function(msg,width,func){
        if(typeof width == "undefined"){
            width = 300;
        }

        var id = $.getId('alertModal');
        var data = new Object();
        data.id = id;
        data.width = width;
        data.title = '错误提示';
        data.msg = '<p>'  + msg + '</p>';
        $("#pageBox").append($.template($("#alertModalTpl").html(), data));

		$("#" + id).modal('show').on('hidden.bs.modal', function (e) {
			if(typeof func == "function"){
				func.call(this);
			}
            $("#" + id + "").remove();
		});
        return id;
    }

    /**
     * 成功提示
     * @param string   msg    提示内容
     * @param int      width  提示框宽度,默认300
     * @param function func   关闭时回调方法
     */
    $.showSuccess = function(msg, width, func){
		if(typeof width == "undefined"){
            width = 300;
        }

        var id = $.getId('alertModal');
        var data = new Object();
        data.id = id;
        data.width = width;
        data.title = '操作提示';
        data.msg = '<p>'  + msg + '</p>';
        $("#pageBox").append($.template($("#alertModalTpl").html(), data));

		$("#" + id).modal('show').on('hidden.bs.modal', function (e) {
			if(typeof func == "function"){
				func.call(this);
			}
            $("#" + id + "").remove();
		});
        return id;
    }

    $.showConfirm = function(msg, confirmFunc, cancelFunc, width,title,confirmText) {
        if(typeof width == "undefined"){
            width = 300;
        }

        var id = $.getId('confirmModal');
        var data = new Object();
        data.id = id;
        data.width = width;
        data.title = typeof title == "undefined" ? '操作提示' : title;
        data.confirmText = typeof confirmText == "undefined" ? '确定' : confirmText;
        data.msg = '<p>'  + msg + '</p>';
        $("#pageBox").append($.template($("#confirmModalTpl").html(), data));

		$("#" + id + " .modal-footer .btn-default").click(function(){
			if(typeof cancelFunc == "function"){
                cancelFunc.call(this);
            }
		});
		$("#" + id + " .modal-footer .btn-primary").click(function(){
			if(typeof confirmFunc == "function"){
                confirmFunc.call(this);
            }
            $('#' + id).modal('hide');
		});
		
		$("#" + id + "").modal('show').on('hidden.bs.modal', function (e) {
			if(typeof func == "function"){
				func.call(this);
			}
            $("#" + id + "").remove();
		});
        return id;
    }

    $.removeItem = function(obj, url, tip, isTbody){
        $.showConfirm(tip, function(){
            $.post(url, function(result){
                if(result.status){
                    $(obj).parents('tr')
                        .find('*')
                        .attr('disabled', true)
                        .removeAttr('onclick')
                        .removeAttr('href')
                        .addClass('disableds');

                    var num = 0;
                    if (isTbody) {
                        num = $(obj).parents('tbody').siblings('tbody').length;
                    } else {
                        num = $(obj).parents('tr').siblings('tr').length;
                    }

                    if (num < 1) {
                        location.reload(true);
                    }
                }else{
                    $.showError(result.msg);
                }
            },'json');
        });
    }

    $.formatUrl = function(url) {
        return url.replace('/Base/', '/');
    }

    $.removeList = function(obj,id,pk,controller,action){
        var ids =  new Array();
		var box = $(obj).parents('.list-table');
		var table = box.find('.dataTables_scroll').find('.dataTables_scrollBody table');
		if (table.length < 1) {
			table = box.find('table');
		}
		
        if(typeof id == "undefined" || id == ''){
            id = 'checkListTable';
        }
		
        $("input:checked[name='key']", table).each(function(){
            if(!$(this).hasClass('disabled')){
                ids.push(this.value);
            }
        });
		
		console.log(ids);
        
        ids = ids.join(',');
        if(ids == ''){
            $.showError('Please select the item to be deleted');
            return false;
        }

        $.showConfirm('Are you sure you want to delete it?',function(){
            var query = new Object();
            query.id = ids;

            var url = SITE_URL;
            if(typeof controller == "undefined" || controller == ''){
                controller = CURR_CONTROLLER;
            }
            
            if(typeof action == "undefined" || action == ''){
                action = 'delete';
            }

            if(typeof pk != "undefined"){
                query.pk = pk;
            }

            $.post($.formatUrl(url + '/' + controller + '/' + action), query, function(result){
                if(result.status){
                    location.reload(true);
                }else{
                    $.showError(result.msg);
                }
            },'json');
        });
        return false;
    }

    $.tableCheckHandler = function(obj){
        var checked = obj.checked;
		var table = $(obj).parents('.dataTables_scroll').find('.dataTables_scrollBody table');
		if (table.length < 1) {
			table = $(obj).parents('table');
		}
        $("tbody > tr > td:first-child input",table).each(function(){
            if(!$(this).attr('disabled')){
                if(checked){
                    $(this).parent().addClass("checked");
                }else{
                    $(this).parent().removeClass("checked");
                }
                this.checked = checked;
            }
        });
    }

    $(document).on('click','.table-toggle',function(){
        var tr = $(this).parents('tr');
        var table = tr.parents('table');
        var controller = table.attr('controller');
        if (!controller) {
            controller = CURR_CONTROLLER;
        }
        var query = new Object();
        query.field = $(this).attr('field');
        query.val = $(this).attr('val');
        query.id = tr.attr('key');
        query.module = table.attr('module') ? table.attr('module') : CURR_CONTROLLER;
        query.action = table.attr('action') ? table.attr('action') : CURR_ACTION;
        var obj = $(this);

        $.post(SITE_URL + '/' + controller + '/toggle', query, function(result){
            if(result.status == 1){
                var title = obj.data(query.field + '-' + query.val); 
                if(query.val == 0){
                    obj.removeClass('fa-check text-success table-toggle1').addClass('fa-lock table-toggle0').attr('val',1).attr('title',title);
                }else{
                    obj.removeClass('fa-lock table-toggle0').addClass('fa-check text-success table-toggle1').attr('val',0).attr('title',title);
                }
                if(APP.UPDATE_STATUS_FUNC){
                    query.val = result.content;
                    APP.UPDATE_STATUS_FUNC.call(null,query);
                }else if(APP.UPDATE_STATUS_RELOAD){
                    setTimeout(function(){
                        location.reload(true);
                    },1);
                }
            }else{
                $.showError(result.msg);
            }
        },'json');
    }).on('click','.table-td-sort',function(){
        var url = $(this).attr('sorturl');
        if (url) {
            location.href = url;
        }
    });
});