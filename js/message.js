(function($, JQuery) {
	mui.init({
		swipeBack: true, //启用右滑关闭功能
		statusBarBackground: '#FFFFFF'
	});
	$.plusReady(function() {
		//初始化数据库
		database.createdb('db_test');
		//初始化数据
		initData();
		//添加用户事件
		plus.nativeUI.showWaiting().close();
		document.getElementById('menu-data-list').addEventListener('tap', function() {
			planList();
		});
		document.getElementById('add-button').addEventListener('tap', function() {
			addPlan();
		});
		//添加计划
		function addPlan() {
			var nextID = 1;
			var title = document.getElementById('add-title').value;
			var content = document.getElementById('add-content').value;
			var time = document.getElementById('add-time').innerText;
			if (title == '' || content == '') {
				plus.nativeUI.toast('标题或者内容为空！');
				return false;
			}
			database.query('db_test', 'select max(id) as maxid from plan_day', [], function(res) {
				var maxid = res.rows.item(0).maxid;
				var nextID = maxid == null ? 1 : maxid + 1;
				var sql = 'insert into plan_day(id, plan_title, plan_content, plan_time) values( ' + nextID + ', "' + title + '","' + content + '","' + time + '")';
				database.insert('db_test', sql, [], function(res) {
					document.getElementById('add-title').value = '';
					document.getElementById('add-content').value = '';
					document.getElementById('add-time').innerText = '添加时间';
					console.log("insert into data success！");
				});
			});
			plus.nativeUI.toast('insert into data success！');
		};
		//数据列表渲染
		function planList() {
			var listHtml = document.getElementById('plan-list-template').innerHTML;
			var template = Handlebars.compile(listHtml);
			selectPlanList(function(array) {
				console.log(JSON.stringify(array));
				var data = {
					plans: array
				};
				JQuery("#tabbar-with-chat").html(template(data));
				//删除事件
				deleData();
			});
		};
		//删除数据
		function deleData() {
			var deleBtns = document.getElementsByClassName('delete-btn');
			for (var i = 0; i < deleBtns.length; i++) {
				var deleBtn = deleBtns[i];
				deleBtn.addEventListener('tap', null);
				deleBtn.addEventListener('tap', function(eve) {
					var planID = eve.target.getAttribute('plan-id');
					var btnArray = ['确认', '取消'];
					$.confirm('确认删除该条记录?', '删除数据', btnArray, function(e) {
						if ('0' == e.index) {
							database.update('db_test', 'delete from plan_day where id = ' + planID, [], function(res) {});
							//移除li
							JQuery(eve.target).closest('.list-li').remove();
							//
							var size = document.getElementById('data-badge').innerHTML;
							if (parseInt(size) > 0) {
								document.getElementById('data-badge').innerHTML = parseInt(size) - 1;
							}
						}
					});
				});
			}
		};
		//查询计划列表
		function selectPlanList(func) {
			var playArray = new Array();
			database.query('db_test', 'select * from plan_day order by id desc', [],
				function(res) {
					var resList = res.rows;
					var size = resList.length;
					document.getElementById('data-badge').innerHTML = size;
					for (var i = 0; i < size; i++) {
						var ID = resList.item(i).id;
						var TITLE = resList.item(i).plan_title;
						var CONTENT = resList.item(i).plan_content;
						var TIME = resList.item(i).plan_time;
						var plan = {
							id: ID,
							title: TITLE,
							content: CONTENT,
							time: TIME
						};
						playArray.push(plan);
					}
					if (typeof func == 'function') {
						func(playArray);
					}
				});
		};
	});
	//初始化时间
	function initDate() {
		var info = document.getElementById('add-time');
		info.addEventListener('tap', initDate);
		var dDate = new Date();
		//dDate.setFullYear(2014, 7, 16);
		var minDate = new Date();
		minDate.setFullYear(2010, 0, 1);
		var maxDate = new Date();
		maxDate.setFullYear(2016, 11, 31);
		plus.nativeUI.pickDate(function(e) {
			var d = e.date;
			info.innerText = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
			//						initDateTime();
		}, function(e) {
			info.innerText = dDate.getFullYear() + "-" + (dDate.getMonth() + 1) + "-" + dDate.getDate();
			//						initDateTime();
		}, {
			title: "请选择日期",
			date: dDate,
			minDate: minDate,
			maxDate: maxDate
		});
	};

	function initDateTime() {
		var info = document.getElementById('add-time');
		var text = info.innerText;
		var dTime = new Date();
		plus.nativeUI.pickTime(function(e) {
			var d = e.date;
			info.innerText = text + "   " + d.getHours() + ":" + d.getMinutes();
		}, function(e) {
			info.innerText = text + "   " + dTime.getHours() + ":" + dTime.getMinutes();
		}, {
			title: "请选择时间",
			is24Hour: true,
			time: dTime
		});
	};

	function createTable() {
		database.update(
			'db_test',
			'CREATE TABLE IF NOT EXISTS plan_day(id unique, plan_title, plan_content,plan_time)', [],
			function(r) {
				alert(r);
			});
		database.update(
			'db_test',
			'CREATE TABLE IF NOT EXISTS t_user(id unique, name, phone, relation, summary, time);', [],
			function(res) {
				alert(res);
			});
	};
	//用户列表
	function peopleList() {
		var listHtml = document.getElementById('people-template').innerHTML;
		var template = Handlebars.compile(listHtml);
		database.query('db_test', 'select * from t_user order by id desc', [],
			function(res) {
				var data = {
					'peoples': []
				};
				var resList = res.rows;
				var size = resList.length;
				document.getElementById('data-badge-contact').innerHTML = size;
				for (var i = 0; i < size; i++) {
					var people = {
						id: resList.item(i).id,
						name: resList.item(i).name,
						relation: resList.item(i).relation,
						time: resList.item(i).time,
						phone: resList.item(i).phone,
						summary: resList.item(i).summary,
						image: resList.item(i).path == "undefined" ? "images/60x60.gif" : resList.item(i).path
					};
					data.peoples.push(people);
				}
				JQuery("#tabbar-with-contact").html(template(data));

				JQuery('.del-people').each(function(index, ele) {
					ele.addEventListener('tap', null);
					ele.addEventListener('tap', function() {
						JQuery(ele).closest('.mui-table-view-cell').remove();
					});
				});

			});
		//删除事件
	};
	//联系人事件
	function chosePic() {
		// 弹出系统选择按钮框
		plus.nativeUI.actionSheet({
			title: "选个头像",
			cancel: "取消",
			buttons: [{
				title: "拍照"
			}, {
				title: "相册"
			}]
		}, function(e) {
			if (e.index == 1) {
				var cmr = plus.camera.getCamera();
				cmr.captureImage(function(p) {
					plus.io.resolveLocalFileSystemURL(p, function(entry) {
						document.getElementById('people-img').src = entry.toLocalURL();
						document.getElementById('people-img').path = entry.toLocalURL();
					}, function(e) {});
				}, function(e) {}, {
					index: 1,
					filename: "_doc/camera/"
				});
			};
			if (e.index == 2) {
				plus.gallery.pick(function(path) {
					document.getElementById('people-img').src = path;
					document.getElementById('people-img').path = path;
				}, function(e) {}, {
					filter: 'image'
				});
			};
		});
	};
	//添加用户信息
	function addPeopleEvent() {
		//						database.update('db_test','drop table t_user',[],function (r) {
		//							alert(r)
		//						});
		//						database.update('db_test','create table t_user(id unique,name,phone,path,relation,summary,time);',[],function(r){
		//							alert(r)
		//						});
		var path = document.getElementById('people-img').path;
		var name = document.getElementById('people-name').value;
		var phone = document.getElementById('people-phone').value;
		var relation = document.getElementById('people-relation').value;
		var summary = document.getElementById('people-summary').value;
		if (name == null || name == undefined || name == '') {
			plus.nativeUI.toast('写个名称吧！');
			return false;
		}
		if (relation == null || relation == '') {
			plus.nativeUI.toast('没什么关系是陌生人吗！');
			return false;
		}
		if (relation == null || relation == '') {
			plus.nativeUI.toast('没什么关系是陌生人吗！');
			return false;
		}
		if (summary == null || summary == '') {
			plus.nativeUI.toast('能不能先描述一下这位英雄！');
			return false;
		}
		//
		plus.nativeUI.showWaiting();
		database.query('db_test', 'select max(id) as maxid from t_user', [], function(res) {
			var maxid = res.rows.item(0).maxid;
			var nextID = maxid == null ? 1 : parseInt(maxid) + 1;
			var d = new Date();
			var time = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + "  " + d.getHours() + ":" + d.getMinutes();
			database.insert(
				'db_test',
				'insert into t_user(id,name,phone,path,relation,summary,time) values(' + nextID + ',"' + name + '","' + phone + '","' + path + '","' + relation + '","' + summary + '","' + time + '");', [],
				function(res) {
					document.getElementById('people-name').value = '';
					document.getElementById('people-phone').value = '';
					document.getElementById('people-relation').value = '';
					document.getElementById('people-summary').value = '';
					setTimeout(function() {
						JQuery('.mui-control-content ').removeClass('mui-active');
						JQuery('#tabbar-with-contact').addClass('mui-active');
						JQuery('.mui-tab-item').removeClass('mui-active');
						JQuery('#menu-data-people').addClass('mui-active');
						plus.nativeUI.showWaiting().close();
						var size = document.getElementById('data-badge-contact').innerHTML;
						document.getElementById('data-badge-contact').innerHTML = parseInt(size) + 1;
					}, 3000);
				});
		});
	};
	//统计数据总条数
	function initData() {
		//选择图片
		document.getElementById('add-time').addEventListener('tap', initDate);
		document.getElementById('people-img').addEventListener('tap', chosePic);
		document.getElementById('people-submit').addEventListener('tap', addPeopleEvent);
		//显示列表
		document.getElementById('menu-data-people').addEventListener('tap', peopleList);
		//显示条数
		database.query('db_test', 'select * from plan_day', [],
			function(res) {
				var resList = res.rows;
				var size = resList.length;
				document.getElementById('data-badge').innerHTML = size;
			});
		//显示条数
		database.query('db_test', 'select count(id) as size from t_user', [],
			function(res) {
				var resList = res.rows;
				var size = resList.item(0).size;
				document.getElementById('data-badge-contact').innerHTML = size;
			});
	};
}(mui, jQuery));