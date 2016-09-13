var game = {
	init:function(){
		var _t = this;
		_t.config = config.game;
		_t.channel = $('.game-wrap').attr('data-channel');
		
		switch(_t.channel){
			case 'index': _t.index_fn(); break;
			case 'list': _t.list_fn(); break;
			default:
			  return false;
		}
	},
	index_fn:function(){
		var _t = this;
		$('.game-index-interaction .game-index-ico').on('click',function(){
			$.dialog({
                content : '敬请期待！',
				title:'alert',
                time : 2000
   			});
		});
		
	},
	list_fn:function(){
		var _t = this;
		$.ajax({
			type: 'get',
		  	url: _t.config.gameList,
		  	dataType: 'json',
		  	success: function(data){
		  		if(data.code == 1){
		  			var _html = '';
		  			if(data.attach.length>0){
		  				$(data.attach).each(function(_index,_element){
		  					_html += '<li class="clearfix"><a href="' + _element.httpUrl;
		  					_html += '"><div class="game-list-ico"><img src="' + _element.picPath;
		  					_html += '"></div><div class="game-list-right"><p class="ellipsis game-list-title">' + _element.gname;
		  					_html += '</p><p class="game-list-desp">' + _element.gdescribe;
		  					_html += '</p></div></a></li>';
		  				});
		  			}else{
		  				_html += '暂无数据';
		  			}
		  			$('.game-list').html(_html);
		  			
		  		}else{
		  			$.dialog({
	                    content : data.attach,
						title:'alert',
	                    time : 2000
	       			});
		  		}
		  	}
		});
	}
};
game.init();