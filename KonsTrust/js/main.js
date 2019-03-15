$(document).ready(() => {
    console.log('Welcome to New Website Main JS');
    // Carousel
    carousel();
    // Filter Image
    filterImage();
    // Mobile Toggler
    mobileToggle();
    // Scroll Down
    scrollDown();
    // Accordion
    // Accordion
    const $accordion = $('[data-accwrap]');
    $accordion.each(function () {
        openAccordion($(this));
    });
});
carousel = () => {
    const $slider = $('.slider-container');
    const $heroBanner = $('.hero-banner');
    const $branchSlider = $('.slider-branch');
    const $salesSlider = $('.slider-sales');
    if ($slider) {
        $slider.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            arrows: true,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ] 
        });
    }
    if ($salesSlider) {
        $salesSlider.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ] 
        });
    }
    if ($heroBanner) {
        $heroBanner.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            arrows: true
        });
    }
    if ($branchSlider) {
        $branchSlider.slick({
            slidesToShow: 5,
            slidesToScroll: 3,
            infinite: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                        dots: true,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                    }
                }
            ]    
        })
    }
}
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
    };
    const portfoliofilterMenu = '.filtr-nav ul li';
    $(document).on('click', portfoliofilterMenu, function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });
};
mobileToggle = () => {
    const $navToggler = $('.navbar-toggler');
    const $navOverlay = $('.navbar-overlay')
    const $window = $(window);
    if ($navToggler) {
        $navToggler.on('click', () => {
            if (!$navToggler.hasClass('active')) {
                $navToggler.addClass('active');
                $navOverlay.addClass('active');
            } else {
                $navToggler.removeClass('active');
                $navOverlay.removeClass('active');
            }
        })        
    }
    $window.on('resize', () => {
        if ($navToggler.hasClass('active')) {
            $navToggler.removeClass('active');
        }
        if ($navOverlay.hasClass('active')) {
            $navOverlay.removeClass('active');
        }
    })
}
scrollDown = () => {
    $(".btn-scrollDown").click(function() {
		const section = $(this).closest("section").next().offset().top;
		$("html, body").animate({scrollTop: section}, 1000);
	});
}
openAccordion = (el) => {    
    let flag;
    el.find('[data-acc]').click(function () {
        let that = $(this);
        let $acc = that.next();
        if ($acc.is(':hidden')) {
        el.find('[data-acctext = "' + flag + '"]').slideUp();
        $acc.slideDown(function () {
            flag = that.data('acc');
        });
        } else {
        $acc.slideUp();
        }
    })
}