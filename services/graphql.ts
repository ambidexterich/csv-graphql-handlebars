import { Express } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { GraphQLSchema, GraphQLObjectType, GraphQLFieldConfigMap, GraphQLFieldConfig, GraphQLList, GraphQLInt, GraphQLString, } from "graphql";
import { processCSV, queryCSV } from "@/utils/csv.ts";

function generateSchema(tmpl: object) {
	console.log(tmpl);
	//const schema = processCSV(tmpl)
	return new GraphQLSchema({
		query: new GraphQLObjectType({
			name: "Query",
			fields: () => ({
				states: {
					type: new GraphQLList(new GraphQLObjectType({
						name: "StateCSV",
						fields: {
							abbreviation: { type: GraphQLString }, // GraphQLString
							name: { type: GraphQLString }, // GraphQLString
							population: { type: GraphQLInt } // GraphQLInt
						}
					})),
					// `args` describes the arguments that the `user` query accepts
					args: {
						limit: { type: GraphQLInt },
					},
					resolve: (_, args) => queryCSV("states", args)
				}
			})
		})
	});
}
/*
// Define the Query type
new graphql.GraphQLSchema({
	query: new graphql.GraphQLObjectType({
		name: "Query",
		fields: {
			for template in templates:
			[template.templateName]: {
				type: new graphql.GraphQLObjectType({
					name: template.templateName.toString(),
					fields: {
						for column in template.columns
						[columnHeader]: { type: getType(abbreviation) }, // GraphQLString
						name: { type: getType(name) }, // GraphQLString
						population: { type: getType(population)} // GraphQLInt
					}
				}),
				// `args` describes the arguments that the `user` query accepts
				args: {
					limit: { type: GraphQLInt },
				},
				resolve: (_, args) => {
					const { limit, ...rest } = args;
					return csv.query(csvTable, rest);
				},
			}
		},
	})
})
*/

const graphql = async (app: Promise<Express>): Promise<Express> => {
	const appServer = await app;
	const templates =  appServer.get("templates");
	const handler =  createHandler({ schema: generateSchema(templates) });

	appServer.use("/graphql", handler);

	return app;
};

export default graphql;
