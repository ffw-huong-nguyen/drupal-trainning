// (function (Drupal, drupalSettings, once) {
// Drupal.behaviors.myBehavior = {
//   attach: function (context, settings) {
//     once('myBehavior', 'html', context).forEach( function () {
//       myFunction();
//     })
//   }
// }
// });

(function ($, Drupal) {
  Drupal.behaviors.menuMobile = {
    attach: function (context, settings) {
      $(document).on('click', '.js-open-menu', function () {
        $('.header-main__menu').toggle();
        $('body').toggleClass('show-menu');
      });
    }
  }
} (jQuery, Drupal));

