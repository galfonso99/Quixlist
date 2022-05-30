import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess()
	],

	kit: {
		adapter: adapter(),

		vite: {
		}
	}
};

export default config;
