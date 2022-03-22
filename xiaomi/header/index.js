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


