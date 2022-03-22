//登录后 指向a 出现div.user-menu-wrapper
(function() {
	var uesr = {
		"0": "个人中心",
		"1": "评价晒单",
		"2": "我的喜欢",
		"3": "小米账户",
		"4": "退出登录"
	}
	var userHtml = `
		<ul class="user-menu">
			<li><a href="">个人中心</a></li>
			<li><a href="">评价晒单</a></li>
			<li><a href="">我的喜欢</a></li>
			<li><a href="">小米账户</a></li>
			<li><a href="">退出登录</a></li>
		</ul>
	`;
	 document.querySelector('.user-menu-wrapper').innerHTML = userHtml;
	document.querySelector('.topbar-info span.user').onmouseover = function(){
	document.querySelector('.user-menu-wrapper').classList.add('user-active');
	}
	document.querySelector('.topbar-info span.user ').onmouseout = function(){
	document.querySelector('.user-menu-wrapper').classList.remove('user-active');
	}
})();

//地址
(function() {
	var addresses = [
		{id: 1,user: "zhangsan", receiveName: "张三", receivePhone: "13345671890", receiveRegion: "山东省 青岛市 城阳区 城阳街道", receiveDetail: "希达小区5#3-201", isDefault: true},
		{id: 5,user: "zhangsan", receiveName: "张三同学", receivePhone: "17845671111", receiveRegion: "山东省 青岛市 城阳区 城阳街道", receiveDetail: "农大小区21#1-603", isDefault: false},
		{id: 7,user: "zhangsan", receiveName: "张童鞋", receivePhone: "16667896789", receiveRegion: "山东省 青岛市 黄岛区 灵山卫街道", receiveDetail: "灵山卫小区", isDefault: false},
		{id: 12,user: "lisi", receiveName: "李四", receivePhone: "13300671000", receiveRegion: "山东省 青岛市 城阳区 城阳街道", receiveDetail: "哈哈小区13#2-601", isDefault: false},
		{id: 15,user: "lisi", receiveName: "李四同学", receivePhone: "15345581330", receiveRegion: "山东省 青岛市 城阳区 城阳街道", receiveDetail: "尔顿小区22#3-502", isDefault: false}
	];
	var user = "zhangsan"; //假设是zhangsan登录的商城
	//filter 从数组筛选出所有满足条件的元素，返回数组，找不到返回数组，只是length为0
	//1.拼接动态展示当前登录用户的所有地址信息
	var htmlStr = "";
	addresses.filter(function(item) { return item.user === user;}).forEach(function(item) {
		htmlStr += getAddressHtml(item);
	});
	document.querySelector('.address-box').innerHTML += htmlStr;
	function getAddressHtml(address) {
		var divStr = `
			<div data-id=${address.id} class="address-item">
				<div class="name">${address.receiveName}</div>
				<div class="phone">${address.receivePhone}</div>
				<div class="region">${address.receiveRegion + address.receiveDetail}</div>
				<div class="default-wrapper ${address.isDefault ? 'is-default' : ''}">
					<span class='default'>默认地址</span>
					<button class="btn-default" type="button">设为默认地址</button>
				</div>
				<div class="btn">
					<button class="btn-modify" type="button">修改</button>
					<button class="btn-remove" type="button">删除</button>
				</div>
			</div>
		`;
		return divStr;
	}
	//2.给div.address-box绑定点击事件
	document.querySelector('.address-box').onclick = function(e) {
		if(e.target.classList.contains('btn-modify')) 
			modifyHandler(e.target);
		if(e.target.classList.contains('btn-add')) 
			addHandler(e.target);
		if(e.target.classList.contains('btn-default'))
			defaultHandler(e.target);
		if(e.target.classList.contains('btn-remove'))
			removeHandler(e.target);
	}
	//找到默认地址  加它父亲的class加active 并将里面的内容动态渲染到footer-address
	var ta = document.querySelector('.address-item .is-default');
	console.log(ta.parentNode)
	ta.parentNode.classList.add('active');
	var name = ta.parentNode.querySelector('.name').innerText;
	var phone = ta.parentNode.querySelector('.phone').innerText;
	var region = ta.parentNode.querySelector('.region').innerText;
	document.querySelector('.footer-address p.address-name').innerText = name;
	document.querySelector('.footer-address p.address-name').innerText += phone;
	document.querySelector('.footer-address p.address-desc').innerText = region;
	//设置默认地址 default  找到默认地址 给他父亲class加active
	function defaultHandler(target) {
		var id = parseInt(target.parentNode.parentNode.dataset.id);
		var curDefault = addresses.find(function(item) { return item.id === id && item.isDefault});
		if(curDefault !== undefined) 
		curDefault.isDefault = false;
		target.parentNode.isDefault = true;
		var curDefault = document.querySelector('.is-default');
		if(curDefault !== null) {
			curDefault.classList.remove('is-default');
		target.parentNode.classList.add('is-default');
		curDefault.parentNode.parentNode.querySelector('.address-item.active').classList.remove('active');
		target.parentNode.parentNode.classList.add('active');
		//渲染到footer-address
		document.querySelector('.footer-address p.address-name').innerText = target.parentNode.parentNode.querySelector('.name').innerText;
		document.querySelector('.footer-address p.address-name').innerText += target.parentNode.parentNode.querySelector('.phone').innerText;;
		document.querySelector('.footer-address p.address-desc').innerText = target.parentNode.parentNode.querySelector('.region').innerText;;
		}
	}
	//修改
	function modifyHandler(target) {
		var id = parseInt(target.parentNode.parentNode.dataset.id);
		var address = addresses.find(function(item) { return item.id === id;});
		var form = document.forms['addressEdit'];
		form['id'].value = address.id;
		form['receiveName'].value = address.receiveName;
		form['receivePhone'].value = address.receivePhone;
		form['receiveDetail'].value = address.receiveDetail;
		regionPicker.set(address.receiveRegion);
		document.querySelector('.edit-dialog-wrapper').classList.add('show');
	}
	//删除
	function removeHandler(target) {
		if(!confirm("是否删除？")) return;
		var id = parseInt(target.parentNode.parentNode.dataset.id);
		var i = addresses.findIndex(function(item) { return item.id === id;});
		addresses.splice(i, 1);
		target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
	}
	//新增
	function addHandler(target) {
		var form = document.forms['addressEdit'];
		form.reset();
		form['id'].value = 0;
		regionPicker.reset();
		document.querySelector('.edit-dialog-wrapper').classList.add('show');
	}
	//表单取消按钮
	document.querySelector('.btn-cancel').onclick = function() {
		document.querySelector('.edit-dialog-wrapper').classList.remove('show');
	};
	//表单ok按钮
	document.querySelector('.btn-ok').onclick = function() {
		//收集用户的输入，整合成一个对象
		var form = document.forms['addressEdit'];
		var address = {
			id: parseInt(form['id'].value),
			receiveName: form['receiveName'].value.trim(),
			receivePhone: form['receivePhone'].value.trim(),
			receiveRegion:regionPicker.get(),
			receiveDetail: form['receiveDetail'].value.trim()
		};
		if(address.id === 0) {
			address.id = addresses[addresses.length - 1].id + 1;
			address.isDefault = false;
			addresses.push(address);
			document.querySelector('.address-box').innerHTML += getAddressHtml(address);
			alert("新增地址成功");
		}
		else {
			var i = addresses.findIndex(function(item) { return item.id === address.id;});
			address.isDefault = addresses[i].isDefault;
			addresses.splice(i,1,address);
			var div = document.querySelector(`.address-item[data-id = '${address.id}']`);
			div.querySelector('.name').innerText = address.receiveName;
			div.querySelector('.phone').innerText = address.receivePhone;
			div.querySelector('.region').innerText = `${address.receiveRegion} ${address.receiveDetail}`;
			alert("修改地址成功");
		}
		document.querySelector('.edit-dialog-wrapper').classList.remove('show');
	}

})();
//点击address-item 选中地址
	/* document.querySelectorAll('.address-box .address-item').forEach(function(item) {
		item.onclick = function() {
			if(item.classList.contains('active')) return;
			item.parentNode.querySelector('.address-item.active').classList.remove('active');
			item.classList.add('active');
		}
	});
	
	 */




//返回购物车
document.querySelector('.operating-button input.btn-return').onclick = function() {
	window.location.href = '../cart/cart.html';
}
//点击去结算跳到pay 
document.querySelector('.operating-button input.btn-primary').onclick = function() {
	window.location.href = '../pay/pay.html';
}







