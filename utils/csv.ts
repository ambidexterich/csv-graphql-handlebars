import type { CSVResponse, QueryArgs } from "@/types/index.ts";
import { loader, schemaHint } from "@/utils/csv-loader.ts";
import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { mapGraphQLType, zip } from "@/utils/index.ts";
import { parse } from "node:path";

/**
 * Generate the field schema for a given file
 * @param {string} file Full path to data file 
 * @returns {object} Computer schema with appropriate types
 */
const buildHeaderTypes = async (file: string) => {
	const [headers, firstRow] = await schemaHint(file);
	return headers.reduce((fields, header, idx) => ({
		...fields,
		[header]: { type: mapGraphQLType(firstRow[idx]) }
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

export const prepareQuery = (template: string): object => {
	console.log(template);
	return {};
};