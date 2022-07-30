(function ($) {
  $(document).ready(function ($) {
    var $window = $(window);

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
