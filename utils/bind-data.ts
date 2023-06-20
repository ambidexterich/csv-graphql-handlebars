import fetch from 'node-fetch';
import parseConfig from './parse-config.ts';
import { Request } from 'express';
import type { CSVColumnData, CSVRowData, CSVTableData, GraphQLCSVResponse } from '@/types/index.ts';

const fqdnFromRequest = (req: Request): string => {
	return `${req.protocol}://${req.get('host')}`;
};

const getQueryData = async (request: Request, query: string): Promise<GraphQLCSVResponse> => {

	const host = fqdnFromRequest(request);

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}, 
		body: JSON.stringify({ query })
	};

	try {
		const resp = await fetch(`${host}/graphql`, options);
		const data = await resp.json() as GraphQLCSVResponse;
		return data;
	} catch (e) {
		console.error(e);
		return { data: {} };
	}
};

type PossibleType = CSVColumnData | CSVRowData | Array<CSVRowData> | CSVTableData;
const parsePath = (path: string, target: CSVTableData): PossibleType => {

	const keys = path.split('.');
	let value: PossibleType = target;

	for (let i = 0, l = keys.length; i < l; i++) {
		console.log(1, i, keys[i], value);
		
		if (keys[i] === '$source' || typeof value[keys[i]] === 'string') continue;

		if (Array.isArray(value[keys[i]]) && i !== l - 1) {
			console.log('a', keys[i]);
			value = value[0];
		}

		if (!Array.isArray(value) && typeof value === 'object') {
			console.log('b', keys[i]);
			value = value[keys[i]];
		}
		
	}
	console.log(value);
	return value;
};

export default async (request: Request, template: string): Promise<{ [key: string]: { [key: string]: CSVColumnData | CSVRowData | CSVTableData} }> => {
	const { query, map } = await parseConfig(template);
	const { data: $source } = await getQueryData(request, query);

	const variables =  Object.entries<string>(map).reduce((acc: object, pairs: [string, string]): object => {
		const [variable, path] = pairs;

		return {
			...acc,
			[variable]: parsePath(path, $source)
		};
	}, {});
	return variables;
};