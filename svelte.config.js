// import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import svg from '@poppanator/sveltekit-svg';
// import netlify from '@sveltejs/adapter-netlify'
import vercel from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess()
	],

	kit: {
		adapter: vercel(),

		// hydrate the <div id="svelte"> element in src/app.html
		vite: {
			// Options are optional
			plugins: [svg()],
			css: { }
		}
	}
};

export default config;
