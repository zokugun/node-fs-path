import type path from 'node:path';
import process from 'node:process';
import { isString } from '@zokugun/is-it-type';
import { type PlatformPath } from './types.js';
import { getHome } from './utils/get-home.js';
import { getUserHome } from './utils/get-user-home.js';

const TILDE_REGEX = /^~(?=$|\/|\\)/;
const USER_REGEX = /^~([^/\\]+)(.*)$/;

export function resolve(nodePath: path.PlatformPath, _localPath: PlatformPath): (...paths: string[]) => string {
	return (...paths) => {
		if(paths.length === 0) {
			return process.cwd();
		}
		else if(nodePath.isAbsolute(paths[0])) {
			return nodePath.normalize(nodePath.join(...paths));
		}
		else if(TILDE_REGEX.test(paths[0])) {
			const homedir = getHome();

			if(isString(homedir)) {
				paths.shift();

				return nodePath.normalize(nodePath.join(homedir, ...paths));
			}
		}
		else {
			const match = USER_REGEX.exec(paths[0]);

			if(match) {
				const [, username, rest] = match;
				const userHome = getUserHome(username);

				if(isString(userHome)) {
					paths.shift();

					return nodePath.normalize(nodePath.join(userHome + rest, ...paths));
				}
			}
		}

		paths.unshift();

		return nodePath.normalize(nodePath.join(process.cwd(), ...paths));
	};
}
