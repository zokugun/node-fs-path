[@zokugun/fs-path](https://github.com/zokugun/node-fs-path)
===========================================================

[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![NPM Version](https://img.shields.io/npm/v/@zokugun/fs-path?color=brightgreen)](https://www.npmjs.com/package/@zokugun/fs-path)
[![NodeJS Version](https://img.shields.io/badge/node.js-%3E%3D%2018.20-green)](#requirements)
[![Modules](https://img.shields.io/badge/modules-ESM%20%7C%20CJS-green)](#requirements)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-f87171?logo=kofi&logoColor=white)](https://ko-fi.com/daiyam)
[![Liberapay](https://img.shields.io/badge/Liberapay-facc15?logo=liberapay&logoColor=black)](https://liberapay.com/daiyam/donate)
[![PayPal](https://img.shields.io/badge/PayPal-5277C3?logo=paypal&logoColor=white)](https://paypal.me/daiyam99)

> Compact set of path utilities that complement Node's builtin `path` module.

Features
--------

- Tilde expansion: expand `~` to the current user's home directory with `untildify`.
- Safe joining and resolving: helpers that avoid common pitfalls when composing paths.
- Useful utilities: retrieve parent paths, absolute normalization, and platform-aware helpers.
- Extension helpers: add, ensure, get, remove, replace, or trim file extensions.

Installation
------------

```bash
npm add @zokugun/fs-path
```

Requirements
------------

- **Node.js**: `v18.20` or higher
- **Modules**: ECMAScript Modules (`ESM`) or CommonJS (`CJS`)

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
- `ext`: File-extension helpers:
    - `ext.add(path: string, ext: string): string`: Append an extension, adding a leading dot when needed.
    - `ext.ensure(path: string, ext: string, options?: ExtOptions): string`: Append the extension unless the path already has a matching extension.
    - `ext.get(path: string, depth?: number): string`: Get the extension; `depth` selects multiple suffixes (for example, `2` returns `.tar.gz`).
    - `ext.remove(path: string, ext: string): string`: Remove the matching trailing extension.
    - `ext.replace(path: string, ext: string, options?: ExtOptions): string`: Trim a matching extension, then append the given extension.
    - `ext.trim(path: string, options?: ExtOptions): string`: Remove a matching extension from the path.
- `leafExt(path: string, length?: number): string`: Return the extensions.
- `leafName(path: string, extension?: number | string): string`: Return the basename of `path` with/without the extensions.
- `matchesGlob?(path: string, pattern: string): boolean`: Optional platform-provided glob matcher when available.
- `normalize(path: string): string`: Normalize a path using the current platform's path rules.
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
export type ExtOptions = {
    depth?: number;
    ignore?: string[];
    maxLength?: number;
};

export type PlatformPath = {
    readonly delimiter: ';' | ':';
    readonly separator: '\\' | '/';
    readonly posix: PlatformPath;
    readonly win32: PlatformPath;
    absolute: (...paths: string[]) => string;
    ext: {
        add(path: string, ext: string): string;
        ensure(path: string, ext: string, options?: ExtOptions): string;
        get(path: string, depth?: number): string;
        remove(path: string, ext: string): string;
        replace(path: string, ext: string, options?: ExtOptions): string;
        trim(path: string, options?: ExtOptions): string;
    };
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
- `isAbsolute(path)` and `relative(from, to)`: direct mappings to `path.isAbsolute` and `path.relative`.
- `normalize(path)`: uses the current platform's path rules; on POSIX, backslashes are also treated as separators.
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
