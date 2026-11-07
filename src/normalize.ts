import type opath from 'node:path';
import { type PlatformPath } from './types.js';

export function normalize(nodePath: opath.PlatformPath, localPath: PlatformPath): (path: string) => string {
	if(localPath.separator === '\\') {
		return nodePath.win32.normalize;
	}

	return (path) => {
		let normalized = nodePath.posix.normalize(path);

		if(!normalized.includes('\\')) {
			return normalized;
		}

		if (normalized === '\\') {
			return '/';
		}

		if(normalized.length <= 1) {
			return normalized;
		}

		let prefix = '';

		if(normalized.length > 4 && normalized[0] === '\\' && normalized[1] === '\\' && normalized[3] === '\\') {
			const ch = normalized[2];

			if((ch === '?' || ch === '.')) {
				normalized = normalized.slice(2);
				prefix = '//';
			}
		}

		return prefix + normalized.split(/[/\\]+/).join('/');
	};
}
