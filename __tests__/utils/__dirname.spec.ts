import { describe, expect, it } from 'vitest';
import { __dirname } from '../../utils/index.ts';
import { join } from 'node:path';


describe('utils#__dirname', () => {
	it('should generate full path from `import.meta.url`', () => {
		expect(__dirname(join(import.meta.url, '../..'))).toEqual(process.cwd());
	});
});