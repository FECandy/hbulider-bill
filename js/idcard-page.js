(function($, JQuery) {
	$.init({});
	$.plusReady(function() {
		function searchUser() {
			var userID = document.getElementById('user-id').value;
			var regID = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			if (regID.test(userID) === false) {
				plus.nativeUI.toast('身份证输入不合法!');
				return false;
			}
			if (showUserInfo(userID)) {
				return true;
			}
			JQuery.ajax({
				type: "GET",
				url: "http://apis.baidu.com/apistore/idservice/id?id=" + userID,
				beforeSend: function(request) {
					request.setRequestHeader("Accept-Charset", "GBK");
					request.setRequestHeader("apikey", "adca8ef4b2e36495c957c7eafc42bf76");
				},
				success: function(result) {
					result = JSON.parse(result);
					console.log("ajax user info:" + JSON.stringify(result));
					localStorage.setItem('ID:' + userID, JSON.stringify(result));
					showUserInfo(userID);
				}
			});
		};

		//显示用户信息
		function showUserInfo(userID) {
			var result = localStorage.getItem('ID:' + userID);
			console.log("[local user info]" + result);
			result = JSON.parse(result);
			if (result != null && result.errNum == '0') {
				document.getElementById('user-sex').disabled = '';
				document.getElementById('user-address').disabled = '';
				document.getElementById('user-birthday').disabled = '';
				document.getElementById('user-birthday').value = result.retData.birthday;
				document.getElementById('user-address').value = result.retData.address;
				document.getElementById('user-sex').value = result.retData.sex == 'M' ? '男士' : '女生';
				//星座信息
				var xz = XZUtil.warpXZ(result.retData.birthday);
				document.getElementById('user-xz').value = xz;
				document.getElementById('user-sex').disabled = 'disabled';
				document.getElementById('user-address').disabled = 'disabled';
				document.getElementById('user-birthday').disabled = 'disabled';
				return true;
			}
			return false;
		};

		//获取星座信息
		function xzInfoRender() {
			var resData = getLocalInfo();
			console.log("本地【今日用户的星座运势】：" + JSON.stringify(resData));
			var _name = resData.name;
			var _type = resData.type;
			var _key = resData._key;
			if (resData.isExist == true) {
				renderHtml(resData);
			} else {
				var httpURL = XZ_URL + "&type=" + _type + "&consName=" + _name
				console.log('请求星座信息URL:' + httpURL);
				JQuery.ajax({
					type: "GET",
					url: httpURL,
					beforeSend: function(request) {
						request.setRequestHeader("Accept-Charset", "GBK");
					},
					success: function(resData) {
						resData = JSON.parse(resData);
						console.log("ajax xz info:" + JSON.stringify(resData));
						if (resData.error_code == '0') {
							localStorage.setItem(_key, JSON.stringify(resData));
							renderHtml(resData);
						}
					}
				});
			}
		};

		/**
		 * 本地星座信息获取
		 */
		function getLocalInfo() {
			var data = {
				isExist: false,
				type: TYPE_TODAY, //today今日，week周，nextweek下周，month月，year年
				name: '',
				_key: '',
				result: {}
			};
			var currDate = new Date();
			var now = currDate.getFullYear() + '-' + (currDate.getMonth() + 1) + '-' + currDate.getDate();
			var xzName = document.getElementById('user-xz').value;
			JQuery('input[class=xz-button]').each(function(index, ele) {
				var curr = JQuery(ele).attr('curr');
				var type = JQuery(ele).attr('name');
				if (curr == '1') {
					data.name = xzName;
					data.type = type;
					data._key = 'XZ:' + now + xzName + type;
				}
			});
			if (xzName == '') {
				plus.nativeUI.toast('没有星座信息...');
			} else {
				var xzinfo = localStorage.getItem(data._key);
				if (xzinfo != null && xzinfo != '') {
					data.isExist = true;
					data.name = xzName;
					data.result = JSON.parse(xzinfo).result;
				}
			}
			return data;
		};

		/**
		 * html数据渲染
		 */
		function renderHtml(data) {
			var obj = data.result;
			alert(JSON.stringify(obj))
			if (data.type == 'today') {
				var dataHtml = document.getElementById('today-template').innerHTML;
				var template = Handlebars.compile(dataHtml);
				JQuery("#xz-info").html(template(obj));
			} else if (data.type == 'today') {
				var dataHtml = document.getElementById('week-template').innerHTML;
				var template = Handlebars.compile(dataHtml);
				JQuery("#xz-info").html(template(obj));
			}
		};

		//今日运势
		document.getElementById('xz-today').addEventListener('tap', function() {
			JQuery('input[class=xz-button]').css('color', '').attr('curr', '0');
			JQuery(this).css('color', 'red').attr('curr', '1');
			xzInfoRender();
		});
		document.getElementById('xz-week').addEventListener('tap', function() {
			JQuery('input[class=xz-button]').css('color', '').attr('curr', '0');
			JQuery(this).css('color', 'red').attr('curr', '1');
			xzInfoRender();
		});
		document.getElementById('user-search').addEventListener('tap', function() {
			searchUser();
		});


	});
}(mui, jQuery));