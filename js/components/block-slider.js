(function ($, Drupal, once) {
  Drupal.behaviors.myBlockSlider = {
    attach: function (context, settings) {
      once('blockSliderBehavior', '.js-block-slider', context).forEach(function (element) {

        var $parent =  $(element);
        var id = $parent.attr('id');

        $('.block-slider__quotes', $parent).slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true,
          speed: 800,
          autoplay: false,
          arrows: false,
          fade: true,
          asNavFor: `#${id} .block-slider__logos`
        });
  
        $('.block-slider__logos', $parent).slick({
          slidesToShow: 9,
          slidesToScroll: 1,
          speed: 1000,
          autoplay: false,
          arrows: false,
          dots: false,
          focusOnSelect: true,
          asNavFor: `#${id} .block-slider__quotes`,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                dots: true,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
                dots: true,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                dots: true,
              }
            }
          ]
        });

      });
    }
  };
})(jQuery, Drupal, once);