import opath from 'node:path';
import process from 'node:process';
import { expect, it as vitit } from 'vitest';

import fse from '../src/index.js';

const it = vitit.skipIf(process.platform !== 'win32');

it('should absolute', () => {
	expect(fse.absolute('.')).to.equal(opath.resolve('.'));
	expect(fse.absolute('C:\\opt\\webroot')).to.equal('C:\\opt\\webroot');
	expect(fse.absolute('opt\\webroot')).to.equal(opath.resolve('.') + '\\opt\\webroot');
	expect(fse.absolute('.\\opt\\webroot')).to.equal(opath.resolve('.') + '\\opt\\webroot');
	expect(fse.absolute('..\\opt\\webroot')).to.equal(opath.resolve('..') + '\\opt\\webroot');
});

it('should join', () => {
	expect(fse.join('C:\\opt\\webroot', 'img')).to.equal('C:\\opt\\webroot\\img');
	expect(fse.join('C:\\opt\\webroot\\', 'img')).to.equal('C:\\opt\\webroot\\img');
	expect(fse.join('C:\\opt\\webroot', '\\img')).to.equal('C:\\opt\\webroot\\img');
	expect(fse.join('C:\\opt\\webroot\\', '\\img')).to.equal('C:\\opt\\webroot\\img');

	expect(fse.join('C:\\opt\\webroot\\', '..', '\\img')).to.equal('C:\\opt\\img');
	expect(fse.join('C:\\opt\\webroot\\', '..', 'webroot', '\\img')).to.equal('C:\\opt\\webroot\\img');
});

it('should relative', () => {
	expect(fse.relative('C:\\opt\\webroot', 'C:\\opt\\webroot\\img')).to.equal('img');
	expect(fse.relative('C:\\opt\\webroot', 'C:\\opt\\node_modules')).to.equal('..\\node_modules');
});

it('should resolve', () => {
	expect(fse.resolve('.')).to.equal(opath.resolve('.'));
	expect(fse.resolve('C:\\opt\\webroot')).to.equal('C:\\opt\\webroot');
	expect(fse.resolve('opt\\webroot')).to.equal(opath.resolve('.') + '\\opt\\webroot');
	expect(fse.resolve('.\\opt\\webroot')).to.equal(opath.resolve('.') + '\\opt\\webroot');
	expect(fse.resolve('..\\opt\\webroot')).to.equal(opath.resolve('..') + '\\opt\\webroot');
});

it('should isSafePath while checking parent', () => {
	const cwd = process.cwd();

	expect(fse.isSafePath('a\\.\\..\\b\\c.txt', { parent: cwd })).to.be.false;
	expect(fse.isSafePath('..\\a\\.\\..\\b\\c.txt', { parent: cwd })).to.be.false;
	expect(fse.isSafePath(fse.resolve('a\\.\\..\\b\\c.txt'), { parent: cwd })).to.be.true;
	expect(fse.isSafePath(fse.resolve('..\\a\\.\\..\\b\\c.txt'), { parent: cwd })).to.be.false;
});
