import { createServer } from "node:http";
import os from "node:os";
import * as dotenv from "dotenv";
import portfinder from "portfinder";
import chalk from "chalk";
import initialize from "@/services/app.ts";
import config from './source.config.json' assert { type: "json" };

dotenv.config();

const DEFAULT_PORT = 4000;
const BASE_PORT = Number(process.env.DEFAULT_PORT ?? DEFAULT_PORT);

const startServer = async () => {
	portfinder.setBasePort(BASE_PORT);

	const activePort = await portfinder.getPortPromise();
	const appServer = await initialize(config);
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
