import opath from 'node:path';
import { absolute } from './absolute.js';
import { isInDir } from './is-in-dir.js';
// eslint-disable-next-line unicorn/prevent-abbreviations
import { isInDirs } from './is-in-dirs.js';
import { isSafePath } from './is-safe-path.js';
import { isSafeSegment } from './is-safe-segment.js';
import { join } from './join.js';
// eslint-disable-next-line unicorn/prevent-abbreviations
import { leafExt } from './leaf-ext.js';
import { leafName } from './leaf-name.js';
import { parentName } from './parent-name.js';
import { parentPath } from './parent-path.js';
import { resolve } from './resolve.js';
import { sanitize } from './sanitize.js';
import { type PlatformPath } from './types.js';
import { untildify } from './untildify.js';

function buildPlatform(path: opath.PlatformPath): Partial<PlatformPath> {
	const {
		delimiter,
		isAbsolute,
		normalize,
		relative,
		sep: separator,
	} = path;

	const result: Partial<PlatformPath> = {
		delimiter,
		separator,
		isAbsolute,
		matchesGlob: path.matchesGlob ?? undefined,
		normalize,
		relative,
	};

	result.absolute = absolute(path, result as unknown as PlatformPath);
	result.isInDir = isInDir(path, result as unknown as PlatformPath);
	result.isInDirs = isInDirs(path, result as unknown as PlatformPath);
	result.isSafePath = isSafePath(path, result as unknown as PlatformPath);
	result.isSafeSegment = isSafeSegment(path, result as unknown as PlatformPath);
	result.join = join(path, result as unknown as PlatformPath);
	result.leafExt = leafExt(path, result as unknown as PlatformPath);
	result.leafName = leafName(path, result as unknown as PlatformPath);
	result.parentName = parentName(path, result as unknown as PlatformPath);
	result.parentPath = parentPath(path, result as unknown as PlatformPath);
	result.resolve = resolve(path, result as unknown as PlatformPath);
	result.sanitize = sanitize(path, result as unknown as PlatformPath);
	result.untildify = untildify(path, result as unknown as PlatformPath);

	return result;
}

const POSIX_PLATFORM = buildPlatform(opath.posix);
const WIN32_PLATFORM = buildPlatform(opath.win32);

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

export const DEFAULT_PLATFORM = (opath === opath.posix ? POSIX_PLATFORM : WIN32_PLATFORM) as unknown as PlatformPath;
