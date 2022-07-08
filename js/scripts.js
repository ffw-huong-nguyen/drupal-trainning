// (function (Drupal, drupalSettings, once) {
//   Drupal.behaviors.myBehavior = {
//     attach: function (context, settings) {
//       once('myBehavior', 'html', context).forEach( function () {
//         myFunction();
//       })
//     }
//   }
// } (Drupal, drupalSettings, once));

(function ($) {
  $(document).ready(function ($) {
    $(document).on('click', '.js-open-menu', function () {
      $('.header-main__menu').toggle();
      $('body').addClass('show-menu');
    });
  });
})(jQuery);
