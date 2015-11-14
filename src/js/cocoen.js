;(function ( $, window, document, undefined ) {

	'use strict';

	var pluginName = 'cocoen',
		defaults = {
			dragElementSelector: '.cocoen__drag'
		};

	function Plugin( element, options ) {
		this.options = $.extend( {}, defaults, options);
		this.$element = $(element);
		this.init();
	}

	Plugin.prototype = {

		init: function() {
			this.$before = this.$element.find('div:first-child');
			this.$beforeImg = this.$before.find('img');
			this.$dragElement = this.$element.find(this.options.dragElementSelector);

			this.dragWidth = this.$dragElement.outerWidth();
			this.containerWidth = this.$element.outerWidth();
			this.containerOffset = this.$element.offset().left;
			this.minLeftPos = this.containerOffset + 10;
			this.maxLeftPos = this.containerOffset + this.containerWidth - this.dragWidth - 10;
			this.dragging = false;

			this.setDimensions();
			this.addEventListeners();
		},
		addEventListeners: function(){
			this.$element.on('mousedown touchstart', this.options.dragElementSelector, this.onDragStart.bind(this));
			this.$element.on('mouseup touchend touchcancel', this.options.dragElementSelector, this.onDragEnd.bind(this));
			this.$element.on('mousemove touchmove', this.onDrag.bind(this));
			$(window).on('resize', this.setDimensions.bind(this));
		},
		onDragStart: function(e){
			e.preventDefault();

			var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

			this.posX = this.$dragElement.offset().left + this.dragWidth - startX;
			this.dragging = true;
		},
		onDragEnd: function(e){
			e.preventDefault();

			this.dragging = false;
		},
		onDrag: function(e){
			e.preventDefault();

			if(!this.dragging) return;

			var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;
			var leftPos = moveX + this.posX - this.dragWidth;

			if(leftPos < this.minLeftPos) {
				leftPos = this.minLeftPos;
			} else if(leftPos > this.maxLeftPos) {
				leftPos = this.maxLeftPos;
			}

			var width = (leftPos + (this.dragWidth / 2) - this.containerOffset) * 100 / this.containerWidth + '%';

			this.$dragElement.css('left', width);
			this.$before.css('width', width);
		},
		setDimensions: function(){
			this.$beforeImg.css('width', this.$element.width());
		}

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