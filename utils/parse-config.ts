import { AbsolutePath } from '@/types/index.ts';
import { readFile } from 'node:fs/promises';

export default async (template: AbsolutePath) => {
	const screenConfig = await readFile(template, { encoding: 'utf8' });
	const { source, map } = JSON.parse(screenConfig);
	return { source, map };
};