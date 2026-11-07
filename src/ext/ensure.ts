import type path from 'node:path';
import type { ExtOptions, PlatformPath } from '../types.js';

import { isMatching } from './isMatching.js';
import { normalizeIgnore } from './normalizeIgnore.js';

export function ensure(_nodePath: path.PlatformPath, localPath: PlatformPath): (path: string, ext: string, options?: ExtOptions) => string {
	return (path, ext, options = {}) => {
		ext = ext.trim();

		if(ext.length === 0) {
			return path;
		}

		if(ext[0] !== '.') {
			ext = '.' + ext;
		}

		const { maxLength } = options;
		const { ignore, depth } = normalizeIgnore(options.ignore, options.depth);
		const old = localPath.ext.get(path, depth);

		if(old.length > 0 && isMatching(old, ignore, maxLength)) {
			return path;
		}

		return path + ext;
	}
}
