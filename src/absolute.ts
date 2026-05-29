import type path from 'node:path';
import { type PlatformPath } from './types.js';

export function absolute(nodePath: path.PlatformPath, localPath: PlatformPath): (...paths: string[]) => string {
	return (...paths) => nodePath.resolve(localPath.resolve(...paths));
}
