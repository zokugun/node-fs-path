import type opath from 'path';
import { type PlatformPath } from './types.js';

export function join(nodePath: opath.PlatformPath, _localPath: PlatformPath): (...paths: string[]) => string {
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
