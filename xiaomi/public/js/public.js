// (function() {
	//获取登录的用户，登录后并动态渲染
	(function() {
		var n = Cookies.get('users') ? JSON.parse(Cookies.get('users')) : [];
		//var n = JSON.parse(Cookies.get('users'));
		var state = n.find(function(item) {return item.state === true;});
		 console.log(state);
		if(state) {
			console.log(11);
			loginAfter(); }
		 else 
		 {
			 console.log(12);
			loginBefor();
		 }
	})();
	//登录后
	function loginAfter() {
		var userHtml = `
			<span class="user">
				<a href="../profile/index.html" target="_blank">用户名</a>
				<div class="user-menu-wrapper">
					<ul class="user-menu">
						<li><a href="../profile/index.html" target="_blank">个人中心</a></li>
						<li><a href="../order/index.index" target="_blank">评价晒单</a></li>
						<li><a href="../profile/index.html" target="_blank">我的喜欢</a></li>
						<li><a href="../profile/index.html" target="_blank">小米账户</a></li>
						<li class="secede"><a>退出登录</a></li>
					</ul>
				</div>
			</span>
			<span class="message"><a href="">消息通知</a></span>
			<span class="link"><a href="../cart/cart.html" target="_blank">我的订单</a></span>
		`;
		document.querySelector('.topbar-info').innerHTML = userHtml;
		document.querySelector('.topbar-info span.user').onmouseover = function(){
			document.querySelector('.user-menu-wrapper').classList.add('user-active');
		}
		document.querySelector('.topbar-info span.user ').onmouseout = function(){
			document.querySelector('.user-menu-wrapper').classList.remove('user-active');
		}
		//点退出登录
		document.querySelector('span.user li.secede').onclick = function() {
			var n = JSON.parse(Cookies.get('users'));
			console.log(n);
			n.find(function(item) {return item.state === true;}).state = false;
			Cookies.set('users',JSON.stringify(n));
			loginBefor();
			window.location.replace("../home/home.html");
			// console.log(582);
		};
		
	};
	//登录前
	function loginBefor() {
		var userHtml = `
			<span class="login"><a>登录</a></span>
			<span class="logon"><a>注册</a></span>
			<span class="message"><a href="">消息通知</a></span>
		`;
		document.querySelector('.topbar-info').innerHTML = userHtml;
		isLogin();
	};
// })();	

function isLogin() {
	if(!document.querySelector('.topbar-info span.login')) return;
	//在home中，点击注册，跳到注册页面 令log=false，标识直接跳到注册选项卡
	document.querySelector('.topbar-info span.logon>a').onclick = function() {
		var log = false;
		Cookies.set('log',JSON.stringify(log));
		console.log(1);
		//console.log(Cookies.set('log',JSON.stringify(log)))
		window.location.href = '../login/login.html';
	};
	//在home中，点击登录，跳到登录页面 令log=true，标识直接跳到登录选项卡
	document.querySelector('.topbar-info span.login>a').onclick = function() {
		var log = true;
		Cookies.set('log',JSON.stringify(log));
		//console.log(Cookies.set('log',JSON.stringify(log)))
		window.location.href = '../login/login.html';
	};
	
};





