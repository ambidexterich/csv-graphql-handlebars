type RelativePath = string;
export type CSVPath = string;

export type TemplateConfigOptions = {
	config: RelativePath;
	include: CSVPath[];
};
export type TemplateConfigList = {
	[key: string]: TemplateConfigOptions
}
export interface AppConfig {
	templates: TemplateConfigList;
}

/**
 * Argument object to apply to the resolver results
 * @typedef {Object} QueryArgs
 * @property {number} limit - The number of items to limit the results
 */
export interface QueryArgs {
	limit: number;
}

/**
 * A generic object
 * @typedef {{Object.<string, string>}} ZippedObject
 */
export interface ZippedObject {
	[key: string]: string;
}
/** @type {Array<ZippedObject>} */
export type CSVResponse = Array<ZippedObject>
