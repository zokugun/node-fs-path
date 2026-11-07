import opath from 'node:path';
import { absolute } from './absolute.js';
import { buildExt } from './ext/index.js';
import { isInDir } from './is-in-dir.js';
import { isInDirs } from './is-in-dirs.js';
import { isSafePath } from './is-safe-path.js';
import { isSafeSegment } from './is-safe-segment.js';
import { join } from './join.js';
import { leafName } from './leaf-name.js';
import { normalize } from './normalize.js';
import { parentName } from './parent-name.js';
import { parentPath } from './parent-path.js';
import { resolve } from './resolve.js';
import { sanitize } from './sanitize.js';
import { type PlatformPath } from './types.js';
import { untildify } from './untildify.js';

function buildPlatform(path: opath.PlatformPath): PlatformPath {
	const {
		delimiter,
		isAbsolute,
		relative,
		sep: separator,
	} = path;

	const result: Partial<PlatformPath> = {
		delimiter,
		separator,
		isAbsolute,
		matchesGlob: path.matchesGlob ?? undefined,
		relative,
	};

	const ext = buildExt(path, result as unknown as PlatformPath)

	result.absolute = absolute(path, result as unknown as PlatformPath);
	result.ext = ext;
	result.isInDir = isInDir(path, result as unknown as PlatformPath);
	result.isInDirs = isInDirs(path, result as unknown as PlatformPath);
	result.isSafePath = isSafePath(path, result as unknown as PlatformPath);
	result.isSafeSegment = isSafeSegment(path, result as unknown as PlatformPath);
	result.join = join(path, result as unknown as PlatformPath);
	result.leafExt = ext.get;
	result.leafName = leafName(path, result as unknown as PlatformPath);
	result.normalize = normalize(path, result as unknown as PlatformPath);
	result.parentName = parentName(path, result as unknown as PlatformPath);
	result.parentPath = parentPath(path, result as unknown as PlatformPath);
	result.resolve = resolve(path, result as unknown as PlatformPath);
	result.sanitize = sanitize(path, result as unknown as PlatformPath);
	result.untildify = untildify(path, result as unknown as PlatformPath);

	return result as PlatformPath;
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
