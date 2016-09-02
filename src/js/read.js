var read = {
	init:function(){
		var _t = this;
		_t.config = config.read;
		_t.getHrefParam = config.getHrefParam;
		_t.toTwo = config.toTwo;
		_t.channel = $('.read-wrap').attr('data-channel');
		_t.userId = _t.getHrefParam('userId');
		if(_t.userId){
			_t.userhash = 'userId='+ _t.userId +'&';
			$('.go-home a').attr('href','home.html?userId=' + _t.userId);
		}
		_t.userhash = _t.userhash?_t.userhash:'';

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
			if(_t.userId){
				var _articleId = $e.attr('data-articleid');
				if(_articleId){
					$.ajax({
						type: 'get',
					  	url: _t.config.downArticle,
					  	data: {articleId:_articleId,perId:_t.userId},
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
				                    content : data.attach,
									title:'alert',
				                    time : 2000
				       			});
					  		}
					  	}
					});
				}
			}else{
				config.loginDialog(1);
			}
			
		});
		//专家详情点赞
		$('.read-expdetail-laud').on('click',function(e){
			$e = $(e.currentTarget);
			var _issup = $e.attr('data-issupport');
			// var _yid = $e.attr('data-yid');
			if(_issup == 'false'){
				if(_t.userId){
					_param = {};
					_param.yid = _t._yid ;
					_param.perId = _t.userId;
					$.ajax({
						type: 'get',
					  	url: _t.config.expertSup,
					  	data: {content:JSON.stringify(_param)},
					  	dataType: 'json',
					  	success:function(data){
	  						if(data.code == 1){
	  							$e.attr('data-issupport','true').addClass('active');
	  							var _totalcount = parseInt($('.read-expdetail-laud b').text());
	  							$('.read-expdetail-laud b').text(_totalcount+1);
	  							setTimeout(function(){
	  								$('.read-expdetail-laud i').hide();
	  							},1200);
	  						}else{
		  						$.dialog({
				                    content : '点赞失败！',
									title:'alert',
				                    time : 2000
				       			});
		  					}
	  					}
					});
				}else{
					config.loginDialog(1);
				}
				
			}
		});
		//显示评论框
		$('.read-expdetail-com').on('click',function(e){
			$e = $(e.currentTarget);
			if(_t.userId){
				$('.read-comment-box').show();
			}else{
				config.loginDialog(1);
			}
		});
		//关闭评论框
		$('.read-comment-close').on('click',function(e){
			$e = $(e.currentTarget);
			$('.read-comment-box').hide();
			$('.read-comment-textarea').val('');
		});
		//提交评论
		$('.read-comment-submit').on('click',function(e){
			$e = $(e.currentTarget);
			_param = {};
			_param.content = $('.read-comment-textarea').val();
			if (_param.content) {
				_param.yid = _t._yid ;
				_param.perId = _t.userId;
				$.ajax({
					type: 'get',
				  	url: _t.config.comment,
				  	data: {content:JSON.stringify(_param)},
				  	dataType: 'json',
				  	success: function(data){
				  		if(data.code == 1){
				  			$('.read-comment-box').hide();
							$('.read-comment-textarea').val('');
			       			$.dialog({
			                    content : '评论成功！',
								title:'ok',
			                    time : 2000
			       			});
			       			_t.comment_list_fn();
						}else{
							$.dialog({
			                    content : '评论失败！',
								title:'alert',
			                    time : 2000
			       			});
						}
				  	}
				});
			}else{
				$.dialog({
                    content : '请输入评论内容！',
					title:'alert',
                    time : 2000
       			});
			}
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
		  			var _year = [];
		  			for(var _name in _dataObj){
		  				_year.push(_name);
		  			}
		  			_year.sort(function(a,b){
		  				return b-a;
		  			});
		  			$(_year).each(function(_index,_element){
		  				_n++;
		  				_html += '<div class="read-cover-liwrap read-cover-bg'+_n+'"><div class="read-cover-info"><span class="read-cover-year"><i class="ion-calendar"></i>'+_element;
						_html += '年</span><span class="read-cover-more">共<b></b>期 &gt;</span></div><div class="read-cover-box"><ul class="read-cover-list">';
						for(var _qi in _dataObj[_element]){
							_html += '<li><div class="read-cover-item"><a href="read-list.html?' + _t.userhash;
							_html += 'catname=' + _qi +'&yearValue=' + _element;
							_html += '"><p class="read-cover-text">第<strong>' + _t.toTwo(_qi);
							_html += '</strong>期</p></a></div></li>';
						}
						_html += '</ul></div><span class="left-arrow ion-ios-arrow-left"></span><span class="right-arrow ion-ios-arrow-right"></span></div>';
		  
		  			});
		  			$('.read-cover-content').html(_html);

		  			_t._elewidth = parseInt($('.read-cover-list li')[0].offsetWidth);
					_t._elewidth = _t._elewidth?_t._elewidth:220;
		  			$('.read-cover-list').each(function(_index,_element){
						var _length = $(_element).children('li').length;
						$(_element).css('width',_t._elewidth*_length).attr('data-index',0);
						$('.read-cover-more b').eq(_index).text(_length);
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
								_html += '<li><a href="read-detail.html?' +_t.userhash;
								_html += 'articleId=' + _element.id;
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
			    		$('.read-detail-author').text(data.attach.author);
			    		_articleTheme.digest && $('.read-detail-desp p').text(_articleTheme.digest);
			    		
			    		$('.read-detail-expert a').attr('href','read-expert.html?'+ _t.userhash +'articleId=' + _articleId);
			    		$('.read-detail-download').attr('data-articleid',_articleId);
			    		
			    		for(var _name in _articleTheme){
			    			switch(_name){
			    				case 'purpose': _tag = '目的'; break;
			    				case 'discover': _tag = '发现'; break;
			    				case 'way': _tag = '方法'; break;
			    				case 'result': _tag = '结果'; break;
			    				case 'conclusion': _tag = '结论'; break;
			    				case 'others': _tag = '其他'; break;
			    				default: _tag = '';
			    			}
			    			if(_tag && _articleTheme[_name]){
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
			  					_html += '</div></div><div class="read-expert-look"><a href="read-expdetail.html?'+ _t.userhash;
			  					_html += 'professorId=' + _element.id;
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
		if(_t._yid){
			//获取专家点评详情
			$.ajax({
				type: 'get',
			  	url: _t.config.expertDetail,
			  	data: {professorId:_t._yid},
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
	  					$('.read-expdetail-viewpoint').html(data.attach.content);
	  				}
			  	}
			});
			//获取点赞总数
			$.ajax({
				type: 'get',
			  	url: _t.config.expertSupCount,
			  	data: {professorId:_t._yid},
			  	dataType: 'json',
			  	success: function(data){
			  		if(data.code == 1){
			  			$('.read-expdetail-laud b').text(data.attach);
			  		}
			  	}
			});
			//是否已点赞
			if(_t.userId){
				$.ajax({
					type: 'get',
				  	url: _t.config.expertIsSup,
				  	data: {professorId:_t._yid,perId:_t.userId},
				  	dataType: 'json',
				  	success: function(data){
				  		if(data.code == 1 && data.attach == 1){
				  			$('.read-expdetail-laud i').hide();
				  			$('.read-expdetail-laud').attr('data-issupport','true').addClass('active');
				  		}
				  	}
				});
			}
			//获取评论列表
			_t.comment_list_fn();
		}
	},
	comment_list_fn:function(){
		var _t = this;
		$.ajax({
			type: 'get',
		  	url: _t.config.commentList,
		  	data: {professorId:_t._yid},
		  	dataType: 'json',
		  	success: function(data){
		  		if(data.code == 1){
		  			var _html = '';
		  			if(data.attach.length > 0){
		  				$(data.attach).each(function(_index,_element){
		  					_html += '<li class="clearfix"><div class="read-comment-ico"><img src=""></div><div class="read-comment-right"><div class="read-comment-user">'+ _element.perName;
		  					_html += '<span class="read-comment-floor"><b>' + _element.numfloor;
		  					_html += '</b>楼</span></div><div class="read-comment-time">' + _element.createTime;
		  					_html += '</div><p class="read-comment-content">' + _element.content;
		  					_html += '</p></div></li>';
		  				});
		  				$('.read-comment').show();
		  				$('.read-comment-list').html(_html);
		  				
		  			}else{
		  				$('.read-comment').hide();
		  			}
		  		}
		  	}
		});
	}
};
read.init();