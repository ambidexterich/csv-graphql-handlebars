type RelativePath = string;
type CSVPath = string;

export interface AppConfig {
	templates: {
		[key: string]: {
			config: RelativePath;
			include: CSVPath[];
		};
	};
}
