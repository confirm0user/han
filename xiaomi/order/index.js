

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


//搜索框
(function() {
	var ul = document.querySelector('ul.result-list');
	ul.style.display = 'none';
	document.querySelector('input.btn-search').onfocus = function() {
		ul.style.border = '1px solid #FF6700';
		ul.style.display = 'block';
		document.querySelector('input.btn-search').style.border = '1px solid #FF6700'
	}
	document.querySelector('input.btn-search').onblur = function() {
		ul.style.display = 'none';
		document.querySelector('input.btn-search').style.border = '1px solid #B0B0B0';
	}
})();







//订单选项卡
(function() {
	var li = document.querySelectorAll('ul.filter-list li');
	for(var i = 0;i < li.length; i++) {
		li[i].index = i;
		li[i].onclick = function() {
			if(this.classList.contains('active')) return;
			this.parentNode.querySelector('.active').classList.remove('active');
			this.classList.add('active');
			document.querySelector('ul.uc-order-list.active').classList.remove('active');
			document.querySelectorAll('ul.uc-order-list')[this.index].classList.add('active');
			
			
		}
	}
	
	
})();






