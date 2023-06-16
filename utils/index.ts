import type { CSVPath, TemplateConfigList, TemplateConfigOptions, ZippedObject } from "@/types/index.ts";
import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLString } from "graphql";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { mkdir, opendir } from "node:fs/promises";

export const __dirname = (url: string) => dirname(fileURLToPath(url));

/**
 * Creates an new object out of a array of keys and a array of values.
 *
 * @private
 * @param {Array} props The property identifiers.
 * @param {Array} values The property values.
 * @throws {TypeError}
 * @returns {ZippedObject} Returns the new object.
 */
export const zip = (props: string[]) => {
	
	if (!Array.isArray(props)) throw new TypeError("`props` must be an array");

	return (values: string[]): ZippedObject  => {

		if (!Array.isArray(values)) throw new TypeError("`values` must be an array");

		const len = Math.min(props.length, values.length);
		const result: { [key: string]: string } = {};
		let idx = 0;

		while(idx < len) {
			result[props[idx]] = values[idx];
			idx += 1;
		}

		return result;
	};
};

/**
 * Collect the lists of template includes into a single array
 * @param {string} b Base path for starting point of data files
 * @param {TemplateConfigList} o  List of template configuration
 * @returns {Array<string>} Returns an array of string paths
 */
export const collect = (b: string, o: TemplateConfigList): string[] => {
	return Object.values(o).map((a: TemplateConfigOptions)=>a.include).reduce((a:CSVPath[],b: CSVPath[]) => a.concat(b)).map((path: string) => join(b, path));
};

/**
 * Return the proper GraphQL types from the strings returned from CSV
 * @param {string} input the string to infer it's type
 * @returns 
 */
export const mapGraphQLType = (input: string) => {
	if (input === parseInt(input).toString()) return GraphQLInt;
	if (input === parseFloat(input).toString()) return GraphQLFloat;
	if (input === "true" || input === "false") return GraphQLBoolean;

	return GraphQLString;
};

/**
 * Create a directory if it doesn't already exist
 * @param {string} path 
 * @returns 
 */
export const mkdirp = async (path: string): Promise<string> => {
	try {
		const dir = await opendir(path);
		dir.close();
		return Promise.resolve(path);
	} catch (e) {
		await mkdir(path, { recursive: true });
		return Promise.resolve(path);
	} 
};