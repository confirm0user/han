$('a.dunpai').on('click', function(){
	layer.msg('暂未开放功能', {time: 1000});
})
$('a.question').on('click', function(){
	layer.msg('暂未开放功能', {time: 1000});
})
$('.patrols>a.login-phone').on('click', function(){
	layer.msg('暂未开放功能', {time: 1000});
})
$('.patrols>a.forget-pwd').on('click', function(){
	layer.msg('暂未开放功能', {time: 1000});
})
$('.other>a.qq').on('click', function(){
	layer.msg('暂未开放功能', {time: 1000});
})
$('.other>a.weibo').on('click', function(){
	layer.msg('暂未开放功能', {time: 1000});
})
$('.other>a.zfb').on('click', function(){
	layer.msg('暂未开放功能', {time: 1000});
})


$('div.language').on('click', function() {
	var pageii = layer.open({
		type: 1,			//页面层
		title: false,		
		closeBtn: 0,	//关闭按钮，默认1，不显示为0
		//title: ['&larr;', 'background: none;border: none;'],
		content: `
			<div class="language-wrap">
				<div class="language-header">
					<div class="icon-wrap"><i class="iconfont icon-arrow_left"></i></div>
					<h5>选择语言</h5>
				</div>
				<ul class="language-list">
					<li>‎‎中文(简体)</li>
					<li>中文(繁體)‎</li>
					<li>English</li>
				</ul>
			</div>
		`,
		area: ['100%','100%'],
		anim: '2',		//弹出动画，从底部往上滑入
		style: 'position:fixed; left:0; top:0; width:100%; height:100%; border: none; -webkit-animation-duration: .5s; animation-duration: .5s;'
	});
	$('i.icon-arrow_left').click(function() { 
		layer.close(pageii);
	});
})

//登录
var $loginForm = $('form.login').Validform({
	tiptype: 3,
});
$('button.btn-login').on('click', function() {
	// console.log(11)
	//表单验证
	if(!$loginForm.check(false)) return;
	//发送ajax，进行登录请求
	$.ajax({
		type: "post",
		url: "/user/login_pwd",
		data: { 
			name: $('form.login input.name').val().trim(), 
			pwd: $('form.login input.pwd').val().trim()
		},
		success: function(res){
			console.log(res)
			if(res.code !== 200) {layer.msg(res.msg, {time:1500}); return;}
			Cookies.set('token', res.data);
			Cookies.set('name', $('form.login input.name').val().trim());
			window.location.replace(document.referrer || '/home/index.html');
		}
	});
	
});


//注册
$('.patrols>a.logon-now').on('click', function(){
	var page2 = layer.open({
		type: 1,			//页面层
		title: false,		
		closeBtn: 0,	//关闭按钮，默认1，不显示为0
		//title: ['&larr;', 'background: none;border: none;'],
		content: logonHtml(),
		area: ['100%','100%'],
		anim: '2',		//弹出动画，从底部往上滑入
		style: 'position:fixed; left:0; top:0; width:100%; height:100%; border: none; -webkit-animation-duration: .5s; animation-duration: .5s;'
	});
	$('i.icon-arrow_left').click(function() { 
		layer.close(page2);
	});
	logon(page2);
})
function logonHtml(){
	return `
	<div class="logon-wrap">
		<div class="logon-header">
			<div class="icon-wrap"><i class="iconfont icon-arrow_left"></i></div>
			
		</div>
		<div>
			<h3>小米账号登录</h3>
			<a>系统会根据您选择的国家/地区的法律法规存储您的个人信息</a>
		</div>
		<form class="logon">
			<div class="form-item-group">
				<input class="phone" type="tel" placeholder="请输入手机号" value="" datatype="m" nullmsg="手机号必填" errormsg="请输入正确手机号！"/>
			</div>
			<div class="form-item-group">
				<input class="name" type="text" placeholder="请输入用户名" value="" datatype="s4-16" nullmsg="用户名必填" errormsg="用户名4-16长度!" />
			</div>
			<div class="form-item-group">
				<input class="pwd" type="password" placeholder="请输入密码" value="" datatype="s3-20" nullmsg="密码必填" errormsg="密码3-16长度!"/>
			</div>
			
		</form>
		<div>
			<button class="btn-logon" type="button">注册</button>
		</div>
	</div>
		
	`;
}
function logon(page2) {
	var $logonForm = $('form.logon').Validform({
		tiptype: 3,
	});
	$('button.btn-logon').on('click', function() {
		console.log(11)
		//表单验证
		if(!$logonForm.check(false)) return;
		//发送ajax，进行登录请求
		$.ajax({
			type: "post",
			url: "/user/register",
			data: { 
				phone: $('form.logon input.phone').val().trim(), 
				name: $('form.logon input.name').val().trim(), 
				pwd: $('form.logon input.pwd').val().trim()
			},
			success: function(res){
				console.log(res)
				if(res.code !== 200) {layer.msg(res.msg, {time:1500}); return;}
				layer.close(page2);
			}
		});
		
	});
}

