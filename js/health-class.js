var HealthClass = HealthClass || {
	init: function() {
		HealthClass.initHealthClass();
		HealthClass.returnLogin();
	},
	/**
	 * 初始化列表
	 */
	initHealthClass: function() {
		$.ajax({
			url: HOST_URL + '/health/class/list',
			data: {},
			type: 'POST',
			dataType: 'json',
			success: function(data) {
				HealthClass.renderList(data);
			},
			error: function(xhr, type, errorThrown) {
				alert('真的失败了吗?' + JSON.stringify(xhr) + type + errorThrown);
			}
		});
	},
	/**
	 * 渲染列表数据
	 */
	renderList: function(dataList) {
		if (dataList['data'].success == true) {
			$(dataList['data'].resultObj).each(function(index, item) {
				console.log(JSON.stringify(item) + JSON.stringify(index));
				var html = '<li class="mui-table-view-cell"><a class-id="' + item.id + '" class="mui-navigate-right">' + item.name + '</a></li>';
				$('.mui-table-view').append(html);
			});
			mui('.mui-table-view').on('tap', '.mui-navigate-right', function() {
				var classID = mui(this)[0].getAttribute('class-id');
				try {
					mui.openWindow({
						url: 'health-list.html',
						show: {
							autoShow: false
						}
					});
				} catch (e) {
					console.log( e );
				}
			});
		}
	},
	/**
	 * 回到登录界面
	 */
	returnLogin: function() {
		mui('.mui-bar').on('tap', '.mui-icon-back', function() {
			mui.openWindow({
				id: 'login',
				url: 'login.html'
			});
		});
	}


};
$(function() {
	mui.plusReady(function() {
		HealthClass.init();
	});
});