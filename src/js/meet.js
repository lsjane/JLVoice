var meet = {
	init:function(){
		var _t = this;
		_t.signcode_fn();
		_t.sign_fn();
		_t.welcome_fn();
		_t.expert_fn();
		_t.schedule_fn();
		_t.data_fn();
		_t.ask_fn();
		_t.vote_fn();
		$('.meet-back').click(function(){
			window.history.back(-1);
		});
	},
	signcode_fn:function(){
		var _t = this;
		var _top =0;
		var _dep = 100;
		var _code = [0,0,0];
		
		$('.meet-code-up').on('click',function(e){
			var $e = $(e.currentTarget);
			var _moveEle = $e.siblings('.meet-code-num').find('.meet-code-numico');
			_top = parseInt($(_moveEle).css('top'));
			if(_top == 0){
				$.dialog({
                    content : '已经是最小数字',
					title:'alert',
                    time : 2000
                });
                return false;
			}
			$(_moveEle).animate({top:(_top+_dep)+'px'}, 500,'ease-out');
			var _codeIndex = parseInt($e.parent().attr('data-index'));
			_code[_codeIndex]--;
		});
		$('.meet-code-down').on('click',function(e){
			var $e = $(e.currentTarget);
			var _moveEle = $e.siblings('.meet-code-num').find('.meet-code-numico');
			_top = parseInt($(_moveEle).css('top'));
			if(_top == -900){
				$.dialog({
                    content : '已经是最大数字',
					title:'alert',
                    time : 2000
                });
                return false;
			}
			$(_moveEle).animate({top:(_top-_dep)+'px'}, 500,'ease-out');
			var _codeIndex = parseInt($e.parent().attr('data-index'));
			_code[_codeIndex]++;
		});
		$('.meet-code-btn').on('swipeRight',function(){
			$.ajax({
			  	type: 'get',
			  	url: '/json/signcode.js',
			  	data: {code:_code.join('')},
			  	dataType: 'json',
			  	timeout: 300,
			  	success: function(data){
			    	if(data.code=='1'){
			    		window.open('meet-sign.html?code='+_code.join(''),'_self');
			    	}else{
				    	$.dialog({
		                    content : '会议码签到失败！',
							title:'alert',
		                    time : 2000
	           			});
			    	}
			  	},
			  	error: function(){
			    	$.dialog({
	                    content : '会议码签到失败！',
						title:'alert',
	                    time : 2000
	       			 });
			  	}
			});
		});
	},
	sign_fn:function(){
		var _t = this;
		var _codeId = _t.getHrefParam('code');
		if(!_codeId){
			return false;
		}
		$.ajax({
		  	type: 'get',
		  	url: '/json/signcode.js',
		  	data: _codeId,
		  	dataType: 'json',
		  	timeout: 300,
		  	success: function(data){
		    	if(data.code=='1'){
		    		$('.meet-sign-bg img').attr('src',data.attach.picPath);
		    	}
		  	}
		});
		$('.meet-sign-btn').on('click',function(){
			if(!$('.meet-sign-text').val()){
				$.dialog({
                    content : '请输入您的名字，进行指纹验证',
					title:'alert',
                    time : 2000
                });
			}else{
				$.ajax({
				  	type: 'get',
				 	url: '/json/sign.js',
				  	data: {
						meetId:_codeId,
						perName:$('.meet-sign-text').val()
					},
				  	dataType: 'json',
				 	timeout: 300,
				  	success: function(data){
					    if(data.code=='1'){
					    	window.open('meet-welcome.html?meetId='+_codeId,'_self');
					    }else{
					    	$.dialog({
			                    content : '签到失败！',
								title:'alert',
			                    time : 2000
	               			 });
					    }
				  	},
				  	error: function(){
				    	$.dialog({
		                    content : '签到失败！',
							title:'alert',
		                    time : 2000
		       			 });
				  	}
				});
			}
		});
	},
	welcome_fn:function(){
		var _t = this;
		var _codeId = _t.getHrefParam('meetId');
		if(!_codeId){
			return false;
		}
		$.ajax({
		  	type: 'get',
		 	url: '/json/welcome.js',
		  	data: {
				meetId:_codeId
			},
		  	dataType: 'json',
		  	success: function(data){
			    if(data.code=='1'){
			    	$('.meet-wel-bg img').attr('src',data.attach.picPath);
			    	$('.meet-wel-text p').eq(0).text(data.attach.letterContent);
			    }else{
			    	$.dialog({
	                    content : '加载页面失败！',
						title:'alert',
	                    time : 2000
           			 });
			    }
		  	},
		  	error: function(){
		    	$.dialog({
                    content : '加载页面失败！',
					title:'alert',
                    time : 2000
       			 });
		  	}
		});
		$('.meet-wel-btn').on('swipeRight',function(){
			window.open('meet-index.html','_self');
		});
	},
	expert_fn:function(){
		var _t = this;
		var _codeId = _t.getHrefParam('meetId');
		$.ajax({
			type: 'get',
		 	url: '/json/expert.js',
		  	data: {
				meetId:_codeId
			},
		  	dataType: 'json',
		  	success: function(data){
			    if(data.code=='1'){
			    	if(data.attach.length>0){
			    		var html = '',dothtml='';
			    		$(data.attach).each(function(_index,_element){
			    			html += '<div class="swiper-slide" data-index="'+_index+'"><p class="meet-expert-photo"><img src="'+_element.picUrl;
			    			html += '"></p><p class="meet-expert-name">'+_element.name;
			    			html += '</p><p class="meet-expert-from">'+_element.unit;
			    			html += '</p><p class="meet-expert-post">'+_element.office+' '+_element.jobs+'</p>';
			    			if(_element.professorResumeList.length>0){
			    				html += '<div class="meet-expert-intro">';
			    				$(_element.professorResumeList).each(function(_ind,_ele){
			    					html += '<p>'+_ele.recode+'</p>';
			    				});
			    				html += '</div>';
			    			}
			    			html += '</div>';
			    			dothtml += '<span></span>';
			    		});
			    		$('.swiper-wrapper').html(html);
			    		$('.meet-expert-dot').html(dothtml);
			    		$('.meet-expert-dot span').first().addClass('active');
			    		$('.swiper-slide').on('swipeLeft',function(e){
			    			var $e = $(e.currentTarget);
			    			var _left = parseInt($e.parent().css('left'));
			    			if(parseInt($e.parent().css('width'))==-_left+710){
			    				return false;
			    			}
			    			$('.swiper-wrapper').animate({left:(_left-710)+'px'});
			    			$('.meet-expert-dot span').removeClass('active').eq($e.attr('data-index')+1).addClass('active');
			    		});
			    		$('.swiper-slide').on('swipeRight',function(e){
			    			var $e = $(e.currentTarget);
			    			var _left = parseInt($e.parent().css('left'));
			    			if(_left==0){
			    				return false;
			    			}
			    			$e.parent().animate({left:(_left+710)+'px'});
			    			$('.meet-expert-dot span').removeClass('active').eq($e.attr('data-index')-1).addClass('active');

			    		});
			    	}
			    }else{
			    	$.dialog({
	                    content : '加载页面失败！',
						title:'alert',
	                    time : 2000
           			 });
			    }
		  	},
		  	error: function(){
		    	$.dialog({
                    content : '加载页面失败！',
					title:'alert',
                    time : 2000
       			 });
		  	}
		});
	},
	schedule_fn:function(){
		var _t = this;
		var _codeId = _t.getHrefParam('meetId');
		$.ajax({
		  	type: 'get',
		 	url: '/json/schedule.js',
		  	data: {
				meetId:_codeId
			},
		  	dataType: 'json',
		  	success: function(data){
			    if(data.code=='1'){
			    	if(data.attach.length>0){
			    		var html = '';
			    		$(data.attach).each(function(_index,_element){
			    			html+='<div class="meet-sche-session"><div class="meet-sche-tag"><p class="meet-sche-tagl"></p><p class="meet-sche-tagr">Session'+(_index+1)+'<br><i>'+_element.stage;
			    			html+='</i></p></div><div class="meet-sche-item"><span class="meet-sche-time">'+_element.timeStr;
			    			html+='<b></b></span><span class="meet-sche-title">'+_element.content;
			    			html+='</span></div></div>';
			    		});
						$('.meet-sche-sessionwrap').html(html);
				
			
			    	}
			    }else{
			    	$.dialog({
	                    content : '加载页面失败！',
						title:'alert',
	                    time : 2000
           			 });
			    }
		  	},
		  	error: function(){
		    	$.dialog({
                    content : '加载页面失败！',
					title:'alert',
                    time : 2000
       			 });
		  	}
		});
	},
	data_fn:function(){
		var _t = this;
		var _codeId = _t.getHrefParam('meetId');
		$.ajax({
		  	type: 'get',
		 	url: '/json/data.js',
		  	data: {
				meetId:_codeId
			},
		  	dataType: 'json',
		  	success: function(data){
			    if(data.code=='1'){
			    	if(data.attach.length>0){
			    		var html = '';
			    		$(data.attach).each(function(_index,_element){
			    			html+='<li><div class="meet-data-pic"><img src="'+_element.pictureUrl;
			    			html+='"></div><div class="meet-data-right"><p class="meet-data-text">'+_element.name;
			    			html+='</p><p class="meet-data-sendbtn" data-url="'+_element.fileUrl;
			    			html+='">发送到邮箱</p></div></li>';

			    		});
						$('.meet-data-list').html(html);
						$('.meet-data-sendbtn').on('click',function(e){
							var $e = $(e.currentTarget);
							var _alerthtml = '';
							_alerthtml += '<div class="meet-alert-title"><b>资料标题：</b>'+$e.siblings('.meet-data-text').text();
							_alerthtml += '</div><div class="meet-alert-input"><b>邮箱账号：</b><input type="text" class="meet-send-txt" /></div>';
							 $.dialog({
			                    content : _alerthtml,
			                    top:'发送提醒',
			                    title : '',
			                    cancel : function() {
			                        $('.rDialog').remove();
			                    },
			                    ok : function() {
			                    	var _sendemail = $.trim($('.meet-send-txt').val());
			                    	if(!_sendemail){
			                    		return false;
			                    	}else{
			                    		$.ajax({
				                        	type: 'get',
										 	url: '/json/data.js',
										  	data: {
												id:_codeId,
												emailAddress:_sendemail
											},
										  	dataType: 'json',
										  	success:function(data){
										  		$('.rDialog').remove();
										  		$('.rDialog-mask').remove();
										  		if(data.code==1){
										  			$.dialog({
										  				top:'发送提醒',
									                    content : '<p>发送成功！</p>',
														title:'alert',
									                    time : 2000
								           			 });
										  		}
										  	}
				                        });
			                    	}
			                        
			                        return false;
			                    },
			                    
			                    lock : true
			                });
						});
			    	}
			    }else{
			    	$.dialog({
	                    content : '加载页面失败！',
						title:'alert',
	                    time : 2000
           			 });
			    }
		  	},
		  	error: function(){
		    	$.dialog({
                    content : '加载页面失败！',
					title:'alert',
                    time : 2000
       			 });
		  	}
		});
	},
	ask_fn:function(){
		var _t = this;
		var _codeId = _t.getHrefParam('meetId');
		$.ajax({
			type: 'get',
		 	url: '/json/ask.js',
		  	data: {
				meetId:_codeId,
				maxInteractId:null
			},
		  	dataType: 'json',
		  	success:function(data){

		  	}
		});
		$('.meet-ask-btn').click(function(){
			var _value = $.trim($('.meet-ask-txt').val());
			if(!_value){
				$.dialog({
                    content : '请输入提问内容！',
					title:'alert',
                    time : 2000
       			});
				return false;
			}else{
				$.ajax({
					type: 'get',
				 	url: '/json/data.js',
				  	data: {
						content:_value
					},
				  	dataType: 'json',
				  	success:function(data){
				  		if(data.code==1){
				  			var _askhtml = '<li class="clearfix"><div class="meet-ask-pic"><img src="../images/expert-photo2.jpg"></div><div class="meet-ask-right"><p class="meet-ask-name">汪洋<i>10：20</i></p><p class="meet-ask-text">'+_value+'</p></div></li>';
				  			$('.meet-ask-list').append(_askhtml);
				  		}else{
				  			$.dialog({
			                    content : '提问失败！',
								title:'alert',
			                    time : 2000
			       			});
				  		}
				  	}
				});
			}
		});

	},
	vote_fn:function(){
		var _t = this;
		var _codeId = _t.getHrefParam('meetId');
		$('.meet-vote-btn input').click(function(){
			$.ajax({
				type: 'get',
			 	url: '/json/data.js',
			  	data: {
					meetId:_codeId,
					id:1
				},
			  	dataType: 'json',
			  	success:function(data){
			  		if(data.code==1){
			  			if(data.attach==1){
			  				$.ajax({});
			  			}else{
			  				$.dialog({
			                    content : '用户不可以投票！',
								title:'alert',
			                    time : 2000
			       			});
			  			}
			  		}else{

			  		}
			  	}
			});
		});
	},
	getHrefParam:function(_name){
		var _value = '';
		if(window.location.href.split('?')[1]){
			var _paramArr = window.location.href.split('?')[1].split('&');
			$(_paramArr).each(function(_index,_element){
				var _param = _element.split('=');
				if(_param[0]==_name){
					_value = _param[1];
				}
			});
		}
		
		return _value;
	}
}

meet.init();
