import { createReadStream } from "fs";
import { createInterface } from "readline";
import { parse } from "csv-parse";

export const loader = async (file: string): Promise<string[][]> => {
	return new Promise((resolve) => {
		const results: string[][] = [];
		// Assign to own variable to access within Events
		const readStream = createReadStream(file);

		readStream
			.pipe(parse())
			.on("data", d => results.push(d))
			.on("end", () => resolve(results));
	});
};

export const schemaHint = async (file: string): Promise<string[][]> => {
	return new Promise(resolve => {
		const lr = createInterface(createReadStream(file));
		const results: string[][] = [];

		lr.on("line", line => {
			if (results.length === 2) lr.close();
			// This is naive implementation as a comma could appear in the middle of a string
			results.push(line.split(","));
		});
		lr.on("close", () => resolve(results));
	});
};