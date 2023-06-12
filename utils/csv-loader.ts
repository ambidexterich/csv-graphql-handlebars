import { createReadStream } from "fs";
import { parse } from "csv-parse";

export const loader = async (file: string): Promise<string[][]> => {
	return new Promise((resolve) => {
		const results: string[][] = [];
		createReadStream(file)
			.pipe(parse())
			.on("data", d => results.push(d))
			.on("end", () => resolve(results));
	});
};