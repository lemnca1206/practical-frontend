var loaded = false;
var loading = false;
var scrolling = false;
var aniEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
var step1 = false,
    step2 = false,
    setp3 = false,
    step4 = false;
var timeOut = 0;
var login = false;
var answers = {
    'q1a': '',
    'q1b': '',
    'q2' : '',
    'q3' : '',
    'q4' : ''
};

function detectmob() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}

var devices = detectmob();

function GetIEVersion() {
  var sAgent = window.navigator.userAgent;
  var Idx = sAgent.indexOf("MSIE");

  // If IE, return version number.
  if (Idx > 0) 
    return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

  // If IE 11 then look for Updated user agent string.
  else if (!!navigator.userAgent.match(/Trident\/7\./)) 
    return 11;

  else
    return 0; //It is not IE
}

var mise = GetIEVersion();


function onMove(){
 
    var objects = $('.ani-scroll, .label-scroll, .article-inner > *');

	   $(objects).each(function() {
		if($(this).isInViewport()){
			$(this).addClass("ani");
		}else{
			$(this).removeClass("ani");
		}
		
	});
	
}

function getUV(value, result){
     
    $('.uv-result .uv-number').html(value);
    $('.uv-result .result').html(result);
    
    $('.uv-result').animate({'opacity': 1}, 350, 'linear', function() {
        $('.uv-result').css({'min-height':'auto'});
        
    });
    
    loading = false;
    
}

function getDistrict(id){

    var district = city_district[id].districts,
        district_html = '<li data-value="">Quận / Huyện</li>';

    $.each(district, function (key, value) {
        district_html += '<li data-value="' + value + '">' + value + '</li>';
    });

    $('.list-district').html(district_html);
    loading = false;
    
}

function getAgency(district, city, type){

    $.ajax({
        type: "POST",
        data: {
            district: district,
            city: city,
            type: type
        },
        url: '/distributions/filter'
    }).done(function(response){
        if( response.success) {
            distributions = response.data;
            var html = '';
            for (var i = 0; i < distributions.length; i++) {
                html += '<div class="agency" agen-id="'+distributions[i].id+'">' +
                    '<h3>'+distributions[i].name+'</h3>' +
                    '<p>'+distributions[i].address+', '+distributions[i].city+', '+distributions[i].district+'</p>' +
                    '<span class="time">'+distributions[i].open_time+'</span>' +
                    '</div>';
            }
            $('.list-agency').html(html);

            initMap();
        } else {

        }
    });

    loading = false;

}

function getLocation() {
    if (navigator.geolocation) {
        loading = true;
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    console.log('show');
    $.ajax({
        type: "POST",
        data: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        },
        url: '/distributions/search-near-by'
    }).done(function(response){
        if( response.success) {
            distributions = response.data;
            var html = '';
            for (var i = 0; i < distributions.length; i++) {
                html += '<div class="agency" agen-id="'+distributions[i].id+'">' +
                    '<h3>'+distributions[i].name+'</h3>' +
                    '<p>'+distributions[i].address+', '+distributions[i].city+', '+distributions[i].district+'</p>' +
                    '<span class="time">'+distributions[i].open_time+'</span>' +
                    '</div>';
            }
            $('.list-agency').html(html);

            initMap();
        } else {

        }
    });

    loading = false;

}

function Slider(){
    
    
    //Article slider
    if($('.article-slider').length) {

        $('.article-slider').olwSlider({
            itemsCustom : [
                [0, 1],
                [840, 2]
            ],
            slideSpeed: 1000,
            paginationSpeed: 1000,
            navigation:true,
            rewindNav: true
        });
    }
    
    
    //Product slider
    if($('.pics-slider').length) {

        $('.pics-slider').olwSlider({
            singleItem : true,
            slideSpeed:1000,
            navigation: true
        });
        
    }
    
    //Anessa album
    if($('.anessa-slider').length) {

        $('.anessa-slider').olwSlider({
            itemsCustom : [
                [0, 1],
                [600, 2],
                [840, 3],
                [1045, 4],
                
            ],
            slideSpeed: 1000, 
            paginationSpeed: 1000,
            navigation:true,
            rewindNav: true
        });
    }
    
}

function stepValidate(step){
   
   
    var flag1 = $('.content-box.active .step-check').find('li.active').length;
    var flag2 = $('.content-box.active .step-radio').find('li.active').length;
    
    if(flag1 || flag2){
        $('.step-number li[data-target= "' + step + '"]').next().removeClass('disabled');
        $('.content-box.active .btn-help-me').removeClass('disabled');
    }else if(!flag1 && !flag1){
        //content-box không cần kiểm tra [1,6] tức là không disable button
    }else{
        $('.step-number li[data-target= "' + step + '"]').next().addClass('disabled');
        $('.content-box.active .btn-help-me').addClass('disabled');
    }
   
}


function stopTimeOut() {

    timeOut = setTimeout(";");
    for (var i = 0; i < timeOut; i++) {
        clearTimeout(i);
    }
}

function Events(){
    
    /*--- COMMON EVENT ---*/
    //Menu button
    $('.nav-but').on('click', function(){
        stopTimeOut();
        if ($(this).hasClass('active')) {
            $('html,body').removeClass('no-scroll');
            $('.nav-overlay, .nav-but, .navigation, .logo, .footer, .to-top').removeClass('active');
            
        }else{
            $('html,body').addClass('no-scroll');
            $('.nav-overlay, .nav-but, .navigation, .logo, .to-top').addClass('active');
            timeOut = setTimeout(function(){$('.footer').addClass('active');},610);
           
        }

    });
    
    //To top
    $('.to-top').on("click" ,function() {
        $('html, body').stop().animate({scrollTop: 0}, 'slow');
    });
    
    
    
    /*--- HOME ---*/
    //Events: select
    $('.uv-box .select-title').on('click', function(){

        if(!$('.uv-box .select-title').hasClass('active')){
            $(this).addClass('active'); 
            $('.uv-box .select-data').fadeIn(100);
        }else{
            $('.uv-box .select-title').removeClass('active'); 
            $('.uv-box .select-data').fadeOut(100, 'linear');
        }

    });

    $('.uv-box .select-data li').on("click", function(e) {
        e.preventDefault();        
        $('.uv-box .select-data li').removeClass('current');
        $('.uv-box .select-title').html($(this).html());
        $(this).addClass('current');
        $('.uv-box .select-data').fadeOut(100);
        $('.uv-box .select-title').removeClass('active');
        
        var value = $(this).attr('data-value'),
            result_text = $(this).attr('data-result');
        
        //CODE GET DATA FROM API HERE
        //.....................
        if(!loading){
            loading = true;
            var url = 'uv-data.html';
            $('.uv-box .uv-result').css({'min-height': $('.uv-box .uv-result').innerHeight()});

             $('.uv-box .uv-result').animate({'opacity': 0}, 350, 'linear', function() {
                   getUV(value, result_text);
             });
           
        }
        //CODE GET DATA FROM API HERE
        
        
        return false;

    });
    
    //Decor button
    $('.btn-decor').on("click" ,function() {

        var top = $('.decor').offset().top - 60;
        $('html, body').stop().animate({scrollTop: top}, 'slow');

    });
    
    
    /*--- PRODUCT LIST ---*/
    //Sub menu
    $('.sub-menu li a').on('click', function(e){
        e.preventDefault();
        var target = $(this).attr('data-target');
        if(target && target =='all'){
            $('.sub-menu li').removeClass('active');
            $(this).parent().addClass('active');
            
            $('.product-list').animate({'opacity': 0}, 100, 'linear', function() {
                 $('.content-box').removeClass('hide');
                 $('.col-left,.col-right').removeClass('ani');
             });
             setTimeout(function(){
                $('.product-list').animate({'opacity': 1}, 100, 'linear', function() {
                    onMove();
                });

             },120);
            
            
        }else if(target){
            $('.sub-menu li').removeClass('active');
            $(this).parent().addClass('active');
            $('.product-list').animate({'opacity': 0}, 100, 'linear', function() {
                 $('.content-box').addClass('hide');
                 $('.col-left,.col-right').removeClass('ani');
                 $(".content-box[data-show='" + target + "']").removeClass('hide');
            });
            setTimeout(function(){
                $('.product-list').animate({'opacity': 1}, 100, 'linear', function() {
                    onMove();
                });
                
                
            },120);
            
        }else{
            window.location = $(this).attr('href');
        }
        
        
        return false;
    
    });
    
    
    /*--- PRODUCT DETAIL ---*/
    //Change unit
    $('.unit li').on('click',function(){
        $('.unit li').removeClass('active');
        $(this).addClass('active');
        var code = $(this).attr('data-gcode');

        $('.price').html($(this).attr('data-price') + '<sup>đ</sup>');

        $('.dis-list ul li').hide();
        $('.dis-list ul li.' + code).show();

        var url = $('#base-url').val() + '/' + code;

        if (window.history.pushState) {
            window.history.pushState({}, 'Products - Anessa', url);
        }

        $('.pics-slider').find('.slide-wrapper').css('transform', 'translate3d(0px, 0px, 0px)');
        $('.pics-slider').find('img').first().attr('src', $(this).attr('data-image')).hide();
        $('.pics-slider').find('img').first().fadeIn('slow');

    });
    
    //Order button
    $('.btn-order').on('click', function(){
        if($(this).hasClass('show')){
            $(this).removeClass('show');
            
            $('.dis-list').fadeOut(300, 'linear', function(){
                $('.find-more').show();
            });
            
        }else{
            $(this).addClass('show');
            $('.find-more').hide();
            $('.dis-list').fadeIn(300, 'linear', function(){});
            
        }
    });
    
    //Explan list
    $('.explan-title').on('click', function(){

        var $that = $(this);
        var $parent = $that.parent();

        if($parent.hasClass('show')) {
            $parent.removeClass('show');
            $parent.find('.explan-detail').fadeOut('fast');

        }else {

            var $itemOut = $('.explan-item.show .explan-detail');
            $('.explan-item.show').removeClass('show');
            $parent.addClass('show');

            if($itemOut.length){

                $itemOut.fadeOut('fast', function() {
                    $parent.find('.explan-detail').fadeIn('fast', function(){});
                });

            }else{
                $parent.find('.explan-detail').fadeIn('fast', function(){});

            }

        }
        
    });
    
    
    /*--- HELP ME CHOSE ---*/
    $('.btn-help-me').on('click', function(e){
        e.preventDefault();
        
        if($(this).hasClass('disabled')){
            return false;
        }
        
        var number = $('.content-box').length;
        $('.content-box').css({width: $(window).width()});
        $('.helpme-scroll').css({'width': $(window).width() * number});
        
        $('.step-number li').removeClass('active');
        var target = $(this).attr('data-target');
        
        if(target == 'step-05' && isLoginRequired){
           $('.popup').addClass('active');
            return false;

        } else if (target == 'step-05' && !isLoginRequired) {
            $('.popup').removeClass('active');

            $.ajax({
                type: "POST",
                data: {
                    answers: answers
                },
                url: '/helps/get-result'
            }).done(function(response){
                if( response.success) {
                    var product = response.data;
                    $('#help-title').html(product.title);
                    $('#help-description').html(product.description);
                    $('#help-link').attr('href', product.link);
                    $('#help-image').attr('src', product.image);
                } else {
                    isLoginRequired = true;
                }
            });

        }

        if(target == 'go') {
            window.location.href = $(this).attr('href');
        }
        
        $('.content-box').removeClass('active');
        $('.content-box[data-type= "' + target + '"]').addClass('active');
        $('.step-number li[data-target= "' + target + '"]').addClass('active');

        var pLeft = $('.helpme-scroll').offset().left;
        var iLeft =  $('.content-box.active').offset().left;
        $('.helpme-scroll').css({'height':$('.content-box.active').innerHeight()});
        stepValidate(target);

        $('html, body').scrollTop(0);
        $('.helpme-scroll').animate({'left': pLeft - iLeft}, 800, 'easeInOutExpo', function() {});
        
        
        return false;
    
    });
    $('.helpme-scroll').on('click', '.step-number li', function(e){
        e.preventDefault();
        
        if($(this).hasClass('disabled')){
           return false;
        }
        
        var number = $('.content-box').length;
       
        $('.content-box').css({width: $(window).width()});
        $('.helpme-scroll').css({'width': $(window).width() * number});
        
        $('.step-number li').removeClass('active');
        var target = $(this).attr('data-target');
         
        if(target == 'step-05' && isLoginRequired){
           $('.popup').addClass('active');
           return false;
        }
        
        $('.step-number li[data-target= "' + target + '"]').addClass('active');
        $('.content-box').removeClass('active');
        $('.content-box[data-type= "' + target + '"]').addClass('active');

        stepValidate(target);
        
        var pLeft = $('.helpme-scroll').offset().left;
        var iLeft =  $('.content-box.active').offset().left;
        $('.helpme-scroll').css({'height':$('.content-box.active').innerHeight()});

        $('html, body').scrollTop(0);
       $('.helpme-scroll').animate({'left': pLeft - iLeft}, 800, 'easeInOutExpo', function() {});
        
        
        return false;
    
    });
    
    //$('.step-number li:nth-child(5)').trigger('click');
    
    $('.step-check li').on('click', function(){
        $('.step-check li').removeClass('active');
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            answers[$(this).parent().attr('data-value')] = $(this).attr('data-value');
         }
        var target = $('.content-box.active').attr('data-type');
        stepValidate(target);
        
    });
    
    $('.step-radio li').on('click', function(){
        
        if(!$(this).hasClass('active')){
            $(this).parent().find('li').removeClass('active');
            $(this).addClass('active');
            answers[$(this).parent().attr('data-value')] = $(this).attr('data-value');
        }
        var target = $('.content-box.active').attr('data-type');
        stepValidate(target);
        
    });
    
    
    
    $('.popup-box').on('click', function(e){
         e.stopPropagation();
    });
    
    $('.register-but').on('click', function(){
        // Login with facebook
        FB.login(function(response) {
            if (response.authResponse) {
                $.ajax({
                    type: "POST",
                    url: '/helps/login-with-facebook'
                }).done(function(response){
                    if( response.success) {
                        isLoginRequired = false;
                        $('.popup').removeClass('active');
                    } else {
                        isLoginRequired = true;
                    }
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
        return false;
    });
    
    $('.close-but, .popup').on('click', function(){
         $('.popup').removeClass('active');
    });
    
    
    /*--- DISTRIBUTION ---*/

    var city = '';
    $.each(city_district, function (key, value) {
        var current = key==5 ? 'class="current"' : '';
        city += '<li '+ current +' data-value="' + value.name + '" data-id="' + key + '">' + value.name + '</li>';
    });
    $('.box-location .list-city').html(city);

    var district = city_district[5].districts,
        district_html = '';

    $.each(district, function (key, value) {
        district_html += '<li data-value="' + value + '">' + value + '</li>';
    });

    $('.list-district').html(district_html);

    $('.box-location .select-title').on('click', function(e){
        e.stopPropagation();
        if($(this).hasClass('active')){
           $(this).removeClass('active');
           $(this).next().fadeOut(100);
        }else{
            $('.select-title.active').next().fadeOut(0, function(){
                $('.select-title.active').removeClass('active');
            });

            $(this).addClass('active');
            $(this).next().fadeIn(100);
        }

    });
    $('.box-location').on("click", '.select-data li', function(e) {
        e.preventDefault();

        var $parrent = $(this).parent();
        var id = $(this).attr('data-id');
        var type = $('.shop li.current').attr('data-id');


        $parrent.find('li').removeClass('current');
        $(this).parent().parent().parent().find('.select-title h3').text($(this).text());
        $(this).addClass('current');
        $(this).parent().parent().fadeOut(100);
        $('.select-title').removeClass('active');

        //load district
        if(id && $parrent.hasClass('list-city')){
            var city = $(this).attr('data-value');
            if(!loading){
               loading = true;
               getDistrict(id);
               getAgency('', city, type);
            }
            
        } else if ($parrent.hasClass('list-district')) {
            var city = $('.city li.current').attr('data-value');
            var district = $(this).attr('data-value');
            getAgency(district, city, type);

        } else if (id && $parrent.hasClass('list-shop')) {
            var city = $('.city li.current').attr('data-value');
            var district = $('.district li.current').attr('data-value');
            getAgency(district, city, id);
        }
        
        return false;

    });

    $('.agency-system').on('click', '.agency', function(e){
        e.preventDefault();
        e.stopPropagation();
        var agenId = $(this).attr('agen-id');
        var marker = null;
        //find maker to triger
        for(var i = 0; i < markers.length; i++){
            if(markers[i].id == agenId){
                marker = markers[i];
                byClick = true;
                break;
            }
        }

        google.maps.event.trigger(marker, 'click');
        return false;

    });

    $('.agency-system').on('click', '.shop-near', function (e) {
        e.preventDefault();
        e.stopPropagation();
        getLocation();
    });
    
    
    /*--- SOLUTION ---*/
    $('.side-item').on('click', function(){
        clearTimeout();
        var target = $(this).attr('data-index');
        var top =  $(".on-scroll[data-target='" + target + "']").offset().top - 70;
        var del = $(window).width() > 1024 ? 70 : 80;
        
        $('.uv-side').removeClass('active');

        timeOut = setTimeout(function(){
            $('html, body').stop().animate({scrollTop:top}, 1000);
        },350);
        
    });
    
    $('.uv-sub').on('click', function(){
        
        if($(this).hasClass('active')){
           $('.uv-sub, .uv-side').removeClass('active');
        }else{
            $('.uv-sub, .uv-side').addClass('active');
        }
        
    });
    
    $(document).on('click', function(e){
        if(!$(e.target).hasClass('select-title') && !$(e.target).parent().hasClass('select-title') && 
        !$(e.target).parent().hasClass('select-input')){
            $('.select-title.active').next().fadeOut(0, function(){ $('.select-title.active').removeClass('active'); });
        }
    });
    
    //Lọc danh sách tỉnh thành
    $('.city input').on('keyup', function(e) {
        e.stopPropagation();
        
        if(e.keyCode == 13){
            if($('.city li.current').length){
                var id = $('.city li.current').attr('data-id');
                var city = $('.city li.current').attr('data-value');
                var type = $('.shop li.current').attr('data-id');
                $('.city .select-title h3').text($('.city li.current').text());
                $('.city .select-data').fadeOut();
                $('.city .select-title').removeClass('active');
                //Get danh sách quận huyện theo tỉnh
                if(id){
                    if(!loading){
                        loading = true;
                        getDistrict(id);
                        getAgency('', city, type)
                    }
                }
            }

        }else if(e.keyCode == 38){
            e.preventDefault();
            $('.city input').focusTextToEnd();
            var $prev = $('.city li.current').prevAll('.city li').not('.hide').first();
            if($prev.length){
                $('.city li').removeClass('current');
                $prev.addClass('current');
                var liTop = $('.list-city').scrollTop();
                $('.list-city').scrollTop(liTop - 37);
            }
            return false;

        }else if(e.keyCode == 40){
            e.preventDefault();
            var $next = $('.city li.current').nextAll('.city li').not('.hide').first();
            if($next.length){
                $('.city li').removeClass('current');
                $next.addClass('current');
                var liTop = $('.list-city').scrollTop();
                $('.list-city').scrollTop(liTop + 37);
            }
            return false;

        }else{
            $('.city li').removeClass('current');
            var txt_search = $(this).val().toLowerCase();
            txt_search =  remove_unicode(txt_search);
            if(txt_search != ''){
                $('.city li').each(function(index, element) {
                    var txt_li =  $(element).text().toLowerCase();
                    txt_li = remove_unicode(txt_li);
                    if(txt_li.indexOf(txt_search) > -1) {
                        $(element).removeClass('hide');
                        $('.city li:not(.hide)').first().addClass('current');
                    }else{
                        $(element).addClass('hide');
                    }
                });

            }else{
                $('.city li').removeClass('hide');
                $('.city li').removeClass('current');
                $('.city li:first').addClass('current');
                $('.city-list').scrollTop(0);
            }

        }

    });

    //Lọc danh sách quận huyện
    $('.district input').on('keyup', function(e) {
        if(e.keyCode == 13){
            var district = $('.district li.current').attr('data-value');
            var city = $('.city li.current').attr('data-value');
            var type = $('.shop li.current').attr('data-id');
            
            if($('.district li.current').length){
                $('.district .select-title h3').text($('.district li.current').text());
                $('.district .select-data').fadeOut(100, 'linear');
                $('.district .select-title').removeClass('active');
            }
            //Get danh sách cửa hàng
            if(district){
                if(!loading){
                   loading = true;
                   getAgency(district, city, type);
                }
            }
            
        }else if(e.keyCode == 38){
            e.preventDefault();
            $('.district input').focusTextToEnd();
            var $prev = $('.district li.current').prevAll('.district li').not('.hide').first();
            if($prev.length){
                $('.district li').removeClass('current');
                $prev.addClass('current');
                var liTop = $('.list-district').scrollTop();
                $('.list-district').scrollTop(liTop - 37);
            }
            return false;
        }else if(e.keyCode == 40){
            e.preventDefault();
            var $next = $('.district li.current').nextAll('.district li').not('.hide').first();
            if($next.length){
                $('.district li').removeClass('current');
                $next.addClass('current');
                var liTop = $('.list-district').scrollTop();
                $('.list-district').scrollTop(liTop + 37);
            }
            return false;
        }else{
            $('.district li').removeClass('current');
            var txt_search = $(this).val().toLowerCase();
            txt_search =  remove_unicode(txt_search);
            if(txt_search != ''){
                $('.district li').each(function(index, element) {
                    var txt_li =  $(element).text().toLowerCase();
                    txt_li = remove_unicode(txt_li);

                    if(txt_li.indexOf(txt_search) > -1) {
                        $(element).removeClass('hide');
                        $('.district li:not(.hide)').first().addClass('current');
                    }else{
                        $(element).addClass('hide');
                    }

                });

            }else{
                $('.district li').removeClass('hide');
                $('.district li').removeClass('current');
                $('.district li:first').addClass('current');
                $('.list-district').scrollTop(0);
            }

        }

    });

    //Lọc danh sách loại cửa hàng
    $('.shop input').on('keyup', function(e) {
        if(e.keyCode == 13){
            var id = $('.shop li.current').attr('data-id');
            
            if($('.shop li.current').length){
                $('.shop .select-title h3').text($('.shop li.current').text());
                $('.shop .select-data').fadeOut(100, 'linear');
                $('.shop .select-title').removeClass('active');
            }
            //Get danh sách cửa hàng
            if(id){
                if(!loading){
                   loading = true;
                    var city = $('.city li.current').attr('data-value');
                    var district = $('.district li.current').attr('data-value');
                    getAgency(district, city, id);
                }
            }
            
        }else if(e.keyCode == 38){
            e.preventDefault();
            $('.shop input').focusTextToEnd();
            var $prev = $('.shop li.current').prevAll('.shop li').not('.hide').first();
            if($prev.length){
                $('.shop li').removeClass('current');
                $prev.addClass('current');
                var liTop = $('.list-shop').scrollTop();
                $('.list-shop').scrollTop(liTop - 37);
            }
            return false;
        }else if(e.keyCode == 40){
            e.preventDefault();
            var $next = $('.shop li.current').nextAll('.shop li').not('.hide').first();
            if($next.length){
                $('.shop li').removeClass('current');
                $next.addClass('current');
                var liTop = $('.list-shop').scrollTop();
                $('.list-shop').scrollTop(liTop + 37);
            }
            return false;
        }else{
            $('.shop li').removeClass('current');
            var txt_search = $(this).val().toLowerCase();
            txt_search =  remove_unicode(txt_search);
            if(txt_search != ''){
                $('.shop li').each(function(index, element) {
                    var txt_li =  $(element).text().toLowerCase();
                    txt_li = remove_unicode(txt_li);

                    if(txt_li.indexOf(txt_search) > -1) {
                        $(element).removeClass('hide');
                        $('.shop li:not(.hide)').first().addClass('current');
                    }else{
                        $(element).addClass('hide');
                    }

                });

            }else{
                $('.shop li').removeClass('hide');
                $('.shop li').removeClass('current');
                $('.shop li:first').addClass('current');
                $('.list-shop').scrollTop(0);
            }

        }

    });
    
    $('.zoom-map').on('click', function(e) {
        if($('.container').hasClass('full-size')){
            $('.container, .header, .footer').removeClass('full-size');
        }else{
            $('.container, .header, .footer').addClass('full-size');
        }
    });
    
    ///distribution*/
    function agencyMap() {
            var Center = new google.maps.LatLng(10.7344282, 106.6182881);

            var mapOptions = {
                center: Center,
                zoom: 10,
                scrollwheel: false,
                draggable:true,
                draggingCursor: 'move',
                noclear: true,
                disableDoubleClickZoom:true,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style'],
                    position: google.maps.ControlPosition.TOP_RIGHT
                }
            };

            google.maps.event.addDomListener(window, "resize", function() {
                google.maps.event.trigger(map, "resize")
                map.setCenter(Center);
                map.setZoom(10);
            });

            var map = new google.maps.Map(document.getElementById("agency-map"),mapOptions);
            var logo = '../pictures/mang-luoi/office-marker.png';

            var locations = [
                {
                    lat: 10.826050, 
                    lng:106.522175
                },{
                    lat: 10.924132, 
                    lng: 106.719149
                },{
                    lat: 10.629970, 
                    lng: 106.629256
                }
              ]


             for (var i = 0; i < locations.length; ++i) {
                markers[i] = new google.maps.Marker({
                  position: {
                    lat: locations[i].lat,
                    lng: locations[i].lng
                  },
                  icon: logo,
                  map: map,
                  animation: google.maps.Animation.DROP

                });
            }

            var isTop = true;
            $('.agency .map-view').mouseover(function(){
                $('body').addClass('no-wheel');
                isTop = true;
                $('.no-wheel').bind("mousewheel", function() {
                    if(isTop && $(window).width() > 1024) {
                            return false;
                    }
                });

            }).mouseout(function(){
                    $('body').removeClass('no-wheel');
                    isTop = false;
            });

            $('.agency .map-view').mousewheel(function(e, delta) {
                        if($(window).width() > 1024){
                            var zoom = map.getZoom();
                            if(delta > 0){
                                map.setZoom(++zoom);
                            }else{
                                map.setZoom(--zoom);
                            }
                        }

            });


        }
    
    
}

function Resize(){
    
    if($('.helpme-scroll').length){
        var number = $('.content-box').length;
        $('.content-box').css({width: $(window).width()});
        $('.helpme-scroll').css({'width': $(window).width() * number});
        
        var pLeft = $('.helpme-scroll').offset().left;
        var iLeft =  $('.content-box.active').offset().left;
        $('.helpme-scroll').css({'height':$('.content-box.active').innerHeight()});
        $('.helpme-scroll').animate({'left': pLeft - iLeft}, 800, 'easeInOutExpo', function() {});
        onMove();
        
    }
    
}


$(document).ready(function () {

    Slider();
  
    if(mise > 0){
        $('body').impulse({effect: 'easeOutQuad'});
        $('body').addClass('isIE');
    }
    
   
    if($('.helpme-scroll').length){
        var number = $('.content-box').length;
        $('.content-box').css({width: $(window).width()});
        $('.helpme-scroll').css({'width': $(window).width() * number, 'height':$('.content-box.active').innerHeight()});
        
    }
    
    //LOADING
    function start(){
        
        $('.header, .container, .footer').css({'opacity':1});
        $('.bg-full').addClass('ani');
        if($('.helpme-scroll').length){
            var number = $('.content-box').length;
            $('.content-box').css({width: $(window).width()});
            $('.helpme-scroll').css({'width': $(window).width() * number, 'height':$('.content-box.active').innerHeight()});
        }
        
        setTimeout(function(){
            onMove();
        },0);
        
    }
    
    $('body').imagesLoaded().done(function(instance) {
        
        $('.overlay').fadeOut(500, function() {
            $('html,body').scrollTop(0);
            loaded = true;
            scrolling = true;
            start();
            
        });
        
        
    });

    setTimeout(function(){
         if(!loaded){
          
            loaded = true;
            $('.overlay').fadeOut(500, function() {
                 $('html,body').scrollTop(0);
                 scrolling = true;
                 start();
             });
          }
        
    },3000);
        
   
    Events();
    
    //SET ANIMATION BY SCROLL
    $(document).bind('scroll', function() {
        
        var scrTop = $(document).scrollTop();
        var FH = $(window).width() > 1024 ? 110 : 80;
        
        
        window.requestAnimationFrame(function () {
            
            if(scrolling){
                if(scrTop >= 110){
                    $('.header, .sub-menu, .bg, .btn-decor, .uv-side').addClass('hide');

                }else {
                    $('.header, .sub-menu, .bg, .btn-decor, .uv-side').removeClass('hide');
                }

                if(scrTop >= $(window).height()/2) {
                    $('.to-top').addClass('show');
                }else {
                    $('.to-top').removeClass('show');
                }

                
                if($('.uv-sub').length){

                    $('.on-scroll').each(function(index, element) {
                        var tx = $(this).offset().top - 110;
                        var bx = tx + $(this).outerHeight();

                        if (scrTop >= tx && scrTop <= bx) {

                                $('.uv-sub li').removeClass('active');

                                $('.on-scroll').removeClass("active");
                                $(this).addClass("active");
                                var target = $('.on-scroll.active').last().attr('data-target');

                                if(target){
                                    $('.uv-sub li').removeClass('current');
                                    $('.uv-sub li[data-index="' + target + '"]').addClass('active');
                                   
                                }

                        }

                    });
                }

							

                onMove();
            
            }
            
       });

    });
    
});


$(window).resize(function() {});

$(window).on('resize', function() {
   
	if(!devices){
        Resize();
	}
		
},150);
$(window).on("orientationchange",function(){
	setTimeout(function(){
        Resize();
    },150);
  
});
window.onorientationchange = Resize;

window.fbAsyncInit = function() {
    FB.init({
        appId: '213780229094280',
        cookie: true, // This is important, it's not enabled by default
        version: 'v2.8'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

