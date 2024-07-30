import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				primary: ["var(--font-manrope)"],
				secondary: ["var(--font-roboto)"],
			},
			colors: {
				primary: "#a00061",
				secondary: "#FFD6E7",
			},
		},
	},
	plugins: [],
};
export default config;
