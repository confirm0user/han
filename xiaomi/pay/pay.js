//登录后 指向a 出现div.user-menu-wrapper
(function() {
	var uesr = {
		"0": "个人中心",
		"1": "评价晒单",
		"2": "我的喜欢",
		"3": "小米账户",
		"4": "退出登录"
	}
	var userHtml = `
		<ul class="user-menu">
			<li><a href="">个人中心</a></li>
			<li><a href="">评价晒单</a></li>
			<li><a href="">我的喜欢</a></li>
			<li><a href="">小米账户</a></li>
			<li><a href="">退出登录</a></li>
		</ul>
	`;
	 document.querySelector('.user-menu-wrapper').innerHTML = userHtml;
	document.querySelector('.topbar-info span.user').onmouseover = function(){
	document.querySelector('.user-menu-wrapper').classList.add('user-active');
	}
	document.querySelector('.topbar-info span.user ').onmouseout = function(){
	document.querySelector('.user-menu-wrapper').classList.remove('user-active');
	}
})();

// 订单详情
(function() {
	document.querySelector('p.show-detail').onclick = function() {
		var detail = document.querySelector('ul.order-detail');
		var info = document.querySelector('p.post-info');
		if(detail.classList.contains('show')) {
			detail.classList.remove('show');
			info.classList.remove('hidden');
		}
		else {
			detail.classList.add('show');
			info.classList.add('hidden');
		}
	}
	
})();







// 订单支付倒计时 
(function() {
	var targetDate = new Date().getTime() + 15 * 60 * 1000;
	var timer = null;
	function countdown() {
		var diff = targetDate - new Date().getTime();
		if(diff <= 0) {
			clearInterval(timer);
			timer = null;
			return;
		}
		diff = Math.ceil(diff / 1000);
		var second = diff % 60;
		document.querySelector('span.second').innerText = second;
		var minutes = Math.floor(diff / 60) % 60;
		var hours = Math.floor(diff / 3600) % 24;
		document.querySelector('span.minutes').innerText = minutes;
		document.querySelector('span.hours').innerText = hours;
		/* var day = Math.floor(diff / 3600 /24);
		document.querySelector('span.day').innerText = day; */
	}
	timer = setInterval(countdown,1000);
	
})();
	
	









