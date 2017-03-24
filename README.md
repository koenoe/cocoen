[![Travis-CI](https://travis-ci.org/koenoe/cocoen.svg)](https://travis-ci.org/koenoe/cocoen)
[![David](https://david-dm.org/koenoe/cocoen.svg)](https://david-dm.org)
[![npm](https://img.shields.io/npm/dt/cocoen.svg)](https://www.npmjs.com/package/cocoen)

Touch-enabled before/after slider. Inspired by [before-after.js](https://github.com/jotform/before-after.js).

![](readme.gif)

# Quick start
[Demo](https://koenromers.com/cocoen/demo.html)

## Install
Install with NPM
```
npm install cocoen --save
```
Install with Bower
```
bower install cocoen --save
```
Or download the [latest release](https://github.com/koenoe/cocoen/releases).

## Usage
Only the class `cocoen` is mandatory to apply proper default styles:

```html
<div class="cocoen">
  <img src="img/before.jpg" alt="">
  <img src="img/after.jpg" alt="">
</div>
```

Include the Cocoen stylesheet in your page:

```html
<link rel="stylesheet" href="css/cocoen.min.css" />
```

### Pure Javascript
Include the `cocoen.min.js` script in your page, and then:
```js
new Cocoen(document.querySelector('.cocoen'));
```
Multiple Cocoens in one page:
```js
document.querySelectorAll('.cocoen').forEach(function(element){
  new Cocoen(element);
});
```

### jQuery
Include the `cocoen.min.js` and `cocoen-jquery.min.js` scripts in your page, and then:
```js
$('.cocoen').cocoen();
```

### AngularJS
Coming soon!

# License

The code and the documentation are released under the [MIT License](LICENSE).
