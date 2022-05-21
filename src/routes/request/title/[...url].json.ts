/* eslint-disable prefer-const */

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
  let { url } = params;
	url = decodeURIComponent(url);

    const parseTitle = (html_body) => {
        let match = html_body.match(/<title>([^<]*)<\/title>/) // regular expression to parse contents of the <title> tag
        if (!match || typeof match[1] !== 'string')
          throw new Error('Unable to parse the title tag')
        return match[1]
      }

	const res  = await fetch(url)
    const body = await res.text();
    const title = parseTitle(body)

    "".match(/<title>([^<]*)<\/title>/)

	return {
		body: {
			title
		}
	};
}