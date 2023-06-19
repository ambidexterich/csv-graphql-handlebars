import { Express, Request } from 'express';
import bindQueryData from '@/utils/bind-data.ts';
import { join } from 'node:path';



const router = async (app: Promise<Express>): Promise<Express> => {
	const appServer = await app;
	const templates = appServer.get('templates');
	const rootDir = appServer.get('rootDir');

	appServer.get('/t/:template', async (request, response) => {
		const tmpl = request.params.template;
		
		response.render(tmpl, await bindQueryData(request, join(rootDir, templates[tmpl].config)));
	});
	return await appServer;
};

export default router;
