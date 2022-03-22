$.ajax({
	url: '/address/list',
	headers: {Authorization: Cookies.get('token')},
	success: function(res) {
		if(res.code !== 200) {console.log(res.msg); return;}
		// console.log(res.data.length);
		if(!res.data.length) {
			$('.address ul.addr-list').removeClass('show')
				.siblings('.null').addClass('show')
		} else {
			//动态渲染地址
			var addresses = res.data;
			$(addresses).each(function(i,item) {
				item.receivePhone = item.receivePhone.slice(0,3) + '****' + item.receivePhone.slice(7,12);
				// console.log(item)
			});
			var liHtml ='';
			$(addresses).each(function(i,item) { liHtml += addrHtml(item); });
			// $(liHtml).appendTo('ul.addr-list');
			$('ul.addr-list').append(liHtml); 
			editHandle();
		}
		
	}
});

//地址
function addrHtml(address) {
	return `
		<li class="addr-item" data-id=${address.id}>
			<div class="information">
				<p class="information-one">
					<span class="name">${address.receiveName}</span>
					<span class="phone">${address.receivePhone}</span>
				</p>
				<div class="information-two">
					<div class="default ${address.isDefault ? '' : 'hidden'}"><span>默认</span></div>
					<p>${address.receiveRegion} ${address.receiveDetail}</p>
				</div>
			</div>
			<span class="btn-modeify"><img src="icon_edit_gray.png" ></span>
		</li>
	`;
}
//点地址管理 的 > 按钮 返回上一个页面
$('.address>.addr-head img').on('click', function() {
	window.location.href = document.referrer;
});

var $form = $('form')[0];
console.log($form['receive-name'])
//编辑
function editHandle() {
	//点编辑
	$('ul.addr-list li.addr-item').click(function() {
		var id = parseInt($(this).attr('data-id'));
		// console.log(id)
		// console.log(typeof id)
		// console.log($(this).closest('li.addr-item').attr('data-id'));
		$.ajax({
			type: 'get',
			url: '/address/model/' + id,
			headers: {Authorization: Cookies.get('token')},
			success: function(res) {
				if(res.code !== 200) {console.log(res.msg); return;}
				console.log(res)
				var isDefault = res.data.isDefault;
				// console.log($(this).closest('li.addr-item').attr('data-id'))
				if(res.code !== 200) {console.log(res.msg); return;}
				$($form['receive-name']).val(res.data.receiveName);
				$($form['receive-phone']).val(res.data.receivePhone);
				$($form['receive-region']).val(res.data.receiveRegion);
				$($form['receive-detail']).val(res.data.receiveDetail);
				
				//调用保存
				editSave(id, isDefault);
				removeHandle(id);
			}.bind(this)
		});
		//让编辑框显示
		$(this).closest('.address').removeClass('show')
			.siblings('.address-edit').addClass('show');
		
		
	});
	//点>的按钮 返回address页面
	$('.address-edit>.addr-head img').on('click', function() {
		$(this).closest('.address-edit').removeClass('show');
		$('.address').addClass('show');
	})
}
//编辑的保存
function editSave(id, isDefault) {
	//点保存
	var index = 0;
	$('.save-edit button.btn-save').click(function() {
		var addr = {
			id: id,
			receiveName: $($form['receive-name']).val(),
			receivePhone: $($form['receive-phone']).val().trim(),
			receiveRegion: $($form['receive-region']).val(),
			receiveDetail: $($form['receive-detail']).val().trim(),
			isDefault: isDefault
		};
		addr.receivePhone = $('form.addr-detail input.receive-phone').val().trim().slice(0,3) + '****' + $('form.addr-detail input.receive-phone').val().trim().slice(7,12);
		// console.log(addr.receivePhone)
		//看是否设置为默认地址
		if(isDefault) return;
		else {
			if($('.address-add .set-up>div').hasClass('change')) {
				addr.isDefault = 1;
				$('.information-two .default:not(hidden)').addClass('hidden');
			}else { addr.isDefault = 0; }
		}
		// console.log($('form.add-detail input.receive-name').val())
		if(!$('form.addr-detail input.receive-name').val().length)
			layer.msg("name不能为空")
		else if($('form.addr-detail input.receive-phone').val().length !== 11)
			layer.msg("phone必须为正确手机号")
		else if(!$('form.addr-detail input.receive-region').val().length)
			layer.msg("region不能为空")
		else if(!$('form.addr-detail input.receive-detail').val().length)
			layer.msg("detail不能为空")
		else {
			//更新dom
			setTimeout(function(){
				$(`ul.addr-list>li[data-id=${id}]`).replaceWith(addrHtml(addr));
			},200);
			// console.log($(`ul.addre-list>li[data-id=${id}]`))
			// console.log(addrHtml(addr));
			layer.msg("修改成功！", {time:1000, icon:6})
			//更新数据库
			$.ajax({
				type: 'post',
				url: '/address/update',
				headers: {Authorization: Cookies.get('token')},
				data: {
					id : id,
					receiveName: $('form.addr-detail input.receive-name').val().trim(),
					receivePhone: $('form.addr-detail input.receive-phone').val().trim(),
					receiveRegion: $('form.addr-detail input.receive-region').val(),
					receiveDetail: $('form.addr-detail input.receive-detail').val().trim(),
				},
				success: function(res) {
					if(res.code !== 200) {console.log(res.msg); return;}
					$('li.addr-item').each(function(i, item) {
						if(parseInt($(item).attr('data-id')) === id) {
							index = i;
						}
					})
					if($('.address-edit .set-up>div').hasClass('change'))
					defaultHandle(id,index);
				}.bind(this)
				
			});
			$(this).closest('.address-edit').removeClass('show')
				.siblings('.address').addClass('show');
		}
		
	});
}
//编辑中的删除
function removeHandle(id) {
	var id = id;
	$('.btn-remove').click(function() {
		$(`li[data-id=${id}]`).remove();
		//更新数据库
		$.ajax({
			url: '/address/remove/' + id,
			headers: {Authorization:Cookies.get('token')},
			success: function(res) {
				if(res.code !== 200) {console.log(res.msg); return;}
			}
		});
		$(this).closest('.address-edit').removeClass('show');
		$('.address').addClass('show');
		layer.msg("删除成功！", {time:1000, icon:6})
	});
};
//设置默认地址
function defaultHandle(id,index) {
	$.ajax({
		url: '/address/set_default/' + id,
		headers: {Authorization: Cookies.get('token')},
		success: function(res) {
			if(res.code !== 200) {console.log(res.msg); return;}
			/* var index = $.each($('ul li.addr-item'), function(idx){
				if($('ul li.addr-item')[idx] === id)
			})
			i = .each(function(i,item) {
				return $(item).attr('data-id') === id;
				
			});
			console.log(i)
			console.log($('ul li.addr-item')) */
			$('.information-two .default:not(hidden)').addClass('hidden');
			// $('li.addr-item').eq(index).find('div.default').removeClass('hidden');
			// document.querySelectorAll('li.addr-item')[index].querySelector('div.default').classList.remove('hidden');
		}
	});
	
	$('.set-up>div').removeClass('change');
};


//
var pid = $.query.get('pid');
console.log(pid);

//点新增
$('.address button.btn-add').click(function() {
	//打开模态框
	$(this).closest('.address').removeClass('show')
		.siblings('.address-add').addClass('show');
		console.log(this)
	//点>的按钮 返回address页面
	$('.address-add>.addr-head img').on('click', function() {
		$(this).closest('.address-add').removeClass('show');
		$('.address').addClass('show');
		// console.log(this)
	});
	addHandle();
});
//新增操作
function addHandle() {
	// var $form1 = $('form')[1];
	//复位
	$('form')[1].reset();
	$('.address-add .set-up>div').removeClass('change')
	
	//点保存
	$('.address-add button.btn-save').on('click', function() {
		var addr = {
			receiveName: $('form.add-detail input.receive-name').val().trim(),
			receivePhone: $('form.add-detail input.receive-phone').val().trim(),
			receiveRegion: $('form.add-detail input.receive-region').val(),
			receiveDetail: $('form.add-detail input.receive-detail').val().trim(),
		};
		// console.log($('.address-add .set-up>div').hasClass('change'))
		addr.receivePhone = $('form.add-detail input.receive-phone').val().trim().slice(0,3)
		console.log(addr.receivePhone)
		//看是否设置为默认地址
		if($('.address-add .set-up>div').hasClass('change')) {
			addr.isDefault = 1;
			$('.information-two .default:not(hidden)').addClass('hidden');
		}
		else addr.isDefault = 0;
		// console.log($('form.add-detail input.receive-name').val())
		if(!$('form.add-detail input.receive-name').val().length)
			layer.msg("name不能为空")
		else if($('form.add-detail input.receive-phone').val().length !== 11)
			layer.msg("phone必须为正确手机号")
		else if(!$('form.add-detail input.receive-region').val().length)
			layer.msg("region不能为空")
		else if(!$('form.add-detail input.receive-detail').val().length)
			layer.msg("detail不能为空")
		else {
			$(addrHtml(addr)).appendTo('ul.addr-list');	//更新dom
			layer.msg("新增成功！", {time:1000, icon:6});
			//更新数据库
			$.ajax({
				type: 'post',
				url: '/address/add ',
				headers: {Authorization: Cookies.get('token')},
				data: {
					receiveName: $('form.add-detail input.receive-name').val().trim(),
					receivePhone: $('form.add-detail input.receive-phone').val().trim(),
					receiveRegion: $('form.add-detail input.receive-region').val(),
					receiveDetail: $('form.add-detail input.receive-detail').val().trim(),
				},
				success: function(res) {
					if(res.code !== 200) {console.log(res.msg); return;}
					console.log(res.data);
					defaultHandle(res.data);
					
				}
			});
			$(this).closest('.addr-content').parent().removeClass('show')
						.siblings('.address').addClass('show');
		}
	});
};



//设置默认地址的开关效果
$('.set-up>div').on('click',function() {
	$(this).toggleClass('change');
});

