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
			_content.password=$.md5($('.user-login-form input[name=password]').val(), 'gome.com');
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