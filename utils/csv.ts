import { loader } from "@/utils/csv-loader.ts";

/**
 * Argument object to apply to the resolver results
 * @typedef {Object} QueryArgs
 * @property {number} limit - The number of items to limit the results
 */
interface QueryArgs {
	limit: number;
}

/**
 * A generic object
 * @typedef {{Object.<string, string>}} ZippedObject
 */
interface ZippedObject {
	[key: string]: string;
}
/** @type {Array<ZippedObject>} */
type CSVResponse = Array<ZippedObject>

/**
 * Creates an new object out of a array of keys and a array of values.
 *
 * @private
 * @param {Array} props The property identifiers.
 * @param {Array} values The property values.
 * @returns {ZippedObject} Returns the new object.
 */
const zip = (props: string[]) => {
	const accumulator: { [key: string]: string } = {};
	return (values: string[]): ZippedObject  => {
		const results = values.reduce((acc: typeof accumulator, v:string, i: number) => {
			return {
				...acc,
				[props[i]] : v
			};
		}, accumulator);
		return results;
	};
};

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

export const processCSV = async (table: string) => {};

export const prepareQuery = (template: string): object => {
	return {};
};