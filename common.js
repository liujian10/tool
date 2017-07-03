/*判断是否为数组*/
function isArray(arr) {
	return Object.prototype.toString.call(arr) == '[object Array]';
}