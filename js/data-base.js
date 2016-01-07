var database = {
	db_info: ''
};
//创建数据库
database.createdb = function(name) {
	var db_name = name ? name : 'db_test';
	database.db_info = 'name:' + db_name + ',desc: DB 描述';
	var db = openDatabase(db_name, '1.0', 'DB 描述', 1024 * 1024);
	database[db_name] = db;
	return true;
};
//执行修改语句
database.update = function(name, sql, args, func) {
	var args = args ? args : [];
	console.log(JSON.stringify(args) + ">>>" + sql);
	
	database.db = database[name];
	try {
		if (database.db && sql) {
			database.db.transaction(function(tx) {
				tx.executeSql(
					sql,
					args,
					function(tx, result) {
						//执行成功的回调函数
						plus.nativeUI.toast("exe sql result success :" + sql + ":::" + JSON.stringify(args));
						console.log("exe sql result success :" + JSON.stringify(result));
						if (typeof func == 'function') {
							func(result);
						}
					},
					function(tx, error) {
						plus.nativeUI.toast("exe sql result error :" + JSON.stringify(error));
						console.log("exe sql result error :" + JSON.stringify(error));
					});
			});
		} else {
			alert('操作失败:参数有误[db]' + database.db + '[sql]' + sql);
		}
	} catch (e) {
		console.log('操作失败：' + e);
	}
};
//insert 
database.insert = function(name, sql, args, func) {
	//查询
	console.log(JSON.stringify(args) + ">>>" + sql);
	database.db = database[name];
	try {
		database.db.transaction(function(tx) {
			tx.executeSql(
				sql,
				args,
				function(tx, result) {
					//执行成功的回调函数
					if (typeof func == 'function') {
						func(result);
					}
				},
				function(tx, error) {
					console.log("exe sql result error :" + JSON.stringify(error));
				});
		});
	} catch (e) {
		console.log('操作失败：' + e);
	}
};


//执行查询
database.query = function(name, sql, args, func) {
	var args = args ? args : [];
	database.db = database[name];
	try {
		if (database.db && sql) {
			database.db.transaction(function(tx) {
				tx.executeSql(
					sql,
					args,
					function(tx, results) {
						if (typeof func == 'function') {
							func(results);
						}
					},
					function(tx, error) {
						plus.nativeUI.toast("exe sql error " + JSON.stringify(error));
					});
			});
		} else {
			console.log(">>>>" + '操作失败:参数有误[db]' + database.db + '[sql]' + sql);
		}
	} catch (e) {
		console.log('操作失败：' + e);
	}
};