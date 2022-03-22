
//判断用户是否登录
/* if(Cookies.get("users") === undefined) {
	window.location.replace("../login/login.html");
} 
else 
	window.location.href = "../cart/cart.html"
 */


//JSON.parse(Cookies.get('users'))
var n = Cookies.get('users') ? JSON.parse(Cookies.get('users')) : [];
var state = n.find(function(item) {return item.state === true;});
console.log(state)
if(state) {
	loginAfter();
	document.querySelector('.empty-cart-wrap').style.display = 'none';
	document.querySelector('.cart-container').style.display = 'block';
	cartRendering();
} 
else {
	document.querySelector('.empty-cart-wrap').style.display = 'block';
	document.querySelector('.cart-container').style.display = 'none';
	loginBefor();
}

//登录后 指向a 出现div.user-menu-wrapper
function loginAfter() {
	var userHtml = `
		<span class="user">
			<a href="../profile/index.html" target="_blank">用户名</a>
			<div class="user-menu-wrapper">
				<ul class="user-menu">
					<li><a href="../profile/index.html" target="_blank">个人中心</a></li>
					<li><a href="../profile/index.html" target="_blank">评价晒单</a></li>
					<li><a href="../profile/index.html" target="_blank">我的喜欢</a></li>
					<li><a href="../profile/index.html" target="_blank">小米账户</a></li>
					<li class="secede"><a>退出登录</a></li>
				</ul>
			</div>
		</span>
		<span class="spe">|</span>
		<span class="link"><a href="../order/index.html" target="_blank">我的订单</a></span>
	`;
	
	 document.querySelector('.topbar-info').innerHTML = userHtml;
	document.querySelector('.topbar-info span.user').onmouseover = function(){
	document.querySelector('.user-menu-wrapper').classList.add('user-active');
	}
	document.querySelector('.topbar-info span.user ').onmouseout = function(){
	document.querySelector('.user-menu-wrapper').classList.remove('user-active');
	}
	 document.querySelector('.topbar-info span>a').onmousemove = function() {
		 document.querySelector('.topbar-info span>a').style.color = '#FF6700';
	 }
	//点退出登录
	document.querySelector('span.user li.secede').onclick = function() {
		var n= JSON.parse(Cookies.get('users'));
		n.find(function(item) {return item.state;}).state = false;
		Cookies.set('users',JSON.stringify(n));
		loginBefor();
		window.location.replace("../home/home.html") ;
	}
};
//未登录
function loginBefor() {
	var userHtml = `
		<span class="login"><a href="../login/login.html">登录</a></span>
		<span class="spe">|</span>
		<span class="logon"><a href="../login/login.html">注册</a></span>
	`;
	document.querySelector('.topbar-info').innerHTML = userHtml;
};



function cartRendering(){
	//1.动态渲染购物记录数据
	var cartList = [
		{id: 1, avatar: "img/1.jpg", name: "Redmi Note 10 Pro 6GB+128GB 幻青", price: 1699, count: 3, maxCount: 3},
		{id: 2, avatar: "img/2.jpg", name: "小米真无线蓝牙耳机Air 2 Pro 黑色", price: 499, count: 2, maxCount: 9},
		{id: 3, avatar: "img/3.jpg", name: "米家迷你保温杯 黑色", price: 49, count: 3, maxCount: 10},
		{id: 4, avatar: "img/4.jpg", name: "小米无线充电宝 青春版 10000mAh 白色", price: 109, count: 1,maxCount: 3},
		];

	var htmlStr = "";
	cartList.forEach(function(item) {
		htmlStr += `
			<div class="cart-list-item data-id="${item.id}"">
				<div class="col-check"><input class="checkbox" type="checkbox" data-id="${item.id}" /></div>
				<p class="col-img"><a href=""><img class="" src="${item.avatar}" alt=""></a></p>
				<h4 class="col-name"><a href="">${item.name}</a></h4>
				<p class="col-price"><span class=''>${item.price}</span>元</p>
				<div class="col-num count-warpper">
					<input data-id="${item.id}" class="btn-decrease" type="button" value="-" ${item.count === 1 ? "disabled" : ""}>
					<span class="count">${item.count}</span>
					<input data-id="${item.id}" data-max="${item.maxCount}" class="btn-increase" type="button" value="+" ${item.count === item.maxCount ? "disabled" : ""}>
				</div>
				<p class="col-subtotal t1"><span class="subtotal">${item.count * item.price}</span>元</p>
				<input data-id="${item.id}" class="btn-remove" type="button" value="×">
			</div>
		`;
	});
	document.querySelector('.cart-list').innerHTML = htmlStr;
	
	//2.事件委托处理数量加减,删除勾选
	document.querySelector('.cart-list').onclick = function(e) {
		//console.log(e);
		//e.target获取触发事件的源对象
		if(e.target.classList.contains('btn-decrease'))
			decreaseHandler(e.target);
		else if(e.target.classList.contains('btn-increase'))
			increaseHandler(e.target);
		else if(e.target.classList.contains('btn-remove'))
			removerHandler(e.target);
		else if(e.target.classList.contains('checkbox'))
			checkboxChangeHandler(e.target);
		else
			return;
	};
	//减
	function decreaseHandler(target) {
		
		var countSpan = target.parentNode.querySelector('span.count');
			count = parseInt(countSpan.innerText);
		countSpan.innerText = count - 1;
		target.parentNode.querySelector('.btn-increase').disabled = false;
		target.disabled = count - 1 === 1;
		var id = parseInt(target.dataset.id);
		/* for(var i =0; i < cartList.length; i++) {
			if(cartList[i].id === id) {
				cartList[i].count -= 1;
				break;
			}	
		} */
		let i = cartList.findIndex(function(item){ return item.id === id; })
		cartList[i].count -= 1;
		let tot = cartList[i].price * (count - 1);
		target.parentNode.parentNode.querySelector('.subtotal').innerText = tot;
		updateTotal();
		cartTotal();
	};
	//加
	function increaseHandler(target) {
		// 数量增加
		var countSpan = target.parentNode.querySelector('span.count');
			count = parseInt(countSpan.innerText);
		countSpan.innerText = count + 1;
		// 点加号取消减号禁用
		target.parentNode.querySelector('.btn-decrease').disabled = false;
		// 更新自身的状态
		target.disabled = count + 1 === parseInt(target.dataset.max);
		//更新cartList中的数据
		var id = parseInt(target.dataset.id);
		/* for(var i =0; i < cartList.length; i++) {
			if(cartList[i].id === id) {
				cartList[i].count += 1;
				break;
			}	
		} */
		let i = cartList.findIndex(function(item){ return item.id === id; });
		cartList[i].count += 1;
		//计算小计
		let tot = cartList[i].price * (count + 1);
		target.parentNode.parentNode.querySelector('.subtotal').innerText = tot;	
		updateTotal();
		cartTotal();
	};
	//删
	function removerHandler(target) {
		if(!confirm("删???")) return;
		var id = parseInt(target.dataset.id);
		var i = cartList.findIndex(function(item) {
			return item.id === id;
		});
		cartList.splice(i, 1);
		target.parentNode.parentNode.removeChild(target.parentNode);
		updateTotal()
		balanceBtn();
		
		//删空购物车出现
		if(cartList.length === 0) {
			document.querySelector('div.cart-container').style.display = 'none';
			document.querySelector('div.empty-cart-wrap').style.display = 'block';
		}
	
	};
	//下联动上
	function checkboxChangeHandler(target) {
		target.classList.toggle('checked');
		var unchecked = document.querySelectorAll('.cart-list input.checkbox:not(.checked)');
		document.querySelector('input.checkbox.all').checked = unchecked.length === 0;
		document.querySelector('input.checkbox.all').classList.toggle("checked", unchecked === 0);
		updateTotal();
		balanceBtn();
	}
	//上联动下
	document.querySelector('input.checkbox.all').onchange = function() {
		this.classList.toggle('checked');
		document.querySelectorAll('.cart-list input.checkbox').forEach(function(item) {
			item.checked = this.checked;
			item.classList.toggle('checked', this.checked);
		}, this);
		updateTotal();
		balanceBtn();
	}
	
	//合计
	function updateTotal() {
		var checkedBoxes = document.querySelectorAll('.cart-list input.checkbox.checked');
		var total = 0,num = 0;
		var id = 0;
		var target = null;
		checkedBoxes.forEach(function(item) {
			id = parseInt(item.dataset.id);
			target = cartList.find(function(item) {	return item.id === id; });
			total += target.price * target.count;
			num += target.count;
		});
		document.querySelector('span.total').innerText = total;
		document.querySelector('.cart-bar .section-left p span.cart-num').innerText = num;
	}
	//去结算
	function balanceBtn() {
		var balance = document.querySelector('.cart-bar button.balance');
		var checkeds = document.querySelectorAll('.cart-list input.checkbox.checked');
		balance.bgc = checkeds.length !== 0;
		balance.classList.toggle("bgc", checkeds.length !== 0);
		balance.onclick = function(item) {
			if(checkeds.length === 0) item.disabled = true;
			window.location.replace("../order_confirm/index.html");
		}
		if(checkeds.length !==0 ) 
		document.querySelector('.no-select').style.display ='none';
		else document.querySelector('.no-select').style.display ='block';
	}
	
	//总共购物车有多少东西
	function cartTotal() {
		var cartTot = document.querySelector('.cart-bar .section-left p span.cart-tot');
		var num = 0;
		cartList.forEach(function(item) {
			num += item.count;
		});
		console.log(num)
		cartTot.innerText = num;
	}
	cartTotal();
	

	if(cartList.length === 0) {
		document.querySelector('div.cart-container').style.display = 'none';
		document.querySelector('div.empty-cart-wrap').style.display = 'block';
	}
	else {
		document.querySelector('div.cart-container').style.display = 'block';
		document.querySelector('div.empty-cart-wrap').style.display = 'none';
	}
		
	
		
}










