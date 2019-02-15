$(document).ready(function() {
  // Sticky Navbar
  stickyNavbar();

  // Count Down
  const deadline = Date.parse('Jan 16, 2021');
  initializeClock('clockcountdown', deadline);

  // Accordion Tabs
  const $tab = $('[data-tab]');
  $tab.each(function () {
    accordionTab($tab);
  });

  // Carousel
  carousel();
  carouselNum();
  $('.slick-initialized').on('afterChange', carouselNum);

  // Fill Form
  filledLabels();

  // Menu Toggle
  let $navToggle = $('.nav-toggle');
  menuToggle($navToggle);

    // Resize
  $(window).on('load resize', () => {
    let windowSize = $(window).width();
    if (windowSize > 992) {    
      $('.main-menu').removeClass('active');
      $navToggle.removeClass('active');
    }
  });
});

// CountDown
getTimeRemaining = (endtime) => {
    let t = endtime - new Date().getTime();
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
};
initializeClock = (id, endtime) => {
  let clock = document.getElementById(id);
  let daysSpan = clock.querySelector('.days');
  let hoursSpan = clock.querySelector('.hours');
  let minutesSpan = clock.querySelector('.minutes');
  let secondsSpan = clock.querySelector('.seconds');
  updateClock = () => {
      let t = getTimeRemaining(endtime);
  
      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
  updateClock();
  let timeinterval = setInterval(updateClock, 1000);
};

// Accordion Tabs
accordionTab = (el) => {
  let flag;  
  el.find('[data-link]').click( () => {
    let that = $(this);
    if (!that.hasClass('active')) {
      that.siblings().removeClass('active');
      that.addClass('active');      
    }
    let index = that.index();
    dataContent = el.find('[data-tab-content]');
    dataContent.removeClass('is-active');
    dataContent.eq(flag).hide();
    let tab = dataContent.eq(index);
    tab.fadeIn(500, () => flag = index);
  });
};

// StickyNavbar
stickyNavbar = () => {
  const offset = 100;
  $(window).bind('scroll', () => {
    if ($(window).scrollTop() > offset) {
        $('.main-header').addClass('sticky');
    } else {
        $('.main-header').removeClass('sticky');
    }
  });
};

//Slider
carousel = () => {
  let $gallery = $('.slick-gallery');
  if ($gallery) {
    $gallery.slick({
      centerMode: false,
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            arrows: false
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
          }
        }
      ]
    });
  }
  let $wish = $('.slick-wish');
  if ($wish) {
    $wish.slick({
        dots: true,
				arrows: false
    })
  }
  let $gift = $('.slick-gift');
  if ($gift) {
    $gift.slick({
      dots: true,
      arrows: false,
      slidesToShow: 5,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    })
  }
}

carouselNum = () => {
  let $slides = $('.slick-gallery .slick-slide').not('.slick-cloned');
  let $currentSlide = $('.slick-slide.slick-current').attr('data-slick-index');
  $('.slick-gallery_number__current').text(+$currentSlide + 1);
  $('.slick-gallery_number__all').text($slides.length);
}

filledLabels = () => {
  const inputFields = $('.control-label').next();
  inputFields.each(() => {
    let singleInput = $(this);
    singleInput.on('focus blur', (event) => {
      checkVal(singleInput);
    });
  });
}
checkVal = (el) => {
  if (el.val() === '') {
    if (event.type === "focus") {
      el.prev('.control-label').addClass('filled')
    } else if (event.type === "blur") {
      el.prev('.control-label').removeClass('filled')
    }
  }
}

menuToggle = (el) => {
  el.on('click', () => {
    el.toggleClass('active');
    showMobileMenu();
  })
}
showMobileMenu = () => {
  if (!$('.main-menu').hasClass('active')) {
    $('.main-menu').addClass('active');
  } else {
    $('.main-menu').removeClass('active');
  }
}
  