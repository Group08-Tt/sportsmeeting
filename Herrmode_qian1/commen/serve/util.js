	
	const functionurl = {
		/**
		 * author hp
		 * msg 判断是否为微信浏览器 
		 */
		 isWeChat:function() {
			// #ifdef H5
			var ua = navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == "micromessenger") {
				return true;
			}
			return false;
			// #endif
		}, 
	}
	module.exports = {
		isWeChat:functionurl.isWeChat
	}
