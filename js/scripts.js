(function (Drupal, drupalSettings, once) {
  // Drupal.behaviors.myBehavior = {
  //   attach: function (context, settings) {
  //     once('myBehavior', 'html', context).forEach( function () {
  //       myFunction();
  //     })
  //   }
  // }

(function ($) {
  $(document).ready(function ($) {
    $(document).on('click', '.js-open-menu', function () {
      $('.header-main__menu').toggle();
      $('body').addClass('show-menu');
      });
    });

    $('.js-banner-slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 2000,
      autoplay: true,
      arrows: true,
      dots: true,
      prevArrow: '<span class="slick-arrow left icon-chevron-down" aria-label="Previous" type="span"></span>',
      nextArrow: '<span class="slick-arrow right icon-chevron-down" aria-label="Next" type="span"></span>'
    });
  });

})(jQuery);
