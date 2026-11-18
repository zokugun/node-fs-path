import type { Target } from '@zokugun/fs-path-sanitize';
import type { DResult } from '@zokugun/xtry/result';
import type opath from 'node:path';
import type { PlatformPath } from './types.js';

import { isArray, isString } from '@zokugun/is-it-type';
import { Sanitizer } from '@zokugun/fs-path-sanitize';
import { err } from '@zokugun/xtry/result';
import os from 'node:os';

export function validatePath(_nodePath: opath.PlatformPath, localPath: PlatformPath): (
	path: string,
	options?: {
		parent?: string | null;
		parents?: string | string[] | null;
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

		const result = sanitizer.validatePath(path);

		if(result.fails) {
			return result;
		}

		if(parents) {
			if(localPath.isInDirs(result.value, parents)) {
				return result;
			}
			else {
				return err('Invalid path: not within allowed parents');
			}
		}
		else {
			return result;
		}
	};
}
