import { describe, expect, it } from 'vitest';
import { collect, zip } from '../../utils/collections.ts';

describe('utils#zip', () => {
	const keys = ['a', 'b'];
	const values = [1, 2];

	it('throws when first call isn\'t array', () => {
		// @ts-ignore 
		expect(() => zip(1)).toThrow('`props` must be an array');
	});
	
	it('throws when second call isn\'t array', () => {
		const fn = zip(keys);
		// @ts-ignore 
		expect(() => fn(1)).toThrow('`values` must be an array');
	});

	it('zip 2 arrays', () => {
		const fn = zip(keys);
		// @ts-ignore
		expect(fn(values)).toEqual({ a: 1, b: 2});
	});

	it('zip from the smaller of 2 unbalances arrays', () => {
		const fn = zip(keys);
		// @ts-ignore 
		expect(fn(values.concat(3))).toEqual({ a: 1, b: 2});
	});
});

describe('utils#collect', () => {
	const data = {
		'template': {
			'config': 'data/template.config.json',
			'include': ['data/plans.csv']
		},
		'example': {
			'config': 'data/example.config.json',
			'include': ['data/states.csv', 'data/cities.csv']
		}
	};
	it('collect includes into single array', () => {
		expect(collect('basepath', data)).toStrictEqual(['basepath/data/plans.csv', 'basepath/data/states.csv', 'basepath/data/cities.csv']);
	});
});