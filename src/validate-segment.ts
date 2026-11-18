import type { Target } from '@zokugun/fs-path-sanitize';
import type { DResult } from '@zokugun/xtry/result';
import type opath from 'node:path';
import type { PlatformPath } from './types.js';

import { Sanitizer, validateSegment as validate } from '@zokugun/fs-path-sanitize';
import os from 'node:os';

export function validateSegment(_nodePath: opath.PlatformPath, localPath: PlatformPath): (segment: string, target?: Target | 'auto') => DResult<string> {
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
			return sanitizer.validateSegment(segment);
		}
		else {
			return validate(segment, target);
		}
	};
}
