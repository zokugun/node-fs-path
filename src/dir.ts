import type path from 'node:path';
import { type PlatformPath } from './types.js';

export function dir(nodePath: path.PlatformPath, _localPath: PlatformPath): (path: string) => string {
	return (path) => nodePath.parse(path).dir;
}
