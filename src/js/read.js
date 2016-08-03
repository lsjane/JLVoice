var read = {
	init:function(){
		var _t = this;
		_t.config = config.read;
		_t.getHrefParam = config.getHrefParam;
		_t.toTwo = config.toTwo;
		_t.channel = $('.read-wrap').attr('data-channel');
		
		switch(_t.channel){
			case 'cover': _t.cover_fn(); break;
			case 'list': _t.list_fn(); break;
			case 'detail': _t.detail_fn();break;
			case 'expert': _t.expert_fn(); break;
			case 'expdetail': _t.expdetail_fn(); break;
			default:
			  return false;
		}
	},
	bind_fn:function(){
		var _t = this;
		//cover封面滚动
		$('.read-cover-list').on('swipeLeft',function(e){
			var $e = $(e.currentTarget);
			_t.cover_move($e,-1);
		});
		$('.read-cover-list').on('swipeRight',function(e){
			var $e = $(e.currentTarget);
			_t.cover_move($e,1);
		});
		$('.left-arrow').on('click',function(e){
			var $e = $(e.currentTarget);
			var _ul = $e.siblings('.read-cover-box').find('ul');
			_t.cover_move($(_ul),1);
		});
		$('.right-arrow').on('click',function(e){
			var $e = $(e.currentTarget);
			var _ul = $e.siblings('.read-cover-box').find('ul');
			_t.cover_move($(_ul),-1);
		});
	},
	cover_fn:function(){
		var _t = this;
		
		
		$.ajax({
			type: 'get',
		  	url: _t.config.coverList,
		  	dataType: 'json',
		  	success: function(data){
		  		if(data.code == '1'){
		  			var _html = '';
		  			var _dataObj = data.attach;
		  			var _n = 0;
		  			_t._elewidth = parseInt($('.read-cover-list li')[0].offsetWidth);
					_t._elewidth = _t._elewidth?_t._elewidth:220;

		  			for(var _name in _dataObj){
		  				_n++;
		  				_html += '<div class="read-cover-liwrap read-cover-bg'+_n+'"><div class="read-cover-info"><span class="read-cover-year"><i class="ion-calendar"></i>'+_name;
						_html += '年</span><span class="read-cover-more">共' + _dataObj[_name].length;
						_html += '期 &gt;</span></div><div class="read-cover-box"><ul class="read-cover-list">';
						if(_dataObj[_name].length > 0){
							$(_dataObj[_name]).each(function(_index,_element){
								_html += '<li><div class="read-cover-item"><a href="read-list.html?catid=' + _element.id;
								_html += '"><p class="read-cover-text">第<strong>' + _t.toTwo(_element.catname);
								_html += '</strong>期</p></a></div></li>';
							});
						}
						_html += '</ul></div><span class="left-arrow ion-ios-arrow-left"></span><span class="right-arrow ion-ios-arrow-right"></span></div>';
		  			}
		  			$('.read-cover-content').html(_html);
		  			$('.read-cover-list').each(function(_index,_element){
						var _length = $(_element).children('li').length;
						$(_element).css('width',_t._elewidth*_length).attr('data-index',0);
						if(_length <= 3){
							$(_element).attr('data-ismove','false');
						}else{
							$(_element).attr('data-ismove','true');
							$(_element).parent().siblings('.right-arrow').show();
						}
					});
					_t.bind_fn();
		  		}
		  	}
		});
		
		
	},
	cover_move:function($e,_dir){
		var _t = this;
		var _ismove = $e.attr('data-ismove');
		if(_ismove == 'true'){
			var _curindex = parseInt($e.attr('data-index'));
			var _left = parseInt($e.css('left'));
			var _width = parseInt($e.css('width'));
			if((_dir == 1 && _curindex == 0) || (_dir == -1 && _width == -_left+_t._elewidth*3)){
				return false;
			}
			_dir == -1?_curindex++:_curindex--;
			_left = _left+_dir*_t._elewidth;
			$e.animate({left:_left+'px'});
			$e.attr('data-index',_curindex);
			var $left = $e.parent().siblings('.left-arrow');
			var $right = $e.parent().siblings('.right-arrow');
			if(_curindex == 0){
				$left.hide();
				$right.show();
			}else if(_width == -_left+_t._elewidth*3){
				$left.show();
				$right.hide();
			}else{
				$left.show();
				$right.show();
			}
		}
	},
	list_fn:function(){
		var _t = this;
		var _catid = _t.getHrefParam('catid');
		_catid = _catid?_catid:'';
		if(_catid){
			$.ajax({
				type: 'get',
			  	url: _t.config.articleList,
			  	data: {catid:_catid},
			  	dataType: 'json',
			  	success: function(data){
			    	if(data.code=='1'){
			    		var _html = '';
						if(data.attach.length > 0){
							$(data.attach).each(function(_index,_element){
								_html += '<li><a href="read-detail.html?id=' + _element.id;
								_html += '" class="clearfix"><div class="read-list-num">' + (_index+1);
								_html += '</div><div class="read-list-title">' +_element.title;
								_html += '<span class="ion-ios-arrow-right"></span></div></a></li>';
							});
							$('.read-list-content').html(_html);
						}
			    	}else{
				    }
			  	},
			  	error: function(){
			  	}
			});
		}
	},
	detail_fn:function(){
		var _t = this;
		var _id = _t.getHrefParam('id');
		_id = _id?_id:'';
		if(_id){
			$.ajax({
				type: 'get',
			  	url: _t.config.articledetail,
			  	data: {id:_id},
			  	dataType: 'json',
			  	success: function(data){
			    	if(data.code=='1'){
			    		var _html = '';
						if(data.attach.length > 0){
							$(data.attach).each(function(_index,_element){
								_html += '<li><a href="read-detail.html?id=' + _element.id;
								_html += '" class="clearfix"><div class="read-list-num">' + (_index+1);
								_html += '</div><div class="read-list-title">' +_element.title;
								_html += '<span class="ion-ios-arrow-right"></span></div></a></li>';
							});
							$('.read-list-content').html(_html);
						}
			    	}else{
				    }
			  	},
			  	error: function(){
			  	}
			});
		}
	},
	expert_fn:function(){
		var _t = this;
	},
	expdetail_fn:function(){
		var _t = this;
	}
};
read.init();