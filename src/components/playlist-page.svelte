<script lang="ts">
	import { onMount } from 'svelte';
	import Video from '../components/video.svelte';
	import PlaylistColumn from '../components/playlist-column.svelte';
	import InputSection from '../components/playlist-input.svelte';
    
	type Video = {
        url: string;
		src: string;
		title: string;
		domain: string;
	};

    // Default value is false
    export let isSavedPlaylist = false;
    export let playlistProps: any = {};

	let { urls, titles, playlist_title, playlistId } = playlistProps;

	let ind = 0;
	let input: string = '';

	let videos: Video[] = [];

	$: input, populateVideos()


	onMount(async function () {
		// For testing
		input = 'https://www.youtube.com/watch?v=Ra-Om7UMSJc\nhttps://vimeo.com/101653610\nhttps://www.youtube.com/watch?v=b7k0a5hYnSI\nhttps://www.youtube.com/watch?v=1TO48Cnl66w\nhttps://www.youtube.com/watch?v=agrXgrAgQ0U';
	});

	const populateVideos = async () => {
		if (input === '') return;
		// Initial index is the first index of the new batch of videos
		let initial_index = videos.length;
		let urls = input.split('\n');
		videos.length += urls.length;
		for (let i = 0; i < urls.length; i++) {
			let video_ind = i + initial_index;
			let domain = urls[i].split('/')[2].replace('www.', '').split('.')[0];
			videos[video_ind] = {
				url: urls[i],
				src: '',
				title: 'Loading Title...',
				domain
			};
		}
		fetchVideoSrc(initial_index, videos[initial_index].url, videos[initial_index].domain);
		fetchVideoTitles(initial_index);
		input = '';
	};

	const loadVideo = async (index: number) => {
		ind = index;
		// If the video_src has already been fetched break from function
		if (!videos[index].src) {
			fetchVideoSrc(index, videos[index].url, videos[index].domain);
		}
	};

	const fetchVideoSrc = async (index: number, url: string, domain: string) => {
		switch (domain) {
			case 'youtube': {
				let video_id = url.split('watch?v=')[1].split('&')[0];
				videos[index].src = video_id;
				break;
			}
			case 'vimeo': {
				let video_id = url.split('/')[3];
				videos[index].src = video_id;
				break;
			}
			default: {
				// Add a way to fetch video src from video tags (not iframes)
			}
		}
	};

	const fetchVideoTitles = async (initial_index) => {
		for (let i = initial_index; i < videos.length; i++) {
			if (videos[i].title !== 'Loading Title...') continue;
			let url = encodeURIComponent(videos[i].url);
			let endpoint = `/request/title/${url}.json`;
			const res = await fetch(endpoint);
			const data = await res.json();
			videos[i].title = data.title;
		}
	};

</script>

<a href="/" style="text-decoration: none">
	<span class="header"> QuixList </span>
</a>
<div class="columns">
	<div class="video-wrapper">
		{#if videos[ind]?.src}
		<Video video_src={videos[ind]?.src} domain={videos[ind]?.domain} />
		{/if}
	</div>
	<div class="playlist-column" >
		<PlaylistColumn
				bind:items={videos}
				title={playlist_title}
				{ind}
				id = {playlistId}
				{isSavedPlaylist}
				{loadVideo}
			/>
		</div>

</div>
<div class="input-area">
	<div class="input-wrapper">
		<InputSection bind:input />
	</div>
</div>

<style>
	.header {
		font-family: 'Comic Sans MS';
		font-size: 50px;
		font-weight: bold;
		vertical-align: middle;
		margin-left: 20px;
		color: rgb(255, 201, 108);
		-webkit-text-stroke: 3px navy;
	}
	.columns {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
	.video-wrapper {
		width: 96%;
		height: calc(75vw * (9 / 16));
		flex-direction: column;
		margin: 0px 10px;
		border-radius: 15px;
		background-color: #262021e0;
		overflow: hidden;
	}
	.input-wrapper {
		width: 50%;
		float: left;
	}

	:global(body) {
		background-color: #f1b362;
	}
</style>
