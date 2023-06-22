import packageJson from "@package.json";
const config = {
	siteName: packageJson.name,
	// siteName: 'Мой сайт',
	mode: process.env.NODE_ENV,
	baseUrl: process.env.PUBLIC_URL,
};

export default config;
