Changelog
=========

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][keepachangelog], and this project adheres to [Semantic Versioning][semver].

[v0.4.2] | 2026-11-18
---------------------

### Fixed

- `options` in the `sanitizeSegment` function is optional (in `PlatformPath` type)

[v0.4.1] | 2026-11-18
---------------------

### Fixed

- `options` in the `sanitizeSegment` function is optional

[v0.4.0] | 2026-11-18
---------------------

### Breaking

- rename the `sanitize` function as `sanitizePath`
- rename the functions `leafExt` and `leafName` as `baseExt` and `baseName`

### Added

- add the functions `sanitizeSegment`, `validatePath` and `validateSegment`

[v0.3.0] | 2026-11-07
---------------------

### Changed

- `normalize()` on posix, recognizes both separators and replaces them with the preferred separator

### Fixed

- windows: update `@zokugun/fs-path-sanitize` to pass `isSafePath` tests

### Added

- add functions to `add`, `ensure`, `get`, `remove`, `replace` and `trim` extensions

[v0.2.2] | 2026-11-06
---------------------

### Changed

- use latest version of the dependencies

[v0.2.1] | 2026-11-03
---------------------

### Fixed

- the `isSafeSegment()` function correctly calls the `isSafeSegment` method

[v0.2.0] | 2026-05-31
---------------------

### Removed

- remove `dir`, `extension`, `leaf` and `parent` functions

### Added

- add `leafExt`, `leafName`, `parentName` and `parentPath` functions

[v0.1.0] | 2026-05-30
---------------------

### Added

- initial release

[keepachangelog]: https://keepachangelog.com/en/2.0.0/
[semver]: https://semver.org/spec/v2.0.0.html
[unreleased]: https://github.com/zokugun/node-fs-path/compare/v0.4.2...HEAD
[v0.4.2]: https://github.com/zokugun/node-fs-path/releases/tag/v0.4.2
[v0.4.1]: https://github.com/zokugun/node-fs-path/releases/tag/v0.4.1
[v0.4.0]: https://github.com/zokugun/node-fs-path/releases/tag/v0.4.0
[v0.3.0]: https://github.com/zokugun/node-fs-path/releases/tag/v0.3.0
[v0.2.2]: https://github.com/zokugun/node-fs-path/releases/tag/v0.2.2
[v0.2.1]: https://github.com/zokugun/node-fs-path/releases/tag/v0.2.1
[v0.2.0]: https://github.com/zokugun/node-fs-path/releases/tag/v0.2.0
[v0.1.0]: https://github.com/zokugun/node-fs-path/releases/tag/v0.1.0
