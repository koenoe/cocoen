/* eslint no-param-reassign: 0, func-names: 0 */
(($, Cocoen) => {
  if (!$ || !Cocoen) {
    return;
  }
  $.fn.cocoen = function (options) {
    function init() {
      return new Cocoen(this, $.extend({}, Cocoen.defaults, options));
    }
    return this.each(init);
  };
})(window.jQuery, window.Cocoen);
