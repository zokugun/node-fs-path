import path from 'node:path';
import process from 'node:process';
import { expect, it } from 'vitest';
import fse from '../src/index.js';

it('should absolute', () => {
	expect(fse.absolute('.')).to.equal(path.resolve('.'));
	expect(fse.absolute('/opt/webroot')).to.equal('/opt/webroot');
	expect(fse.absolute('opt/webroot')).to.equal(path.resolve('.') + '/opt/webroot');
	expect(fse.absolute('./opt/webroot')).to.equal(path.resolve('.') + '/opt/webroot');
	expect(fse.absolute('../opt/webroot')).to.equal(path.resolve('..') + '/opt/webroot');
});

it('should join', () => {
	expect(fse.join('/opt/webroot', 'img')).to.equal('/opt/webroot/img');
	expect(fse.join('/opt/webroot/', 'img')).to.equal('/opt/webroot/img');
	expect(fse.join('/opt/webroot', '/img')).to.equal('/opt/webroot/img');
	expect(fse.join('/opt/webroot/', '/img')).to.equal('/opt/webroot/img');

	expect(fse.join('/opt/webroot/', '..', '/img')).to.equal('/opt/img');
	expect(fse.join('/opt/webroot/', '..', 'webroot', '/img')).to.equal('/opt/webroot/img');
});

it('should leaf', () => {
	expect(fse.leaf('/opt/webroot')).to.equal('webroot');
	expect(fse.leaf('/opt/webroot/')).to.equal('webroot');
	expect(fse.leaf('/opt/webroot/img/test.png')).to.equal('test.png');
	expect(fse.leaf('/opt/webroot/img/test.png', '.png')).to.equal('test');
});

it('should parent', () => {
	expect(fse.parent('/opt/webroot')).to.equal('/opt');
	expect(fse.parent('/opt/webroot/')).to.equal('/opt');
});

it('should relative', () => {
	expect(fse.relative('/opt/webroot', '/opt/webroot/img')).to.equal('img');
	expect(fse.relative('/opt/webroot', '/opt/node_modules')).to.equal('../node_modules');
});

it('should resolve', () => {
	expect(fse.resolve('.')).to.equal(path.resolve('.'));
	expect(fse.resolve('/opt/webroot')).to.equal('/opt/webroot');
	expect(fse.resolve('opt/webroot')).to.equal(path.resolve('.') + '/opt/webroot');
	expect(fse.resolve('./opt/webroot')).to.equal(path.resolve('.') + '/opt/webroot');
	expect(fse.resolve('../opt/webroot')).to.equal(path.resolve('..') + '/opt/webroot');
});

it('should have separator', () => {
	expect(fse.separator).to.equal(path.sep);
});

it('should detect path inside directory', () => {
	expect(fse.isInDir('/opt/webroot/img/test.png', '/opt/webroot')).to.equal(true);
	expect(fse.isInDir('/opt/webroot', '/opt/webroot')).to.equal(true);
	expect(fse.isInDir('/opt/webroot2', '/opt/webroot')).to.equal(false);
	expect(fse.isInDir('/opt/webroot/img', '/opt/webroot/img')).to.equal(true);
});

it('should sanitize while checking parent', () => {
	const cwd = process.cwd();

	let result = fse.sanitize('a/./../b/c.txt', { parent: cwd });
	expect(result.fails).to.be.false;
	expect(result.value).to.equal(fse.join(cwd, '/b/c.txt'));

	result = fse.sanitize('../a/./../b/c.txt', { parent: cwd });
	expect(result.fails).to.be.true;
	expect(result.error).to.equal('Invalid path: not within allowed parents');
});

it('should isSafePath while checking parent', () => {
	const cwd = process.cwd();

	expect(fse.isSafePath('a/./../b/c.txt', { parent: cwd })).to.be.false;
	expect(fse.isSafePath('../a/./../b/c.txt', { parent: cwd })).to.be.false;
	expect(fse.isSafePath(fse.resolve('a/./../b/c.txt'), { parent: cwd })).to.be.true;
	expect(fse.isSafePath(fse.resolve('../a/./../b/c.txt'), { parent: cwd })).to.be.false;
});
