var DUtil = DUtil || {
	weekTH: function() {
		var totalDays = 0,
			now = new Date(),
			years = new Date().getYear(),
			days = new Array(12);
		if (years < 1000) {
			years += 1900
		}
		days[0] = 31;
		days[2] = 31;
		days[3] = 30;
		days[4] = 31;
		days[5] = 30;
		days[6] = 31;
		days[7] = 31;
		days[8] = 30;
		days[9] = 31;
		days[10] = 30;
		days[11] = 31;
		//判断是否为闰年，针对2月的天数进行计算
		if (Math.round(now.getYear() / 4) == now.getYear() / 4) {
			days[1] = 29
		} else {
			days[1] = 28
		}

		if (now.getMonth() == 0) {
			totalDays = totalDays + now.getDate();
		} else {
			var curMonth = now.getMonth();
			for (var count = 1; count <= curMonth; count++) {
				totalDays = totalDays + days[count - 1];
			}
			totalDays = totalDays + now.getDate();
		}
		//得到第几周
		var week = Math.round(totalDays / 7);
		return week;
	}
};