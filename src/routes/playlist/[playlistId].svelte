<script context="module">
	import { db } from '../../Firebase';
	import { ref, get } from "firebase/database";

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch }) {
		const { playlistId } = params;

		const playlistRef = ref(db, `playlists/${playlistId}/videos`);
		const playlist = await get(playlistRef);
		let iter = Object.values(playlist.val());
		const video_urls = iter.map((video) => video['video_url']);
		const video_titles = iter.map((video) => video['video_title']);
		const titleRef = ref(db, `playlists/${playlistId}/title`);
		const title = (await get(titleRef)).val();

		return {
			props: {
				playlistProps: {
					urls: video_urls,
					titles: video_titles,
					playlist_title: title,
					playlistId
				}
			}
		};
	}
</script>

<script lang="ts">
	import PlaylistPage from '../../components/playlist-page.svelte';
	export let playlistProps;
</script>

<PlaylistPage isSavedPlaylist={true} {playlistProps} />