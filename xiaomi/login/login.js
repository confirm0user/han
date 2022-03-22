// console.log(JSON.parse(Cookies.get("users")));
// Cookies.set("user", JSON.stringify(user));
// 其他页面
//document.querySelector('login').onclick = function() {
//	var qqq = true;
//	get.cookies;
//}

//console.log(JSON.parse(Cookies.get('log')))
var user = [
	{id: 0, phone: 178, pwd:123, state: false},
];
if(window.location.href === "http://127.0.0.1:8848/xiaomi/login/login.html" ?  Cookies.set("users", JSON.stringify(user)) : '' )
// console.log(window.location.href === "http://127.0.0.1:8848/xiaomi/login/login.html")

//登录选项卡
if( JSON.parse(Cookies.get('log')) === true) {
	document.querySelector('.ant-tabs-nav span.logon').classList.remove('active');
	document.querySelector('.ant-tabs-nav span.login').classList.add('active');
	document.querySelector('.ant-tabs-content .ant-tabs').style.left = "0";
	loginOk();
}
//注册选项卡
if(JSON.parse(Cookies.get('log')) === false) {
	document.querySelector('.ant-tabs-nav span.login').classList.remove('active');
	document.querySelector('.ant-tabs-nav span.logon').classList.add('active');
	document.querySelector('.ant-tabs-content .ant-tabs').style.left = "-100%";
	logonOk();
} 

// 注册
function logonOk() {
	document.querySelector('button.btn-logon').onclick = function() {
		// clickInput();
		var pwd = document.querySelector('input.logon-pwd').value;
		var phone = document.querySelector('input.logon-phone').value.trim();
		var phoneLength = phone.trim().length;
		var unchecked = document.querySelector('input.check.checked');
		
		 if(phoneLength === 11) {
			
			//转到登录界面
			document.querySelector('.ant-tabs-nav span.logon').classList.remove('active');
			document.querySelector('.ant-tabs-nav span.login').classList.add('active');
			document.querySelector('.ant-tabs-content .ant-tabs').style.left = "0";
			//搜集数据，将数据追加到n数组中，上传到Cookies
			var pwd = parseInt(pwd);
			var phone = parseInt(phone);
			var user = {};
			var n = JSON.parse(Cookies.get('users'));
			user.id = parseInt(n[n.length - 1].id) + 1;
			console.log(user.id)
			user.phone = phone;
			user.pwd = pwd;
			user.state = false;
			n.push(user);
			console.log(n);
			Cookies.set('users',JSON.stringify(n));
		} 
		else  {alert('手机号为空或者有误');}
	}
	/* function clickInput() {
			document.querySelector('input.check').onclick = function() {
				this.classList.toggle('checked');
				var unchecked = document.querySelector('input.check.checked');
				if(!unchecked) 
					alert('请勾选');
			}
	} */
	//console.log(document.querySelector('.msg input.check'));&& unchecked !== null
};
logonOk();
// 登录
function loginOk() {
	//console.log(document.referrer);
	//1.收集用户输入的用户名和密码  trim()去除前后空格,专门处理字符串
	document.querySelector('button.btn-login').onclick = function() {
		//对用户的输入进行非空验证
		var user =document.querySelector('input.login-phone').value.trim();
		var pwd = document.querySelector('input.login-pwd').value;
		if(user.length === 0 || pwd.length === 0) {
			alert('用户名或密码不能为空');
			return;		}
		//
		var user = parseInt(user), pwd = parseInt(pwd);
		var names = JSON.parse(Cookies.get('users'));
		var name = names.find(function(item) {return item.phone === user;});
		
		//console.log(name.phone);
		//console.log(name.pwd);
		if(name && user === name.phone && pwd === name.pwd) {
			//window.location.href = "http://127.0.0.1:8848/xiaomi/01_home/home.html";
			// Cookies.set("user", "zhangsan");
			names.find(function(item) {return item.phone === user}).state = true;
			Cookies.set("users",JSON.stringify(names));
			var referrer = document.referrer === window.location.href ? "../home/home.html" : document.referrer;
			window.location.replace(referrer);
		} else {
			alert('用户名或密码错误');
		}
	}
};
loginOk();
//登录注册界面选项卡切换
(function() {
	var spans = document.querySelectorAll('.ant-tabs-nav span');
	console.log(spans)
	for(var i = 0; i < spans.length; i++) {
		spans[i].index = i;
		spans[i].onclick = function() {
		if(this.classList.contains('active')) return;
		this.parentNode.querySelector('.active').classList.remove('active');
		this.classList.add('active');
		document.querySelector('.ant-tabs-content .ant-tabs').style.left = "-" + this.index + "00%";
		};
	}
})();

