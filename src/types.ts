import { type Target } from '@zokugun/fs-path-sanitize';
import { type DResult } from '@zokugun/xtry';

export type PlatformPath = {
	readonly delimiter: ';' | ':';
	readonly separator: '\\' | '/';
	readonly posix: PlatformPath;
	readonly win32: PlatformPath;
	absolute: (...paths: string[]) => string;
	isAbsolute: (path: string) => boolean;
	isInDir: (path: string, dir: string) => boolean;
	isInDirs: (path: string, directories: string[]) => boolean;
	isSafePath: (path: string, options?: {
		parent?: string | null;
		parents?: string | string[] | null;
		target?: Target | 'auto';
	}) => boolean;
	isSafeSegment: (segment: string, target?: Target | 'auto') => boolean;
	join: (...paths: string[]) => string;
	leafExt: (path: string, length?: number) => string;
	leafName: (path: string, extension?: number | string) => string;
	matchesGlob?: (path: string, pattern: string) => boolean;
	normalize: (path: string) => string;
	parentName: (path: string) => string;
	parentPath: (path: string) => string;
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
