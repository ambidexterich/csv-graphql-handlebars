import type { AppConfig } from "@/types/index.ts";

const defaultDescriptor = {
	configurable: false,
	enumerable: true,
	writable: false,
};

/*
const config = Object.defineProperties(TARGET, {
  KEY: {
    ...defaultDescriptor,
    value: Object.defineProperties(TARGET, {
      KEY: {
        value: 'data/settings.json',
        ...defaultDescriptor
      },
      KEY: {
        ...defaultDescriptor,
        value: ['d/s']
      }
    })
  }
});
*/

function defineProperties(source: AppConfig): AppConfig {
	/*if (typeof source !== 'object') return source;
	
	let base = Object.create(null);
	let target = {}
	for (let key in source) {
		target[key] = {
			...defaultDescriptor,
			value: defineProperties(source[key])
		}
	}
	return Object.defineProperties(Object.create(base, defineProperties())*/
	return source;
}

export const mapper = (config: AppConfig) => {
	const settings = defineProperties(config);
	return Object.freeze(settings);
};
