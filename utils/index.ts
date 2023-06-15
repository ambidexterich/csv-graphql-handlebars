import type { CSVPath, TemplateConfigList, TemplateConfigOptions, ZippedObject } from "@/types/index.ts";
import { join } from "node:path";

export { __dirname } from "./patch.ts";
export { mkdirp } from "./mkdirp.ts";


/**
 * Creates an new object out of a array of keys and a array of values.
 *
 * @private
 * @param {Array} props The property identifiers.
 * @param {Array} values The property values.
 * @returns {ZippedObject} Returns the new object.
 */
export const zip = (props: string[]) => {
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
 * Collect the lists of template includes into a single array
 * @param {string} b Base path for starting point of data files
 * @param {TemplateConfigList} o  List of template configuration
 * @returns {Array<string>} Returns an array of string paths
 */
export const collect = (b: string, o: TemplateConfigList): string[] => Object.values(o).map((a: TemplateConfigOptions)=>a.include).reduce((a:CSVPath[],b: CSVPath[]) => a.concat(b)).map((path: string) => join(b, path));
