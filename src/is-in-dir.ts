import type opath from 'node:path';
import { type PlatformPath } from './types.js';

export function isInDir(_nodePath: opath.PlatformPath, localPath: PlatformPath): (path: string, parent: string) => boolean {
	return (path, parent) => {
		let resolvedPath = localPath.resolve(path);
		let resolvedParent = localPath.resolve(parent);

		if(localPath.separator === '\\') {
			resolvedPath = resolvedPath.toLowerCase();
			resolvedParent = resolvedParent.toLowerCase();
		}

		if(resolvedPath === resolvedParent) {
			return true;
		}

		const suffixedParent = resolvedParent.endsWith(localPath.separator) ? resolvedParent : resolvedParent + localPath.separator;

		return resolvedPath.startsWith(suffixedParent);
	};
}
