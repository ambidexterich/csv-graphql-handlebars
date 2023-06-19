import fetch from 'node-fetch';
import parseConfig from './parse-config.ts';
import { Request } from 'express';

const fqdnFromRequest = (req: Request): string => {
	return `${req.protocol}://${req.get('host')}`;
};

const getQueryData = async <T>(request: Request, query: string): Promise<T> => {

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
		const data = await resp.json() as Promise<T>;
		return data;
	} catch (e) {
		console.error(e);
		return { data: {} };
	}
};

export default async (request: Request, template: string): Promise<{ data: object}> => {
	const { query, map } = await parseConfig(template);
	const { data: $source } = await getQueryData<{ data: object }>(request, query);

	const variables = Object.entries(map).reduce((acc, pairs: [string, string]) => {
		const [variable, path] = pairs;
		return {
			...acc,
			[variable]: path.split('.').reduce((a, key) => {
				if (key === '$source') return $source;
				return Array.isArray(a[key]) ? a[key][0] : a[key];
			}, $source)
		};
	}, {});
	return variables;
};