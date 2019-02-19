$(document).ready(function(){
    // Fixed Navbar
    fixedNavbar();
    // Carousel
    carousel();
    // Back to Top
    backToTop();
    showMobileMenu();
   
});

carousel = () => {
    let $disc = $('.disc-carousel');
    let $gallery = $('.gallery-carousel');
    let $galleryNav = $('.gallery-carousel_nav')
    if ($disc) {
        $disc.slick({
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 1000,
            responsive: [                
                {
                    breakpoint: 991,
                    settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                    }
                },
                
            ]
        });
    };
    if ($gallery) {
        $gallery.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,  
            asNavFor: $galleryNav
        });
        $galleryNav.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor:  $gallery,
            dots: true,
            centerMode: true,
            focusOnSelect: true
        });
    }
};
fixedNavbar = () => {
    let $window = $(window);
    const offset = 100;
    $window.bind('scroll', () => {
        if ($window.scrollTop() > offset) {
            $('.main-header').addClass('sticky');
        } else {
            $('.main-header').removeClass('sticky');
        }
    });
};
backToTop = () => {
    $('.back-to-top').click( (e) =>  {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 3000);
    })
}

showMobileMenu = () => {
    let $navbarToggler = $('.navbar-toggler');
    let $navbarMenu = $('.navbar-collapse ');
    $navbarToggler.click(() => {
        if($navbarToggler.hasClass('collapsed')) {
            if($navbarToggler.attr('aria-expanded') === 'false'){
                $navbarToggler.attr('aria-expanded', 'true');
            }
            $navbarToggler.removeClass('collapsed').addClass('active');
            $navbarMenu.addClass('show');
        } else {
            $navbarToggler.attr('aria-expanded', 'false');
            $navbarToggler.removeClass('active').addClass('collapsed');
            $navbarMenu.removeClass('show');
        }
    })
}