# TypeScript React Electron Starter

This project is an application skeleton for an [Electron](https://electronjs.org) application
using [React](https://reactjs.org) written in [TypeScript](http://www.typescriptlang.org/).

[![Dependency Status][daviddm-image]][daviddm-url]
[![License][license-image]][license-url]
[![Issues][issues-image]][issues-url]

[![Release Build][release-build-image]][release-url]

[![Master Build][master-build-image]][master-url] [![Master Coverage][master-coveralls-image]][master-coveralls-url] [![Master Version][master-version-image]][master-version-url]

[![Development Build][development-build-image]][development-url] [![Test Coverage][development-coveralls-image]][development-coveralls-url] [![Development Version][development-version-image]][development-version-url]

[![Main Language](https://img.shields.io/github/languages/top/gregoranders/typescript-react-electron-starter)][code-metric-url] [![Languages](https://img.shields.io/github/languages/count/gregoranders/typescript-react-electron-starter)][code-metric-url] [![Code Size](https://img.shields.io/github/languages/code-size/gregoranders/typescript-react-electron-starter)][code-metric-url] [![Repo-Size](https://img.shields.io/github/repo-size/gregoranders/typescript-react-electron-starter)][code-metric-url]


[![Coverage Status](https://coveralls.io/repos/github/gregoranders/typescript-react-electron-starter/badge.svg?branch=development)](https://coveralls.io/github/gregoranders/typescript-react-electron-starter?branch=development)

### Clone repository
```
git clone https://github.com/gregoranders/typescript-react-electron-starter
```

### Install dependencies
```
npm install
```

### Build

#### Build Electron Application
```
npm run build
```

#### Build GitHub Actions
```
npm run actions
```

### Testing

#### Test using [Jest](https://jestjs.io/)
```
npm test
```

#### Test using [Spectron](https://electronjs.org/spectron)
Screenshots will be located in `./it/screenshots`.
```
npm run it
```

### Run
```
npm start
```

### Clear
```
npm run clear
```

### Platform distribution

Package will be located in `./dist/pkg`.
```
npm run dist
```

[release-url]: https://github.com/gregoranders/typescript-react-electron-starter/releases
[master-url]: https://github.com/gregoranders/typescript-react-electron-starter/tree/master
[development-url]: https://github.com/gregoranders/typescript-react-electron-starter/tree/development
[repository-url]: https://github.com/gregoranders/typescript-react-electron-starter
[code-metric-url]: https://github.com/gregoranders/typescript-react-electron-starter/search?l=TypeScript

[travis-url]: https://travis-ci.org/gregoranders/typescript-react-electron-starter
[travis-image]: https://travis-ci.org/gregoranders/typescript-react-electron-starter.svg?branch=master

[daviddm-url]: https://david-dm.org/gregoranders/typescript-react-electron-starter
[daviddm-image]: https://david-dm.org/gregoranders/typescript-react-electron-starter.svg?branch=master

[license-url]: https://github.com/gregoranders/typescript-react-electron-starter/blob/master/LICENSE
[license-image]: https://img.shields.io/github/license/gregoranders/typescript-react-electron-starter.svg

[master-version-url]: https://github.com/gregoranders/typescript-react-electron-starter/blob/master/package.json
[master-version-image]: https://img.shields.io/github/package-json/v/gregoranders/typescript-react-electron-starter/master

[development-version-url]: https://github.com/gregoranders/typescript-react-electron-starter/blob/development/package.json
[development-version-image]: https://img.shields.io/github/package-json/v/gregoranders/typescript-react-electron-starter/development

[issues-url]: https://github.com/gregoranders/typescript-react-electron-starter/issues
[issues-image]: https://img.shields.io/github/issues-raw/gregoranders/typescript-react-electron-starter.svg

[release-build-image]: https://github.com/gregoranders/typescript-react-electron-starter/workflows/Release%20CI/badge.svg
[master-build-image]: https://github.com/gregoranders/typescript-react-electron-starter/workflows/Master%20CI/badge.svg
[development-build-image]: https://github.com/gregoranders/typescript-react-electron-starter/workflows/Development%20CI/badge.svg

[master-coveralls-url]: https://coveralls.io/github/gregoranders/typescript-react-electron-starter?branch=master
[master-coveralls-image]: https://img.shields.io/coveralls/github/gregoranders/typescript-react-electron-starter/master
[development-coveralls-image]: https://img.shields.io/coveralls/github/gregoranders/typescript-react-electron-starter/development
[development-coveralls-url]: https://coveralls.io/github/gregoranders/typescript-react-electron-starter?branch=development
