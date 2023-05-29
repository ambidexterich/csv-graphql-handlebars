import type { Express } from "express";

const graphql = (app: Promise<Express>): Promise<Express> => {
	return app;
};

export default graphql;
