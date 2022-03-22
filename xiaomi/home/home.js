// 返回顶部
(function() {
	var button = document.querySelector('.home-tool-bar .totop'),
		threshold = 815;
		
	window.onscroll = function() {
		var nowTop = document.documentElement.scrollTop || window.scrollYOffset || document.body.scrollTop;
		if(nowTop >= threshold) button.classList.add('fixed');
		else button.classList.remove('fixed');
	};
	button.onclick = function() {
		window.scrollTo(0, 0);
	};
})();

//搜索框
(function() {
	var ulHtml = `
		<ul class="result-list">
			<li><a href="../list/index.html" target="_blank">全部商品</a></li>
			<li><a href="../list/index.html" target="_blank">小米11</a></li>
			<li><a href="../list/index.html" target="_blank">小米手机</a></li>
			<li><a href="../list/index.html" target="_blank">空调</a></li>
			<li><a href="../list/index.html" target="_blank">耳机</a></li>
			<li><a href="../list/index.html" target="_blank">黑鲨</a></li>
		</ul>
	`;
	document.querySelector('.keyword-list').innerHTML = ulHtml;
	var ul = document.querySelector('ul.result-list');
	ul.style.display = 'none';
	document.querySelector('input.btn-search').onclick = function() {
		document.querySelector('input.btn-search').style.border = '1px solid #FF6700'
		/* var lis = ul.querySelectorAll('li');
		for(var i = 0; i < lis.length;i++) {
			lis[i].onclick = function() {
				
			}
		} */
		document.querySelector('ul.result-list>li').onclick = function() {
			window.location.href = '../list/index.html';
		}
		ul.style.border = '1px solid #FF6700';
		ul.style.display = 'block';
	}
	/* document.querySelector('input.btn-search').onblur = function() {
		ul.style.display = 'none';
		document.querySelector('input.btn-search').style.border = '1px solid #B0B0B0';
	} */
})();

// 无缝轮播图
(function() {
	var index = 1, //标识记录当前轮播图第几张处于显示状态
	timer = null,
	isToggling = false; //标识轮播图当前是否正处于toggle切换过渡中
	var length = document.querySelectorAll('ul.slider-wrapper li').length;
	function bannerToggle(nextIndex) {
		index = nextIndex;
		isToggling = true; //标识进入了toggle切换过渡中
		var scrollDom = document.querySelector('ul.slider-wrapper');
		scrollDom.style.transitionDuration = "0.4s"
		scrollDom.style.left = `-${nextIndex}00%`;
		//控制指示器的切换
		document.querySelector('.banner-indicator span.active').classList.remove('active');
		var i = index;
		if(index === length - 1) i = 1;
		else if(index === 0) i = length - 2;
		document.querySelectorAll('.banner-indicator span.indicator')[i - 1].classList.add('active');
		//每次toggle过渡完成后的收尾工作
		setTimeout(function() {
			if(index === length - 1) {
				index = 1;
				scrollDom.style.transitionDuration = "0s";
				scrollDom.style.left = `-${index}00%`;
			}
			if(index === 0) {
				index = length - 2;
				scrollDom.style.transitionDuration = "0s";
				scrollDom.style.left = `-${index}00%`;
			}
			isToggling = false;
		},400);
	};
	//开始自动轮播
	timer = setInterval( function() { bannerToggle(index + 1) }, 4000); 
	//鼠标划入banner停止自动轮播
	document.querySelector('.banner').onmouseover = function() {
		clearInterval(timer);
		timer = null;
	}
	//鼠标滑出banner回复自动轮播
	document.querySelector('.banner').onmouseout = function() {
		timer = setInterval( function() { bannerToggle(index + 1) }, 4000);
	}
	//给上一个和下一个绑定点击事件
	document.querySelector('span.btn-prev').onclick = function() {
		if(isToggling) return;
		bannerToggle(index - 1);
	}
	document.querySelector('span.btn-next').onclick = function() {
		if(isToggling) return;
		bannerToggle(index + 1);
	}
	//indicator 绑定点击事件
	document.querySelectorAll('.banner-indicator span').forEach(function(item,i) {
		item.index = i + 1;
		item.onclick = function() {
			if(this.classList.contains('active') || isToggling) return;
			bannerToggle(this.index);
		}
	});
})();
//划过切换
(function() {
	var homeBox = document.querySelectorAll('.home-brick-box');
	for(var j = 0; j < homeBox.length; j++) {
		var lis = homeBox[j].querySelectorAll('.more>ul.tab-list>li');
		for(var i = 0; i < lis.length; i++) {
		lis[i].index = i;
		lis[i].onmouseover = function() {
			if(this.classList.contains('tab-list-active')) return;
			this.parentNode.querySelector('.tab-list-active').classList.remove('tab-list-active');
			this.classList.add('tab-list-active');
			this.parentNode.parentNode.parentNode.parentNode.querySelector('.box-bd>.span16-list>.tab-active').classList.remove('tab-active');
			this.parentNode.parentNode.parentNode.parentNode.querySelectorAll(".span16-list>ul.brick-list")[this.index].classList.add('tab-active');
		}
		}
	}
})();

document.querySelector('.topbar-info span.logon').onclick = function() {
	console.log(111)
}




/* //获取登录的用户，登录后并动态渲染
//(function() {
	var n = Cookies.get('users') ? JSON.parse(Cookies.get('users')) : [];
	//var n = JSON.parse(Cookies.get('users'));
	var state = n.find(function(item) {return item.state === true;});
	 console.log(state);
	if(state) {
		console.log(1)
		loginAfter(); }
	 else loginBefor();
//})();
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
		console.log(582);
	};
	
};

//登录前
	function loginBefor() {
		var userHtml = `
			<span class="login"><a href="../login/login.html">登录</a></span>
			<span class="logon"><a href="../login/login.html">注册</a></span>
			<span class="message"><a href="">消息通知</a></span>
		`;
		document.querySelector('.topbar-info').innerHTML = userHtml;
	};
 */




