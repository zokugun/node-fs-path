[@zokugun/fs-path](https://github.com/zokugun/node-fs-path)
===========================================================

[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![NPM Version](https://img.shields.io/npm/v/@zokugun/fs-path.svg?colorB=green)](https://www.npmjs.com/package/@zokugun/fs-path)
[![Donation](https://img.shields.io/badge/donate-ko--fi-green)](https://ko-fi.com/daiyam)
[![Donation](https://img.shields.io/badge/donate-liberapay-green)](https://liberapay.com/daiyam/donate)
[![Donation](https://img.shields.io/badge/donate-paypal-green)](https://paypal.me/daiyam99)

> Compact set of path utilities that complement Node's builtin `path` module.

Features
--------

- Tilde expansion: expand `~` to the current user's home directory with `untildify`.
- Safe joining and resolving: helpers that avoid common pitfalls when composing paths.
- Useful utilities: retrieve parent paths, absolute normalization, and platform-aware helpers.
- Small package with ESM and CJS builds

Installation
------------

```bash
npm add @zokugun/fs-path
```

Quick Start
-----------

```ts
import { isInDir, join, resolve } from '@zokugun/fs-path'

const configDir = resolve('~/.config/myapp')
const dataFile = join(configDir, 'data.json')

console.log('Config dir:', configDir)
console.log('Data file:', dataFile)

console.log('Is data file inside config dir?', isInDir(dataFile, configDir))
```

This example expands the current user's home directory, joins paths safely, and prints the resolved absolute path for `configDir`.

API reference
-------------

- `absolute(...paths: string[]): string`: Returns a normalized absolute path.
- `isAbsolute(path: string): boolean`: Return `true` when `path` is absolute for the current platform.
- `isInDir(path: string, parent: string): boolean`: Return `true` when `path` is equal to or contained within `parent`.
- `isInDirs(path: string, parents: string[]): boolean`: Return `true` when `path` is equal to or contained within in one of the `parents`.
- `isSafePath(path: string, options?): boolean`: Return `true` when `path` is considered safe for use (guards against suspicious segments such as `..` when appropriate for the platform).
- `isSafeSegment(segment: string, target?: Target | 'auto'): boolean`: Return `true` when a single path segment is safe (doesn't contain path separators or traversal sequences).
- `join(...paths: string[]): string`: Join path segments.
- `leafExt(path: string, length?: number): string`: Return the extensions.
- `leafName(path: string, extension?: number | string): string`: Return the basename of `path` with/without the extensions.
- `matchesGlob?(path: string, pattern: string): boolean`: Optional platform-provided glob matcher when available.
- `normalize(path: string): string`: Normalize the path (same as `path.normalize`).
- `parentName(path: string): string`: Return the parent name of `path`.
- `parentPath(path: string): string`: Return the parent directory of `path`.
- `relative(from: string, to: string): string`: Compute the relative path from `from` to `to`.
- `resolve(...paths: string[]): string`: Resolve path segments to an absolute path. Supports tilde expansion:
    - `~` expands to the current user's home directory.
    - `~username/...` attempts to expand to that user's home directory when available.
- `sanitize(path: string, options?): Result<string>`: Return a sanitized form of `path` with unsafe segments normalized.
- `untildify(path: string): string`: Expand a leading `~` or `~username` to the home directory, or return `path` unchanged.
- `delimiter`: Platform-specific character (`;`/`:`).
- `separator`: Platform-specific character (`\`/`/`).

```ts
export type PlatformPath = {
    readonly delimiter: ';' | ':';
    readonly separator: '\\' | '/';
    readonly posix: PlatformPath;
    readonly win32: PlatformPath;
    absolute: (...paths: string[]) => string;
    isAbsolute: (path: string) => boolean;
    isInDir(path: string, parent: string): boolean;
    isInDirs(path: string, parents: string[]): boolean;
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
    sanitize(path: string, options?: {
        parent?: string | null;
        parents?: string | string[] | null;
        replacement?: string | null;
        target?: Target | 'auto'
    }) => Result<string>
    untildify: (path: string) => string;
};
```

Comparison with Node's `path`
-----------------------------

This library intentionally mirrors many of Node's `path` APIs but provides small ergonomic differences and extra features where useful:

- `join(...paths)`: wraps `path.join`. Returns `''` instead of `.` when the joined result is the current directory.
- `isAbsolute(path)`, `normalize(path)`, `relative(from, to)`: direct mappings to `path.isAbsolute`, `path.normalize`, and `path.relative` respectively.
- `parentPath(file)`: wraps `path.dirname`. Returns `''` instead of `.` for consistency with `join`.
- `resolve(...paths)`: wraps `path.resolve` but adds tilde expansion (`~` and `~username`) before resolving.
- `delimiter`: same value as `path.delimiter` on the current platform.
- `separator`: same value as `path.sep` on the current platform.

Contributions
-------------

Contributions are most welcome. Please:
- Open issues and feature requests under the repository discussions.
- Follow the [`CONTRIBUTING.md`](./CONTRIBUTING.md).

Donations
---------

Support this project by becoming a financial contributor.

<table>
    <tr>
        <td><img src="https://raw.githubusercontent.com/daiyam/assets/master/icons/256/funding_kofi.png" alt="Ko-fi" width="80px" height="80px"></td>
        <td><a href="https://ko-fi.com/daiyam" target="_blank">ko-fi.com/daiyam</a></td>
    </tr>
    <tr>
        <td><img src="https://raw.githubusercontent.com/daiyam/assets/master/icons/256/funding_liberapay.png" alt="Liberapay" width="80px" height="80px"></td>
        <td><a href="https://liberapay.com/daiyam/donate" target="_blank">liberapay.com/daiyam/donate</a></td>
    </tr>
    <tr>
        <td><img src="https://raw.githubusercontent.com/daiyam/assets/master/icons/256/funding_paypal.png" alt="PayPal" width="80px" height="80px"></td>
        <td><a href="https://paypal.me/daiyam99" target="_blank">paypal.me/daiyam99</a></td>
    </tr>
</table>

License
-------

Copyright &copy; 2026-present Baptiste Augrain

Licensed under the [MIT license](https://opensource.org/licenses/MIT).
