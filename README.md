# Cocoen
[![Travis-CI](https://travis-ci.org/koenoe/cocoen.svg)](https://travis-ci.org/koenoe/cocoen)
[![David](https://david-dm.org/koenoe/cocoen.svg)](https://david-dm.org)
[![npm](https://img.shields.io/npm/dt/express.svg)](https://www.npmjs.com/package/cocoen)

Touch-enabled before/after slider. Inspired by [before-after.js](https://github.com/jotform/before-after.js).

![](https://github.com/koenoe/cocoen/blob/master/readme.gif)

## Quick start
[Demo](https://koenromers.com/cocoen/)

### Install
```
npm install cocoen
```
Or download the [latest release](https://github.com/koenoe/cocoen/releases).

### Usage

Put the required stylesheet at the [top](https://developer.yahoo.com/performance/rules.html#css_top) of your markup:

```html
<link rel="stylesheet" href="css/cocoen.min.css" />
```

Put the script at the [bottom](https://developer.yahoo.com/performance/rules.html#js_bottom) of your markup.

```html
<script src="js/cocoen.min.js"></script>
```

Only the class `cocoen` is mandatory to apply proper default styles:

```html
<div class="cocoen">
  <img src="img/before.jpg" alt="">
  <img src="img/after.jpg" alt="">
</div>
```

## License

The code and the documentation are released under the [MIT License](LICENSE).
