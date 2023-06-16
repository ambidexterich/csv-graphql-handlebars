import { mkdir, opendir } from "node:fs/promises";
import { describe, expect, it, test, vi } from "vitest";
import { __dirname, collect, mapGraphQLType, mkdirp, zip } from "../utils/index.ts";
import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLString } from "graphql";

vi.mock("node:fs/promises", () => {
	const mkdir = vi.fn();
	const opendir = vi.fn();

	return {
		mkdir,
		opendir
	};
});

describe("utils#mkdirp", () => {
	it("should successfully resolve if folder exists", async () => {
		const path = "/path/examples";

		// @ts-ignore
		opendir.mockResolvedValueOnce(path);
		expect(await mkdirp(path)).toBe(path);
	});

	it("should make the folder if it doesn't exist", async () => {
		const path = "/path/example";

		// @ts-ignore
		opendir.mockRejectedValueOnce(new Error());
		// @ts-ignore
		mkdir.mockResolvedValueOnce(path);
		await expect(mkdirp(path)).resolves.toBe(path);
	});
});

describe("utils#mapGraphQLType", () => {
	test("infers int", () => {
		expect(mapGraphQLType("3")).toBe(GraphQLInt);
	});

	test("infers float", () => {
		expect(mapGraphQLType("3.12")).toBe(GraphQLFloat);
	});

	test("infers boolean", () => {
		expect(mapGraphQLType("true")).toBe(GraphQLBoolean);
	});

	test("infers string", () => {
		expect(mapGraphQLType("string")).toBe(GraphQLString);
	});

	test("defaults to string", () => {
		expect(mapGraphQLType("{ o: 1 }")).toBe(GraphQLString);
	});
});

describe("utils#zip", () => {
	const keys = ["a", "b"];
	const values = [1, 2];

	test("throws when first call isn't array", () => {
		// @ts-ignore 
		expect(() => zip(1)).toThrow("`props` must be an array");
	});
	
	test("throws when second call isn't array", () => {
		const fn = zip(keys);
		// @ts-ignore 
		expect(() => fn(1)).toThrow("`values` must be an array");
	});

	test("zip 2 arrays", () => {
		const fn = zip(keys);
		// @ts-ignore
		expect(fn(values)).toEqual({ a: 1, b: 2});
	});

	test("zip from the smaller of 2 unbalances arrays", () => {
		const fn = zip(keys);
		// @ts-ignore 
		expect(fn(values.concat(3))).toEqual({ a: 1, b: 2});
	});
});

describe("utils#collect", () => {
	const data = {
		"template": {
			"config": "data/template.config.json",
			"include": ["data/plans.csv"]
		},
		"example": {
			"config": "data/example.config.json",
			"include": ["data/states.csv", "data/cities.csv"]
		}
	};
	test("collect includes into single array", () => {
		expect(collect("basepath", data)).toStrictEqual(["basepath/data/plans.csv", "basepath/data/states.csv", "basepath/data/cities.csv"]);
	});
});

describe("utils#__dirname", () => {
	//console.log(process.cwd());
	//test(__dirname(process.cwd()))
});