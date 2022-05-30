<script lang="ts">
	import { onMount } from 'svelte';
	import Video from '../components/video.svelte';
	import PlaylistColumn from '../components/playlist-column.svelte';
	import InputSection from '../components/playlist-input.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/env';

	type Video = {
		id: number;
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
	let theaterMode = false;
	let columns_element: HTMLElement;
	let playlist_column_element: HTMLElement;
	let input_area_element: HTMLElement;
	$: input, populateVideos();

	onMount(async function () {
		// If playlist is a stored playlist load from DB otherwise load manually
		if (isSavedPlaylist) {
			hydrateVideosFromDB();
			document.title = playlist_title;
		}
		let index_param = $page.url.searchParams.get('index');
		let index = parseInt(index_param) || 0;
		// Allow time for videos to be populated by populateVideos()
		await new Promise((r) => setTimeout(r, 500));
		loadVideo(index);
	});

	const populateVideos = async () => {
		if (input === '') return;
		// Initial index is the first index of the new batch of videos
		let initial_index = videos.length;
		let urls = validateInput();
		videos.length += urls.length;
		for (let i = 0; i < urls.length; i++) {
			let video_ind = i + initial_index;
			let domain = urls[i].split('/')[2].replace('www.', '').split('.')[0];
			videos[video_ind] = {
				id: video_ind,
				url: urls[i],
				src: '',
				title: 'Loading Title...',
				domain
			};
		}
		fetchVideoSrc(initial_index, videos[initial_index].url, videos[initial_index].domain);
		fetchNextTwoVideoSrcs(initial_index);
		fetchVideoTitles(initial_index);
		input = '';
	};

	function hydrateVideosFromDB() {
		videos.length = urls.length;
		for (let i = 0; i < urls.length; i++) {
			let domain = urls[i].split('/')[2].replace('www.', '').split('.')[0];
			videos[i] = { id: i, url: urls[i], src: '', title: titles[i] || 'Unknown Title', domain };
		}
		fetchVideoSrc(0, videos[0].url, videos[0].domain);
		fetchNextTwoVideoSrcs(0);
		fetchVideoTitles(0);
	}

	const validateInput = () => {
		let urls = input.split('\n');
		let urlRegex = /^http[s]?\:\/\/(\w*\.)?\w*\.\w*\/.*$/m;
		for (let i = 0; i < urls.length; i++) {
			urls[i] = urls[i].trim();
			const isProperUrl = urlRegex.test(urls[i]);
			if (!isProperUrl) {
				urls.splice(i, 1);
				i--;
			}
		}
		return urls;
	};

	const loadVideo = async (index: number) => {
		ind = index;
		// If the video_src has already been fetched break from function
		if (!videos[index].src) {
			fetchVideoSrc(index, videos[index].url, videos[index].domain);
		}
		fetchNextTwoVideoSrcs(index);
		updateQueryParams();
	};

	const loadNextVideo = async () => {
		if (ind + 1 >= videos.length) return;
		ind += 1;
		// If the video_src has already been fetched, skip
		if (!videos[ind].src) {
			fetchVideoSrc(ind, videos[ind].url, videos[ind].domain);
		}
		fetchNextTwoVideoSrcs(ind);
		updateQueryParams();
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
			case 'dailymotion': {
				let video_id = url.split('/')[4];
				videos[index].src = video_id;
				break;
			}
			default: {
				url = encodeURIComponent(url);
				let endpoint = `https://puppeteer-fetch-video.vercel.app/api/fetch?page=${url}`;
				const res = await fetch(endpoint);
				const data = await res.json();
				videos[index].src = data.src;
			}
		}
	};

	const fetchNextTwoVideoSrcs = async (index: number) => {
		for (let i = 1; i < 3; i++) {
			if (index + i < videos.length && !videos[index + i].src) {
				fetchVideoSrc(index + i, videos[index + i].url, videos[index + i].domain);
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

	const updateQueryParams = () => {
		if (window.history.pushState) {
			const newURL = new URL(window.location.href);
			newURL.search = `?index=${ind}`;
			window.history.pushState({ path: newURL.href }, '', newURL.href);
		}
	};

	const deleteVideo = async (index: number) => {
		// Using videos.splice would directly change the state of the array
		// And it will not trigger a re-render as a result
		videos = videos.filter((video, i) => i !== index);
		if (index < ind) {
			ind -= 1;
		}
	};

	const handleTheaterMode = () => {
		// If running on the server then exit the routine
		if (!browser) return;
		if (!theaterMode) {
			// Move playlist down to allow space for player
			columns_element.removeChild(playlist_column_element);
			input_area_element.appendChild(playlist_column_element);
			theaterMode = true;
		} else {
			// Restore playlist to original position
			input_area_element.removeChild(playlist_column_element);
			columns_element.appendChild(playlist_column_element);
			theaterMode = false;
		}
	};
</script>

<a href="/" style="text-decoration: none">
	<span class="header"> QuixList </span>
</a>
<div class="columns" bind:this={columns_element}>
	<div class="video-wrapper" class:theater-height={theaterMode}>
		{#if videos[ind]?.src}
			<Video
				video_src={videos[ind]?.src}
				domain={videos[ind]?.domain}
				{ind}
				{loadNextVideo}
				{handleTheaterMode}
			/>
		{/if}
	</div>
	<div class="playlist-column" class:float-right={theaterMode} bind:this={playlist_column_element}>
		<PlaylistColumn
			bind:items={videos}
			title={playlist_title}
			id={playlistId}
			{ind}
			{isSavedPlaylist}
			{loadVideo}
			{deleteVideo}
		/>
	</div>
</div>
<div class="input-area" bind:this={input_area_element}>
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
		width: 90%;
		height: calc(76vw * (9 / 16));
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
	.theater-height {
		--offset: 10px;
		--height-ratio: calc(90vw * (9 / 16));
		height: calc(var(--height-ratio) - var(--offset));
	}
	.float-right {
		float: right;
		margin-top: 10px;
		margin-right: 2%;
	}

	:global(body) {
		background-color: #f1b362;
	}
</style>
