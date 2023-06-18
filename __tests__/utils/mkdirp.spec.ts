import { afterEach, describe, expect, it, vi } from 'vitest';
import { opendir, mkdir } from 'node:fs/promises';
import mkdirp from '../../utils/mkdirp.ts';

vi.mock('node:fs/promises', () => {
	const mkdir = vi.fn();
	const opendir = vi.fn();

	return {
		mkdir,
		opendir
	};
});

describe('utils#mkdirp', () => {

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should successfully resolve if folder exists', async () => {
		const path = '/path/examples';

		// @ts-ignore
		opendir.mockResolvedValueOnce(path);
		expect(await mkdirp(path)).toBe(path);
	});

	it('should make the folder if it doesn\'t exist', async () => {
		const path = '/path/example';

		// @ts-ignore
		opendir.mockRejectedValueOnce(new Error());
		// @ts-ignore
		mkdir.mockResolvedValueOnce(path);
		await expect(mkdirp(path)).resolves.toBe(path);
	});
});