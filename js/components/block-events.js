(function ($, Drupal, once) {
  Drupal.behaviors.showItemFilter = {
    attach: function (context, settings) {
      const showChildFlag = 'show-child';

      $(".js-block-events__show-body", context).once().on('click', function() {
        $(this).parent().toggleClass("show-body");
      });

      $(".js-exposed-filter__toggle", context).once().on('click', function() {
        $(this).closest('.exposed-filter__item').toggleClass("close-filter");
      });

      $('.js-exposed-filter__keywords__close', context).once().on('click', function() {
        $(this).parent().hide();
        let value = $(this).data("id");
        $(`[value=${value}]`).prop('checked', false);
        $(`[value=${value}]`).trigger('change');

        if (value === 'keyword') {
          var keyword = $(this).closest('.block-events__group').find('form .exposed-filter__content input');
          var keywordValue = keyword.val();
          var keywordArr = keywordValue.split(', ');
          var text = $(this).parent().text();
          let newKeywordArr = keywordArr.filter(v => v.trim() !== text.trim());
          var newKeyword = newKeywordArr.join(", ");
          keyword.val(newKeyword).trigger('change');
        }
      });

      function filtersBehavior(settings, huong) {
        if (!settings) return;
        const settingsClone = settings;

        if (settingsClone.demo_filters === undefined) {
          settingsClone.demo_filters = {};
        } else {
          Object.keys(settingsClone.demo_filters).forEach((key) => {
            const selector = $(`input[value=${key}]`);
            selector.closest('li').addClass(huong);
            selector.closest('.form-item').siblings('ul').show();
          });
        }
      }

      once('blockEvents', '.js-exposed-filter__level', context).forEach(function (element) {
        $(element).on('click', function() {
          $(this).parent().toggleClass(showChildFlag);

          const id = $(this).siblings('.form-item').find('input').val();

          if (typeof settings.demo_filters[id] !== 'undefined') {
            delete settings.demo_filters[id];
          } else {
            settings.demo_filters[id] = true;
          }
        });
      });

      filtersBehavior(settings, showChildFlag);
    }
  };
})(jQuery, Drupal, once);
