var tag = false;
if(tag){
	var config = {
		home:{
			video:'/gome-manager-web/vedio/querVedioList'
		},
		read:{
			coverList:'/gome-manager-web/reading/queryReadingList',
			articleList:'/gome-manager-web/reading/queryArticleList',
			articleDetail:'/gome-manager-web/reading/queryArticleDetail',
			downArticle:'/gome-manager-web/reading/downloadRead',
			expertList:'/gome-manager-web/reading/queryArticleProfessorList',
			expertDetail:'/gome-manager-web/reading/queryArticleProfessorDetail',
			expertSupCount:'/gome-manager-web/review/querySupportTotal',
			expertIsSup:'/gome-manager-web/review/queryIfSupport',
			expertSup:'/gome-manager-web/review/addSupport',
			comment:'/gome-manager-web/review/addReview',
			commentList:'/gome-manager-web/review/queryReviewList'
		},
		user:{
			login:'/gome-manager-web/user/login',
			register:'/gome-manager-web/user/addUser',
			sendcode:'/gome-manager-web/user/getCode',
			isregister:'/gome-manager-web/user/checkPhone',
			editInfo:'/gome-manager-web/user/updateUser',
			isOldPass:'/gome-manager-web/user/checkPassword',
			editPass:'/gome-manager-web/user/updatePassword',
			totalBeans:'/gome-manager-web/user/getTotalBean',
			beansList:'/gome-manager-web/user/queryUserBeans',
			orderList:'/gome-manager-web/user/queryUserBeans',
			feedback:'/gome-manager-web/user/addAdvice',
			signList:'/gome-manager-web/user/queryUserSign',
			sign:'/gome-manager-web/user/addUserBean'
		},
		study:{
			video:'/gome-manager-web/vedio/querVedioList',
			videoDetail:'/gome-manager-web/vedio/queryVedioDetail',
			guide:'/gome-manager-web/learning/queryArticleList',
			// guidetail:'/gome-manager-web/learning/queryArticleDetail',
			downGuide:'/gome-manager-web/learning/downloadLearning',
			videoSupCount:'/gome-manager-web/vedio/querySupportTotal',
			videoIsSup:'/gome-manager-web/vedio/queryIfSupport',
			videoSup:'/gome-manager-web/vedio/addSupport',
			comment:'/gome-manager-web/vedio/addReview',
			commentList:'/gome-manager-web/vedio/queryReviewList',
			addBeans:'/gome-manager-web/user/addUserBean'
		},
		game:{
			gameList:'/gome-manager-web/game/queryGameList'
		},
		checkLogin:function(){
			var _userId = '';
			$.ajax({
				url:'/gome-manager-web/user/checkLogin',
				type:'get',
				dataType:'json',
				async:false,
				success:function(data){
					if(data.code == 1){
						_userId = data.attach;
					}
				}
			});
			return _userId;
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
			if(n<10){
				return '0'+n;
			}else{
				return n.toString();
			}
		},
		loginDialog:function(_type){
			$.dialog({
		        content : '您还没有登录，请先登录后操作！',
		        title : 'alert',
		        ok : function() {
		        	// config.historyLink = window.location.href;
		            window.open('user-login.html?type='+_type,'_self');
		        },
		        cancel : function() {
		            // alert('我是取消按钮');
		        }
		    });
		},
		getUserInfo:function(_userId){
			var _userInfo = {};
			if(_userId){
				$.ajax({
					url:'/gome-manager-web/user/queryUserDetail',
					type:'get',
					async:false,
					data:{userId:_userId},
					dataType:'json',
					success:function(data){
						if(data.code == 1){
							_userInfo = data.attach;
						}
					}
				});
			}
			return _userInfo;
		}
	}
}else{
	var config = {
		home:{
			video:'/json/study_video.js'
		},
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
			comment:'/json/read_expert_supcount.js',
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
			feedback:'/json/user_register.js',
			signList:'/json/user_signlist.js',
			sign:'/json/user_register.js'
		},
		study:{
			video:'/json/study_video.js',
			videoDetail:'/json/study_videtail.js',
			guide:'/json/study_guide.js',
			downGuide:'/json/read_expert_supcount.js',
			videoSupCount:'/json/read_expert_supcount.js',
			videoIsSup:'/json/read_expert_supcount.js',
			videoSup:'/json/read_expert_supcount.js',
			comment:'/json/read_expert_supcount.js',
			commentList:'/json/read_expert_comment.js',
			addBeans:'/json/user_register.js'
		},
		game:{
			gameList:'/json/game_list.js'
		},
		checkLogin:function(){
			var _userId = '';
			$.ajax({
				url:'/json/user_beans_count.js',
				type:'get',
				dataType:'json',
				async:false,
				success:function(data){
					if(data.code == 1){
						_userId = data.attach;
					}
				}
			});
			return _userId;
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
			if(n<10){
				return '0'+n;
			}else{
				return n.toString();
			}
		},
		loginDialog:function(_type){
			$.dialog({
		        content : '您还没有登录，请先登录后操作！',
		        title : 'alert',
		        ok : function() {
		        	// config.historyLink = window.location.href;
		            window.open('user-login.html?type='+_type,'_self');
		        },
		        cancel : function() {
		            // alert('我是取消按钮');
		        }
		    });
		},
		getUserInfo:function(_userId){
			var _userInfo = {};
			if(_userId){
				$.ajax({
					url:'/json/user_login.js',
					type:'get',
					async:false,
					data:{userId:_userId},
					dataType:'json',
					success:function(data){
						if(data.code == 1){
							_userInfo = data.attach;
						}
					}
				});
			}
			return _userInfo;
		}
	}
}