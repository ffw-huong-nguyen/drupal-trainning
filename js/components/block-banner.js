(function ($) {
  $(document).ready(function ($) {
    $('.js-banner-slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 2000,
      autoplay: false,
      arrows: true,
      dots: false,
      prevArrow: '<button class="slick-prev slick-arrow icon-chevron-thin-left" aria-label="Previous" type="button">Previous</button>',
      nextArrow: '<button class="slick-next slick-arrow icon-chevron-thin-right" aria-label="Next" type="button">Next</button>'
    });
  });
})(jQuery);