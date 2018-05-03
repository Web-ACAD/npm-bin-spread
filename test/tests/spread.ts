import {spreadBinaries} from '../../src';
import {isDirectory} from '../../src/utils';
import {expect} from 'chai';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';


const data = path.join(__dirname, '..', 'data');


describe('spreadBinaries()', () => {

	afterEach(() => {
		revertData();
	});

	it('should throw an error if source directory does not exists', () => {
		expect(() => {
			spreadBinaries(_path('unknown'), []);
		}).to.throw(Error, `Path ${_path('unknown')} does not exists or is not a directory.`);
	});

	it('should throw an error if target directory does not exists', () => {
		expect(() => {
			spreadBinaries(_path('project'), [
				_path('project', 'unknown'),
			]);
		}).to.throw(Error, `Path ${_path('project', 'unknown')} does not exists or is not a directory.`);
	});

	it('should do nothing if targets list is empty', () => {
		spreadBinaries(_path('project'), []);
	});

	it('should do nothing if source bin directory does not exists', () => {
		spreadBinaries(_path('project', 'a'), [
			_path('project', 'a'),
		]);

		expect(getBinaries(_path('project', 'a'))).to.be.eql([]);
	});

	it('should do nothing if binaries list is empty', () => {
		spreadBinaries(_path('project', 'c'), [
			_path('project', 'a'),
		]);

		expect(getBinaries(_path('project', 'a'))).to.be.eql([]);
	});

	it('should create links to all target directories', () => {
		spreadBinaries(_path('project'), [
			_path('project', 'a'),
			_path('project', 'b'),
			_path('project', 'c'),
		]);

		expect(getBinaries(_path('project', 'a'))).to.be.eql([
			'a.js',
			'b.js',
			'c.js',
		]);

		expect(getBinaries(_path('project', 'b'))).to.be.eql([
			'a.js',
			'b.js',
			'c.js',
		]);

		expect(getBinaries(_path('project', 'c'))).to.be.eql([
			'a.js',
			'b.js',
			'c.js',
		]);
	});

});


function _path(...parts: Array<string>): string
{
	return path.join(data, ...parts);
}


function getBinaries(dir: string): Array<string>
{
	dir = path.join(dir, 'node_modules');

	if (!isDirectory(dir)) {
		return [];
	}

	dir = path.join(dir, '.bin');

	if (!isDirectory(dir)) {
		return [];
	}

	return fs.readdirSync(dir)
		.filter((found) => found !== '.gitkeep');
}


function revertData(): void
{
	if (isDirectory(_path('project', 'a', 'node_modules'))) {
		rimraf.sync(_path('project', 'a', 'node_modules'));
	}

	if (isDirectory(_path('project', 'b', 'node_modules', '.bin'))) {
		rimraf.sync(_path('project', 'b', 'node_modules', '.bin'));
	}

	if (fs.existsSync(_path('project', 'c', 'node_modules', '.bin', 'a.js'))) {
		fs.unlinkSync(_path('project', 'c', 'node_modules', '.bin', 'a.js'));
	}

	if (fs.existsSync(_path('project', 'c', 'node_modules', '.bin', 'b.js'))) {
		fs.unlinkSync(_path('project', 'c', 'node_modules', '.bin', 'b.js'));
	}

	if (fs.existsSync(_path('project', 'c', 'node_modules', '.bin', 'c.js'))) {
		fs.unlinkSync(_path('project', 'c', 'node_modules', '.bin', 'c.js'));
	}
}
