/*通用工具方法*/
var common = {};
/*判断是否为数组*/
common.isArray = function(arr) {
	return Array.isArray(arr) || Object.prototype.toString.call(arr) == '[object Array]';
}

/*格式化浮点型数据*/
common.formatFixed = function(n, i) {
	var num = Number(n);
	return isNaN(num) ? "-.-" : num.toFixed(i ? i : 2).toString();
};

/*通过UA判断获取移动设备信息*/
common.getBrowserVersion = function() {
	var u = navigator.userAgent,
		app = navigator.appVersion;
	return {
		ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
		android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
		iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
		iPad: u.indexOf('iPad') > -1 //是否iPad
	};
}

/**
 * 判断当前是否为移动设备
 * 返回：true为移动设备 false不是移动设备
 * @returns {boolean}
 */
common.isMobileDevice = function() {
	var versions = getBrowserVersion();
	return (versions.ios && !versions.iPad) || versions.android;
}

/*设置rem 640px下1rem=100px标准*/
common.setRem = function() {
	if (isMobileDevice()) {
		document.documentElement.style.fontSize = (document.documentElement.clientWidth > 640 ? 100 : document.documentElement.clientWidth * 100 / 640) + 'px';
	}
}

/*初始化设置rem*/
common.initRem = function() {
	setRem();
	if (window.addEventListener) {
		document.addEventListener('DOMContentLoaded', function() {
			setRem();
		});

		window.addEventListener('load', function() {
			setTimeout(setRem, 300);
		});

		window.addEventListener('resize', function() {
			setTimeout(setRem, 300);
		});
	}
}