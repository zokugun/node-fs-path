import type { Target } from '@zokugun/fs-path-sanitize';
import type { DResult } from '@zokugun/xtry';
import type opath from 'node:path';
import type { PlatformPath } from './types.js';

import { sanitizePath as sanitize, Sanitizer } from '@zokugun/fs-path-sanitize';
import { isArray, isString } from '@zokugun/is-it-type';
import { err } from '@zokugun/xtry';
import os from 'node:os';

export function sanitizePath(_nodePath: opath.PlatformPath, localPath: PlatformPath): (
	path: string,
	options?: {
		parent?: string | null;
		parents?: string | string[] | null;
		replacement?: string | null;
		target?: Target | 'auto';
	}
) => DResult<string> {
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
		const resolvedPath = localPath.resolve(path);

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

		let sanitizedPath: DResult<string>;

		if(!options.target || options.target === 'auto') {
			sanitizedPath = sanitizer.sanitizePath(resolvedPath, {
				absolute: true,
				replacement: options.replacement,
			});
		}
		else {
			sanitizedPath = sanitize(resolvedPath, {
				absolute: true,
				replacement: options.replacement,
				target: options.target,
			});
		}

		if(sanitizedPath.fails) {
			return sanitizedPath;
		}

		if(parents) {
			if(localPath.isInDirs(sanitizedPath.value, parents)) {
				return sanitizedPath;
			}
			else {
				return err('Invalid path: not within allowed parents');
			}
		}
		else {
			return sanitizedPath;
		}
	};
}
