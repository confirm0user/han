// 返回顶部
(function() {
	var button = document.querySelector('.home-tool-bar .totop'),
		threshold = 815;

	window.onscroll = function() {
		var nowTop = document.documentElement.scrollTop || window.scrollYOffset || document.body.scrollTop;
		if (nowTop >= threshold) button.classList.add('fixed');
		else button.classList.remove('fixed');
	};
	button.onclick = function() {
		window.scrollTo(0, 0);
	};
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


//商品排序
(function() {
	var earphones = [
		{
			id: 1,
			avatar: "img/0011.jpg",
			name: "小米真无线蓝牙耳机Air2 SE 白色",
			price: 129,
			img1: "img/0011.jpg",
			img2: "",
			img3: "",
			img6: "",
			sales: 7,
			time: 7
		},
		{
			id: 3,
			avatar: "img/0012.jpg",
			name: "Redmi AirDots 2真无线蓝牙耳机",
			price: 79,
			img1: "img/0012.jpg",
			img2: "",
			img3: "",
			img6: "",
			sales: 5,
			time: 6
		},
		{
			id: 6,
			avatar: "img/0013.jpg",
			name: "小米圈铁耳机Pro 银色",
			price: 129,
			img1: "img/0013.jpg",
			img2: "",
			img3: "",
			img6: "",
			sales: 3,
			time: 1
		},
		{
			id: 7,
			avatar: "img/0014.jpg",
			name: "莘莘学子套装",
			price: 678,
			img1: "img/0014.jpg",
			img2: "",
			img3: "",
			img6: "",
			sales: 9,
			time: 13
		},
		{
			id: 9,
			avatar: "img/0015.jpg",
			avatar2: "img/00151.jpg",
			avatar3: "img/00152.jpg",
			name: "Redmi AirDots 3真无线蓝牙耳机 粉色",
			price: 199,
			img1: "img/0015.jpg",
			img2: "img/00151.jpg",
			img3: "img/00152.jpg",
			img6: "",
			sales: 16,
			time: 3
		}
	];
	var goodsList = document.querySelector('.goods-list');
	var htmlStr = '';
	earphones.forEach(function(item) {
		htmlStr += write(item);
		// console.log(item)
	});
	goodsList.innerHTML = htmlStr;

	function write(earphone) {
		var htmlStr = `
		<div class="goods-item">
			<a href="../detail/detail3.html" target="_blank">
				<div class="auto">
					<img class="active" src="${earphone.avatar}" alt="" width="200px">
				</div>
				<h2 class="title3">${earphone.name}</h2>
				<p class="price-wrap">
					<span class="price">${earphone.price}</span>元
				</p>
				<ul class="thumbs9-list">
					<li class="active"><img src="${earphone.img1}" width="34px"></li>
					<li class=""><img src="${earphone.img2}" width="34px"></li>
					<li class=""><img src="${earphone.img3}" width="34px"></li>
				</ul>
				<div class="flage">
					<img src="${earphone.img6}" alt="" width="27px">
				</div>	
			</a>
		</div>
		
	`;
		return htmlStr;
	}
	document.querySelectorAll('ul.order-list li.order-item').forEach(function(item, index) {
		console.log(index)
		item.onclick = function(){
			if(this.classList.contains('active')) return;
			item.parentNode.querySelector('.active').classList.remove('active');
			item.classList.add('active');
			
			if (index == 0) {
				let htmlStr = '';
				earphones.sort(sortId).forEach(function(item) {
					htmlStr += write(item);
				})
				goodsList.innerHTML = htmlStr;
			} else if (index == 1) {
				let htmlStr = '';
				earphones.sort(sortTime).forEach(function(item) {
					htmlStr += write(item);
				})
				goodsList.innerHTML = htmlStr;
			} else if (index == 2) {
				let htmlStr = '';
				earphones.sort(sortSales).forEach(function(item) {
					htmlStr += write(item);
				})
				goodsList.innerHTML = htmlStr;
			} else if (index == 3) {
				let htmlStr = '';
				earphones.sort(sortPrice).forEach(function(item) {
					htmlStr += write(item);
				})
				goodsList.innerHTML = htmlStr;
			}
		}
	})

	function sortId(a, b) {
		return a.id - b.id; }

	function sortTime(a, b) {
		return a.time - b.time;	}

	function sortSales(a, b) {
		return a.sales - b.sales; }

	function sortPrice(a, b) {
		return a.price - b.price; }
	
	
	/* document.querySelector('ul.thumbs9-list li').forEach(function(item) {
		item.onm
	}); */
	var aa = document.querySelectorAll('ul.thumbs9-list li');
	for(var i = 0; i < aa.length;i++) {
		aa[i].onmouseover = function() {
			if(this.classList.contains('active')) return;
			this.parentNode.querySelector('.active').classList.remove("active");
			this.classList.add('active');
		}
	}
	/* document.querySelectorAll('ul.thumbs9-list li').onmouseover = function() {
		if(this.classList.contains('active')) return;
	} */
	
})();


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
	//登录前
	
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


