import { resolve } from "node:path";
import { Express } from "express";
import { engine } from "express-handlebars";
import { mkdirp } from "@/utils/index.ts";

const handlebars = async (
	app: Promise<Express>,
	path: string
): Promise<Express> => {
	const appServer = await app;
	appServer.engine(
		".html",
		engine({
			extname: ".html",
			defaultLayout: false,
		})
	);

	const viewDir = await mkdirp(resolve(path, "templates"));
	appServer.set("views", viewDir);
	appServer.set("view engine", ".html");
	return await appServer;
};

export default handlebars;
