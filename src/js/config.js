var tag = true;
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
			sendcode:'/gome-manager-web/user/getCode',
			isregister:'gome-manager-web/user/checkPhone',
			editInfo:'/gome-manager-web/user/updateUser',
			isOldPass:'/gome-manager-web/user/checkPassword',
			editPass:'/gome-manager-web/user/updatePassword',
			totalBeans:'/gome-manager-web/user/getTotalBean',
			beansList:'/gome-manager-web/user/queryUserBeans',
			orderList:'/gome-manager-web/user/queryUserBeans',
			feedback:'/gome-manager-web/user/addAdvice'
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
			sendcode:'/json/user_sendcode.js',
			isregister:'/json/user_isregister.js',
			editInfo:'/json/user_register.js',
			isOldPass:'/json/user_isregister.js',
			editPass:'/json/user_register.js',
			totalBeans:'/json/user_beans_count.js',
			beansList:'/json/user_beans.js',
			orderList:'/json/user_order.js',
			feedback:'/json/user_register.js'
		},
		userInfo:{
			"id": 1,
	        "userName": "城市",
	        "nickname": "cs",
	        "password": "94f7c5e87f1a5e19f18898af0f884c30",
	        "hospital": "测试医院",
	        "office": "内科",
	        "phone": "13699167012",
	        "email": "liuhk1989@163.com",
	        "fileUrl": "/gmshopFile/14701453637291469546732436hrg2.png",
	        "createTime": "2016-8-11 18:41:48",
	        "updateTime": "2016-8-11 18:41:48",
	        "province": "河南省",
	        "city": "郑州市"
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