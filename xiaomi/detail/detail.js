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



//菜单吸顶
(function() {
	var navBar = document.querySelector('.nav-bar');
	var nowTop = document.documentElement.scrollTop || window.scrollYOffset || document.body.scrollTop;
	var navTop = nowTop + navBar.getBoundingClientRect().top;
	window.onscroll = function() {
		scrollTop = document.documentElement.scrollTop || window.scrollYOffset || document.body.scrollTop;
		if(scrollTop >= navTop) 
			navBar.classList.add('fixed');
		else
			navBar.classList.remove('fixed');
	}
	
})();



var colorShow = document.querySelector('.buy-option').querySelector('ul').querySelectorAll('li');
	for(var i = 0; i < colorShow.length; i++) {
		colorShow[i].index = i;
		colorShow[i].onclick = function() {
			if(this.classList.contains('show')) return;
			this.parentNode.querySelector('.show').classList.remove('show');
			this.classList.add('show');
			document.querySelector('.img-left').querySelector('.swiper-slide.show').classList.remove('show');
			document.querySelector('.img-left').querySelectorAll('.swiper-slide')[this.index].classList.add('show');
			ri();
		}	
	}
ri();
//轮播图
function ri() {
	var index = 0, timer = null;
	var imgLeft = document.querySelector('.img-left').querySelector('.swiper-slide.show');
	//console.log(imgLeft)
	var img = imgLeft.querySelectorAll('.img');
	//console.log(img)
	var indicator = imgLeft.querySelectorAll('.indicator');
	//console.log(indicator)
	for(var i = 0; i < img.length; i++) {
		indicator[i].index = i;
		indicator[i].onclick = function() {
			if(this.classList.contains('active')) return;
			imgBanner(this.index);
		}
	}
	function imgBanner(nextIndex) {
		img[index].classList.remove('active');
		indicator[index].classList.remove('active');
		index = nextIndex;
		if(index == img.length) index=0
 		else if(index == -1) index = img.length-1
		img[index].classList.add('active');
		indicator[index].classList.add('active');
	}
	timer = window.setInterval(function() {
		imgBanner((index + 1) % img.length); }, 2000);
	imgLeft.onmouseover = function() {
		window.clearInterval(timer);
		timer = null;
	}
	imgLeft.onmouseout = function() {
		timer = window.setInterval(function() {
			imgBanner((index + 1) % img.length); }, 2000);
	}
	
	document.querySelector('.btn-left').onclick = function() {
		imgBanner(index-1);
	}
	document.querySelector('.btn-right').onclick = function() {
		imgBanner(index + 1);
	}
}

















