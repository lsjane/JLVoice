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

		//文章附件下载
		$('.read-detail-download').on('click',function(e){
			var $e = $(e.currentTarget);
			var _articleId = $e.attr('data-articleid');
			var _perId = 1;
			if(_articleId && _perId){
				$.ajax({
					type: 'get',
				  	url: _t.config.downArticle,
				  	data: {articleId:_articleId,perId:_perId},
				  	dataType: 'json',
				  	success: function(data){
				  		if(data.code == 1){
				  			$.dialog({
			                    content : '文献全文已经发送到您绑定的邮箱内，请注意查收！',
								title:'ok',
			                    time : 2000
			       			});
				  		}else{
				  			$.dialog({
			                    content : '下载失败！',
								title:'alert',
			                    time : 2000
			       			});
				  		}
				  	}
				});
			}
		});
		//专家详情点赞
		$('.read-expdetail-laud').on('click',function(e){
			$e = $(e.currentTarget);
			var _issup = $e.attr('data-issupport');
			// var _yid = $e.attr('data-yid');
			if(_issup == 'false'){
				_param = {};
				_param.yid = _t._yid ;
				_param.perId = 1;
				$.ajax({
					type: 'get',
				  	url: _t.config.exprtDetail,
				  	data: {content:JSON.stringify(_param)},
				  	dataType: 'json',
				  	success:function(data){
  						if(data.code == 1){
  							$e.attr('data-issupport','true').addClass('active');
  						}else{
	  						$.dialog({
			                    content : '点赞失败！',
								title:'alert',
			                    time : 2000
			       			});
	  					}
  					}
				});
			}
		});
		//显示评论框
		$('.read-expdetail-com').on('click',function(e){
			$e = $(e.currentTarget);
			$('.read-comment-box').fadeIn();
		});
		//关闭评论框
		$('.read-comment-close').on('click',function(e){
			$e = $(e.currentTarget);
			$('.read-comment-box').fadeOut();
			$('.read-comment-textarea').text('');
		});
		//提交评论
		$('.read-comment-submit').on('click',function(e){
			$e = $(e.currentTarget);
			_param = {};
			_param.yid = _t._yid ;
			_param.perId = 1;
			_param.content = $('.read-comment-textarea').text();
			$.ajax({
				type: 'get',
			  	url: _t.config.exprtDetail,
			  	data: {content:JSON.stringify(_param)},
			  	dataType: 'json',
			  	success: function(data){
			  		if(data.code == 1){
						$.dialog({
		                    content : '评论成功！',
							title:'ok',
		                    time : 33000
		       			});
		       			$('.read-comment-box').fadeOut();
						$('.read-comment-textarea').text('');
					}else{
						$.dialog({
		                    content : '评论失败！',
							title:'alert',
		                    time : 2000
		       			});
					}
			  	}
			});
			
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

		  			for(var _name in _dataObj){
		  				_n++;
		  				_html += '<div class="read-cover-liwrap read-cover-bg'+_n+'"><div class="read-cover-info"><span class="read-cover-year"><i class="ion-calendar"></i>'+_name;
						_html += '年</span><span class="read-cover-more">共' + _dataObj[_name].length;
						_html += '期 &gt;</span></div><div class="read-cover-box"><ul class="read-cover-list">';
						if(_dataObj[_name].length > 0){
							$(_dataObj[_name]).each(function(_index,_element){
								_html += '<li><div class="read-cover-item"><a href="read-list.html?catname=' + _element.catname +'&yearValue=' + _element.yearValue;
								_html += '"><p class="read-cover-text">第<strong>' + _t.toTwo(_element.catname);
								_html += '</strong>期</p></a></div></li>';
							});
						}
						_html += '</ul></div><span class="left-arrow ion-ios-arrow-left"></span><span class="right-arrow ion-ios-arrow-right"></span></div>';
		  			}
		  			$('.read-cover-content').html(_html);

		  			_t._elewidth = parseInt($('.read-cover-list li')[0].offsetWidth);
					_t._elewidth = _t._elewidth?_t._elewidth:220;
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
		var _catname = _t.getHrefParam('catname');
		var _yearValue = _t.getHrefParam('yearValue');
		if(_catname && _yearValue){
			$.ajax({
				type: 'get',
			  	url: _t.config.articleList,
			  	data: {catname:_catname,yearValue:_yearValue},
			  	dataType: 'json',
			  	success: function(data){
			    	if(data.code=='1'){
			    		var _html = '';
						if(data.attach.length > 0){
							$(data.attach).each(function(_index,_element){
								_html += '<li><a href="read-detail.html?articleId=' + _element.id;
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
		var _articleId = _t.getHrefParam('articleId');
		if(_articleId){
			$.ajax({
				type: 'get',
			  	url: _t.config.articleDetail,
			  	data: {articleId:_articleId},
			  	dataType: 'json',
			  	success: function(data){
			    	if(data.code=='1'){
			    		var _html = '';
			    		var _articleTheme = data.attach.articleTheme;
			    		var _tag = '';
			    		var _text = '';
			    		$('.read-detail-title').text(data.attach.title);
			    		$('.read-detail-time').text(data.attach.createTime);
			    		_articleTheme.digest && $('.read-detail-desp p').text(_articleTheme.digest);
			    		$('.read-detail-expert a').attr('href','read-expert.html?articleId=' + _articleId);
			    		$('.read-detail-download').attr('data-articleid',_articleId);
			    		for(var _name in _articleTheme){
			    			switch(_name){
			    				case 'purpose': _tag = '目的'; break;
			    				case 'discover': _tag = '发现'; break;
			    				case 'way': _tag = '方法'; break;
			    				case 'conclusion': _tag = '结论'; break;
			    				default: _tag = '';
			    			}
			    			if(_tag){
			    				_html += '<div class="read-detail-tag">'+_tag+'</div><div class="read-detail-bg read-detail-item"><div class="read-detail-text">' + _articleTheme[_name]+'</div></div>';
			    			}
			    		}
			    		$('.read-detail-con').html(_html);
			    		_t.bind_fn();
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
		var _articleId = _t.getHrefParam('articleId');
		if(_articleId){	
			$.ajax({
				type: 'get',
			  	url: _t.config.expertList,
			  	data: {articleId:_articleId},
			  	dataType: 'json',
			  	success: function(data){
			  		if(data.code == 1){
			  			var _html = '';
			  			if(data.attach.length > 0){
			  				$(data.attach).each(function(_index,_element){
			  					_html += '<li><div class="read-expert-info clearfix"><div class="read-expert-pic"><img src="' + _element.picUrl;
								_html += '"></div><div class="read-expert-text">';
								if(_element.name){
									_html += '<p><label>姓名：</label>'+_element.name+'</p>';
								}
			  					if(_element.unit){
									_html += '<p><label>医院：</label>'+_element.unit+'</p>';
			  					}
			  					if(_element.office){
			  						_html += '<p><label>科室：</label>'+_element.office+'</p>';
			  					} 
			  					if(_element.jobs){
			  						_html += '<p><label>职称：</label>'+_element.jobs+'</p>';
			  					}
			  					_html += '</div></div><div class="read-expert-look"><a href="read-expdetail.html?professorId=' + _element.id;
								_html += '"><i class="ion-ios-eye-outline"></i>查看TA的解读</a></div></li>';
					
			  				});
			  				$('.read-expert-list').html(_html)
			  			}
			  		}else{

			  		}

			  	}
			});
		}
	},
	expdetail_fn:function(){
		var _t = this;
		var _professorId = _t.getHrefParam('professorId');
		_t._yid = _professorId;
		_t.bind_fn();
		if(_professorId){
			$.ajax({
				type: 'get',
			  	url: _t.config.exprtDetail,
			  	data: {professorId:_professorId},
			  	dataType: 'json',
			  	success: function(data){
			  		if(data.code == 1){
			  			var _html = '';
			  			$('.read-expdetail-title').text(data.attach.title);
			  			$('.read-expdetail-pic img').attr('src',data.attach.picUrl);
			  			if(data.attach.name){
							_html += '<p><label>姓名：</label>'+data.attach.name+'</p>';
						}
	  					if(data.attach.unit){
							_html += '<p><label>医院：</label>'+data.attach.unit+'</p>';
	  					}
	  					if(data.attach.office){
	  						_html += '<p><label>科室：</label>'+data.attach.office+'</p>';
	  					} 
	  					if(data.attach.jobs){
	  						_html += '<p><label>职称：</label>'+data.attach.jobs+'</p>';
	  					}
	  					$('.read-expdetail-text').html(_html);
	  					$('.read-expdetail-viewpoint').text(data.attach.content);
	  				}
			  	}
			});
			$.ajax({
				type: 'get',
			  	url: _t.config.expertSupCount,
			  	data: {professorId:_professorId},
			  	dataType: 'json',
			  	success: function(data){
			  		if(data.code == 1){
			  			$('.read-expdetail-laud b').text(data.attach);
			  		}
			  	}
			});
			var _perId = 1;
			if(_perId){
				$.ajax({
					type: 'get',
				  	url: _t.config.expertIsSup,
				  	data: {professorId:_professorId,perId:_perId},
				  	dataType: 'json',
				  	success: function(data){
				  		if(data.code == 1 && data.attach == 1){
				  			$('.read-expdetail-laud').attr('data-issupport','true').addClass('active');
				  		}
				  	}
				});
			}
		}
	},
	comment_list_fn:function(){

	}
};
read.init();