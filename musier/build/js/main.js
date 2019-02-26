$(document).ready(function(){
    // Fixed Navbar
    fixedNavbar();
    // Carousel
    carousel();
    // Back to Top
    backToTop();
    showMobileMenu();
    // FilterImage
    filterImage();
    // AddClass for menu filter
    // veno box active
    $('.venobox').venobox();
    let portfoliofilterMenu = '.filtr-nav ul li';
    $(document).on('click', portfoliofilterMenu, function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });
    $(window).on('load', function () {
        setTimeout( () => {
            $('body').removeClass('loaded')
        },1500) 

    });
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
    const offset = 50;
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
};

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
};

filterImage = () => {
    const PortflioContainer = $('.filtr-container');
    if (PortflioContainer.length > 0) {
        PortflioContainer.imagesLoaded(function () {
            let latestWorkMasonry = PortflioContainer.isotope({
                itemSelector: '.grid-size',
                percentPosition: true,
                gutter: 0,
                masonry: {
                    columnWidth: 0
                }
            });
            $(document).on('click', '.filtr-nav ul li', function () {
                const filterValue = $(this).attr('data-filter');
                latestWorkMasonry.isotope({
                    filter: filterValue
                });
            });
        });
    }
};