//判断当前用户是否登录
if(!Cookies.get('token')) {
	$('p.user').text('请登录');
	isClick();
	$('.content')
		.on('click',function() {
			isClick();
		})
} else {
	$('.secede').removeClass('hidden');
	$('p.user').text(Cookies.get('name'));
	$('.secede').on('click', function() {
		$(this).addClass('hidden');
		// $('p.user').text('请登录');
		$('.secede').addClass('hidden');
		Cookies.remove('token');
		window.location.replace('/home/index.html');
	})
	$('.second p.second-head').on('click', function() {
		window.location.href = '/order/order.html';
	});
	
}
function isClick() {
	layer.open({
		title: ['声明与政策','font-size: 4.5vw'],
		className: 'popuo',
		content: `
			<p>欢迎您来到小米有品！</p>
			<p>我们依据最新法律法规要求，制定并更新了
				<a>《隐私政策》</a><a>《小米有品用户协议》</a>
				以及<a>《小米账号使用协议》。</a>
			</p>
			<p>您需要阅读并同意相关政策条款方可登录。</p>
		`,btn:['同意','不同意']
		,yes: function(index){
		location.replace('/login/login.html');
		layer.close(index);
		}
	});
}


