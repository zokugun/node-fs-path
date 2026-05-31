import type opath from 'node:path';
import { type PlatformPath } from './types.js';

export function parentPath(nodePath: opath.PlatformPath, _localPath: PlatformPath): (path: string) => string {
	return (path) => {
		const parent = nodePath.dirname(path);

		if(parent === '.') {
			return '';
		}
		else {
			return parent;
		}
	};
}
