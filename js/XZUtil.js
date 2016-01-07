var XZUtil = XZUtil || {
	warpXZ: function(birthday) {
		birthday = new Date(birthday);
		var month = birthday.getMonth() + 1;
		var date = birthday.getDate();
		console.log('生日是:' + month + ":" + date);
		var value = null;
		if (month == 1 && date >= 20 || month == 2 && date <= 18) {
			value = "水瓶座";
		}
		if (month == 1 && date > 31) {
			value = "Huh?";
		}
		if (month == 2 && date >= 19 || month == 3 && date <= 20) {
			value = "双鱼座";
		}
		if (month == 2 && date > 29) {
			value = "Say what?";
		}
		if (month == 3 && date >= 21 || month == 4 && date <= 19) {
			value = "白羊座";
		}
		if (month == 3 && date > 31) {
			value = "OK. Whatever.";
		}
		if (month == 4 && date >= 20 || month == 5 && date <= 20) {
			value = "金牛座";
		}
		if (month == 4 && date > 30) {
			value = "I'm soooo sorry!";
		}
		if (month == 5 && date >= 21 || month == 6 && date <= 21) {
			value = "双子座";
		}
		if (month == 5 && date > 31) {
			value = "Umm ... no.";
		}
		if (month == 6 && date >= 22 || month == 7 && date <= 22) {
			value = "巨蟹座";
		}
		if (month == 6 && date > 30) {
			value = "Sorry.";
		}
		if (month == 7 && date >= 23 || month == 8 && date <= 22) {
			value = "狮子座";
		}
		if (month == 7 && date > 31) {
			value = "Excuse me?";
		}
		if (month == 8 && date >= 23 || month == 9 && date <= 22) {
			value = "室女座";
		}
		if (month == 8 && date > 31) {
			value = "Yeah. Right.";
		}
		if (month == 9 && date >= 23 || month == 10 && date <= 22) {
			value = "天秤座";
		}
		if (month == 9 && date > 30) {
			value = "Try Again.";
		}
		if (month == 10 && date >= 23 || month == 11 && date <= 21) {
			value = "天蝎座";
		}
		if (month == 10 && date > 31) {
			value = "Forget it!";
		}
		if (month == 11 && date >= 22 || month == 12 && date <= 21) {
			value = "射手座";
		}
		if (month == 11 && date > 30) {
			value = "Invalid Date";
		}
		if (month == 12 && date >= 22 || month == 1 && date <= 19) {
			value = "摩羯座";
		}
		if (month == 12 && date > 31) {
			value = "No way!";
		}
		return value;
	}
};
