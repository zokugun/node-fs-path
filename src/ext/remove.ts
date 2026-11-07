import type path from 'node:path';
import type { PlatformPath } from '../types.js';

import { calculateDepth } from './calculateDepth.js';

export function remove(_nodePath: path.PlatformPath, localPath: PlatformPath): (path: string, ext: string) => string {
	return (path, ext) => {
		ext = ext.trim();

		if(ext.length === 0) {
			return path;
		}

		if(ext[0] !== '.') {
			ext = '.' + ext;
		}

		const depth = calculateDepth(ext);

		if(localPath.ext.get(path, depth) === ext) {
			return path.slice(0, path.length - ext.length);
		}

		return path;
	}
}
