/*----------------------------------------------

Smooth scroll

----------------------------------------------*/
jQuery(function(){
var headerHight = jQuery('#header').innerHeight();
   jQuery('.pagetop a').click(function() {
      var speed = 400;
      var href= jQuery(this).attr("href");
      var target = jQuery(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top - headerHight;
      jQuery('body,html').animate({scrollTop:position}, speed, 'swing');
      return false;
   });

   jQuery('a.scroll').click(function() {
      var speed = 400;
      var href= jQuery(this).attr("href");
      var target = jQuery(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top - headerHight;
      jQuery('body,html').animate({scrollTop:position}, speed, 'swing');
      return false;
   });
   
});

/*----------------------------------------------

globalNav

----------------------------------------------*/
jQuery(function(){
  jQuery(".btn-menu").click(function () {
    jQuery('.nav-hdr-wrap,.nav-hdr').toggleClass('is-open');
    jQuery(this).toggleClass('close');
  });
  jQuery('.nav-hdr-wrap').click(function () {
    jQuery('.nav-hdr-wrap,.nav-hdr').removeClass('is-open');
    jQuery('.btn-menu').removeClass('close');
  });
});

jQuery(function() {
  jQuery('.nav-hdr a').on('click', function(e){
    e.preventDefault(); 
    url = jQuery(this).attr('href');
    if (url !== '') {
      jQuery('.nav-hdr-wrap,.nav-hdr').removeClass('is-open');
      jQuery('.btn-menu').removeClass('close');
      setTimeout(function(){
        window.location = url;
      }, 300);
    }
    return false;
  });
});

/*----------------------------------------------

Scroll-in

----------------------------------------------*/
jQuery(function(){
  function animation(){
    jQuery('.fadein,.entry-body img').each(function(){
      var target = jQuery(this).offset().top;
      var scroll = jQuery(window).scrollTop();
      var windowHeight = jQuery(window).height();
      if (scroll > target - windowHeight){
        jQuery(this).css('opacity','1');
        jQuery(this).css('transform','translateY(0)');
      }
    });
  }
  animation();
  jQuery(window).scroll(function (){
    animation();
  });
});


// footerで消えるcontact-hdr
jQuery(function() {
  jQuery(window).on("scroll", function() {
    scrollHeight = jQuery(document).height();
    scrollPosition = jQuery(window).height() + jQuery(window).scrollTop();
    footHeight = jQuery("footer").innerHeight();
    footerTop = jQuery("footer").offset().top;
    distance = 0;
 
    if ( scrollHeight - scrollPosition  <= footHeight ) {
      jQuery(".contact-hdr").addClass('hidden');
    } else {
      jQuery(".contact-hdr").removeClass('hidden');
    }

  });
 
});


// footerで消えるlogo-hdr
jQuery(function(){
  var scrollStart = jQuery('.logo-hdr').offset().top;
  var scrollEnd = jQuery('footer').offset().top;
  var distance = 0;
 
  jQuery(document).scroll(function(){
    distance = jQuery(this).scrollTop();
    if (scrollEnd <= distance) {
      jQuery('.logo-hdr').addClass('hidden');
    } else{
      jQuery('.logo-hdr').removeClass('hidden');
    }
  });      
});


// mainvisualを超えたらheader表示
jQuery(function(){
  if (jQuery('.top-info-area').get(0) === undefined){
    return;
  }
  var position = jQuery('.top-info-area').offset().top;
  var distance = 0;
 
  jQuery(document).scroll(function(){
    distance = jQuery(this).scrollTop();
    if (position <= distance) {
      jQuery('#header.toppage').addClass('show');
    } else{
      jQuery('#header.toppage').removeClass('show');
    }
  });      
});


jQuery(window).on("load", function(){
  jQuery('.cover').delay(300).fadeOut(1000);
});


// parallax main-img-area
jQuery(window).on('scroll', function(){
  var scrollTop = jQuery(window).scrollTop();
  var bgPosition = scrollTop / 5;

  if(bgPosition){
    jQuery('.main-img-area').css('background-position', 'center calc(50% + '+ bgPosition + 'px)');
  }
});


// side-list
jQuery(document).on('click', function(e) {
  if(!jQuery(e.target).closest('.side-list ul').length && !jQuery(e.target).closest('.btn-open-list').length){
    jQuery('.side-list ul').slideUp('fast');
  }else if(jQuery(e.target).closest('.btn-open-list').length){
    if(jQuery('.side-list ul').is(':hidden')){
      jQuery('.side-list ul').slideDown('fast');
    }else{
      jQuery('.side-list ul').slideUp('fast');
    }
  }
});


