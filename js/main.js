var loader;
(function() {
	if ($('#loader').length){
		loader = new SVGLoader( document.getElementById( 'loader' ), { speedIn : 500, easingIn : mina.easeinout } );
		loader.show();
	}
})();

$(document).ready(function(){
	
	$(".home-slider").owlCarousel({
		items:1,
		dots:true,
		responsiveRefreshRate:0,
		loop:true,
		autoplay:true,
		animateOut: 'fadeOut'
	});
	
	/*--- MOBILE MENU ---*/
	$('.btn-mobile-menu').bind('click', function(){
		$("body").addClass("menu-open");
		$("#mobile_nav_wrapper").scrollTop(0);
	});
	
	$('body').on('click', function(event){
		if($(event.target).is('body.menu-open') || $(event.target).is('.menu-close')) {
			$('body').removeClass('menu-open');
			event.preventDefault();
		}
	});
	
	$(".mobile-nav .has-children .toggle").click(function() {
		var sub_nav = $(this).closest("li").children(".sub-nav");
		if(sub_nav.is(':visible'))
		{
			$(this).closest("li").removeClass("open");
			sub_nav.slideUp(200);
		}
		else
		{
			$(".mobile-nav li").removeClass("open");
			$(this).closest("li").addClass("open");
			$(".sub-nav").slideUp(200);
			sub_nav.slideDown(200);
		}
				
		return false;
		
	});
	
	/*---------- MOBILE SEARCH ----------*/
	$('.btn-mobile-search').bind('click', function(){
		$("body").toggleClass("search-open");
		setTimeout(function() { 
			$('.search-box').focus();
		}, 100);
	});
	
	$('body').on('click', function(event){
		if($(event.target).is('body.search-open')) {
			$('body').removeClass('search-open');
			event.preventDefault();
		}
	});
	
	$(window).scroll(function(){
		$("body").removeClass("search-open");
	});
	
	/*---------- FEEDBACK ----------*/
	$(".btn-feedback").on("click", function(){
		$('body').toggleClass('feedback-open');
		setTimeout(function() { 
			$('#feedback_fullname').focus();
		}, 100);
	});
	
	$('body').on('click', function(event){
		if($(event.target).is('body.feedback-open') || $(event.target).is('.feedback-close')) {
			$('body').removeClass('feedback-open');
			event.preventDefault();
		}
	});
	
	/*---------- HOME TABS ----------*/
	$(".home-tabs-tbl .tabs-wrapper a").on("click", function(){
		var tabID = $(this).attr("href");
		$(".home-tabs-tbl .tabs-wrapper a").removeClass("active");
		$(this).addClass("active");
		$(".home-tabs-tbl .tab-content").removeClass("active");
		$(tabID).addClass("active");
		return false;
	});
	
	/*---------- ACCORDION ----------*/
	$(".accordion .title").bind('click', function(e){
		if(!$(this).parent("li").hasClass("content-visible")){
			$(".accordion li").removeClass("content-visible");
			$(".accordion .desc").slideUp(200);
		}
		$(this).next('.desc').slideToggle(200).end().parent('li').toggleClass('content-visible');
		e.preventDefault();
	});
	
	/*---------- LEADERSHIP ----------*/	
	$(".leadership-tab").on("click", function(){
		var tabID = $(this).attr("href");
		$(".leadership-tab").removeClass("active");
		$(this).addClass("active");
		$(".leadership-tab-container").removeClass("active");
		$(tabID).addClass("active");
		return false;
	});
	
	
	var sliderFinalWidth = 355,
		maxQuickWidth = 900;

	//open the quick view panel
	$('.cd-trigger').on('click', function(event){
		var selectedImage = $(this).children('img'),
			selectedmember = $(this).parent('.cd-item'),
			memberID = $(this).attr("id"),
			qvcontent = selectedmember.children('.quick-view-content').html(),
			qvwrapper = document.getElementById('cd-quick-view');
		
		$('body').addClass('overlay-layer');
		animateQuickView(selectedImage, sliderFinalWidth, maxQuickWidth, 'open');
		
		$('#cd-quick-view').children('.quick-view-content-wrapper').remove();
		$(qvwrapper).append(myData[memberID]);
		
		if($(window).width() > 1000){
			$(".cd-quick-view .desc").niceScroll({cursorcolor:"#000", cursorborder:"0px", autohidemode:false});
		}
		
		event.preventDefault();
		
	});
	
	//close the quick view panel
	$('body').on('click', function(event){
		if( $(event.target).is('.cd-close') || $(event.target).is('body.overlay-layer')) {
			closeQuickView( sliderFinalWidth, maxQuickWidth);
			event.preventDefault();
		}
	});
	
	$(document).keyup(function(event){
		//check if user has pressed 'Esc'
    	if(event.which=='27'){
			closeQuickView( sliderFinalWidth, maxQuickWidth);
		}
	});

	//center quick-view on window resize
	$(window).on('resize', function(){
		if($('.cd-quick-view').hasClass('is-visible')){
			window.requestAnimationFrame(resizeQuickView);
		}
	});

	function resizeQuickView() {
		var quickViewLeft = ($(window).width() - $('.cd-quick-view').width())/2,
			quickViewTop = ($(window).height() - $('.cd-quick-view').height())/2;
		$('.cd-quick-view').css({
		    "top": quickViewTop,
		    "left": quickViewLeft,
		});
	} 
	
	function closeQuickView(finalWidth, maxQuickWidth) {
		var close = $('.cd-close'),
			selectedImage = $('.empty-box').find('img');
		if( !$('.cd-quick-view').hasClass('velocity-animating') && $('.cd-quick-view').hasClass('add-content')) {
			animateQuickView(selectedImage, finalWidth, maxQuickWidth, 'close');
		} else {
			closeNoAnimation(selectedImage, finalWidth, maxQuickWidth);
		}
	}
	
	function animateQuickView(image, finalWidth, maxQuickWidth, animationType) {
		var parentListItem = image.closest('.cd-item'),
			topSelected = image.offset().top - $(window).scrollTop(),
			leftSelected = image.offset().left,
			widthSelected = image.width(),
			heightSelected = image.height(),
			windowWidth = $(window).width(),
			windowHeight = $(window).height(),
			finalLeft = (windowWidth - finalWidth)/2,
			finalHeight = finalWidth * heightSelected/widthSelected,
			finalTop = (windowHeight - finalHeight)/2,
			quickViewWidth = ( windowWidth * .8 < maxQuickWidth ) ? windowWidth * .8 : maxQuickWidth ,
			quickViewLeft = (windowWidth - quickViewWidth)/2;

		if( animationType == 'open') {
			//hide the image in the gallery
			parentListItem.addClass('empty-box');
			//place the quick view over the image gallery and give it the dimension of the gallery image
			$('.cd-quick-view').css({
			    "top": topSelected,
			    "left": leftSelected,
			    "width": widthSelected,
			});
			
			if($(window).width() > 1000){
				$('.cd-quick-view').velocity({
					//animate the quick view: animate its width and center it in the viewport
					//during this animation, only the slider image is visible
						'top': finalTop+ 'px',
						'left': finalLeft+'px',
						'width': finalWidth+'px',
				}, 1000, [ 400, 20 ], function(){
					//animate the quick view: animate its width to the final value
					$('.cd-quick-view').addClass('animate-width').velocity({
						'left': quickViewLeft+'px',
							'width': quickViewWidth+'px',
					}, 300, 'ease' ,function(){
						//show quick view content
						$('.cd-quick-view').addClass('add-content');
					});
				});
			}
			else{
				$('.cd-quick-view').velocity({
					//animate the quick view: animate its width and center it in the viewport
					//during this animation, only the slider image is visible
						'top': finalTop+ 'px',
						'left': finalLeft+'px',
						'width': finalWidth+'px',
				}, 0, [ 400, 20 ], function(){
					//animate the quick view: animate its width to the final value
					$('.cd-quick-view').addClass('animate-width').velocity({
						'left': quickViewLeft+'px',
							'width': quickViewWidth+'px',
					}, 300, 'ease' ,function(){
						//show quick view content
						$('.cd-quick-view').addClass('add-content');
					});
				});
			}
			
			$('.cd-quick-view').addClass('is-visible');
		} else {
			//close the quick view reverting the animation
			$('.cd-quick-view').removeClass('add-content').velocity({
			    'top': finalTop+ 'px',
			    'left': finalLeft+'px',
			    'width': finalWidth+'px',
			}, 300, 'ease', function(){
				$('body').removeClass('overlay-layer');
				$('.cd-quick-view').removeClass('animate-width').velocity({
					"top": topSelected,
				    "left": leftSelected,
				    "width": widthSelected,
				}, 500, 'ease', function(){
					$('.cd-quick-view').removeClass('is-visible');
					parentListItem.removeClass('empty-box');
				});
			});
		}
	}
	
	function closeNoAnimation(image, finalWidth, maxQuickWidth) {
		var parentListItem = image.closest('.cd-item'),
			topSelected = image.offset().top - $(window).scrollTop(),
			leftSelected = image.offset().left,
			widthSelected = image.width();

		//close the quick view reverting the animation
		$('body').removeClass('overlay-layer');
		parentListItem.removeClass('empty-box');
		$('.cd-quick-view').velocity("stop").removeClass('add-content animate-width is-visible').css({
			"top": topSelected,
		    "left": leftSelected,
		    "width": widthSelected,
		});
	}
	
	/*---------- EQUAL HEIGHT ----------*/
	$('.events li, .brands .block, .contacts .desc, .blog-posts li').matchHeight();
	
	if ($('.dd').length){
		$('.dd').selectric();
	}
	
	if($(".contactors .tbl-wrapper").length){	
		var tbltarget = $(".contactors .tbl-wrapper").offset().top - 150;
		var interval = setInterval(function() {
				if ($(window).scrollTop() >= tbltarget) {
						$(".contactors .tbl-wrapper").addClass('helper');
						setTimeout( function() {
							$(".contactors .tbl-wrapper").removeClass('helper');
						}, 3000 );	

						clearInterval(interval);
				}
		}, 250);
	
	}
	
	if($(".tabs-menu-wrapper").length){	
		var el = $('.tabs-menu-wrapper .active');
		var elOffset = el.offset().left;
		var elWidth = el.width();
		var tabsWidth = $('.tabs-menu-wrapper').width();
		var offset;

		if (elWidth < tabsWidth) {
			offset = elOffset - ((tabsWidth / 2) - (elWidth / 2));
		}
		else {
			offset = elOffset;
		}
		var speed = 700;
		$('.tabs-menu-wrapper').animate({scrollLeft:offset}, speed);
		
	}

	
});

/*---------- GALLERY ----------*/
(function(){(function(l){var r=function(m){for(var b=m.childNodes,a=b.length,e=[],c,d,f=0;f<a;f++)m=b[f],1===m.nodeType&&(c=m.children,d=m.getAttribute("data-size").split("x"),d={src:m.getAttribute("href"),w:parseInt(d[0],10),h:parseInt(d[1],10),author:m.getAttribute("data-author")},d.el=m,0<c.length&&(d.msrc=c[0].getAttribute("src"),1<c.length&&(d.title=c[1].innerHTML)),d.o={src:d.src,w:d.w,h:d.h},e.push(d));return e},t=function b(a,e){return a&&(e(a)?a:b(a.parentNode,e))},k=function(b){b=b||window.event;
b.preventDefault?b.preventDefault():b.returnValue=!1;if(b=t(b.target||b.srcElement,function(a){return"A"===a.tagName})){for(var a=b.parentNode,e=b.parentNode.childNodes,c=e.length,d=0,f,h=0;h<c;h++)if(1===e[h].nodeType){if(e[h]===b){f=d;break}d++}0<=f&&q(f,a);return!1}},q=function(b,a,e,c){var d=document.querySelectorAll(".pswp")[0],f,h;h=r(a);a={galleryUID:a.getAttribute("data-pswp-uid"),getThumbBoundsFn:function(a){var b=window.pageYOffset||document.documentElement.scrollTop;a=h[a].el.children[0].getBoundingClientRect();
return{x:a.left,y:a.top+b,w:a.width}},addCaptionHTMLFn:function(a,b,c){if(!a.title)return b.children[0].innerText="",!1;b.children[0].innerHTML=a.title;return!0}};if(c)if(a.galleryPIDs)for(c=0;c<h.length;c++){if(h[c].pid==b){a.index=c;break}}else a.index=parseInt(b,10)-1;else a.index=parseInt(b,10);if(!isNaN(a.index)){b=document.getElementsByName("gallery-style");c=0;for(var l=b.length;c<l;c++)if(b[c].checked){"radio-all-controls"!=b[c].id&&"radio-minimal-black"==b[c].id&&(a.mainClass="pswp--minimal--dark",
a.barsSize={top:0,bottom:0},a.captionEl=!1,a.fullscreenEl=!1,a.shareEl=!1,a.bgOpacity=.85,a.tapToClose=!0,a.tapToToggleControls=!1);break}e&&(a.showAnimationDuration=0);f=new PhotoSwipe(d,PhotoSwipeUI_Default,h,a);var k,g=!1,p=!0,n;f.listen("beforeResize",function(){var a=window.devicePixelRatio?window.devicePixelRatio:1,a=Math.min(a,2.5);k=f.viewportSize.x*a;1200<=k||!f.likelyTouchDevice&&800<k||1200<screen.width?g||(n=g=!0):g&&(g=!1,n=!0);n&&!p&&f.invalidateCurrItems();p&&(p=!1);n=!1});f.listen("gettingData",
function(a,b){g&&(b.src=b.o.src,b.w=b.o.w,b.h=b.o.h)});f.init()}};l=document.querySelectorAll(l);for(var g=0,u=l.length;g<u;g++)l[g].setAttribute("data-pswp-uid",g+1),l[g].onclick=k;k=function(){var b=window.location.hash.substring(1),a={};if(5>b.length)return a;for(var b=b.split("&"),e=0;e<b.length;e++)if(b[e]){var c=b[e].split("=");2>c.length||(a[c[0]]=c[1])}a.gid&&(a.gid=parseInt(a.gid,10));return a}();k.pid&&k.gid&&q(k.pid,l[k.gid-1],!0,!0)})(".gallery")})();


$(window).load(function() {
	$("#preloader-bg").fadeOut(1000);
	$(".load").fadeOut(1000);
	setTimeout( function() {
		if ($('#loader').length){		
			loader.hide();
		}
	}, 700 );	
});
