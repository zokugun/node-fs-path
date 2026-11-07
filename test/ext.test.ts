import { expect, it } from 'vitest';

import fse from '../src/index.js';


it('add', () => {
	expect(fse.ext.add('myfile/addExt', '')).to.equal('myfile/addExt');
	expect(fse.ext.add('myfile/addExt', 'js')).to.equal('myfile/addExt.js');
	expect(fse.ext.add('myfile/addExt', '.js')).to.equal('myfile/addExt.js');
	expect(fse.ext.add('myfile/addExt.txt', '')).to.equal('myfile/addExt.txt');
	expect(fse.ext.add('myfile/addExt.txt', 'js')).to.equal('myfile/addExt.txt.js');
	expect(fse.ext.add('myfile/addExt.txt', '.js')).to.equal('myfile/addExt.txt.js');
	expect(fse.ext.add('myfile/addExt.js', '')).to.equal('myfile/addExt.js');
	expect(fse.ext.add('myfile/addExt.js', 'js')).to.equal('myfile/addExt.js.js');
	expect(fse.ext.add('myfile/addExt.min.', '')).to.equal('myfile/addExt.min.');
	expect(fse.ext.add('myfile/addExt.min.', 'js')).to.equal('myfile/addExt.min..js');
	expect(fse.ext.add('myfile/addExt.min.', '.js')).to.equal('myfile/addExt.min..js');
	expect(fse.ext.add('.gitignore', '')).to.equal('.gitignore');
	expect(fse.ext.add('.gitignore', 'bak')).to.equal('.gitignore.bak');
	expect(fse.ext.add('.gitignore', '.bak')).to.equal('.gitignore.bak');
});

it('ensure', () => {
	expect(fse.ext.ensure('fileWith/ensureExt', 'js')).to.equal('fileWith/ensureExt.js');
	expect(fse.ext.ensure('fileWith/ensureExt.js', '.js')).to.equal('fileWith/ensureExt.js');
	expect(fse.ext.ensure('fileWith/ensureExt.min', 'js')).to.equal('fileWith/ensureExt.min');
	expect(fse.ext.ensure('.gitignore', '.txt')).to.equal('.gitignore.txt');
	expect(fse.ext.ensure('fileWith/ensureExt.longExt', 'js', { maxLength: 6 })).to.equal('fileWith/ensureExt.longExt.js');
	expect(fse.ext.ensure('fileWith/ensureExt.min', 'js', { ignore: ['min'] })).to.equal('fileWith/ensureExt.min.js');
});

it('get', () => {
	expect(fse.ext.get('/opt/webroot')).to.equal('');
	expect(fse.ext.get('/opt/webroot/')).to.equal('');
	expect(fse.ext.get('/opt/webroot/', 1)).to.equal('');
	expect(fse.ext.get('/opt/webroot/', 2)).to.equal('');
	expect(fse.ext.get('/opt/webroot/', 0)).to.equal('');
	expect(fse.ext.get('/opt/webroot/img/test.png')).to.equal('.png');
	expect(fse.ext.get('/opt/webroot/img/test.tar.gz')).to.equal('.gz');
	expect(fse.ext.get('/opt/webroot/img/test.tar.gz', 1)).to.equal('.gz');
	expect(fse.ext.get('/opt/webroot/img/test.tar.gz', 2)).to.equal('.tar.gz');
	expect(fse.ext.get('/opt/webroot/img/test.tar.gz', 0)).to.equal('.tar.gz');
	expect(fse.ext.get('/opt/webroot/img/.editorconfig')).to.equal('');
	expect(fse.ext.get('/opt/webroot/img/.editorconfig', 2)).to.equal('');
	expect(fse.ext.get('/opt/webroot/img/.editorconfig', 0)).to.equal('');
});

it('leaf', () => {
	expect(fse.leafExt('/opt/webroot')).to.equal('');
	expect(fse.leafExt('/opt/webroot/')).to.equal('');
	expect(fse.leafExt('/opt/webroot/', 1)).to.equal('');
	expect(fse.leafExt('/opt/webroot/', 2)).to.equal('');
	expect(fse.leafExt('/opt/webroot/', 0)).to.equal('');
	expect(fse.leafExt('/opt/webroot/img/test.png')).to.equal('.png');
	expect(fse.leafExt('/opt/webroot/img/test.tar.gz')).to.equal('.gz');
	expect(fse.leafExt('/opt/webroot/img/test.tar.gz', 1)).to.equal('.gz');
	expect(fse.leafExt('/opt/webroot/img/test.tar.gz', 2)).to.equal('.tar.gz');
	expect(fse.leafExt('/opt/webroot/img/test.tar.gz', 0)).to.equal('.tar.gz');
	expect(fse.leafExt('/opt/webroot/img/.editorconfig')).to.equal('');
	expect(fse.leafExt('/opt/webroot/img/.editorconfig', 2)).to.equal('');
	expect(fse.leafExt('/opt/webroot/img/.editorconfig', 0)).to.equal('');
});


it('remove', () => {
	expect(fse.ext.remove('removedExt.js', 'js')).to.equal('removedExt');
	expect(fse.ext.remove('removedExt.js', '.js')).to.equal('removedExt');
	expect(fse.ext.remove('removedExt.txt.js', 'js')).to.equal('removedExt.txt');
	expect(fse.ext.remove('removedExt.txt.js', '.js')).to.equal('removedExt.txt');
	expect(fse.ext.remove('notRemoved.txt', 'js')).to.equal('notRemoved.txt');
	expect(fse.ext.remove('notRemoved.txt', '.js')).to.equal('notRemoved.txt');
	expect(fse.ext.remove('removedExt.longExt', 'longExt')).to.equal('removedExt');
	expect(fse.ext.remove('removedExt.longExt', '.longExt')).to.equal('removedExt');
	expect(fse.ext.remove('removedExt.txt', 'longExt')).to.equal('removedExt.txt');
	expect(fse.ext.remove('removedExt.txt', '.longExt')).to.equal('removedExt.txt');
	expect(fse.ext.remove('removedExt.txt.longExt', 'longExt')).to.equal('removedExt.txt');
	expect(fse.ext.remove('removedExt.txt.longExt', '.longExt')).to.equal('removedExt.txt');
	expect(fse.ext.remove('.gitignore', '.gitignore')).to.equal('.gitignore');
});

it('replace', () => {
	expect(fse.ext.replace('myfile/replaceExt', 'js')).to.equal('myfile/replaceExt.js');
	expect(fse.ext.replace('my/module.min', 'js')).to.equal('my/module.js');
	expect(fse.ext.replace('my/module.coffee', '.js')).to.equal('my/module.js');
	expect(fse.ext.replace('my/module', 'js')).to.equal('my/module.js');
	expect(fse.ext.replace('file/withDot.', 'js')).to.equal('file/withDot.js');
	expect(fse.ext.replace('file/change.longExt', 'js')).to.equal('file/change.js');
	expect(fse.ext.replace('.eslintrc.js', 'ts')).to.equal('.eslintrc.ts');
	expect(fse.ext.replace('file/notValidExt.min', 'js', { ignore: ['min', 'dev'], maxLength: 8 })).to.equal('file/notValidExt.min.js');
	expect(fse.ext.replace('file/change.longExt', 'js', { ignore: ['min', 'dev'], maxLength: 8 })).to.equal('file/change.js');
	expect(fse.ext.replace('file/change.longRExt', 'js', { ignore: ['min', 'dev'], maxLength: 8 })).to.equal('file/change.longRExt.js');
});

it('trim', () => {
	expect(fse.ext.trim('my/trimmedExt.txt')).to.equal('my/trimmedExt');
	expect(fse.ext.trim('my/trimmedExt')).to.equal('my/trimmedExt');
	expect(fse.ext.trim('my/trimmedExt.min')).to.equal('my/trimmedExt');
	expect(fse.ext.trim('my/trimmedExt.min.js')).to.equal('my/trimmedExt.min');
	expect(fse.ext.trim('../my/trimmedExt.longExt')).to.equal('../my/trimmedExt');
	expect(fse.ext.trim('.gitignore')).to.equal('.gitignore');

	expect(fse.ext.trim('my/trimmedExt.txt', { ignore: ['min', '.dev'], maxLength: 8 })).to.equal('my/trimmedExt');
	expect(fse.ext.trim('my/trimmedExt.min', { ignore: ['min', '.dev'], maxLength: 8 })).to.equal('my/trimmedExt.min');
	expect(fse.ext.trim('my/trimmedExt.dev', { ignore: ['min', '.dev'], maxLength: 8 })).to.equal('my/trimmedExt.dev');
	expect(fse.ext.trim('../my/trimmedExt.longExt', { ignore: ['min', '.dev'], maxLength: 8 })).to.equal('../my/trimmedExt');
	expect(fse.ext.trim('../my/trimmedExt.longRExt', { ignore: ['min', '.dev'], maxLength: 8 })).to.equal('../my/trimmedExt.longRExt');

	expect(fse.ext.trim('my/trimmedExt.min', { depth: 2 })).to.equal('my/trimmedExt');
	expect(fse.ext.trim('my/trimmedExt.min.js', { depth: 2 })).to.equal('my/trimmedExt');

	expect(fse.ext.trim('my/trimmedExt.txt', { depth: 2, ignore: ['min', '.dev'] })).to.equal('my/trimmedExt');
	expect(fse.ext.trim('my/trimmedExt.min', { depth: 2, ignore: ['min', '.dev'] })).to.equal('my/trimmedExt.min');
	expect(fse.ext.trim('my/trimmedExt.min.js', { depth: 2, ignore: ['min', '.dev'] })).to.equal('my/trimmedExt');

	expect(fse.ext.trim('my/trimmedExt.txt', { ignore: ['.min.js'] })).to.equal('my/trimmedExt');
	expect(fse.ext.trim('my/trimmedExt.min', { ignore: ['.min.js'] })).to.equal('my/trimmedExt');
	expect(fse.ext.trim('my/trimmedExt.min.js', { ignore: ['.min.js'] })).to.equal('my/trimmedExt.min.js');

	expect(fse.ext.trim('my/trimmedExt.txt', { ignore: ['.min', 'js'] })).to.equal('my/trimmedExt');
	expect(fse.ext.trim('my/trimmedExt.min', { ignore: ['.min', 'js'] })).to.equal('my/trimmedExt.min');
	expect(fse.ext.trim('my/trimmedExt.min.js', { ignore: ['.min', 'js'] })).to.equal('my/trimmedExt.min.js');
});
