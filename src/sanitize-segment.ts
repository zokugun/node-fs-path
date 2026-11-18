import type { Target } from '@zokugun/fs-path-sanitize';
import type opath from 'node:path';
import type { PlatformPath } from './types.js';

import { Sanitizer, sanitizeSegment as sanitize } from '@zokugun/fs-path-sanitize';
import os from 'node:os';

export function sanitizeSegment(_nodePath: opath.PlatformPath, localPath: PlatformPath): (segment: string, options: {
	replacement?: string | null;
	target?: Target | 'auto';
}) => string {
	let target: Target;

	if(localPath.separator === '\\') {
		target = 'windows.safe';
	}
	else {
		const system = os.platform();

		target = system === 'darwin' ? 'macos.safe' : 'linux.safe';
	}

	const sanitizer = Sanitizer.getInstance(target);

	return (segment, options) => {
		if(!options.target || options.target === 'auto') {
			return sanitizer.sanitizeSegment(segment, options);
		}
		else {
			return sanitize(segment, options);
		}
	};
}
