var home={
	init:function(){
		var _t = this;
		_t.config = config.home;
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
			_t.userhash = 'userId='+ _t.userId +'&';
		}else{
			$('.home-user-wrap a').attr('href','user-login.html?type=2');
		}
		_t.userhash = _t.userhash?_t.userhash:'';
		$.ajax({
			url:_t.config.video,
			type:'get',
			data:{vType:1},
			dataType:'json',
			async:false,
			success:function(data){
				if(data.code == 1){
					var _html = '';
					if(data.attach.length>0){
						$(data.attach).each(function(_index,_element){
							_html += '<li class="swiper-slide"><a href="study-video-detail.html?'+_t.userhash+'vedioId=' +_element.id;
							_html += '"><p class="home-slide-pic"><img src="' + _element.picPath;
							_html += '"></p><p class="home-slide-title"><span class="ellipsis">' + _element.title;
							_html += '</span></p><p class="home-slide-ico"><span></span></p></a></li>';
						});
						$('.home-slide-list').append(_html);
				
					}
				}
			},
			error:function(){}
		});
	    var swiper = new Swiper('.home-slide-wrap', {
	        pagination: '.home-slide-page',
	        // nextButton: '.swiper-button-next',
	        // prevButton: '.swiper-button-prev',
	        paginationClickable: false,
	        // spaceBetween: 30,
	        centeredSlides: true,
	        autoplay: 3000,
	        autoplayDisableOnInteraction: false
	    });
    
	}
}
home.init();