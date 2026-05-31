import type path from 'node:path';
import { type PlatformPath } from './types.js';

export function parentName(nodePath: path.PlatformPath, _localPath: PlatformPath): (path: string) => string {
	return (path) => {
		const parent = nodePath.dirname(path);

		if(parent === '.') {
			return '';
		}
		else {
			return nodePath.basename(parent);
		}
	};
}
