// eslint-disable-next-line unicorn/prevent-abbreviations
import type path from 'node:path';
import { isUndefined } from '@zokugun/is-it-type';
import { type PlatformPath } from './types.js';

// eslint-disable-next-line unicorn/prevent-abbreviations
export function leafExt(nodePath: path.PlatformPath, _localPath: PlatformPath): (path: string, length?: number) => string {
	return (path, length) => {
		if(isUndefined(length)) {
			return nodePath.extname(path);
		}

		const name = nodePath.basename(path);

		if(name.length === 0 || name.startsWith('.')) {
			return '';
		}

		if(length <= 0) {
			const index = name.indexOf('.');

			return index === -1 ? '' : name.slice(index);
		}
		else if(length === 1) {
			const index = name.lastIndexOf('.');

			return index === -1 ? '' : name.slice(index);
		}
		else {
			const parts = name.split('.');

			if(parts.length === 1) {
				return '';
			}

			return '.' + parts.slice(parts.length <= length ? 1 : -length).join('.');
		}
	};
}
