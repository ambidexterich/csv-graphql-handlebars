import { Express } from "express";
import { prepareQuery } from "@/utils/csv.ts";

const router = async (app: Promise<Express>): Promise<Express> => {
	const appServer = await app;

	appServer.get("/t/:template", (request, response) => {
		const tmpl = request.params.template;
		response.render(tmpl, prepareQuery(tmpl));
	});
	return await appServer;
};

export default router;
