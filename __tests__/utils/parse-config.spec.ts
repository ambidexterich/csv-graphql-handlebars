import { afterEach, describe, expect, it, vi } from 'vitest';
import { readFile } from 'node:fs/promises';
import parseConfig from '../../utils/parse-config.ts';

vi.mock('node:fs/promises', () => {
	return {
		readFile: vi.fn()
	};
});

describe('utils#parseConfig', () => {

	afterEach(() => {
		vi.clearAllMocks();
	});

	const pathToConfig = '/path/to/config';
	const mockConfig = `{
		"source": "query states { states { abbreviation name } }",
		"map": {
			"label": "$source.states.abbreviation",
			"value": "$source.states.name"
		}
	}`;

	it('should parse JSON and return the structure', async () => {
		// @ts-ignore
		readFile.mockResolvedValueOnce(mockConfig);
	
		const results = await parseConfig(pathToConfig);
		expect(results).toHaveProperty('source');
		expect(results).toHaveProperty('map');
	});
});