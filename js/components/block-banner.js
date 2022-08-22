(function ($) {
  jQuery(document).ready(function() {
    jQuery('.js-block-banner__slider').slick({
      dots: false,
      infinite: true,
      speed: 1000,
      fade: true,
      adaptiveHeight: true,
      autoplay: true,
      autoplaySpeed: 3000,
      prevArrow: '<button class="slick-prev slick-arrow icon-chevron-thin-left" aria-label="Previous" type="button">Previous</button>',
      nextArrow: '<button class="slick-next slick-arrow icon-chevron-thin-right" aria-label="Next" type="button">Next</button>'
    });
  });
})(jQuery);