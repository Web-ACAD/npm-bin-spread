[![NPM version](https://img.shields.io/npm/v/@webacad/npm-bin-spread.svg?style=flat-square)](https://www.npmjs.com/package/@webacad/npm-bin-spread)
[![Build Status](https://img.shields.io/travis/Web-ACAD/npm-bin-spread.svg?style=flat-square)](https://travis-ci.org/Web-ACAD/npm-bin-spread)

# WebACAD/NpmBinSpread

Tool for spreading node_modules binaries in monorepository.

If you can, use [lerna](https://lernajs.io/) instead.

## Installation

```bash
$ npm install --save-dev @webacad/npm-bin-spread
```

or with yarn

```bash
$ yarn add --dev @webacad/npm-bin-spread
```

## Run in postinstall

This package should run automatically after any `npm install` or `yarn install`.

Modify your root package.json:

```json
{
	"scripts": {
		"postinstall": "npm-bin-spread project-a project-b project-c"
	}
}
```

The command above will automatically symlink all root npm binaries into `project-a`, `project-b` and `project-c` 
directories.
