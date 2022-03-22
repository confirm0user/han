// 轮播图
new Swiper('.swiper-container.banner', {
	loop: true ,			//开启无缝
	autoplay: {
		autoplay: true ,
		delay: 6000 ,
		disableOnInteraction: false
	} ,						//自动播放
	freeMode: false ,				//抵抗反弹
	pagination: {
		el: '.banner>.swiper-pagination' ,
		type: "bullets"
	},
	navigation: {
		prevEl: ".banner>.swiper-button-prev" ,
		nextEl: ".banner>.swiper-button-next"
	}
});

// 倒计时
(function () {
	var endTime = new Date().getTime() + 24 * 60 *60 * 1000;
	var timer = null;
	function countdown() {
		var diff = endTime - new Date().getTime();
		diff = Math.ceil( diff / 1000);
		var second = diff % 60;
		$('span.second').text(second);
		var minutes = Math.floor(diff / 60) % 60;
		var hours = Math.floor(diff / 3600) % 24;
		$('span.minutes').text(minutes);
		$('span.hours').text(hours);
	}
	timer = setInterval(countdown,1000);
})();






