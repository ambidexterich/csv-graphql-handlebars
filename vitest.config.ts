import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {

		//	Define custom aliases when running inside tests. They will be merged with aliases from resolve.alias.
		//	alias: null

		// Options used when running vitest bench
		// benchmark: {
		
		// 	Exclude globs for benchmark test files
		// 	exclude: ['node_modules', 'dist', '.idea', '.git', '.cache']

		// 	Include globs for benchmark test files
		//	include: ['**/*.{bench,benchmark}.?(c|m)[jt]s?(x)']

		// 	Include globs for in-source benchmark test files. This option is similar to includeSource
		// 	includeSource: [],

		// 	Write benchmark results to a file when the --reporter=json option is also specified. By providing an object
		//  instead of a string you can define individual outputs when using multiple reporters.
		// 	outputFile: null

		//  Custom reporter for output. Can contain one or more built-in report names, reporter instances, and/or paths
		// 	to custom reporters.
		//	reporters: 'default'

		// },

		// Will call .mockClear() on all spies before each test. This will clear mock history, but not reset its 
		// implementation to the default one.
		// clearMocks: false,

		coverage: {
			//customProviderModule: 'my-custom-coverage-provider',

			// Indicates which provider should be used to instrument code for coverage
			provider: 'v8', // or 'instanbul'

			// A list of reporter names that Jest uses when writing coverage reports
			// reporter: [
			//	"text",
			//	"html",
			//	"clover",
			//	"json"
			//],
			// reportsDirectory: './coverage'
		},

		// deps: {
		//	"experimentalOptimizer": {},
		//	"external": ['**/node_modules/**'],
		//	"inline": [],
		// 	"fallbackCJS": false,
		//	"registerNodeLoader": false,
		//	"interopDefault": true.
		//	"moduleDirectories": ['node_modules']
		// }

		// exclude: [
		//	'**/node_modules/**',
		//	'**/dist/**',
		//	'**/cypress/**',
		//	'**/.{idea,git,cache,output,temp}/**',
		//	'**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*'
		// ],

		// By default, vitest does not provide global APIs for explicitness. If you prefer to use the APIs globally 
		// like Jest, you can pass the --globals option to CLI or add globals: true in the config.
		// globals: false

		// Include globs for in-source test files.
		// When defined, Vitest will run all matched files with import.meta.vitest inside.
		//include: [
		//	"**/__tests__/**/*.?(c|m)[jt]s?(x)", 
		//	"**/?(*.){test,spec}.?(c|m)[jt]s?(x)"
		// ]

		//includeSource : []

		// Will call .mockReset() on all spies before each test. This will clear mock history and reset its 
		// implementation to an empty function (will return undefined).
		// mockReset: false,

		reporters: 'verbose',

		// Will call .mockRestore() on all spies before each test. This will clear mock history and reset its 
		// implementation to the original one.
		// restoreMocks: false,

		// Path to a custom test runner. This is an advanced feature and should be used with custom library runners
		// Default: node, when running tests, or benchmark, when running benchmarks
		//runner: null
	}
});