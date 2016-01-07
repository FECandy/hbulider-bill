(function($, JQuery) {
	mui.init({
		pullRefresh: {
			container: '#data-list',
			down: {
				callback: downRefresh
			},
			up: {
				contentrefresh: '正在加载...',
				callback: upRefresh
			}
		}
	});
	mui.plusReady(function() {
		mui('#pullrefresh').pullRefresh().pullupLoading();
	});
	var count = 0;
	/**
	 * 上拉加载具体业务实现
	 */
	function upRefresh() {
		JQuery.ajax({
			type: "GET",
			url: "http://www.tngou.net/api/ask/list?id=3&rows=30",
			data: {},
			dataType: "json",
			success: function(resData) {
				if (resData.status == true) {
					var listData = new Array();
					for (var i = 0; i < resData.tngou.length; i++) {
						var message = {
							img: resData.tngou[i].img,
							title: resData.tngou[i].title,
							desc: resData.tngou[i].description,
							time: new Date(resData.tngou[i].time)
						}
						listData.push(message);
					}
					var data = {
						'messages': listData
					};
					var dataHtml = document.getElementById('data-template').innerHTML;
					var template = Handlebars.compile(dataHtml);
					JQuery("#data-list").html(template(data));
				}
			}
		});
	};
	/**
	 * 下拉刷新具体业务实现
	 */
	function downRefresh() {
		setTimeout(function() {
			var table = document.body.querySelector('.mui-table-view');
			var cells = document.body.querySelectorAll('.mui-table-view-cell');
			for (var i = cells.length, len = i + 3; i < len; i++) {
				var li = document.createElement('li');
				li.className = 'mui-table-view-cell';
				li.innerHTML = '<a class="mui-navigate-right ">Item ' + (i + 1) + '</a>';
				//下拉刷新，新纪录插到最前面；
				table.insertBefore(li, table.firstChild);
			}
			mui('#data-list').pullRefresh().endPulldownToRefresh(); //refresh completed
		}, 1500);
	};
}(mui, jQuery));