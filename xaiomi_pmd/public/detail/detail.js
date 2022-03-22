//返回上一个页面
$('.img1').click(function() {
	window.location.href = document.referrer;
});
$('.img2 img').on('click', function() {});

$('.footer-left p:nth-child(1)').click(function() {
	window.location.href = '/home/index.html'
});

//购物车的pid是product的id
var id = $.query.get('id');
console.log(id)

var addressId = 0, account = 0;

//将详情页渲染
$.ajax({
	url: 'http://localhost:3000/product/model/' + id,
	success: function(res) {
		if(res.code !== 200) {console.log(res.msg); return};
		// console.log(res.data);
		account = res.data.price;
		var img = res.data.bannerImgs;
		imgHandle(img);
		new Swiper('.swiper-container.banner-detail', {
			autoplay:true,//等同于以下设置
			  /*autoplay: {
				delay: 3000,
				stopOnLastSlide: false,
				disableOnInteraction: true,
				},*/
			pagination: {
			  el: '.banner-detail>.swiper-pagination',
			  type: 'fraction'
			},
		});
		// console.log(res.data.name);
		$('.mes-price span.price').text(res.data.price);
		$('.name-wrap span.name').text(res.data.name);
		$('p.brief').text(res.data.brief);
		var img2 = res.data.otherImgs;
		detailHandle(img2);
	}
});
function imgHandle(img) {
	if(!img) return;
	var img = img.split(',');
	// console.log(img);
	var divStr = '';
	img.forEach(function(item,i) {
		divStr += `
			<div class="swiper-slide"><img src="${item}" /></div>
		`;
		// console.log(divStr)
	});
	$(divStr).appendTo('.banner-detail .swiper-wrapper');
}
function detailHandle(img) {
	if(!img) return;
	var img2 = img.split(',');
	// console.log(img2);
	var divStr = '';
	img2.forEach(function(item,i) {
		divStr += `
			<img src="${item}" />
		`;
		// console.log(divStr)
	});
	$(divStr).appendTo('.detail-wrap .detail');
}

//判断用户是否登录
if(!Cookies.get('token')) {
	$('.mijia')
	.on('click','.footer-right', function() {
		//询问框
		layer.confirm('您目前未登录！是否前去登录？', {
		  title: false, closeBtn: 0,
		  btn: ['去登陆','取消'] //按钮
		}, function(){
		 window.location.href = '/login/login.html';  })
	})
	.on('click','p.cart', function() {
		//询问框
		layer.confirm('您目前未登录！是否前去登录？', {
		  title: false, closeBtn: 0,
		  btn: ['去登陆','取消'] //按钮
		}, function(){
		 window.location.href = '/login/login.html';  })
	})
	.on('click','.addr-wrap', function() {
		//询问框
		layer.confirm('您目前未登录！是否前去登录？', {
		  title: false,  closeBtn: 0,
		  btn: ['去登陆','取消'] //按钮
		}, function(){
		 window.location.href = '/login/login.html'; })
	})
}
else {
	//用户已登录，
	$.ajax({
		type: 'post',
		url: '/cart/list',
		headers: {Authorization: Cookies.get('token')},
		success: function(res) {
			if(res.code !== 200) { console.log(res.msg); return;}
			// console.log(res.data);
			//找到当前页面对应数据库中的商品
			var product = '';
			product = res.data.find(function(item) {
				return item.pid === id; });
			console.log(product);
			//判断当前商品在购物车中是否存在
			if(product) {
				$('span.num').addClass('show');
				$('span.num.show').text(product.count);
			} 
			cartClickHandle(product);
		}
	});
	//点击出弹窗 把商品加入购物车,dom 和数据库的变更
	function cartClickHandle(product) {
		// console.log(1)
		var i = 0;
		$('p.add-cart').on('click', function() {
			// cpm(product);
			if(product) {
				$('span.num.show').text(product.count + 1);
				addProduct();
			} else {
				$('span.num').addClass('show');
				$('span.num.show').text(++i);
				addProduct();
			}
		});
	}
	
	//直接跳到购物车
	$('p.cart').on('click', function() {
		window.location.href = '/cart/cart.html';
	});
	//立即购买
	$('.buy-now').on('click', function() {
		
	});
}

$('.addr-wrap').on('click', function() {
	layer.open({
		type: 1,
		title: ['配送地址', 'color:#333;font-size:4vw;padding-left:40%;display: flex;align-items: center;'],
		content: addressHandle(),
		area: ['100%', '75%'],
		offset: 'b',
		anim: 'up' ,
		style: 'position:fixed; left:0; top:0; width:100%; height:100%; border: none; -webkit-animation-duration: .5s; animation-duration: .5s;'
	});
});
//在已登录的前提下，渲染弹出层的地址
function addressHandle() {
	$.ajax({
		headers: {Authorization: Cookies.get('token')},
		url: '/address/list',
		success: function(res) {
			if(res.code !== 200) {console.log(res.msg); return;}
			var addresses = res.data;
			var liHtml ='';
			$(addresses).each(function(i,item) { 
				liHtml += addrHtml(item); });
			$('.layui-layer-content').append('<div class="layer-content0"><div class="layer-cont"></div></div>');
			$('.layui-layer-content').append('<div class="layer-foot"></div>');
			$('.layer-cont').html(liHtml);
			$('.layer-foot').html('<p class="other-addr"><span>选择其它配送地址</span></p>');
			
			$('p.choose').on('click', function() {
				$(this).toggleClass('show');
				var id = parseInt($('p.choose.show').closest('.addr-item').attr('data-id'));
				console.log(typeof id)
				console.log(addresses)
				var ad = '';
				ad = addresses.find(function(item) {
					return item.id === id;})
					console.log(ad)
					addressId = ad.id;
				// var $addressM = $('p.choose.show').closest('.addr-item').children('p').text();
				$('span.addressregion').text(ad.receiveRegion);
				
				if($('p.choose.show'))
					layer.closeAll(); //疯狂模式，关闭所有层
			});
			$('p.other-addr').on('click', function() {
				console.log(1)
				window.location.href = `/address/address.html?pid=${id}`;
			})
			
		}
	});
}
//地址
function addrHtml(address) {
	return `
		<div class="addr-item" data-id=${address.id}>
			<div>
				<p class="choose"></p>
				<span class="name">${address.receiveName}</span>
				<span class="name">${address.receivePhone}</span>
				<div class="default ${address.isDefault ? '' : 'hidden'}"><span>默认</span></div>
			</div>
			<p>${address.receiveRegion} ${address.receiveDetail}</p>
		</div>
	`;
}
defaultAddr();
function defaultAddr() {
	//获取当前登录用户的默认收货地址
	$.ajax({
		headers: { Authorization: Cookies.get('token') },
		url: "/address/get_default",
		success: function(res) {
			if(res.code !== 200) {return; }
			// console.log(res);
			if(res.data) {
				addressId = res.data.id;
				$('.address').html(`
					<h6>${res.data.receiveName}</h6>
					<p>${res.data.receivePhone}</p>
					<p>${res.data.receiveRegion} ${res.data.receiveDetail}</p>
				`)
				$('span.addressregion').html(`${res.data.receiveRegion}`);
			} else {
				$('.addr-wrap span.addressregion').text('请选择地址');
			}
	 	}
	});
	
}


//像购物车添加商品
function addProduct() {
	console.log(id);
	$.ajax({
		type: 'post',
		url: '/cart/add',
		headers: {Authorization: Cookies.get('token')},
		data: {
			"pid": id,
			"count": 1
		},
		success: function(res) {
			if(res.code !== 200) { console.log(res.msg); return;}
			console.log(res)
		}
	});
	//
	/* $.ajax({
		type: 'post',
		url: '/cart/list',
		headers: {Authorization: Cookies.get('token')},
		success: function(res) {
			if(res.code !== 200) { console.log(res.msg); return;}
			console.log(res.data)
			//找到当前页面对应数据库中的商品
			var product = '';
			product = res.data.find(function(item) {
				return item.pid === id; });
			// console.log(product)
			$('span.num.show').text(product.count);
		}
	}); */
}

//立即购买
$('p.buy-now').on('click', function() {
	var product = '';
	if(!addressId) {
		layer.msg('请先选择收货地址', {time: 1000});
		return;
	}
	$.ajax({
		url: 'http://localhost:3000/product/model/' + id,
		success: function(res) {
			if(res.code !== 200) {console.log(res.msg); return};
			console.log(res)
			product = res.data;
			cpm(product);
		}
	});
});
function cpm(product) {
	var page = layer.open({
		type: 1,
		title: false,
		closeBtn: 0,
		content: `
			<div class="box0">
				<div class="box0-1">
					<div class="avatar"><img src="${product.avatar}" ></div>
					<div class="box0-1-2">
						<p>￥<span class="price">${product.price}</span></p>
						<p><span class="num">1</span>件</p>
					</div>
					<div class="close"><img src="img/close_circle_grey_new.png" ></div>
				</div>
				<div class="box0-2">
					<p>数量</p>
					<div class="box0-2-2">
						<button disabled class="de">-</button>
						<span class="count" >1</span>
						<button class="in">+</button>
					</div>
				</div>
				<div class="box0-3">
					<p>确定</p>
				</div>
			</div>
		`,
		area: ['100%', '75%'],
		offset: 'b',
		anim: 'up' ,
		style: 'position:fixed; left:0; top:0; width:100%; height:100%; border: none; -webkit-animation-duration: .5s; animation-duration: .5s;'
	});
	
	$('.close').click(function() {
		layer.close(page);
	});
	buyCpm();
}
function buyCpm() {
	var p = 1;
	$('button.de').click(function() {
		$('.box0-2 span.count').text(p= p-1);
		var num = parseInt($('.box0-2 span.count').text());
		// console.log(num);
		$('button.de').attr('disabled',num === 1);
		$('button.in').attr('disabled',num === 5);
	});
	$('button.in').click(function() {
		$('button.de').attr('disabled',false);
		$('.box0-2 span.count').text(p= p+1);
		var num = parseInt($('.box0-2 span.count').text());
		$('button.in').attr('disabled',num === 5);
		// console.log(num)
	});
}






var ids = [];
	ids[0] = id;
	// console.log()
	$.ajax({
		type: 'post',
		url: '/order/confirm',
		headers: {Authorization: Cookies.get('token')},
		data: {
			ids,
			account,
			addressId
		},
		success: function(res) {
			if(res.code !== 200) { console.log(res.msg); return;}
			console.log(res.data);
			window.location.href = `/pay/pay.html?data-pid=${pid}`;
		}
	});





