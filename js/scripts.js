// (function (Drupal, drupalSettings, once) {
// Drupal.behaviors.myBehavior = {
//   attach: function (context, settings) {
//     once('myBehavior', 'html', context).forEach( function () {
//       myFunction();
//     })
//   }
// }

(function ($) {
  $(document).ready(function ($) {
    var $window = $(window);

    // menu on mobile
    $(document).on('click', '.js-open-menu', function () {
      $('.header-main__menu').toggle();
      $('body').toggleClass('show-menu');
    });

    // hero banner
    $('.js-banner-slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 2000,
      autoplay: false,
      arrows: true,
      dots: false,
      prevArrow: '<span class="slick-arrow left icon-chevron-thin-left" aria-label="Previous" type="span"></span>',
      nextArrow: '<span class="slick-arrow right icon-chevron-thin-right" aria-label="Next" type="span"></span>'
    });

    function multiSlider() {
      var windowsize = $window.width();
      // slider on mobile
      if (windowsize < 1024) {
        $('.slider-quotes .js-slider').slick({
          infinite: true,
          adaptiveHeight: true,
          speed: 800,
          autoplay: false,
          arrows: false,
          swipe: false,
          fade: true,
          asNavFor: '.slider-logos .js-slider'
        });

        $('.slider-logos .js-slider').slick({
          infinite: true,
          slidesToShow: 9,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '0',
          speed: 1000,
          autoplay: false,
          arrows: false,
          dots: true,
          asNavFor: '.slider-quotes .js-slider',
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2
              }
            }
          ]
        });
      };

      // tab on desktop
      if (windowsize >= 1024) {
        $('.slider-quotes__list').removeClass('js-slider');
      }

      // Show the first tab by default
      $('.slider-quotes__item:not(:first-child)').hide();
      $('.slider-logos__item:first').addClass('tab-active');

      // Click logos make change text
      $('.slider-logos__item').on('click', function (event) {
        event.preventDefault();
        $('.slider-logos__item').removeClass('tab-active');
        $(this).addClass('tab-active');
        $('.slider-quotes__item').hide();
        $($(this).attr('id')).show();
      });
    }

    multiSlider();
    $(window).resize(multiSlider);

  });
})(jQuery);
