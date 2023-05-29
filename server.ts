import { createServer } from "node:http";
import os from "node:os";
import * as dotenv from "dotenv";
import portfinder from "portfinder";
import chalk from "chalk";
import initialize from "@/services/app.ts";
import { mapper } from "@/utils/index.ts";
import type { AppConfig } from "@/types/index.ts";

dotenv.config();

const DEFAULT_PORT = 4000;
const BASE_PORT = Number(process.env.DEFAULT_PORT ?? DEFAULT_PORT);

const loadconfig = (): AppConfig => ({
	templates: {},
});

const startServer = async () => {
	portfinder.setBasePort(BASE_PORT);

	const activePort = await portfinder.getPortPromise();
	const appServer = await initialize(mapper(loadconfig()));
	const httpServer = createServer(appServer);

	httpServer.listen(activePort, async () => {
		const url = chalk.blue.underline(
			`http://${os.hostname()}:${activePort}`
		);
		console.info(`Running on ${url}`);
		console.info(chalk.green("Press Ctrl+C to quit"));
	});
};

const server = startServer();
export default server;
