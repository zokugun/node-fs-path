import path from 'node:path';
import { absolute } from './absolute.js';
import { dir } from './dir.js';
import { isInDir } from './is-in-dir.js';
// eslint-disable-next-line unicorn/prevent-abbreviations
import { isInDirs } from './is-in-dirs.js';
import { isSafePath } from './is-safe-path.js';
import { isSafeSegment } from './is-safe-segment.js';
import { join } from './join.js';
import { parent } from './parent.js';
import { resolve } from './resolve.js';
import { sanitize } from './sanitize.js';
import { type PlatformPath } from './types.js';
import { untildify } from './untildify.js';

function buildPlatform(path: path.PlatformPath): Partial<PlatformPath> {
	const {
		basename: leaf,
		delimiter,
		extname: extension,
		isAbsolute,
		normalize,
		relative,
		sep: separator,
	} = path;

	const result: Partial<PlatformPath> = {
		delimiter,
		separator,
		extension,
		isAbsolute,
		leaf,
		matchesGlob: path.matchesGlob ?? undefined,
		normalize,
		relative,
	};

	result.absolute = absolute(path, result as unknown as PlatformPath);
	result.dir = dir(path, result as unknown as PlatformPath);
	result.isInDir = isInDir(path, result as unknown as PlatformPath);
	result.isInDirs = isInDirs(path, result as unknown as PlatformPath);
	result.isSafePath = isSafePath(path, result as unknown as PlatformPath);
	result.isSafeSegment = isSafeSegment(path, result as unknown as PlatformPath);
	result.join = join(path, result as unknown as PlatformPath);
	result.parent = parent(path, result as unknown as PlatformPath);
	result.resolve = resolve(path, result as unknown as PlatformPath);
	result.sanitize = sanitize(path, result as unknown as PlatformPath);
	result.untildify = untildify(path, result as unknown as PlatformPath);

	return result;
}

const POSIX_PLATFORM = buildPlatform(path.posix);
const WIN32_PLATFORM = buildPlatform(path.win32);

Object.defineProperties(POSIX_PLATFORM, {
	posix: {
		value: POSIX_PLATFORM,
		writable: false,
	},
	win32: {
		value: WIN32_PLATFORM,
		writable: false,
	},
});

Object.defineProperties(WIN32_PLATFORM, {
	posix: {
		value: POSIX_PLATFORM,
		writable: false,
	},
	win32: {
		value: WIN32_PLATFORM,
		writable: false,
	},
});

export const DEFAULT_PLATFORM = (path === path.posix ? POSIX_PLATFORM : WIN32_PLATFORM) as unknown as PlatformPath;
