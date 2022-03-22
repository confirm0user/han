var orderId = $.query.get('data-orderId');	//订单编号
console.log(orderId)

//获取指定订单的总金额
$.ajax({
	headers: {Authorization: Cookies.get('token')},
	url: '/order/account/' + orderId,
	success: function(res) {
		if(res.code !==200) {console.log(res.code); return;}
		console.log(res);
		$('span.price').text(res.data);
	}
});
//倒计时
(function() {
	var timer = null;
	var endTime = new Date().getTime() + 15*60*1000;
	function countdown() {
		var diff = endTime - new Date().getTime();
		if(diff<=0) {
			clearInterval(timer);
			timer = null;
			return; 
		} 
		diff = Math.ceil(diff/1000);
		// console.log(diff);
		// var hours = Math.floor(diff/1000/60/60);
		var minutes = Math.floor(diff/60)%60;
		var second = Math.floor(diff%60);
		// console.log(minutes);
		// console.log(second);
		// $('span.second').text(hours);
		$('span.minutes').text(minutes);
		$('span.second').text(second);
		
	}
	timer = setInterval(countdown,1000);
	
	
})();

//点击左上角返回
$('.header>img').on('click', function() {
	var index = layer.open({
		  title: ['确认离开',
			'text-align:center;width: 100%;padding:0'
		  ]
		  ,closeBtn: 0
		  ,anim: 'up'
		  ,content: '订单超时将自动取消'
		  ,btn: ['确认离开', '继续支付']
		  ,yes: function(index){
			   // window.location.replace(`/order/order.html?pay=0&`)
			// location.reload();
			window.location.replace(`/order/order.html?orderId=${orderId}`);
			layer.close(index);
		  }
	  ,btnAlign: 'c'
	});
	
})

//支付方式的选项卡
$('p.handle').on('click',function() {
	if($(this).hasClass('active')) return;
	$(this).closest('.pay-wrap').find('p.handle.active').removeClass('active');
	$(this).addClass('active');
});

//确认支付
$('.footer>div').on('click', function() {
	console.log(orderId);
	console.log(typeof orderId);
	//为指定的订单付款
	$.ajax({
		headers: {Authorization: Cookies.get('token')},
		url: '/order/pay/'+ orderId,
		success: function(res) {
			console.log(res);
			if(res.code !==200) { return;}
		}
	});
	
 //页面层
  var pageiii= layer.open({
    type: 1
    ,content: html()
	,title: false, closeBtn: 0
	,area: ['100%','100%']
    ,style: 'position:fixed; bottom:0; left:0; width: 100%; height: 200px; padding:10px 0; border:none;'
  });
	setTimeout(function() {
		layer.close(pageiii);
		window.location.replace(`/order/order.html?pay=1&orderId=${orderId}`);
		// window.location.replace(`/order/order.html?pay=1&`);
	},3000);
	
	function html() {
		return `
			<div class="pay-ok">
				<p>支付成功</p>
				<img src="pay.png" alt="">
				<span>即将跳转页面哦~</span>
			</div>
		`;
	}
})



