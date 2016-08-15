var user = {
	init:function(){
		var _t = this;
		_t.config = config.user;
		_t.getHrefParam = config.getHrefParam;
		// _t.toTwo = config.toTwo;
		_t.channel = $('.user-wrap').attr('data-channel');
		
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
	bind_fn:function(){
		var _t = this;
		
	},
	login_fn:function(){
		var _t = this;
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
				  		config.userInfo = data.attach;
					  	window.history.go(-1);
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

			var _param = {};
			var _paramArr = $form.serialize().split('&');
			$(_paramArr).each(function(_index,_element){
				var _elearr = _element.split('=');
				_param[_elearr[0]] = _elearr[1];
			});
			console.log(_param);
		});
	},
	info_fn:function(){
		var _t = this;
		
	},
	mybeans_fn:function(){
		var _t = this;
		
	},
	myorder_fn:function(){
		var _t = this;
		
	},
	beans_fn:function(){
		var _t = this;
	
	}
};
user.init();