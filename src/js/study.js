var study = {
	init:function(){
		var _t = this;
		_t.config = config.study;
		_t.getHrefParam = config.getHrefParam;
		_t.toTwo = config.toTwo;
		_t.channel = $('.study-wrap').attr('data-channel');
		_t.userId = _t.getHrefParam('userId');
		if(_t.userId){
			_t.userhash = 'userId='+ _t.userId +'&';
			$('.go-home a').attr('href','home.html?userId=' + _t.userId);
		}
		_t.userhash = _t.userhash?_t.userhash:'';

		switch(_t.channel){
			case 'index': _t.index_fn(); break;
			case 'video': _t.video_fn(); break;
			case 'videodetail': _t.videodetail_fn();break;
			case 'guide': _t.guide_fn(); break;
			case 'dataopen':_t.dataopen_fn(); break;
			default:
			  return false;
		}
	},
	bind_fn:function(){
		var _t = this;
		//文章附件下载
		$('.study-data-download').on('click',function(e){
			var $e = $(e.currentTarget);
			if(_t.userId){
				if(_t.articleId){
					$.ajax({
						type: 'get',
					  	url: _t.config.downGuide,
					  	data: {articleId:_t.articleId,perId:_t.userId},
					  	dataType: 'json',
					  	success: function(data){
					  		if(data.code == 1){
					  			$.dialog({
				                    content : '指南全文已经发送到您绑定的邮箱内，请注意查收！',
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
		$('.study-videodetail-laud').on('click',function(e){
			$e = $(e.currentTarget);
			var _issup = $e.attr('data-issupport');
			// var _yid = $e.attr('data-yid');
			if(_issup == 'false'){
				if(_t.userId){
					_param = {};
					_param.yid = _t.videoId;
					_param.perId = _t.userId;
					$.ajax({
						type: 'get',
					  	url: _t.config.videoSup,
					  	data: {content:JSON.stringify(_param)},
					  	dataType: 'json',
					  	success:function(data){
	  						if(data.code == 1){
	  							$e.attr('data-issupport','true').addClass('active');
	  							var _totalcount = parseInt($('.study-videodetail-laud b').text());
	  							$('.study-videodetail-laud b').text(_totalcount+1);
	  							setTimeout(function(){
	  								$('.study-videodetail-laud i').hide();
	  							},1200);
	  						}else{
		  						$.dialog({
				                    content : data.attach,
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
		$('.study-videodetail-com').on('click',function(e){
			$e = $(e.currentTarget);
			if(_t.userId){
				$('.study-comment-box').show();
			}else{
				config.loginDialog(1);
			}
			
		});
		//关闭评论框
		$('.study-comment-close').on('click',function(e){
			$e = $(e.currentTarget);
			$('.study-comment-box').hide();
			$('.study-comment-textarea').val('');
		});
		//提交评论
		$('.study-comment-submit').on('click',function(e){
			$e = $(e.currentTarget);
			_param = {};
			_param.content = $('.study-comment-textarea').val();
			if (_param.content) {
				_param.yid = _t.videoId;
				_param.perId = _t.userId;
				$.ajax({
					type: 'get',
				  	url: _t.config.comment,
				  	data: {content:JSON.stringify(_param)},
				  	dataType: 'json',
				  	success: function(data){
				  		if(data.code == 1){
				  			$('.study-comment-box').hide();
							$('.study-comment-textarea').val('');
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
		//视频播放
		$('#study-video').on('loadstart',function(e){
			$e = $(e.currentTarget)[0];
			// $e.pause();
			$.dialog({
				width:'400px',
		        content : '该视频较大，手机观看大约需要'+_t.videosize+'M流量，建议WIFI环境下观看。',
		        title : 'alert',
		        ok : function() {
		        	// $e.play();
		        }
		    });
		});
		//观看记录
		$('#study-video').on('play',function(e){
			$e = $(e.currentTarget)[0];
			if(_t.userId){
				$.ajax({
					url:_t.config.addBeans,
					type:'get',
					data:{userId:_t.userId,sourceType:10,sourceId:_t.videoId},
					dataType:'json',
					success:function(data){
					},
					error:function(){
					}
				});
			}else{
				$e.pause();
				config.loginDialog(1);
			}
		});
		//指南共识搜索
		
	},
	index_fn:function(){
		var _t = this;
		$('.study-index-nav a').each(function(_index,_element){
			var _hrefold = $(_element).attr('href');
			var _hrefnew = _hrefold;
			if(_hrefold.match('\\?')){
				_hrefnew += '&userId='+_t.userId;
			}else{
				_hrefnew += '?userId='+_t.userId;
			}
			$(_element).attr('href',_hrefnew);
		});
		$.ajax({
			type: 'get',
		  	url: _t.config.video,
		  	data:{vType:2},
		  	dataType: 'json',
		  	success: function(data){
		  		if(data.code=='1'){
		    		var _html = '';
					if(data.attach.length > 0){
						$(data.attach).each(function(_index,_element){
							_html += '<li><a href="study-video-detail.html?'+_t.userhash+'vedioId=' +_element.id;
							_html += '"><div class="study-index-img"><img src="' + _element.picPath;
							_html += '"><p class="study-index-shadow"><span></span></p></div><p class="ellipsis study-index-title">' + _element.title;
							_html += '</p><p class="ellipsis study-index-desp">' +_element.belong;
							_html += '</p></a></li>';
						});
						$('.study-index-recom ul').html(_html);
					}else{
						$('.study-index-recom').html('暂无内容');
					}
		    	}else{

			    }
		  	},
		  	error:function(){

		  	}
		});
	},
	video_fn:function(){
		var _t = this;
		$.ajax({
			type: 'get',
		  	url: _t.config.video,
		  	data: {vType:3},
		  	dataType: 'json',
		  	success: function(data){
		    	if(data.code=='1'){
		    		var _html = '';
					if(data.attach.length > 0){
						$(data.attach).each(function(_index,_element){
							_html += '<li><a href="study-video-detail.html?'+_t.userhash+'vedioId=' +_element.id;
							_html += '"><div class="study-video-img"><img src="' + _element.picPath;
							_html += '"><p class="study-video-shadow"><span></span></p></div><p class="ellipsis study-video-title">' + _element.title;
							_html += '</p><p class="ellipsis study-video-desp">' +_element.belong;
							_html += '</p></a></li>';
						});
						$('.study-video-content ul').html(_html);
					}else{
						$('.study-video-content').html('暂无内容');
					}
		    	}else{
		    		$('.study-video-content').html('数据加载失败，请刷新页面重试');
			    }
		  	},
		  	error: function(){
		  	}
		});
	},
	videodetail_fn:function(){
		var _t = this;
		_t.videoId = _t.getHrefParam('vedioId');
		if(_t.videoId){
			$.ajax({
				type: 'get',
			  	url: _t.config.videoDetail,
			  	data: {vedioId:_t.videoId},
			  	dataType: 'json',
			  	success: function(data){
			    	if(data.code=='1'){
			    		var _html = '';
			    		$('#study-video').attr({
			    			// src:data.attach.fileUrl,
			    			src:'http://meeting.jarlin.com.cn/gmshopFile/vedio/20160830.mp4',
			    			poster:data.attach.picPath
			    		});
			    		$('.study-videodetail-title').text(data.attach.title);
			    		$('.study-videodetail-count b').text(data.attach.totalSee);
			    		_t.videosize = data.attach.vedioSize;
			    		_t.bind_fn();
			    	}else{
				    }
			  	},
			  	error: function(){
			  	}
			});
			//获取点赞总数
			$.ajax({
				type: 'get',
			  	url: _t.config.videoSupCount,
			  	data: {professorId:_t.videoId},
			  	dataType: 'json',
			  	success: function(data){
			  		if(data.code == 1){
			  			$('.study-videodetail-laud b').text(data.attach);
			  		}
			  	}
			});
			//是否已点赞
			if(_t.userId){
				$.ajax({
					type: 'get',
				  	url: _t.config.videoIsSup,
				  	data: {professorId:_t.videoId,perId:_t.userId},
				  	dataType: 'json',
				  	success: function(data){
				  		if(data.code == 1 && data.attach == 1){
				  			$('.study-videodetail-laud i').hide();
				  			$('.study-videodetail-laud').attr('data-issupport','true').addClass('active');
				  		}
				  	}
				});
			}
			//获取评论列表
			_t.comment_list_fn();

			//获取网络状态
			

		}
	},
	guide_fn:function(){
		var _t = this;
		// var _keywords = $.trim($('.study-guide-search input').val());
		var _title = _t.getHrefParam('title');
		$.ajax({
			type: 'get',
		  	url: _t.config.guide,
		  	data: {title:_title},
		  	dataType: 'json',
		  	success: function(data){
		  		if(data.code == 1){
		  			var _html = '';
		  			if(data.attach.length > 0){
		  				$(data.attach).each(function(_index,_element){
		  					_html += '<li data-id="'+ _element.id;
		  					if(_element.fileUrl){
		  						_html +=  '" data-url="'+ _element.fileUrl;
		  					}
		  					_html += '"><p class="ellipsis study-guide-title">' + _element.title;
							_html += '</p><p class="ellipsis study-guide-desp">' + _element.typeName;
		  					_html += '</p><span class="ion-ios-arrow-right"></span></li>';
		  				});
		  				$('.study-guide-list').html(_html);
		  				$('.study-guide-list li').click(function(e){
							var $e = $(e.currentTarget);
							var _fileUrl = $e.attr('data-url');
							var _articleId = $e.attr('data-id');
							if(_fileUrl){
								window.open('study-data.html?fileUrl='+_fileUrl+'&userId='+_t.userId+'&articleId='+_articleId,'_self');
							}
						});
		  			}else{
			  			$('.study-guide-list').html('暂无内容');
			  		}
		  		}

		  	}
		});
	},
	dataopen_fn:function(){
		var _t = this;
		_t.articleId = _t.getHrefParam('articleId');
		var _fileUrl = _t.getHrefParam('fileUrl');
		_fileUrl = decodeURIComponent(_fileUrl);
		var _origin = window.location.origin;
	    _fileUrl = _origin+_fileUrl;
		$('#pdfIframe').attr('src','../pdfJs/generic/web/viewer.html?file='+_fileUrl);
		_t.bind_fn();
	},
	comment_list_fn:function(){
		var _t = this;
		$.ajax({
			type: 'get',
		  	url: _t.config.commentList,
		  	data: {professorId:_t.videoId},
		  	dataType: 'json',
		  	success: function(data){
		  		if(data.code == 1){
		  			var _html = '';
		  			if(data.attach.length > 0){
		  				$(data.attach).each(function(_index,_element){
		  					_html += '<li class="clearfix"><div class="study-comment-ico"><img src=""></div><div class="study-comment-right"><div class="study-comment-user">' +_element.perName;
		  					_html += '<span class="study-comment-floor"><b>' + _element.numfloor;
		  					_html += '</b>楼</span></div><div class="study-comment-time">' + _element.createTime;
		  					_html += '</div><p class="study-comment-content">' + _element.content;
		  					_html += '</p></div></li>';
		  				});
		  				$('.study-comment').show();
		  				$('.study-comment-list').html(_html);
		  				
		  			}else{
		  				$('.read-comment').hide();
		  			}
		  		}
		  	}
		});
	}
};
study.init();