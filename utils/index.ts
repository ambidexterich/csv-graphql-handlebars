import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export { zip, collect } from './collections.ts';
export { default as mkdirp } from './mkdirp.ts';
export { default as parseConfig } from './parse-config.ts';
export { default as toGraphQLType } from './to-graphql-type.ts';

export const __dirname = (url: string) => dirname(fileURLToPath(url));