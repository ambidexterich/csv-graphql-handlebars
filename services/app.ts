import { join } from 'path';
import express, { Express } from 'express';
import { __dirname } from '@/utils/index.ts';
import handlebars from './handlebars.ts';
import graphql from './graphql.ts';
import router from './router.ts';
import { AppConfig } from '@/types/index.ts';

const initialize = async (config: AppConfig): Promise<Express> => {
	const app = express();
	const appPath = __dirname(join(import.meta.url, '..'));
	const fns = [router, handlebars.bind(null, appPath), graphql];

	app.set('templates', config.templates);
	app.set('rootDir', appPath);
	app.use(express.static(join(appPath, 'public')));

	return fns.reduce((app: Promise<Express>, fn: (a: Promise<Express>)=>Promise<Express>): Promise<Express> => {
		return fn(app);
	}, Promise.resolve(app));
};

export default initialize;
