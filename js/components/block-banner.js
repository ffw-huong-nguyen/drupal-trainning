(function ($, Drupal, once) {
  Drupal.behaviors.myBlockBanner = {
    attach: function (context, settings) {

      once('blockBannerBehavior', '.js-block-banner__slider', context).forEach(function (element) {

        $(element).slick({
          dots: false,
          infinite: true,
          speed: 1000,
          fade: true,
          adaptiveHeight: true,
          autoplay: true,
          autoplaySpeed: 3000
        })
      });
    }
  };
})(jQuery, Drupal, once);
