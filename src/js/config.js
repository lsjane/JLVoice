var tag = false;
if(tag){
	var config = {
		read:{
			coverList:'/gome-manager-web/reading/queryReadingList',
			articleList:'/gome-manager-web/reading/queryArticleList',
			articleDetail:'/gome-manager-web/reading/queryArticleDetail',
			downArticle:'/gome-manager-web/reading/downloadRead',
			expertList:'/gome-manager-web/reading/queryArticleProfessorList',
			expertDetail:'/gome-manager-web/reading/queryArticleProfessorDetail',
			expertSupCount:'/gome-manager-web/review/queryIfSupport',
			expertIsSup:'/gome-manager-web/review/queryIfSupport',
			expertSup:'/gome-manager-web/review/addSupport',
			commentList:'/gome-manager-web/review/queryReviewList'
		},
		user:{
			login:'/gome-manager-web/user/login',
			register:'/gome-manager-web/user/addUser',
			sendcode:'/gome-manager-web/user/getCode'
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
		},
		toTwo:function(n){
			if(n<9){
				return '0'+n;
			}else{
				return n.toString();
			}
		}
	}
}else{
	var config = {
		read:{
			coverList:'/json/read_cover_list.js',
			articleList:'/json/read_list.js',
			articleDetail:'/json/read_detail.js',
			downArticle:'/json/read_expert_supcount.js',
			expertList:'/json/read_expert.js',
			expertDetail:'/json/read_expert_detail.js',
			expertSupCount:'/json/read_expert_supcount.js',
			expertIsSup:'/json/read_expert_supcount.js',
			expertSup:'/json/read_expert_supcount.js',
			commentList:'/json/read_expert_comment.js'
		},
		user:{
			login:'/json/user_login.js',
			register:'/json/user_register.js',
			sendcode:'/json/user_sendcode.js'
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
		},
		toTwo:function(n){
			if(n<9){
				return '0'+n;
			}else{
				return n.toString();
			}
		}
	}
}