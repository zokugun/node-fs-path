import type path from 'node:path';
import { isString } from '@zokugun/is-it-type';
import { type PlatformPath } from './types.js';
import { getHome } from './utils/get-home.js';
import { getUserHome } from './utils/get-user-home.js';

const TILDE_REGEX = /^~(?=$|\/|\\)/;
const USER_REGEX = /^~([^/\\]+)(.*)$/;

export function untildify(_nodePath: path.PlatformPath, _localPath: PlatformPath): (path: string) => string {
	return (path) => {
		const homedir = getHome();

		if(isString(homedir) && TILDE_REGEX.test(path)) {
			return homedir + path.slice(1);
		}

		const match = USER_REGEX.exec(path);

		if(match) {
			const [, username, rest] = match;
			const userHome = getUserHome(username);

			if(isString(userHome)) {
				return userHome + rest;
			}
		}

		return path;
	};
}
