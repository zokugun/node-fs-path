import os from 'node:os';
import type path from 'node:path';
import { sanitizePath, Sanitizer, type Target } from '@zokugun/fs-path-sanitize';
import { isArray, isString } from '@zokugun/is-it-type';
import { err, type DResult } from '@zokugun/xtry';
import { type PlatformPath } from './types.js';

export function sanitize(_nodePath: path.PlatformPath, localPath: PlatformPath): (
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
			sanitizedPath = sanitizePath(resolvedPath, {
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
