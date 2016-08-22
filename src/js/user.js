var user = {
	init:function(){
		var _t = this;
		_t.config = config.user;
		_t.getHrefParam = config.getHrefParam;
		// _t.toTwo = config.toTwo;
		_t.channel = $('.user-wrap').attr('data-channel');
		_t.userId = _t.getHrefParam('userId');
		if(_t.userId){
			_t.userInfo = config.getUserInfo(_t.userId);
		}
		switch(_t.channel){
			case 'login': _t.login_fn(); break;
			case 'register': _t.register_fn(); break;
			case 'info': _t.info_fn();break;
			case 'mybeans': _t.mybeans_fn(); break;
			case 'myorder': _t.myorder_fn(); break;
			case 'beans': _t.beans_fn(); break;
			case 'editinfo': _t.editinfo_fn();break;
			case 'editpass': _t.editpass_fn(); break;
			case 'feedback': _t.feedback_fn(); break;
			case 'forgetpass': _t.forgetpass_fn(); break;
			case 'sign': _t.sign_fn(); break;
			default:
			  return false;
		}
	},
	login_fn:function(){
		var _t = this;
		var _histype = parseInt(_t.getHrefParam('type'));
		$('#user-login-submit').on('click',function(){
			var _content = {};
			_content.phone = $.trim($('.user-login-form input[name=phone]').val());
			_content.password = $.md5($('.user-login-form input[name=password]').val(), 'gome.com');
			_ischeck = $('.user-login-remember').is(":checked") ? true : false;

			$.ajax({
			  url:_t.config.login,
			  type:"POST",
			  dataType:"json",
			  data:{"content":JSON.stringify(_content),"checked":_ischeck},
			  success:function(data){
				  if(data.code==1){
				  		// config.userInfo = data.attach;
				  		_t.userId = data.attach.id;
				  		switch(_histype){
				  			case 1:window.open(document.referrer+'&userId='+_t.userId,'_self');break;
				  			case 2:window.open('user-info.html?userId='+_t.userId,'_self');break;
				  			default:window.open('home.html?userId='+_t.userId,'_self');break;
				  		}
					  	
				  }else{
					  	$.dialog({
							content : data.attach,
							title:'alert',
							time : 2000
					   	});
				  }
			  },
			  error:function(){
				  alert("操作失败");
			  }
			});
		});
	},
	register_fn:function(){
		var _t = this;
		//省份、城市联动
		$(".user-register-region").citySelect({
			nodata:"none",
			required:false
		});
		//获取验证码
		$('.user-register-sendcode').on('click',function(e){
			var $e = $(e.currentTarget);
			var _timer = null;
			var _n = 60;
			var _phone = $('.user-register-phone input').val();
			if(_phone){
				$e.attr('disabled',true);
				$e.val('请稍后，'+_n+'秒后重试！');
				_timer = setInterval(function(){
					_n--;
					$e.val('请稍后，'+_n+'秒后重试！');
					if(_n == 0){
						clearInterval(_timer);
						$e.removeAttr('disabled');
						$e.val('发送验证码')
					}
				},1000);
				$.ajax({
					url:_t.config.sendcode,
					type:'get',
					dataType:'json',
					data:{phone:_phone,flag:0},
					success:function(data){
						if(data.code == 1){
							_t.sendcode = data.attach;
						}
					}
				});
			}else{
				$.dialog({
					content : "请输入手机号！",
					title:'alert',
					time : 2000
			   	});
			}
		});
		//提交表单
		$('.user-register-submit').on('click',function(e){
			var $e = $(e.currentTarget);
			var $form = $('.user-register-form');
			var _isvalid = true;

			var _param = {};
			var _paramArr = $form.serialize().split('&');
			$(_paramArr).each(function(_index,_element){
				var _elearr = _element.split('=');
				_param[_elearr[0]] = _elearr[1];
			});
			_isvalid = _isvalid && validate.require(_param,{hospital:'ignore'});
			_isvalid = _isvalid && validate.phone('.user-register-phone input');
			_isvalid = _isvalid && validate.email('.user-register-email input');
			_isvalid = _isvalid && validate.compare('.user-register-password input','.user-register-repeatpass input');			
			_isvalid = _isvalid && validate.checkcode('.user-register-codetxt',_t.sendcode);
			_isvalid = _isvalid && validate.ischeck('.user-register-agree input');
			
			if(_isvalid){
				$.ajax({
					url:_t.config.isregister,
				  	type:"POST",
				 	dataType:"json",
				  	data:{phone:$.trim(_param.phone)},
				  	success:function(data){
				  		if(data.code == 1){
			                $.dialog({
						        content : '该手机号已经注册过，请直接登录',
						        title : 'alert',
						        ok : function() {
						            window.open('user-login.html','_self');
						        },
						        cancel : function() {
						            // alert('我是取消按钮');
						        },
						        lock : false
						    });
				  		}else{
				  			_param.nickname = _param.phone;
				  			_param.password = $.md5(_param.password, 'gome.com');
				  			$.ajax({
								url:_t.config.register,
							  	type:"POST",
							 	dataType:"json",
							  	data:{"content":JSON.stringify(_param)},
							  	success:function(data){
							  		if(data.code == 1){
							  			window.open('user-login.html','_self');
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
				  	}
				});
				
			}
		});
	},
	info_fn:function(){
		var _t = this;
		if(_t.userInfo.fileUrl){
			$('.user-info-ico img').attr('src',_t.userInfo.fileUrl);
		}else{
			$('.user-info-ico img').remove();
		}
		$('.user-info-name').text(_t.userInfo.userName);
		$('.user-info-btn input').on('click',function(){
			// config.userInfo = {};
			window.open('user-login.html?type=2','_self');
		});
		if(_t.userId){
			$('.user-info-item a').each(function(_index,_element){
				$(_element).attr('href',$(_element).attr('href')+'?userId='+_t.userId);
			});
		}		
	},
	editinfo_fn:function(){
		var _t = this;
		if(_t.userInfo){
			$('.user-editinfo-form input[type=text]').each(function(_index,_element){
				$(_element).val(_t.userInfo[$(_element).attr('name')]);
			});
		}
		$('.user-editinfo-btn input').on('click',function(){
			var $form = $('.user-editinfo-form');
			var _isvalid = true;

			var _param = {};
			var _paramArr = $form.serialize().split('&');
			$(_paramArr).each(function(_index,_element){
				var _elearr = _element.split('=');
				_param[_elearr[0]] = _elearr[1];
			});
			_isvalid = _isvalid && validate.require(_param);
			_isvalid = _isvalid && validate.email('.user-editinfo-email input');

			_param.id = _t.userId;
			if(_isvalid){
				$.ajax({
					url:_t.config.editInfo,
				  	type:"POST",
				 	dataType:"json",
				  	data:{"content":JSON.stringify(_param)},
				  	success:function(data){
				  		if(data.code == 1){
				  			window.open('user-info.html?userId='+_t.userId,'_self');
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
		});
	},
	editpass_fn:function(){
		var _t = this;
		var _type = _t.getHrefParam('type') == 'f'?true:false;
		if(_type){
			$('.user-editpass-old').remove();
			var _phone = _t.getHrefParam('phone');
		}
		$('.user-editpass-btn input').on('click',function(){
			var $form = $('.user-editpass-form');
			var _isvalid = true;

			var _param = {};
			var _paramArr = $form.serialize().split('&');
			$(_paramArr).each(function(_index,_element){
				var _elearr = _element.split('=');
				_param[_elearr[0]] = _elearr[1];
			});
			_isvalid = _isvalid && validate.require(_param);
			if(!_isvalid){
				return false;
			}
			if(!_type){
				_param.oldpassword = $.md5(_param.oldpassword, 'gome.com');
				if(_param.oldpassword != _t.userInfo.password){
					$.dialog({
	                    content : '输入的原密码不正确！',
	                    title:'alert',
	                    time : 2000
	                });
	                return false;
				}
			}
			
			if(_param.newpassword != _param.repeatnew){
				$.dialog({
                    content : '两次新密码输入不一致！',
                    title:'alert',
                    time : 2000
                });
                return false;
			}
			if(_type){
				var _url = _t.config.editInfo;
				var _content = {};
				_content.phone = _phone;
				_content.password = $.md5(_param.newpassword, 'gome.com');
				_content = {"content":JSON.stringify(_content)};
			}else{
				var _url = _t.config.editPass;
				var _content = {userId:_t.userId,password:$.md5(_param.newpassword, 'gome.com')};
			}
			$.ajax({
				url:_url,
			  	type:"POST",
			 	dataType:"json",
			  	data:_content,
			  	success:function(data){
			  		if(data.code == 1){
			  			if(_type){
			  				window.open('user-login.html?type=2','_self');
			  			}else{
				  			// config.userInfo.password = $.md5(_param.newpassword, 'gome.com');
				  			window.open('user-info.html?userId=' +_t.userId,'_self');
			  			}
			  		}else{
			  			$.dialog({
		                    content : data.attach,
		                    title:'alert',
		                    time : 2000
		                });
			  		}
			  	}
			});
		});
	},
	mybeans_fn:function(){
		var _t = this;
		$.ajax({
			url:_t.config.totalBeans,
			type:'get',
			dataType:'json',
			data:{userId:_t.userId},
			success:function(data){
				if(data.code == 1){
					$('.user-mybeans-count span').text(data.attach);
				}
			}
		});
		if(_t.userId){
			$('.user-mybeans-link a').each(function(_index,_element){
				$(_element).attr('href',$(_element).attr('href')+'?userId='+_t.userId);
			});
		}		
	},
	myorder_fn:function(){
		var _t = this;
		$.ajax({
			url:_t.config.orderList,
			type:'get',
			dataType:'json',
			data:{userId:_t.userId,type:1},
			success:function(data){
				if(data.code == 1){
					var _html = '';
					if(data.attach.length > 0){
						$(data.attach).each(function(_index,_element){
							_html += '<li><p class="user-myorder-beans"><span>' + -(_element.amount);
							_html += '</span>乐豆</p><p class="user-myorder-cause">' + _element.describes;
							_html += '</p></li>';
						});
						$('.user-myorder-list').html(_html);
					}else{
						$('.user-myorder-box').html('暂无内容');
					}
				}
			}
		});
	},
	beans_fn:function(){
		var _t = this;
		$.ajax({
			url:_t.config.totalBeans,
			type:'get',
			dataType:'json',
			data:{userId:_t.userId},
			success:function(data){
				if(data.code == 1){
					$('.user-beans-count').text(data.attach);
				}
			}
		});
		$.ajax({
			url:_t.config.beansList,
			type:'get',
			dataType:'json',
			data:{userId:_t.userId},
			success:function(data){
				if(data.code == 1){
					var _html = '';
					if(data.attach.length > 0){
						var _bgcolor = [4,3,2,1,10,6,5,11];
						$(data.attach).each(function(_index,_element){
							_html += '<li><div class="user-beans-left">'+_element.getTime.split(' ').join('<br />');
							_html += '</div><div class="user-beans-middle"><span class="user-beans-type' + _element.sourceType +' user-bgcolor'+_bgcolor[_element.sourceType-1];
							_html += '"></span></div><div class="user-beans-right"><p class="user-beans-num';
							if(_element.amount>=0){
								_html += '">+';
							}else{
								_html += ' user-beans-reduce">';
							}
							_html += _element.amount + '</p><p class="user-beans-cause">' + _element.describes;
							_html += '</p></div></li>';
						});
						$('.user-beans-list').html(_html);
					}else{
						$('.user-beans-box').html('暂无内容');
					}
				}
			}
		});
	},
	feedback_fn:function(){
		var _t = this;
		$('.user-feedback-form input[type=button]').on('click',function(){
			var _content = $.trim($('.user-feedback-form textarea').val());
			if(_content){
				$.ajax({
					url:_t.config.feedback,
					type:'get',
					dataType:'json',
					data:{userId:_t.userId,advice:_content},
					success:function(data){
						if(data.code == 1){
							window.open('user-info.html?userId='+_t.userId,'_self');
						}
					}
				});
			}else{
				$.dialog({
					content : '请填写您遇到的问题或意见建议！',
					title:'alert',
					time : 2000
			   	});
			}
			
		});
	},
	forgetpass_fn:function(){
		var _t = this;
		//获取验证码
		$('.user-forgetpass-sendcode').on('click',function(e){
			var $e = $(e.currentTarget);
			var _isvalid = true;
			var _timer = null;
			var _n = 60;
			var _txtinput = '.user-forgetpass-phone input[type=text]';
			var _phone = $.trim($(_txtinput).val());
			
			if(_phone){
				_isvalid = _isvalid && validate.phone(_txtinput);
				if(!_isvalid){
					return false;
				}
				$e.attr('disabled',true);
				$e.val('请稍后，'+_n+'秒后重试！');
				_timer = setInterval(function(){
					_n--;
					$e.val('请稍后，'+_n+'秒后重试！');
					if(_n == 0){
						clearInterval(_timer);
						$e.removeAttr('disabled');
						$e.val('发送验证码');
					}
				},1000);
				$.ajax({
					url:_t.config.sendcode,
					type:'get',
					dataType:'json',
					data:{phone:_phone,flag:0},
					success:function(data){
						if(data.code == 1){
							_t.sendcode = data.attach;
						}
					}
				});
			}else{
				$.dialog({
					content : "请输入手机号！",
					title:'alert',
					time : 2000
			   	});
			}
		});
		$('.user-forgetpass-btn input').on('click',function(){
			var _phone = $.trim($('.user-forgetpass-phone input[type=text]').val());
			var _code = $.trim($('.user-forgetpass-code input').val());
			if(_t.sendcode && _t.sendcode == _code){
				window.open('user-editpass.html?type=f&phone='+_phone,'_self');
			}else{
				$.dialog({
					content : "验证码不正确！",
					title:'alert',
					time : 2000
			   	});
			}
		});
	},
	sign_fn:function(){
		var _t = this;
		var _date = new Date();
		var signList = [];
		$.ajax({
			url:_t.config.signList,
			type:'get',
			dataType:'json',
			async:false,
			data:{userId:_t.userId},
			success:function(data){
				if(data.code == 1){
					signList = data.attach;
				}
			}
		});
		var str = calUtil.drawCal(_date.getFullYear(),_date.getMonth() + 1,signList);
		$("#user-calendar-box").html(str);
		
	}
};
user.init();