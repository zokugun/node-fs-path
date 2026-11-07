import type path from 'node:path';
import type { ExtOptions, PlatformPath } from '../types.js';

import { isMatching } from './isMatching.js';
import { normalizeIgnore } from './normalizeIgnore.js';

export function trim(_nodePath: path.PlatformPath, localPath: PlatformPath): (path: string, options?: ExtOptions) => string {
	return (path, options = {}) => {
		const { maxLength } = options;
		let { ignore, depth } = normalizeIgnore(options.ignore, options.depth);

		if(depth && maxLength) {
			while(depth > 0) {
				const ext = localPath.ext.get(path, depth);

				if(isMatching(ext, ignore, maxLength)) {
					return path.slice(0, path.length - ext.length);
				}

				depth -= 1
			}
		}
		else {
			const ext = localPath.ext.get(path, depth);

			if(isMatching(ext, ignore, maxLength)) {
				return path.slice(0, path.length - ext.length);
			}
		}

		return path;
	}
}
