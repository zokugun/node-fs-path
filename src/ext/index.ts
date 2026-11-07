import type path from 'node:path';
import type { PlatformPath } from '../types.js';

import { add } from './add.js';
import { ensure } from './ensure.js';
import { get } from './get.js';
import { remove } from './remove.js';
import { replace } from './replace.js';
import { trim } from './trim.js';

export function buildExt(nodePath: path.PlatformPath, localPath: PlatformPath): PlatformPath['ext'] {
	return {
		add,
		ensure: ensure(nodePath, localPath),
		get: get(nodePath, localPath),
		remove: remove(nodePath, localPath),
		replace: replace(nodePath, localPath),
		trim: trim(nodePath, localPath),
	}
}
