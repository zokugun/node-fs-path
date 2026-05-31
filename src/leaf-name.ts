import type path from 'node:path';
import { isString, isUndefined } from '@zokugun/is-it-type';
import { type PlatformPath } from './types.js';

export function leafName(nodePath: path.PlatformPath, _localPath: PlatformPath): (path: string, extension?: number | string) => string {
	return (path, extension) => {
		if(isUndefined(extension)) {
			return nodePath.basename(path);
		}

		if(isString(extension)) {
			return nodePath.basename(path, extension);
		}

		const name = nodePath.basename(path);

		if(name.length === 0 || name.startsWith('.')) {
			return name;
		}

		if(extension <= 0) {
			const index = name.indexOf('.');

			return index === -1 ? name : name.slice(0, index);
		}
		else if(extension === 1) {
			const index = name.lastIndexOf('.');

			return index === -1 ? name : name.slice(0, index);
		}
		else {
			const parts = name.split('.');

			if(parts.length <= extension) {
				return parts[0];
			}

			return parts.slice(0, -extension).join('.');
		}
	};
}
