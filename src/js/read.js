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
			  	url: _t.config.,
			  	data: {meetId:_meetId},
			  	dataType: 'json',
			  	timeout: 300,
			  	success: function(data){
			    	if(data.code=='1'){
			    		$('.meet-sign-bg img').attr('src',data.attach.picPath);
			    		$('.meet-wel-bg img').attr('src',data.attach.letterPic);
			    		$('.meet-sche-sloganbig').text(data.attach.name);
						$('.meet-sche-slogansmall').text('——'+data.attach.theme);
						$('.meet-sche-station b').text(data.attach.meetAddr+' > 会议议程');
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