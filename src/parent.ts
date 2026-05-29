import type path from 'node:path';
import { type PlatformPath } from './types.js';

export function parent(nodePath: path.PlatformPath, _localPath: PlatformPath): (file: string) => string {
	return (file) => {
		const parent = nodePath.dirname(file);

		if(parent === '.') {
			return '';
		}
		else {
			return parent;
		}
	};
}
