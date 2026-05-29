import os from 'node:os';
import type path from 'node:path';
import { isSafePath as isSafe, Sanitizer, type Target } from '@zokugun/fs-path-sanitize';
import { isArray, isString } from '@zokugun/is-it-type';
import { type PlatformPath } from './types.js';

export function isSafePath(_nodePath: path.PlatformPath, localPath: PlatformPath): (
	path: string,
	options?: {
		parent?: string | null;
		parents?: string | string[] | null;
		target?: Target | 'auto';
	}
) => boolean {
	let target: Target;

	if(localPath.separator === '\\') {
		target = 'windows.safe';
	}
	else {
		const system = os.platform();

		target = system === 'darwin' ? 'macos.safe' : 'linux.safe';
	}

	const sanitizer = Sanitizer.getInstance(target);

	return (path, options = {}) => {
		let parents: string[] | undefined;

		if(isString(options.parent)) {
			parents = [options.parent];
		}

		if(isString(options.parents)) {
			parents = [options.parents];
		}
		else if(isArray(options.parents)) {
			parents = options.parents;
		}

		const safe = !options.target || options.target === 'auto' ? sanitizer.isSafePath(path) : isSafe(path, target);

		if(!safe) {
			return false;
		}
		else if(parents) {
			return localPath.isInDirs(path, parents);
		}
		else {
			return true;
		}
	};
}
