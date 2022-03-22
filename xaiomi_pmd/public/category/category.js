//发ajax请求一级分类的数据，并动态渲染
//要配置很多的键和值
//键的名字是规定死的，我们要知道每个键的含义
//type: "get" 默认的，可不写	request 请求  response响应
//	url: "http://localhost:3000/category/list/0"
$.ajax({
	url: "/category/list/0",
	success: function(res) {
		if(res.code !== 200) { console.log(res.msg); return; }
		var htmlStr = '';
		res.data.forEach(function(item) {
			htmlStr += `
				<li data-id='${item.id}' data-avatar='${item.avatar}'>
					<span>${item.name}</span>
				</li>
			`;
		})
		$('ul.list-main').html(htmlStr).find('li').eq(0).trigger('click');
	}	
});
//给ul.list-main绑定点击事件，实现一级分类切换
$('ul.list-main').on('click', function(e) {
	var $li = e.target.tagName === "LI" ? $(e.target) : $(e.target).parent();
	if($li.hasClass('active')) return;
	//激活切换
	$li.addClass('active').siblings('.active').removeClass('active');
	//右上一级分类图片切换
	$('img.avatar').attr('src', $li.attr('data-avatar'));
	//请求对应二级分类数据，并进行动态渲染
	// var id = parseInt($li.attr('data-id'));
	$.ajax({
		url: "/category/list/" + $li.attr('data-id'),
		success: function(res) {
			if(res.code !== 200) { console.log(res.msg); return;}
			$('ul.list-sub').empty();
			if(res.data.length) {
				$('p.tip').hide();
				var htmlStr = "";
				res.data.forEach(function(item){
					htmlStr += `
						<li>
							<a href="/list/list.html?cid=${item.id}&cName=${item.name}">
								<img src="${item.avatar}" />
								<span>${item.name}</span>
							</a>
						</li>
					`;
				});
				$('ul.list-sub').html(htmlStr).show();
			} else {
				$('p.tip').show();
				$('ul.list-sub').hide();
			}
		}
	});
	
});







