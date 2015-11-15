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

			this.elementSelector = $.map(this.$element.attr('class').split(' '), function(val) {
				return '.' + val;
			}).join('');

			this.setDimensions();
			this.addEventListeners();
		},
		addEventListeners: function(){
			this.$element.on('mousedown touchstart', this.options.dragElementSelector, this.onDragStart.bind(this));
			this.$element.on('mousemove touchmove', this.onDrag.bind(this));

			$(window).on('mouseup touchend touchcancel', this.onDragEnd.bind(this));
			$(window).on('resize', this.setDimensions.bind(this));
		},
		onDragStart: function(e){
			e.preventDefault();

			var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

			this.posX = this.$dragElement.offset().left + this.dragWidth - startX;
			this.isDragging = true;
		},
		onDragEnd: function(e){
			e.preventDefault();

			this.isDragging = false;
		},
		onDrag: function(e){
			e.preventDefault();

			if(!this.isDragging){
				return;
			}

			this.moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

			requestAnimationFrame(this.drag.bind(this));
		},
		drag: function(){
			this.leftPos = this.moveX + this.posX - this.dragWidth;

			if(this.leftPos < this.minLeftPos) {
				this.leftPos = this.minLeftPos;
			} else if(this.leftPos > this.maxLeftPos) {
				this.leftPos = this.maxLeftPos;
			}

			var width = (this.leftPos + (this.dragWidth / 2) - this.containerOffset) * 100 / this.containerWidth + '%';

			this.$dragElement.css('left', width);
			this.$before.css('width', width);
		},
		setDimensions: function(){
			this.$beforeImg.css('width', this.$element.width());

			this.dragWidth = this.$dragElement.outerWidth();
			this.containerWidth = this.$element.outerWidth();
			this.containerOffset = this.$element.offset().left;
			this.minLeftPos = this.containerOffset + 10;
			this.maxLeftPos = this.containerOffset + this.containerWidth - this.dragWidth - 10;
			this.isDragging = false;
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