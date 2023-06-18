import { mkdir, opendir } from 'node:fs/promises';

/**
 * Create a directory if it doesn't already exist
 * @param {string} path 
 * @returns 
 */
export default async (path: string): Promise<string> => {
	try {
		const dir = await opendir(path);
		dir.close();
		return Promise.resolve(path);
	} catch (e) {
		await mkdir(path, { recursive: true });
		return Promise.resolve(path);
	} 
};