$(document).ready(function(){
    // Fixed Navbar
    fixedNavbar();
    // Carousel
    carousel();
});

carousel = () => {
    let $disc = $('.disc-carousel');
    if ($disc) {
        $disc.slick({
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            speed: 500
        })
    }
}
fixedNavbar = () => {
    const offset = 100;
    let $window = $(window);
    $window.bind('scroll', () => {
        if ($window.scrollTop() > offset) {
            $('.main-header').addClass('sticky');
        } else {
            $('.main-header').removeClass('sticky');
        }
    });
}