var HealthList = HealthList || {
	init : function(){
		HealthList.initList();
		HealthList.searchInfo();
	},
	initList: function() {
		$.ajax({
			url: HOST_URL + '/health/info/list',
			data: {
				'classID': 2
			},
			type: 'POST',
			dataType: 'json',
			success: function(data) {
				var IMAGE_HOST = 'http://tnfs.tngou.net/image/';
				if (data.data.success) {
					$(data['data'].resultObj).each(function(index, item) {
						console.log(JSON.stringify(item) + JSON.stringify(index));
						var HTML = '<li class="mui-table-view-cell mui-collapse">' +
							'<a class="mui-navigate-right" href="#">' + item.title + '</a>' +
							'<div class="mui-collapse-content"  style="color:darkgrey;">' + item.description + '</div></li>';
						$('.mui-table-view').append(HTML);
					});
					plus.nativeUI.closeWaiting();
					//显示当前页面
					mui.currentWebview.show();
				}
			},
			error: function(xhr, type, errorThrown) {
				alert('真的失败了吗?' + JSON.stringify(xhr) + type + errorThrown);
			}
		});
	},
	/**
	 * 搜索
	 */
	searchInfo: function() {
		mui('.mui-content-padded').on('tap','#search-info',function(){
			var keywords = $('#info-keywords').val();
			$.ajax({
				url: HOST_URL + '/health/info/search',
				data: {	'keyword': keywords },
				type: 'POST',
				dataType: 'json',
				success: function(data) {
					var IMAGE_HOST = 'http://tnfs.tngou.net/image/';
					if (data.data.success) {
						var HTML = '';
						$(data['data'].resultObj).each(function(index, item) {
							HTML = HTML + '<li class="mui-table-view-cell mui-collapse">' +
								'<a class="mui-navigate-right" href="#">' + item.title + '</a>' +
								'<div class="mui-collapse-content"  style="color:darkgrey;">' + item.description + '</div></li>';
						});
						$('.mui-table-view').html(HTML);
					}
				},
				error: function(xhr, type, errorThrown) {
					alert('真的失败了吗?' + JSON.stringify(xhr) + type + errorThrown);
				}
			});
		});
	},

};

mui.init();
mui.plusReady(function() {
	HealthList.init();
	//业务数据获取完毕，并已插入当前页面DOM；
	//注意：若为ajax请求，则需将如下代码放在处理完ajax响应数据之后；
	//关闭等待框
});