/* eslint-disable security/detect-object-injection */
/* eslint-disable security/detect-non-literal-regexp */
(function listFilter($) {
  Drupal.behaviors.showItemFilter = {
    attach(context, settings) {
      const $jsListFilterLabelBtn = $('.js-list-filter__label-btn', context);
      const $jsTermTreeBtn = $('.js-term-tree__btn', context);
      const $listFilterToogleMobile = $('.list-filter__toggle-mobile', context);
      const showFilterFlag = 'show-filter';
      const showChildFlag = 'show-child';
      const showListFilterFlag = 'show-list-filter';
      const $jsDataTermId = $('[data-term-id]');
      const $listFilter = $('.list-filter', context);
      const $checkboxListFilter = $('input:checkbox', $listFilter);
      const $jsKeywordNoFilter = $('.js-keyword-no-filter');
      const $jsTrackListClose = $('.filter-result-item__close-icon');
      const $triggerKeywordWrapper = $('.js-trigger-keyword-wrapper', context);
      const $triggerKeywordButton = $('button', $triggerKeywordWrapper);

      $jsListFilterLabelBtn.each((i, e) => {
        this.showItemFilter(e, showFilterFlag, settings);
      });

      $jsTermTreeBtn.each((i, e) => {
        this.showTermTreeChild(e, showChildFlag, settings);
      });

      $listFilterToogleMobile.each((i, e) => {
        this.showListFilter(e, showListFilterFlag);
      });

      $jsDataTermId.on('click', (e) => {
        this.toogleByTermId(e);
      });

      // Keep taxonomy tree filter opened after ajax call.
      this.filtersBehavior(settings, showChildFlag);

      // Keep expose group opened after ajax call.
      this.exposeBehavior(settings, showFilterFlag);

      // Keep header filters shown after ajax call.
      this.termFiltersBehavior($checkboxListFilter);

      $checkboxListFilter.on('change', (e) => {
        this.checkboxChange(e);
      });

      $jsKeywordNoFilter.on('change', (e) => {
        if ($(e.target).val()) {
          this.keywordChange(e);
        }
      });

      $jsTrackListClose.on('click', (e) => {
        this.trackListCloseClick(e);
      });

      $triggerKeywordButton.on('click', (e) => {
        this.keywordChange(e);
      });
    },
    showItemFilter(el, filterFlag, settings) {
      const $this = $(el);
      const $parent = $this.closest('.list-filter__item');
      const $child = $parent.find('> .list-filter__content');
      window.fsi.boxCollapsible($this, $child, $parent, filterFlag);

      // Change Drupal settings "fsi_filters_expose" when click.
      if (!settings) return;
      const id = $this.closest('.form-item').attr('data-id');
      $this.on('click', () => {
        const settingsClone = settings;
        if (typeof settingsClone.fsi_filters_expose[id] !== 'undefined') {
          delete settingsClone.fsi_filters_expose[id];
        } else {
          settingsClone.fsi_filters_expose[id] = true;
        }
      });
    },
    showTermTreeChild(el, filterFlag, settings) {
      const $this = $(el);
      const $parent = $this.parent();
      const $child = $parent.find('> .term-tree');
      window.fsi.boxCollapsible($this, $child, $parent, filterFlag);

      // Change Drupal settings "fsi_filters" when click.
      if (!settings) return;
      const id = $this.siblings('.form-item').find('input').val();
      $this.on('click', () => {
        const settingsClone = settings;

        if (typeof settingsClone.fsi_filters[id] !== 'undefined') {
          delete settingsClone.fsi_filters[id];
        } else {
          settingsClone.fsi_filters[id] = true;
        }
      });
    },
    showListFilter(el, filterFlag) {
      const $this = $(el);
      const $parent = $this.parent();
      const $child = $parent.find('.list-filter__form');
      window.fsi.boxCollapsible($this, $child, $parent, filterFlag);
    },
    toogleByTermId(e) {
      e.preventDefault();
      const id = $(e.target).attr('data-term-id');
      if (id) {
        const input = $(`[value=${id}]`);
        input.prop('checked', !input.prop('checked'));
        input.trigger('change');
      }
    },
    filtersBehavior(settings, filterFlag) {
      if (!settings) return;
      const settingsClone = settings;

      if (settingsClone.fsi_filters === undefined) {
        settingsClone.fsi_filters = {};
      } else {
        Object.keys(settingsClone.fsi_filters).forEach((key) => {
          const selector = $(`input[value=${key}]`);
          selector.closest('li').addClass(filterFlag);
          selector.closest('.form-item').siblings('ul').show();
        });
      }
    },
    exposeBehavior(settings, filterFlag) {
      if (!settings) return;
      const settingsClone = settings;

      if (settingsClone.fsi_filters_expose === undefined) {
        settingsClone.fsi_filters_expose = {};
      } else {
        Object.keys(settingsClone.fsi_filters_expose).forEach((key) => {
          $(`[data-id="${key}"]`).removeClass(filterFlag);
          $(`[data-id="${key}"]`).find('.list-filter__content').hide();
        });
      }
    },
    termFiltersBehavior(el) {
      if ($(el).filter(':checked').length) {
        $(el).each((i, e) => {
          if ($(e).is(':checked')) {
            const filterId = $(e).attr('value');
            const filterType = $(e)
              .closest('.list-filter__item')
              .attr('filter-type');
            if (filterType) {
              $(`[data-trigger="${filterType}-${filterId}"]`).show();
            } else {
              $(`[data-trigger="${filterId}"]`).show();
            }
          }
        });
      }
    },
    checkboxChange(e) {
      if ($(e.target).is(':checked')) {
        $(e.target)
          .parents('ul')
          .siblings('.form-item')
          .find('input[type=checkbox]')
          .attr('checked', false);
      }
    },
    keywordChange(e) {
      const $this = $(e.target);
      let name = $this.val();
      if (!name) {
        name = $.trim($this.text());
      }
      let value = `"${name}"`;

      // Remove special characters.
      value = value.replaceAll('(', '').replaceAll(')', '');

      // Empty this current input value.
      $this.val('');

      // Get the current input value from hidden field.
      const $hiddenFilter = $this
        .closest('.filter-wrapper')
        .find('form')
        .find('.js-keyword');
      const oldValue = $hiddenFilter.val();

      // Process new value.
      let newValue = '';
      if (oldValue.indexOf(name) !== -1) {
        const nameWithQuotes = `"${name}"`;
        const nameWithQuotesNcoma = `, "${name}"`;
        newValue = oldValue.replace(new RegExp(nameWithQuotesNcoma, 'g'), '');
        newValue = newValue.replace(new RegExp(nameWithQuotes, 'g'), '');
      } else if (oldValue) {
        newValue = `${oldValue}, ${value}`;
      } else {
        newValue = value;
      }
      // Apply the new value to the hidden filter input field.
      $hiddenFilter.val(newValue).trigger('change');
    },
    trackListCloseClick(e) {
      const $this = $(e.target);
      const id = $this.closest('.filter-result-item').attr('data-trigger');
      const idExploded = id.split('-');
      let $input = '';

      if (idExploded.length > 1) {
        const filterType = idExploded[0];
        const filterId = idExploded[1];
        $input = $(`[filter-type="${filterType}"] [value="${filterId}"]`);
      } else {
        $input = $(`[value=${id}]`);
      }

      if ($input.length !== 0) {
        $input.prop('checked', !$input.prop('checked'));
        $input.trigger('change');
      } else {
        const name = $this.parent().find('span').text();
        const nameWithQuotes = `"${name}"`;
        const nameWithQuotesNcoma = `, "${name}"`;
        const $hiddenFilter = $this.closest('.view').find('.js-keyword');
        const hiddenFilterValue = $hiddenFilter.val();
        let newValue = hiddenFilterValue.replace(
          new RegExp(nameWithQuotesNcoma, 'g'),
          '',
        );
        newValue = newValue.replace(new RegExp(nameWithQuotes, 'g'), '');
        $hiddenFilter.val(newValue);
        $hiddenFilter.trigger('change');
      }
    },
  };
})(jQuery);
