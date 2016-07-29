var read = {
	init:function(){
		var _t = this;
		_t.config = config.read;
		_t.getHrefParam = config.getHrefParam;
		_t.channel = $('.read-wrap').attr('data-channel');

		switch(_t.channel){
			case 'cover': _t.cover_fn(); break;
			case 'list': _t.list_fn(); break;
			case 'detail': _t.detail_fn();break;
			case 'expert': _t.expert_fn(); break;
			case 'expdetail': _t.expdetail_fn(); break;
			default:
			  return false;
		}
	},
	cover_fn:function(){
		var _t = this;
	},
	list_fn:function(){
		var _t = this;
		var _catid = _t.getHrefParam('catid');
		_catid = _catid?_catid:'';
		if(_catid){
			$.ajax({
				type: 'get',
			  	url: _t.config.articleList,
			  	data: {catid:_catid},
			  	dataType: 'json',
			  	success: function(data){
			    	if(data.code=='1'){
			    		var _html = '';
						if(data.attach.length > 0){
							$(data.attach).each(function(_index,_element){
								_html += '<li><a href="read-detail._html?id=' + _element.id;
								_html += '" class="clearfix"><div class="read-list-num">' + (_index+1);
								_html += '</div><div class="read-list-title">' +_element.title;
								_html += '<span class="ion-ios-arrow-right"></span></div></a></li>';
							});
							$('.read-list-content').html(_html);
						}
			    	}else{
				    }
			  	},
			  	error: function(){
			  	}
			});
		}
	},
	detail_fn:function(){
		var _t = this;
	},
	expert_fn:function(){
		var _t = this;
	},
	expdetail_fn:function(){
		var _t = this;
	}
};
read.init();