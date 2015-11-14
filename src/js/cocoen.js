;(function ( $, window, document, undefined ) {

	'use strict';

	var pluginName = 'cocoen',
		defaults = {};

	function Plugin( element, options ) {
		this.options = $.extend( {}, defaults, options);

		this.$element = $(element);
		this.$beforeImg = this.$element.find('.cocoen__before img');

		this.init();
	}

	Plugin.prototype = {

		init: function() {
			this.$beforeImg.css('width', this.$element.width());
		},

	};

	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
				new Plugin( this, options ));
			}
		});
	};

})( jQuery, window, document );