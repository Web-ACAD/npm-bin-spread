import * as fs from 'fs';
import * as path from 'path';


const EXCLUDED_FILES: Array<string> = [
	'.gitkeep', '.gitignore',
];


export function isDirectory(dir: string): boolean
{
	return fs.existsSync(dir) && fs.statSync(dir).isDirectory();
}


export function isFile(file: string): boolean
{
	return fs.existsSync(file) && fs.statSync(file).isFile();
}


export function assertDirectory(dir: string): void
{
	if (!isDirectory(dir)) {
		throw new Error(`Path ${dir} does not exists or is not a directory.`);
	}
}


export function getBinaries(dir: string): Array<string>
{
	return fs.readdirSync(dir)
		.filter((name) => EXCLUDED_FILES.indexOf(name) < 0)
		.map((file) => path.join(dir, file))
		.filter(isFile);
}
