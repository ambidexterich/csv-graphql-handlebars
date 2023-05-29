import { mkdir, opendir } from "node:fs/promises";

export const mkdirp = async (path: string): Promise<string> => {
	try {
		const dir = await opendir(path);
		dir.close();
		return Promise.resolve(path);
	} catch (e) {
		await mkdir(path, { recursive: true });
		return Promise.resolve(path);
	} 
};