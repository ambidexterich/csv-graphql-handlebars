import { parse } from 'node:path';
import type { CSVResponse, QueryArgs } from '@/types/index.ts';
import { loader, schemaHint } from '@/utils/csv-loader.ts';
import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { toGraphQLType, zip } from '@/utils/index.ts';

/**
 * Generate the field schema for a given file
 * @param {string} file Full path to data file 
 * @returns {object} Computer schema with appropriate types
 */
const buildHeaderTypes = async (file: string) => {
	const [headers, firstRow] = await schemaHint(file);
	return headers.reduce((fields, header, idx) => ({
		...fields,
		[header]: { type: toGraphQLType(firstRow[idx]) }
	}), {});
};

/**
 * Resolver to read data from a specific CSV file
 * @param {string} table - Name of the CSV file to query
 * @param {...?QueryArgs} args
 * @returns {Promise<ZippedObject[]>}
 */
export const queryCSV = async (file: string, args: QueryArgs): Promise<CSVResponse> => {
	const csv = await loader(file);
	const [headers, ...rest] = csv;
	const results: CSVResponse = rest.map(zip(headers));

	return args.limit ? results.slice(0, args.limit) : results;
};

/**
 * Generate graphql schema from config file
 * @param {Array<string>} tables Array of absolute paths to CSV files
 * @returns
 */
export const processCSV = async (tables: string[]) => {
	const schema = tables.reduce(async (acc, file: string) => {
		const tableName = parse(file).name;
		return {
			...acc,
			[tableName]: {
				type: new GraphQLList(new GraphQLObjectType({
					name: `${tableName}`,
					fields: await buildHeaderTypes(file)
				})),
				args: {
					limit: { type: GraphQLInt },
					filter: { type: GraphQLString }
				},
				resolve: (_: unknown, args: QueryArgs) => queryCSV(file, args)
			}
		};
	}, {});
	return schema;
};

export const prepareQuery = async (template: string): Promise<unknown> => {
	console.log(template);
	//http.get('/graphql',);
	return {};
};