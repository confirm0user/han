var orderId = $.query.get('data-orderId');
var id = $.query.get('id');
console.log(orderId)


//返回上一个页面
$('.header img.cancle').click(function() {
	console.log(document.referrer)
	if(document.referrer === 'http://localhost:3000/profile/profile.html')
		window.location.replace(document.referrer);
	else {
		window.location.replace("/home/index.html");
	}
});
//默认全部对应的div
$('.order-box>div').eq(0).show().siblings().hide();

//菜单对应的div内容  选项卡
$('ul.order-head>li').on('click',function() {
	// console.log($(this))
	if($(this).children('p').hasClass('.active')) return;
	$(this).children('p').addClass('active');
	$(this).siblings().children('p.active').removeClass('active');
	var index = $(this).index();	//找到当前点击的索引（下标）
	var order = $('.order-box>div').eq(index);
	order.show().siblings().hide();	//显示li对应的div元素，其它的隐藏
});


//order-list
function orderList(account,orderId,pay) {
	return `
		<div class="order-list" data-orderId=${orderId}>
			<div class="one">
				<h5><img src="/images/logo_xiaomi_new.png" >小米自营</h5>
				<span class="cancel">${pay === 1 ? "卖家已发货" : "待付款" }</span>
			</div>
			 
			<div class="three">
				<div>共<span class="count"></span>件商品.</div>
				<p>总金额</p>
				<span>￥<span class="account">${account}</span>.00</span>
			</div>
			<div class="four">
				<div class="four-rc">
					<p class="remove">删除订单</p>
					<p class="countdown">
						<span>已失效</span>
					</p>
				</div>
				<div class="buy-again">
					<span>再次购买</span>
				</div> 
			</div>
		</div>
	`;
}
function two(item) {
	// console.log(item.id)
	return `
	<div class="two" data-id=${item.id}>
		<div class="avatar"><img src="${item.avatar}" alt=""></div>
		<div class="n_p_c">
			<p class="name">${item.name}</p>
			<p class="p-c">
				<span>￥<span class="price">${item.price}</span>.00</span>
				<span>×<span class="count">${item.count}</span></span>
			</p>
		</div>
	</div>
	`;
}


//当前登录的用户所有的订单信息
$.ajax({
	headers:{ Authorization: Cookies.get('token') },
	url: '/order/list_all',
	success: function(res) {
		if(res.code !==200 ) {console.log(res.msg); return; }
		console.log(res);
		if(res.data.length === 0) {
		  how().siblings().hide();
		} else {
			$('div.order1>.no').hide().siblings().show();
			var allInfor = res.data;
			console.log(res.data);
			allInfor.forEach(function(item,i) {
				var asd = i;
				$('.order-box .order1').append(orderList(item.account,item.orderId,item.pay));
				item.details.forEach(function(item) {
					$('.order-box .order1>.order-list>.three').eq(asd).before(two(item));
				});
			});
			
			remove();
		}
	}
});
function remove() {
	setTimeout(function() {
		$('p.remove').on('click', function() {
			var orderId = $(this).closest('.order-list').attr('data-orderId');
			console.log(orderId)
			$.ajax({
				headers:{Authorization: Cookies.get('token')},
				url: '/order/remove/' + orderId ,
				success: function(res) {
					if(res.code !==200 ) {console.log(res.msg); return; }
				}
			});
			$(this).closest('.order-list').remove();
			layer.msg('删除成功', {time: 1000});
		})
	},100);
}


var timer = null;
//待付款订单信息
$.ajax({
	headers:{Authorization: Cookies.get('token')},
	url: '/order/list_unpay',
	success: function(res) {
		if(res.code !==200 ) {console.log(res.msg); return; }
		console.log(res);
		var allInfo = res.data;
		var index = 0;
		var orderTimeMs = [],arr=[];//当前订单确认订单的毫秒数
		console.log(allInfo)
		if(res.data.length === 0) {
			$('div.order2>.no').show().siblings().hide(); 
		} else {
			$('div.order2>.no').hide().siblings().show();
			
			allInfo.forEach(function(item, i) {
				// console.log(item,i);
				index = i; 
				// console.log(index);
				arr[i] = i;
				orderId = item.orderId;
				orderTimeMs[i] = new Date(item.orderTime).getTime();
				
				$('.order-box .order2').append(orderList(item.account,item.orderId));
				$('.order-box .order2>.order-list span.cancel').text('待付款');
				item.details.forEach(function(item,i,orderTimeMs) {
					$('.order-box .order2>.order-list>.three').eq(index).before(two(item));
				});
				// console.log($('.order-box .order2>.order-list>.three').eq(index))
			});
			// console.log(orderTimeMs,arr);
			ms(orderTimeMs,arr);
			$('div.order2>.order-list .four-rc').addClass('cd');
		}
	}	
});
function ms(orderTimeMs,arr) {
	var diff = 0;
	console.log(orderTimeMs,arr);
	orderTimeMs.forEach(function(item,i) {
		var endTime = item + 15*60*1000;
		var nowTime = new Date().getTime();
		var j = arr[i];
		if(endTime - nowTime>0) {
			timer = setInterval(function() {
				var nowTime = new Date().getTime();
				diff = endTime - nowTime;
				// if(diff<=0) { return; }
				// else { $('div.order2>.order-list .four-rc').addClass('cd'); }
				countdown(diff,j);
			},1000);
		} 
		// else {  $('div.order2>.order-list').eq(j).remove(); }
			
	});
}
//倒计时
function countdown(diff,i) {
	if(diff<=0) {
		// $('div.order2>.order-list .four-rc').removeClass('cd');
		// console.log(1);
		clearInterval(timer);
		timer = null;
		// $('div.order2 .order-list').eq(i).addClass('no');
		// console.log($('div.order2 .order-list'));
		return; 
	} else {
		// console.log(diff);
		diff = Math.ceil(diff/1000);
		// console.log(diff);
		var hours = Math.floor(diff/60/60) % 24;
		var minutes = Math.floor(diff/60)%60;
		var second = Math.floor(diff%60);
		// console.log(minutes);
		// console.log(second);
		// $(' div.order2 span.second').eq(i).text(hours);
		// $(' div.order2 span.minutes').eq(i).text(minutes);
		// $(' div.order2 span.second').eq(i).text(second);
		$('div.order2 p.countdown').eq(i).html (`
			<span class="hours">${hours}</span>:
			<span class="minutes">${minutes}</span>:
			<span class="second">${second}</span>
		`);
		
	}

};

	



//已成功付款
$.ajax({
	headers: {Authorization: Cookies.get('token')},
	url: '/order/list_pay',
	success: function(res) { console.log(res);
		if(res.code !== 200) {console.log(res.code); return;} 
		var allInfo = res.data;
		if(res.data.length === 0) {
			$('div.order3>.no').show().siblings().hide(); 
		} else {
			$('div.order3>.no').hide().siblings().show();
			allInfo.forEach(function(item, i) {
				var index = i;
				// console.log(item.details.length);
				$('.order-box .order3').append(orderList(item.account,item.orderId,item.pay));
				$('.order-box .order3 span.cancel').css({color: "#BF1111"});
				item.details.forEach(function(item) {
					// console.log(item);
					$('.order-box .order3>.order-list>.three').eq(index).before(two(item));
				});
				// $('.order-box .order3 .buy-ok').css({display: flex;});
			});
			
		}
	}
});


//再次购买
setTimeout(function() {
	var pid = 0;
	$('.buy-again').on('click',function() {
		var $two = $(this).parent().siblings('.two');
		// $(this).parent().siblings('.two').attr('data-id');
		console.log($two);
		$two.each(function(i,item) {
			var pid = $(item).attr('data-id');
			console.log(pid);
			addCart(pid);
		});
		layer.msg('添加成功');
		setTimeout(function() {
			window.location.href = `/cart/cart.html`;
		},1000);
	})
},200);
function addCart(pid) {
	//像购物车增加商品 当前所选的商品
	$.ajax({
		type: 'post',
		url: '/cart/add',
		headers: {Authorization: Cookies.get('token')},
		data: {
			pid, count: 1
		},
		success: function(res) { console.log(res);
			if(res.code !== 200) {console.log(res.code); return;}
		}
	});
}











