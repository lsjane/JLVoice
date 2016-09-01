var home={
	init:function(){
		var _t = this;
		_t.config = config.read;
		_t.getHrefParam = config.getHrefParam;
		_t.toTwo = config.toTwo;
		_t.userId = _t.getHrefParam('userId');
		if(_t.userId){
			$('.home-nav-wrap a').each(function(_index,_element){
				var _hrefold = $(_element).attr('href');
				var _hrefnew = _hrefold;
				if(_hrefold.match('\\?')){
					_hrefnew += '&userId='+_t.userId;
				}else{
					_hrefnew += '?userId='+_t.userId;
				}
				$(_element).attr('href',_hrefnew);
			});
			$('.home-user-wrap a').attr('href','user-info.html?userId=' +_t.userId);
		}else{
			$('.home-user-wrap a').attr('href','user-login.html?type=2');
		}
	}
}
home.init();