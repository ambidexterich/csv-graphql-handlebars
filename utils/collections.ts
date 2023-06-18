import { CSVPath, TemplateConfigList, TemplateConfigOptions, ZippedObject } from '@/types/index.ts';
import { join } from 'node:path';

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
	
	if (!Array.isArray(props)) throw new TypeError('`props` must be an array');

	return (values: string[]): ZippedObject  => {

		if (!Array.isArray(values)) throw new TypeError('`values` must be an array');

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