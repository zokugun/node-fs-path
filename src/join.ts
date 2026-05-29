import type path from 'path';
import { type PlatformPath } from './types.js';

export function join(nodePath: path.PlatformPath, _localPath: PlatformPath): (...paths: string[]) => string {
	return (...paths) => {
		const joined = nodePath.join(...paths);

		if(joined === '.') {
			return '';
		}
		else {
			return joined;
		}
	};
}
