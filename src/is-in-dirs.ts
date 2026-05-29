// eslint-disable-next-line unicorn/prevent-abbreviations
import type path from 'node:path';
import { type PlatformPath } from './types.js';

// eslint-disable-next-line unicorn/prevent-abbreviations
export function isInDirs(_nodePath: path.PlatformPath, localPath: PlatformPath): (path: string, parents: string[]) => boolean {
	if(localPath.separator === '\\') {
		return (path, parents) => {
			const resolvedPath = localPath.resolve(path).toLowerCase();

			for(const parent of parents) {
				const resolvedParent = localPath.resolve(parent).toLowerCase();

				if(resolvedPath === resolvedParent) {
					return true;
				}

				const suffixedParent = resolvedParent.endsWith(localPath.separator) ? resolvedParent : resolvedParent + localPath.separator;

				if(resolvedPath.startsWith(suffixedParent)) {
					return true;
				}
			}

			return false;
		};
	}
	else {
		return (path, parents) => {
			const resolvedPath = localPath.resolve(path);

			for(const parent of parents) {
				const resolvedParent = localPath.resolve(parent);

				if(resolvedPath === resolvedParent) {
					return true;
				}

				const suffixedParent = resolvedParent.endsWith(localPath.separator) ? resolvedParent : resolvedParent + localPath.separator;

				if(resolvedPath.startsWith(suffixedParent)) {
					return true;
				}
			}

			return false;
		};
	}
}
