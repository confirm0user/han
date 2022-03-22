//返回上一页
$('.head-wrap>img').on('click', function() {
	if(document.referrer === "http://localhost:3000/order_confirm/index.html") {
			window.location.href = "/home/index.html";
			return;
		}
	if(document.referrer === "http://localhost:3000/login/login.html") {
			window.location.href = "/home/index.html";
			return;
		}
	window.location.href = document.referrer;
});

//判断用户是否登录
if(!Cookies.get('token')) {
	window.location.href = '/login/login.html';
	$('.cart-wrap.show').removeClass('show').siblings().addClass('show');
}
else
	$.ajax({
		type: 'post',
		url: '/cart/list',
		headers: {Authorization: Cookies.get('token')},
		success: function(res) {
			if(res.code !==200) {console.log(res.code); return;}
			console.log(res.data)
			function getHtml(detail) {
				// href="/detail/detail.html?id=${detail.pid}"
				console.log(detail);
				return `
					<li class="cart-item" data-id=${detail.id} data-pid=${detail.pid}>
						<p class="checkbox-wrap"><span class="checkbox"></span></p>
						<p class="checkbox-wrap hidden"><span class="checkbox"></span></p>
						<a class="product" >
							<div class="avatar"><img src="${detail.avatar}" alt=""></div>
							<ul>
								<li class="name">${detail.name}</li>
								<li class=""></li>
								<li class="price_count">
									<p >￥<span class="price">${detail.price}</span></p>
									<p class="count-wrap">
										<button class="btn-decrease" ${detail.count === 1 ? "disabled" : ''} type="button">-</button>
										<span class="count">${detail.count}</span>
										<button class="btn-increase" ${detail.count === 9 ? "disabled" : ''} type="button">+</button>
									</p>
								</li>
							</ul>
						</a>
					</li>
				`;
			}
			var htmlStr = '';
			res.data.forEach(function(item) {
				htmlStr += getHtml(item) });
			$(htmlStr).appendTo('ul.cart-list');
			//判断购物车有无商品
			if($('ul.cart-list>li').length === 0 ) 	$('.cart-wrap.show').removeClass('show').siblings().addClass('show');
			
			var detail = res.data;
			var target = null;
			console.log(res.data)
			//冒泡事件绑定
			$('ul.cart-list')
				.on('click','div.avatar',function() {
					window.location.href = `/detail/detail.html?id=${detail[0].pid}`;
				})
				.on('click','li.name',function() {
					window.location.href = `/detail/detail.html?id=${detail[0].pid}`;
				})
				//减
				.on('click','.btn-decrease', function(res) {
					var id = parseInt($(this).closest('li.cart-item').attr('data-id'));
					$.ajax({
						type: 'post',
						url: '/cart/decrease/' + id,
						headers: {Authorization: Cookies.get('token')},
						success: function(res) {
							if(res.code !== 200) {console.log(res.code); return;}
							target = detail.find(function(item) {return item.id === id;});
							target.count -= 1;
							$(this).attr('disabled',target.count === 1)
								.next().text(target.count)
								.next().attr('disabled', false);
						}.bind(this)
					})
					aaa();
				
				})
				//加
				.on('click','.btn-increase', function(res) {
					var id = parseInt($(this).closest('li.cart-item').attr('data-id'));
					$.ajax({
						type: 'post',
						url: '/cart/increase/' + id,
						headers: {Authorization: Cookies.get('token')},
						success: function(res) {
							if(res.code !== 200) {console.log(res.code); return;}
							target = detail.find(function(item) {return item.id === id;});
							target.count += 1;
							$(this).attr('disabled',target.count === 9)
								.prev().text(target.count)
								.prev().attr('disabled', false);
						}.bind(this)
					});
					aaa();
				})
				//复选框
				.on('click', 'span.checkbox:not(.all)',function() {
					$(this).toggleClass('checked');
					var unchecked = $(this).closest('ul.cart-list').find('span.checkbox:not(.checked)').length === 0;
					// console.log(unchecked)
					$('.cart-pos span.checkbox.all').toggleClass('checked', unchecked);
					
					//
					
					aaa();
				});
			//有品精选全选框
			$('.cart-content span.checkbox.all').on('click', function(e) {
				$(this).toggleClass('checked');
				$('.footer span.checkbox.all').toggleClass('checked', $(this).hasClass('checked'));
				$('ul.cart-list span.checkbox').toggleClass('checked', $(this).hasClass('checked'));
				aaa();
			})
			//全选框
			$('.footer span.checkbox.all').on('click', function(e) {
				$(this).toggleClass('checked');
				$('.cart-content span.checkbox.all').toggleClass('checked', $(this).hasClass('checked'));
				$('ul.cart-list span.checkbox').toggleClass('checked', $(this).hasClass('checked'));
				//全选的总数量
				$.ajax({
					url: '/cart/total',
					headers: {Authorization: Cookies.get('token')},
					success: function(res) {
						if(res.code !== 200) {console.log(res.code); return;}
						console.log(res)
					}
				});
				aaa();
			})
			//合计
			function aaa() {
				setTimeout(function() {
					var total = 0;
					var checked = $('ul.cart-list>li:has(p.checkbox-wrap:not(.hidden)>span.checkbox.checked)');
					// console.log($(checked));
					$.ajax({
						type: 'post',
						url: '/cart/list',
						headers: {Authorization: Cookies.get('token')},
						success: function(res) {
							if(res.code !==200) {console.log(res.code); return;}
							$(checked).each(function(i,item) {
								var pid = parseInt($(item).attr('data-pid'));
								target = res.data.find(function(single) { return single.pid === pid;});
								// console.log(res.data);
								// console.log(target);
								total += target.price * target.count;
								// console.log(total);
							});
							$('.footer-l span.total').text(total);
						}
						
					});
				}, 100);
			}
			
			//勾选在结算出现数量
			/* function count() {
				var num = 0;
				$('ul.cart-list span.checkbox.checked').forEach(function(item) {
					var n =parseInt($(item).$('span.count').text());
					num += n;
				});
				$('foot-bill span.num').text(num);
			} */
			
			
			//点击编辑
			$('span.btn-edit').on('click', function() {
				$(this).addClass('hidden').siblings().removeClass('hidden');
				$('ul.cart-list li.cart-item>p.checkbox-wrap.hidden').removeClass('hidden')
					.siblings('p.checkbox-wrap').addClass('hidden');
				$('.footer.hidden').removeClass('hidden')
					.siblings('.footer').addClass('hidden');
					
				//删除
				$('p.btn-remove').on('click', function() {
					var checked = $('ul.cart-list>li:has(p.checkbox-wrap:not(.hidden)>span.checkbox.checked)');
					var id = [];
					console.log($(checked).length)
					$(checked).each(function(i,item) {
						id[i] = parseInt($(item).attr('data-id'));
					});
					$.ajax({
						type: 'post',
						url: '/cart/remove',
						data: {
							ids: id
						},
						headers: {Authorization: Cookies.get('token')},
						success: function(res) {
							if(res.code !==200) {console.log(res.code); return;}
							$(checked).each(function(i,item) {
								$(item).remove();
							});
							if($('ul.cart-list>li').length === 0) {
								$('.cart-wrap.show').removeClass('show').siblings().addClass('show');
							}
						}
					})
				});
			});
			
			//点击完成
			$('span.btn-ok').on('click', function() {
				$(this).addClass('hidden').siblings().removeClass('hidden');
				$('ul.cart-list li.cart-item>p.checkbox-wrap.hidden').removeClass('hidden')
					.siblings('p.checkbox-wrap').addClass('hidden');
				$('.footer.hidden').removeClass('hidden')
					.siblings('.footer').addClass('hidden');
			});
			
			
			
			//结算
			$('p.settlement').on('click', function(){
				//找到选中的复选框
				var $checkedNum = $('ul.cart-list p.checkbox-wrap:not(.hidden)>span.checkbox.checked');
				console.log($checkedNum.length);
				var id = [];
				$checkedNum.each(function(i,item) {
					id[i] = parseInt($(item).closest('li').attr('data-id'));
					console.log($(item).closest('li').attr('data-id'));
				});
				if(!$checkedNum.length) {
						layer.msg('您未选中商品哦~',{time: 1000})
				} else {
					window.location.href = `/order_confirm/index.html?data-id=${id}`;
				}
			})
	}
})


