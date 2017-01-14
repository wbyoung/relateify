# Relateify

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Dependencies][david-image]][david-url]
[![devDependencies][david-dev-image]][david-dev-url]

A _passthrough_ [browserify][browserify] transform that does not alter your code
in any way. It simply emits `file` events for `@related-file` annotations in
comments so that tools like [watchify][watchify] can observe them.

This plugin is specifically designed to allow annotating one JavaScript file
with a path to some other file on which it depends, but does not use `require`.
It's used by tools like the Babel [`transform-postcss`][transform-postcss].

## License

This project is distributed under the MIT license.

[browserify]: https://github.com/substack/node-browserify
[watchify]: https://github.com/substack/watchify
[transform-postcss]: https://github.com/wbyoung/babel-plugin-transform-postcss

[travis-image]: http://img.shields.io/travis/wbyoung/relateify.svg?style=flat
[travis-url]: http://travis-ci.org/wbyoung/relateify
[npm-image]: http://img.shields.io/npm/v/relateify.svg?style=flat
[npm-url]: https://npmjs.org/package/relateify
[coverage-image]: http://img.shields.io/coveralls/wbyoung/relateify.svg?style=flat
[coverage-url]: https://coveralls.io/r/wbyoung/relateify
[david-image]: http://img.shields.io/david/wbyoung/relateify.svg?style=flat
[david-url]: https://david-dm.org/wbyoung/relateify
[david-dev-image]: http://img.shields.io/david/dev/wbyoung/relateify.svg?style=flat
[david-dev-url]: https://david-dm.org/wbyoung/relateify#info=devDependencies
