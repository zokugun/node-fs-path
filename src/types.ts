import { type Target } from '@zokugun/fs-path-sanitize';
import { type DResult } from '@zokugun/xtry';

export type PlatformPath = {
	readonly delimiter: ';' | ':';
	readonly separator: '\\' | '/';
	readonly posix: PlatformPath;
	readonly win32: PlatformPath;
	absolute: (...paths: string[]) => string;
	dir: (path: string) => string;
	extension: (path: string) => string;
	isAbsolute: (path: string) => boolean;
	isInDir: (file: string, dir: string) => boolean;
	isInDirs: (file: string, directories: string[]) => boolean;
	isSafePath: (path: string, options?: {
		parent?: string | null;
		parents?: string | string[] | null;
		target?: Target | 'auto';
	}) => boolean;
	isSafeSegment: (segment: string, target?: Target | 'auto') => boolean;
	join: (...paths: string[]) => string;
	leaf: (path: string, suffix?: string) => string;
	matchesGlob?: (path: string, pattern: string) => boolean;
	normalize: (path: string) => string;
	parent: (file: string) => string;
	relative: (from: string, to: string) => string;
	resolve: (...paths: string[]) => string;
	sanitize: (path: string, options?: {
		parent?: string | null;
		parents?: string | string[] | null;
		replacement?: string | null;
		target?: Target | 'auto';
	}) => DResult<string>;
	untildify: (path: string) => string;
};
