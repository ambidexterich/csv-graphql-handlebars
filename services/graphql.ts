import type { Express } from "express";

const graphql = async (app: Promise<Express>): Promise<Express> => {
	const appServer = await app;
	console.log(appServer.get('templates'));
	return app;
};

export default graphql;
