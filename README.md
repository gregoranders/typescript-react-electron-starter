# TypeScript React Electron Starter

This project is an application skeleton for an [Electron](https://electronjs.org) application
using [React](https://reactjs.org) written in [TypeScript](http://www.typescriptlang.org/).

[![Dependency Status][daviddm-image]][daviddm-url]
[![License][license-image]][license-url]
[![Issues][issues-image]][issues-url]
[![Code maintainability][code-maintainability-image]][code-maintainability-url] [![Code issues][code-issues-image]][code-issues-url] [![Code Technical Debt][code-tech-debt-image]][code-tech-debt-url]

[![Codacy Badge][codacy-imge]][codacy-url]

[![Main Language][language-image]][code-metric-url] [![Languages][languages-image]][code-metric-url] [![Code Size][code-size-image]][code-metric-url] [![Repo-Size][repo-size-image]][code-metric-url]

## Features

- [TypeScript][typescript-url]
- [Jest][jest-url] Unit Tests with Code Coverage
- GitHub CI Integration (feature, development, master, release)
- Travis Integration
- CircleCI Integration
- AppVeyor Integration
- Code Quality via [Code Climate](./docs/index.md) and Codacy

| GitHub                                                           | Travis                                                       | CircleCI                                                         | AppVeyor                                                         | Coveralls                                                                  |                                                                              |
| ---------------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [![ReleaseMaster Build][release-build-image]][release-url]       |                                                              |                                                                  |                                                                  |                                                                            | [![Release][release-image]][release-url]                                     |
| [![Master Build][master-build-image]][master-url]                | [![Master Build][travis-master-image]][travis-url]           | [![Master Build][circleci-master-image]][circleci-url]           | [![Master Build][appveyor-master-image]][appveyor-url]           | [![Master Coverage][master-coveralls-image]][master-coveralls-url]         | [![Master Version][master-version-image]][master-version-url]                |
| [![Development Build][development-build-image]][development-url] | [![Development Build][travis-development-image]][travis-url] | [![Development Build][circleci-development-image]][circleci-url] | [![Development Build][appveyor-development-image]][appveyor-url] | [![Test Coverage][development-coveralls-image]][development-coveralls-url] | [![Development Version][development-version-image]][development-version-url] |

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
npm run e2e
```

### Run

```
npm start
```

### Clear

```
npm run clear
```

### Code Climate Checks [docker required](docs/CODECLIMATE.md)

```
npm run codeclimate
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
[release-image]: https://img.shields.io/github/release/gregoranders/typescript-react-electron-starter
[release-build-image]: https://github.com/gregoranders/typescript-react-electron-starter/workflows/Release%20CI/badge.svg
[master-build-image]: https://github.com/gregoranders/typescript-react-electron-starter/workflows/Master%20CI/badge.svg
[development-build-image]: https://github.com/gregoranders/typescript-react-electron-starter/workflows/Development%20CI/badge.svg
[master-coveralls-url]: https://coveralls.io/github/gregoranders/typescript-react-electron-starter?branch=master
[master-coveralls-image]: https://img.shields.io/coveralls/github/gregoranders/typescript-react-electron-starter/master
[development-coveralls-image]: https://img.shields.io/coveralls/github/gregoranders/typescript-react-electron-starter/development
[development-coveralls-url]: https://coveralls.io/github/gregoranders/typescript-react-electron-starter?branch=development
[code-maintainability-url]: https://codeclimate.com/github/gregoranders/typescript-react-electron-starter/maintainability
[code-maintainability-image]: https://img.shields.io/codeclimate/maintainability/gregoranders/typescript-react-electron-starter
[code-issues-url]: https://codeclimate.com/github/gregoranders/typescript-react-electron-starter/maintainability
[code-issues-image]: https://img.shields.io/codeclimate/issues/gregoranders/typescript-react-electron-starter
[code-tech-debt-url]: https://codeclimate.com/github/gregoranders/typescript-react-electron-starter/maintainability
[code-tech-debt-image]: https://img.shields.io/codeclimate/tech-debt/gregoranders/typescript-react-electron-starter
[language-image]: https://img.shields.io/github/languages/top/gregoranders/typescript-react-electron-starter
[languages-image]: https://img.shields.io/github/languages/count/gregoranders/typescript-react-electron-starter
[code-size-image]: https://img.shields.io/github/languages/code-size/gregoranders/typescript-react-electron-starter
[repo-size-image]: https://img.shields.io/github/repo-size/gregoranders/typescript-react-electron-starter
[travis-url]: https://travis-ci.org/gregoranders/typescript-react-electron-starter
[travis-master-image]: https://travis-ci.org/gregoranders/typescript-react-electron-starter.svg?branch=master
[travis-development-image]: https://travis-ci.org/gregoranders/typescript-react-electron-starter.svg?branch=development
[circleci-url]: https://app.circleci.com/pipelines/github/gregoranders/typescript-react-electron-starter
[circleci-master-image]: https://img.shields.io/circleci/build/github/gregoranders/typescript-react-electron-starter/master
[circleci-development-image]: https://img.shields.io/circleci/build/github/gregoranders/typescript-react-electron-starter/development
[appveyor-url]: https://ci.appveyor.com/project/gregoranders/typescript-react-electron-starter
[appveyor-master-image]: https://img.shields.io/appveyor/build/gregoranders/typescript-react-electron-starter/master
[appveyor-development-image]: https://img.shields.io/appveyor/build/gregoranders/typescript-react-electron-starter/development
[typescript-url]: http://www.typescriptlang.org/
[jest-url]: https://jestjs.io/
[codacy-imge]: https://app.codacy.com/project/badge/Grade/3c71191775eb4dee9def1e1b9e0bae41
[codacy-url]: https://www.codacy.com/manual/gregoranders/typescript-react-electron-starter
