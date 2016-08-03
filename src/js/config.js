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
			expertSup:'/gome-manager-web/review/addSupport'
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
			exprtDetail:'/json/read_expert_detail.js',
			expertSupCount:'/json/read_expert_supcount.js',
			expertIsSup:'/json/read_expert_supcount.js',
			expertSup:'/json/read_expert_supcount.js'
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