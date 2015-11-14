## Cocoen Beta

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

Wrap your items (`div`, `a`, `img`, `span`, `li` etc.) with a container element (`div`, `ul` etc.). Only the class `cocoen` is mandatory to apply proper styles:

```html
  <div></div>
```

```javascript
$(document).ready(function(){
  $('.cocoen').cocoen();
});
```

### Building

This package comes with [Gulp](http://gulpjs.com/) and [Bower](http://bower.io/). The following tasks are available:

  * -

### License

The code and the documentation are released under the [MIT License](LICENSE).