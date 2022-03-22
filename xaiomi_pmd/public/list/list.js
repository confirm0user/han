
// console.log($.query.get('cid'));
(function() {
	//点击 返回上一个界面
	$('img.revert').on('click', function() {
		// var referrer = window.referrer === 
		window.location.href = document.referrer;
	});

	
	var cid = parseInt($.query.get('cid')) || 17;
	var cName = $.query.get('cName') || "电视机";
	var name = "";				//搜索框输入的字符串
	var orderCol = "price"; 	//排序方案： rate|price|sale
	var orderDir = "asc";		//排序方向：asc | desc
	// var begin = ;
	var pageSize = 6;			//每页显示多少条
	var isLoading = false;		//标识当前是否有未完成的ajax
	var hasMore = true;			//标识按当前条件看商品，还有木有更多可以看
	var scroll = null;			//保存new IScroll的结果
	var isTriggerLoadMore = false;	//表示在滚动中是否触发了加载更多
	
	$('.header>span').text(cName);
	
	function updateTip() {
		if(isLoading) 
			$('p.tip').text('——加载中——');
		else if(isTriggerLoadMore)
			$('p.tip').text('——放手加载更多——');
		else if(hasMore) 
			$('p.tip').text('——上拉加载更多——');
		else if($('ul.list li').length === 0) 
			$('p.tip').text('——暂无相关商品，敬请期待——');
		else
			$('p.tip').text('——没有更多商品了——');
	}
	function initOrRefreshScroll() {
		//一定要等滚动区域加载完毕，宽/高 确定后在进行new
		imagesLoaded($('.content')[0], function() {
			if(scroll === null) {
				scroll = new IScroll($('.content')[0], {
					deceleration: 0.002,	//设置阻尼系数
					bounce: false,			//关闭边界回弹
					probeType: 2,			//开启滚动监听
					click: true				//支持点击事件
				});
				scroll.on('scroll', function() {
					if(isLoading || !hasMore) return;
					isTriggerLoadMore = scroll.maxScrollY - scroll.y === 0;
					updateTip();
				})
				scroll.on('scrollEnd', function() {
					if(isTriggerLoadMore) {
						isTriggerLoadMore = false;
						getData(true);
					}
					console.log('结束');
				})
			} else {
				scroll.refresh();		//更新滚动区域
			}
		});
	}
	
	/* 公共的获取商品数据的函数
		1.刚进来					getDate( )
		2.orderCol变化的时候		getDate( )
		3.orderDir变化的时候		getDate( )
		4.上拉加载更多			getDate(true)
		5.点击搜索按钮时			getDate( )
		*/
	function getData(isLoadMore = false) {
		isLoading = true;
		//改tip显示
		updateTip();
		if(!isLoadMore) {
			$('ul.list').empty();
			// if(scroll) scroll.scrollTo(0, 0, 0);
			scroll && scroll.scrollTo(0, 0, 0);
		}
		//发ajax请求商品数据
		$.ajax({
			type: "post",
			url: "/product/list",
			data: {
				name: name, cid: cid, orderCol, orderDir,
				begin: $('ul.list>li').length, pageSize
			},
			success: function(res) {
				console.log(res)
				if(res.code !== 200) {return;}
				hasMore = res.data.length === pageSize;
				var htmlStr = "";
				res.data.forEach(function(item) {
					htmlStr += `
						<li class="list-item" >
							<a href="/detail/detail.html?id=${item.id}">
								<img src="${item.avatar}" alt="">
								<div class="right-wrap">
									<p class="name">${item.name}</p>
									<p class="brief">${item.brief}</p>
									<p class="price-wrap">
										￥<span class="price">${item.price}</span>
									</p>
									<p class="other">
										<span class="sale">已售出${item.sale}宝贝</span>
										<span>|</span>
										<span class="rate">${item.rate}条评论</span>
									</p>
								</div>
							</a>
						</li>
					`;
				});
				$(htmlStr).appendTo('ul.list');
				initOrRefreshScroll();
				
				isLoading = false;
				//更改tip
				updateTip();
				// console.log(res);
			}
		});
	}
	//1.刚进来调一次getData
	getData();
	
	//排序切换
	$('.order-wrap').on('click', 'span', function(e) {
		if(isLoading) { 
			layer.msg('您的操作太频繁',{ time: 1000, icon:2 });
			return;
		}
		if($(this).hasClass('active')) {
			orderDir = orderDir === "asc" ? "desc" : "asc";
			console.log($(e.delegateTarget).children())
			$(e.delegateTarget).children().toggleClass('asc desc');
		}
		else {
			orderCol = $(this).attr('data-col');
			$(this).addClass('active').siblings('.active').removeClass('active');
		}
		getData();
	});
	
	//将 nav 动态渲染
	$.ajax({
		url: "/category/list/" + 1,
		success: function(res) {
			if(res.code !== 200) { console.log(res.code); return; }
			$('ul.swiper-wrapper').empty();
			console.log(res.data)
			if(res.data.length) {
				var liHtml = '';
				res.data.forEach(function(item){
					liHtml += `
						<li class="swiper-slide">
							<a href="/list/list.html?cid=${item.id}&cName=${item.name}">
								<img src="${item.avatar}" />
								<span>${item.name}</span>
							</a>
						</li>
					`;
				});
				$('ul.swiper-wrapper').html(liHtml);
				new Swiper('.swiper-container', {
					// loop: true, // 循环模式选项
					slidesPerView: 5.5
				});
			}
		}
	});
	
	
	
})();


/* //一定要等滚动区域加载完毕，宽/高 确定后在进行new
new IScroll($('.content')[0], {	
}); */





