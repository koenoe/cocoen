# Cocoen

[![Version](https://img.shields.io/npm/v/cocoen.svg?style=flat-square)](https://www.npmjs.com/package/cocoen?activeTab=versions) [![Downloads](https://img.shields.io/npm/dt/cocoen.svg?style=flat-square)](https://www.npmjs.com/package/cocoen) [![Last commit](https://img.shields.io/github/last-commit/koenoe/cocoen.svg?style=flat-square)](https://github.com/koenoe/cocoen/graphs/commit-activity) [![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fkoenoe%2Fcocoen%2Fbadge%3Fref%3Dmain&style=flat&label=build&logo=false)](https://actions-badge.atrox.dev/koenoe/cocoen/goto?ref=main) [![Coverage Status](https://coveralls.io/repos/github/koenoe/cocoen/badge.svg?branch=main&kill_cache=2)](https://coveralls.io/github/koenoe/cocoen?branch=main&kill_cache=1) [![License](https://img.shields.io/github/license/koenoe/cocoen.svg?style=flat-square)](https://github.com/koenoe/cocoen/blob/main/LICENSE)

Touch-enabled before/after slider. Inspired by [before-after.js](https://github.com/jotform/before-after.js).

![Example](readme.gif)

## Quick start

[Demo](https://koenromers.com/cocoen/index.html)

## Install

Install with NPM

```bash
npm install cocoen --save
```

Get it from CDN

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Cocoen from CDN</title>
  </head>
  <body>
    <div class="cocoen">
      <img src="img/before.jpg" alt="" />
      <img src="img/after.jpg" alt="" />
    </div>

    <!-- Load Cocoen library -->
    <script src="https://unpkg.com/cocoen/dist/cocoen.js"></script>

    <!-- Turns all `.cocoen` elements into Cocoens -->
    <script>
      Cocoen.parse(document.body);
    </script>
  </body>
</html>
```

Or download the [latest release](https://github.com/koenoe/cocoen/releases).

## Usage

Only the class `cocoen` is mandatory to apply proper default styles:

```html
<div class="cocoen">
  <img src="img/before.jpg" alt="" />
  <img src="img/after.jpg" alt="" />
</div>
```

Include the `cocoen.js` script in your page, and then:

```js
Cocoen.create(document.querySelector('.cocoen'));
```

Multiple Cocoens in one page:

```js
Cocoen.parse(document.body);
```

### Options

| Option  | Type   | Description                                                  |
| ------- | ------ | ------------------------------------------------------------ |
| `start` | String | Default: "50". The start position of Cocoen as a percentage. |
| `color` | String | Default: "#fff". Color of drag control                       |

### Events

| Option                          | Description                              |
| ------------------------------- | ---------------------------------------- |
| `cocoen-component:connected`    | Fires when Cocoen mounts                 |
| `cocoen-component:disconnected` | Fires when Cocoen unmounts               |
| `cocoen-component:resized`      | Fires when Cocoen dimensions are updated |
| `cocoen-component:updated`      | Fires when Cocoen is updated             |
| `cocoen-component:visible`      | Fires when Cocoen is in viewport         |

## License

The code and the documentation are released under the [MIT License](LICENSE).
