export type AbsolutePath = string;
export type RelativePath = string;
export type CSVPath = string;

export type TemplateConfigOptions = {
	config: RelativePath;
	include: CSVPath[];
};
export type TemplateConfigList = {
	[key: string]: TemplateConfigOptions
}
export type AppConfig = {
	templates: TemplateConfigList;
}

/**
 * Argument object to apply to the resolver results
 * @typedef {Object} QueryArgs
 * @property {string} filter - Filter the list base on string match
 * @property {number} limit - The number of items to limit the results
 */
export type QueryArgs = {
	filter: string;
	limit: number;
}

/**
 * A generic object
 * @typedef {{Object.<string, string>}} ZippedObject
 */
export type ZippedObject = {
	[key: string]: string;
}
/** @type {Array<ZippedObject>} */
export type CSVResponse = Array<ZippedObject>

export type CSVColumnData = string | number | boolean;
export type CSVRowData = { [column: string]: CSVColumnData }
export type CSVTableData = {
	[table: string]: Array<CSVRowData>;
}
export type  GraphQLCSVResponse = {
	data: CSVTableData
}