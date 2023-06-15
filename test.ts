import { schemaHint } from "@/utils/csv-loader.ts";

const res = await schemaHint("./data/states.csv");

console.log(res);
/*const res = await fetch("http://localhost:4000/graphql", {
	method: "POST",
	headers: {
		"Content-type": "application/json"
	},
	body: JSON.stringify({
		query: "query states { states { abbreviation name } }"
	})
});
const json = await res.json();
console.log(json);*/