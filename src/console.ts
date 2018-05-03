#!/usr/bin/env node

/* tslint:disable:no-console */

import {spreadBinaries} from './spread';
import * as yargs from 'yargs';
import * as path from 'path';


const argv = yargs
	.usage('Usage: $0 [dir, ...]')
	.help('h')
	.version(require('../package.json').version).describe('v', 'show installed version')
	.alias('h', 'help')
	.alias('v', 'version')
	.strict()
	.argv;


const source = process.cwd();
const targetNames = argv._;


if (!targetNames.length) {
	yargs.showHelp();
	console.log('Provide paths to directories.');
	process.exit(1);
}


const targets = targetNames.map((name) => {
	if (path.isAbsolute(name)) {
		return name;
	}

	return path.resolve(source, name);
});


const count = spreadBinaries(source, targets);


console.log(`Spread ${count} binary files over ${targets.length} target directories`);
