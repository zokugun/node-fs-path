import type path from 'node:path';
import type { ExtOptions, PlatformPath } from '../types.js';

export function replace(_nodePath: path.PlatformPath, localPath: PlatformPath): (path: string, ext: string, options?: ExtOptions) => string {
	return (path, ext, options = {}) => {
		ext = ext.trim();

		if(ext.length === 0) {
			return path;
		}

		if(ext[0] !== '.') {
			ext = '.' + ext;
		}

		const trimmed = localPath.ext.trim(path, options);

		return trimmed + ext;
	}
}
