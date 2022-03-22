if(!Cookies.get('name')) window.location.replace('/login/login.index');

//返回上一页
$('.confirm_head>img').click(function() {
	window.location.href = document.referrer;
});
var ids = [];
var id = $.query.get('data-id');
//$(id).length === 1结算一个商品，$(id).length === 0，结算多个
if($(id).length === 1) {
	ids[0] = parseInt(id);
} else {
	ids = id.split(',');	//以逗号分割，返回一个数组
}
// console.log(typeof $.query.get('data-pid'))
// console.log($(id).length)
console.log(ids)


var total = 0, account = 0;
//将购物车选中的商品传过来，并渲染
$.ajax({
	type: 'post',
	url: '/cart/list_ids',
	headers: { Authorization: Cookies.get('token') },
	data:{ ids },
	success: function(res) {
		console.log(ids)
		if(res.code !== 200) { console.log(res.msg); return; }
		console.log(res);
		console.log(res.data)
		var products = '';
		res.data.forEach(function(item) {
			account += item.price * item.count;
			products += product(item);
		});
		$(products).appendTo('div.product');
		$('span.total').text(account);
		$('span.account').text(account);
	}
});
//一条的商品
function product(item) {
	return `
		<div class="product-item">
			<div class="avatar"><img src="${item.avatar}" ></div>
			<div class="pro-det">
				<p class="name">${item.name}</p>
				<p class="p-c">
					<span>￥<span class="price">${item.price}</span>.00</span>
					<span>×&nbsp;<span class="count">${item.count}</span></span>
				</p>
				<p class="ensure"><span>7天无理由退货</span></p>
			</div>
		</div>
	`;
}

var addressId = 0;
//获取当前登录用户的默认收货地址
$.ajax({
	headers: { Authorization: Cookies.get('token') },
	url: "/address/get_default",
	success: function(res) {
		// console.log(typeof res.data.id)
		addressId = res.data.id;
		if(res.code !== 200) { console.log(res.msg); return; }
		if(res.data) {
			$('.confirm-addr>div').html(addrStr(res.data))
		} else $('.address').html('请选择');
 	}
});
//地址
function addrStr(address) {
	return `
		<div>
			<span class="name">${address.receiveName}</span>
			<span class="phone">${address.receivePhone}</span>
		</div>
		<p class="address">${address.receiveRegion} ${address.receiveDetail}</p>
	`;
}
//点击地址弹出所有地址  窗口
$('.confirm-addr>div').on('click', function() {
	var pagei = layer.open({
		type: 1,
		title: ['选择地址', 'color:#333;font-size:4vw;padding-left:40%;display: flex;align-items: center;'],
		content: addressHandle(),
		area: ['100%', '70%'],
		offset: 'b',
		anim: 'up' ,
		style: 'position:fixed; left:0; top:0; width:100%; height:100%; border: none; -webkit-animation-duration: .5s; animation-duration: .5s;'
	});
});
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
			$('.layer-foot').html('<p><span>+添加地址</span></p>');
			
			$('p.choose').on('click', function() {
				$(this).toggleClass('show');
				var id = parseInt($('p.choose.show').closest('.addr-item').attr('data-id'));
				addressId = id;
				// console.log( id)
				// console.log(addresses)
				var ad = '';
				ad = addresses.find(function(item) {
					return item.id === id;})
					// console.log(ad)
				// var $addressM = $('p.choose.show').closest('.addr-item').children('p').text();
				$('span.name').text(ad.receiveName);
				$('span.phone').text(ad.receivePhone);
				$('p.address').text(`${ad.receiveRegion} ${ad.receiveDetail}`);
				
				if($('p.choose.show'))
					layer.closeAll(); //疯狂模式，关闭所有层
			});	
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
$('.layer-foot>p').on('click', function() {
	window.location.href = '/address/address.html';
	
})
var orderId = ''; //订单编号
//提交订单
$('p.go-pay').on('click', function() {
	//订单确认
	$.ajax({
		headers: {Authorization: Cookies.get('token')},
		type: 'post',
		url: '/order/confirm',
		data: {
			ids, account, addressId
		},
		success: function(res) {
			// if(res.code !==200) {console.log(res.code); return;}
			// console.log(res);
			orderId = res.data;
			// console.log(res.data);
			window.location.replace(`
				/pay/pay.html?data-orderId=${orderId}
			`);
		}
	});
	
	/* window.location.replace(`
		/pay/pay.html?
		data-id=${id}&data-account=${account}&
		data-addressId=${addressId}&data-orderId=${orderId}
	`); */
});




