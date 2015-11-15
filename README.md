## Cocoen Beta

Touch-enabled before/after slider with requestAnimationFrame. Inspired by [before-after.js](https://github.com/jotform/before-after.js).

### Quick start

Put the required stylesheet at the [top](https://developer.yahoo.com/performance/rules.html#css_top) of your markup:

```html
<link rel="stylesheet" href="css/cocoen.min.css" />
```

Put the script at the [bottom](https://developer.yahoo.com/performance/rules.html#js_bottom) of your markup right after jQuery:

```html
<script src="js/vendor/jquery.min.js"></script>
<script src="js/cocoen.min.js"></script>
```

Only the class `cocoen` and `cocoen__drag` are mandatory to apply proper default styles:

```html
	<figure class="cocoen">
		<div>
			<img src="img/before.jpg" alt="">
		</div>
		<img src="img/after.jpg" alt="">
		<span class="cocoen__drag"></span>
	</figure>
```

```javascript
$(document).ready(function(){
	$('.cocoen').cocoen();
});
```

### Building

This package comes with [Gulp](http://gulpjs.com/) and [Bower](http://bower.io/). The following tasks are available:

  * `default` compiles the CSS and JS into `/dist`
  * `jshint` validates the JS
  * `watch` watches source files and builds them automatically whenever you save.

### License

The code and the documentation are released under the [MIT License](LICENSE).