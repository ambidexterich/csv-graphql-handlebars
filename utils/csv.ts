import type { CSVResponse, QueryArgs } from "@/types/index.ts";
import { loader } from "@/utils/csv-loader.ts";
import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { zip } from "./index.ts";
import { parse } from "node:path";

/**
 * Resolver to read data from a specific CSV file
 * @param {string} table - Name of the CSV file to query
 * @param {...?QueryArgs} args 
 * @returns {Promise<ZippedObject[]>}
 */
export const queryCSV = async (table: string, args: QueryArgs): Promise<CSVResponse> => {
	const csv = await loader(`./data/${table}.csv`);
	const [headers, ...rest] = csv;
	const results: CSVResponse = rest.map(zip(headers));

	return args.limit ? results.slice(0, args.limit) : results;
};

export const processCSV = async (tables: string[]) => {
	console.log(tables.reduce((acc, s) => ({
		...acc,
		[parse(s).name]: {
			type: new GraphQLList(new GraphQLObjectType({
				name: "StateCSV",
				fields: {
					abbreviation: { type: GraphQLString }, // GraphQLString
					name: { type: GraphQLString }, // GraphQLString
					population: { type: GraphQLInt } // GraphQLInt
				}
			}))
		}
	}), {}));
	return {
		states: {
			type: new GraphQLList(new GraphQLObjectType({
				name: "StateCSV",
				fields: {
					abbreviation: { type: GraphQLString }, // GraphQLString
					name: { type: GraphQLString }, // GraphQLString
					population: { type: GraphQLInt } // GraphQLInt
				}
			})),
			// `args` describes the arguments that the `user` query accepts
			args: {
				limit: { type: GraphQLInt },
				filter: { type: GraphQLString }
			},
			resolve: (_: unknown, args: QueryArgs) => queryCSV("states", args)
		}
	};
};

export const prepareQuery = (template: string): object => {
	return {};
};