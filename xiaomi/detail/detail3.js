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
			/* ri(); */
		}	
	}
/* ri(); */

(function() {
// 无论何时，zoom和zoomBig要与图片实际的宽高比相同
// 准备好放大镜功能需要的dom变量和一些关键值，提前定义好，在mousemove中就可以直接用了
var zoomMask = document.querySelector('.zoom-mask'),
	zoomMaskW = 0, zoomMaskH = 0;
	zoomBig = document.querySelector('.zoom-big'),
	zoom = document.querySelector('.zoom'),
	zoomBorderWidth = 3,
	zoomW = 0,          	
	zoomH = 0,           	
	maxLeft = 0,   			
	maxTop = 0,    			
	zoomRatio = 2; 			// 放大镜放大的比例(正好是大的放大比例，小的缩小比例)
// 初始化放大镜
function initZoom(img) {}
// 图片加载完毕，动态初始化确定放大镜zoom的覆盖范围
document.querySelector('img.avatar').onload = function() { 
	console.log('换图片了');
	document.querySelector('.zoom-wrapper').style.width = this.width + "px";
	document.querySelector('.zoom-wrapper').style.height = this.height + "px";
	zoom.style.width = `${this.width / zoomRatio}px`;
	zoom.style.height = `${this.height / zoomRatio}px`;
	zoom.style.backgroundImage = `url(${this.src})`;
	zoom.style.backgroundSize = `${this.width}px ${this.height}px`;
	zoomW = this.width / zoomRatio;
	zoomH = this.height / zoomRatio;
	maxLeft = this.width - zoomW;
	maxTop = this.height - zoomH;
	
	zoomBig.style.backgroundImage = `url(${this.src})`;
	zoomBig.style.backgroundSize = `${this.width * zoomRatio}px ${this.height * zoomRatio}px`;
	
	zoomMaskW = this.width;
	zoomMaskH = this.height;
};
// 
zoomMask.onmousewheel = function(e) {
	console.log(e.wheelDelta)
	if(e.wheelDelta > 0 && zoomRatio >= 4.0) return;
	if(e.wheelDelta < 0 && zoomRatio <= 1.0) return; 
	if(e.wheelDelta > 0) zoomRatio += 0.1;
	else zoomRatio -= 0.1;
	if(zoomRatio > 4) zoomRatio = 4;
	if(zoomRatio < 1) zoomRatio = 1;
	zoom.style.width = `${zoomMaskW / zoomRatio}px`;
	zoom.style.height = `${zoomMaskH / zoomRatio}px`;
	// zoom.style.backgroundImage = `url(${this.src})`;
	zoom.style.backgroundSize = `${zoomMaskW}px ${zoomMaskH}px`;
	zoomW = zoomMaskW / zoomRatio;
	zoomH = zoomMaskH / zoomRatio;
	maxLeft = zoomMaskW - zoomW;
	maxTop = zoomMaskH - zoomH;
	// zoomBig.style.backgroundImage = `url(${this.src})`;
	zoomBig.style.backgroundSize = `${zoomMaskW * zoomRatio}px ${zoomMaskH * zoomRatio}px`;
	// 再来一遍
	var x = e.offsetX - zoomW / 2, y = e.offsetY - zoomH / 2;
	if(x < 0 ) x = 0;
	if(x > maxLeft) x = maxLeft;
	if(y < 0) y = 0;
	if(y > maxTop) y = maxTop;
	zoom.style.left = `${x - zoomBorderWidth}px`;
	zoom.style.top = `${y - zoomBorderWidth}px`;
	zoom.style.backgroundPosition = `-${x}px -${y}px`;
	zoomBig.style.backgroundPosition = `-${x * zoomRatio}px -${y * zoomRatio}px`;
};
zoomMask.onmousemove = function(e) {
	var x = e.offsetX - zoomW / 2, y = e.offsetY - zoomH / 2;
	if(x < 0 ) x = 0;
	if(x > maxLeft) x = maxLeft;
	if(y < 0) y = 0;
	if(y > maxTop) y = maxTop;
	zoom.style.left = `${x - zoomBorderWidth}px`;
	zoom.style.top = `${y - zoomBorderWidth}px`;
	zoom.style.backgroundPosition = `-${x}px -${y}px`;
	zoomBig.style.backgroundPosition = `-${x * zoomRatio}px -${y * zoomRatio}px`;
};
})();



//轮播图
/* function ri() {
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
 */
















