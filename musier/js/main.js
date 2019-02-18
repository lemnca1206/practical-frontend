$(document).ready(function(){
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