import {isFile, isDirectory, assertDirectory, getBinaries} from './utils';
import * as path from 'path';
import * as fs from 'fs';


export function spreadBinaries(source: string, targets: Array<string>): number
{
	assertDirectory(source);

	if (!targets.length) {
		return;
	}

	for (let target of targets) {
		assertDirectory(target);
	}

	source = path.join(source, 'node_modules', '.bin');

	if (!isDirectory(source)) {
		return;
	}

	const binaries: Array<string> = getBinaries(source);

	if (!binaries.length) {
		return;
	}

	for (let target of targets) {
		target = path.join(target, 'node_modules');

		if (!isDirectory(target)) {
			fs.mkdirSync(target);
		}

		target = path.join(target, '.bin');

		if (!isDirectory(target)) {
			fs.mkdirSync(target);
		}

		for (let binary of binaries) {
			const binaryName = path.basename(binary);
			const targetBinary = path.join(target, binaryName);

			if (isFile(targetBinary)) {
				fs.unlinkSync(targetBinary);
			}

			fs.symlinkSync(binary, targetBinary, 'junction');
		}
	}

	return binaries.length;
}
