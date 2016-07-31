var tag = false;
if(tag){
	var config = {
		read:{
			articleList:'/gome-manager-web/reading/queryArticleList',
			articleDetail:'/gome-manager-web/reading/ queryArticleDetail'
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
}else{
	var config = {
		read:{
			articleList:'/json/read_list.js',
			articleDetail:'/json/read_detail.js'
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
}