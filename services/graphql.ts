import { Express } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { GraphQLSchema, GraphQLObjectType } from "graphql";
import Graphiql from "graphql-playground-middleware-express";

import { processCSV, queryCSV } from "@/utils/csv.ts";
import { collect } from "@/utils/index.ts";
import type { TemplateConfigList } from "@/types/index.ts";

async function generateSchema(basePath: string, tmpl: TemplateConfigList) {
	const schema = await processCSV(collect(basePath, tmpl));
	return new GraphQLSchema({
		query: new GraphQLObjectType({
			name: "Query",
			fields: () => ({ ...schema })
		})
	});
}

const graphql = async (app: Promise<Express>): Promise<Express> => {
	const appServer = await app;
	const templates =  appServer.get("templates");
	const rootDir = appServer.get("rootDir");

	const handler =  createHandler({ schema: await generateSchema(rootDir, templates) });
	appServer.use("/graphql", handler);
	appServer.use("/playground", Graphiql.default({ endpoint: "/graphql" }));

	return app;
};

export default graphql;
