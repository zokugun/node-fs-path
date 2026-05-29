import os from 'node:os';
import type path from 'node:path';
import { isSafeSegment as isSafe, Sanitizer, type Target } from '@zokugun/fs-path-sanitize';
import { type PlatformPath } from './types.js';

export function isSafeSegment(_nodePath: path.PlatformPath, localPath: PlatformPath): (segment: string, target?: Target | 'auto') => boolean {
	let target: Target;

	if(localPath.separator === '\\') {
		target = 'windows.safe';
	}
	else {
		const system = os.platform();

		target = system === 'darwin' ? 'macos.safe' : 'linux.safe';
	}

	const sanitizer = Sanitizer.getInstance(target);

	return (segment, target) => {
		if(!target || target === 'auto') {
			return sanitizer.isSafePath(segment);
		}
		else {
			return isSafe(segment, target);
		}
	};
}
