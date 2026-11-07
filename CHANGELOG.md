Changelog
=========

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][keepachangelog], and this project adheres to [Semantic Versioning][semver].

[Unreleased]
------------

### Changed

- `normalize()` on posix, recognizes both separators and replaces them with the preferred separator

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
[unreleased]: https://github.com/zokugun/node-fs-path/compare/v0.2.2...HEAD
[v0.2.2]: https://github.com/zokugun/node-fs-path/releases/tag/v0.2.2
[v0.2.1]: https://github.com/zokugun/node-fs-path/releases/tag/v0.2.1
[v0.2.0]: https://github.com/zokugun/node-fs-path/releases/tag/v0.2.0
[v0.1.0]: https://github.com/zokugun/node-fs-path/releases/tag/v0.1.0
