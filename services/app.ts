import { join } from "path";
import express, { Express } from "express";
import { __dirname } from "@/utils/patch.ts";
import handlebars from "./handlebars.ts";
import graphql from "./graphql.ts";
import router from "./router.ts";
import { AppConfig } from "@/types/index.ts";

const initialize = async (config: AppConfig): Promise<Express> => {
	const app = express();
	const appPath = __dirname(join(import.meta.url, ".."));

	app.set('templates', config.templates);
	app.use(express.static(join(appPath, "public")));

	return router(graphql(handlebars(Promise.resolve(app), appPath)));
};

export default initialize;
