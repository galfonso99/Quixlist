<script lang="ts">
	import { onMount } from 'svelte';
	import Video from '../components/video.svelte';
	import { page } from '$app/stores';


	type Video = {
		src: string;
		title: string;
		domain: string;
	};

	let video: Video = {
		src: '',
		title: 'Fetching video...',
		domain: '',
	};

	let address = $page.url.pathname.slice(1)
	let params = $page.url.search;
	let url = address + params;

	// In case it was incoded by the browsed, just decode it
	url = decodeURIComponent(url)
    
	let domain = url.split('/')[2].replace('www.', '').split('.')[0];
	
	const fetchVideoDetails = async () => {
        getVideoSrc(url, domain);
		url = encodeURIComponent(url)
		const title_res = await fetch(`/request/title/${url}.json`);
		const data_title = await title_res.json();
		video.title = data_title.title;
		video.domain = domain;
	};

    const getVideoSrc = async (url: string, domain: string) => {
		switch (domain) {
			case 'youtube': {
				let video_id = url.split('watch?v=')[1].split('&')[0];
				video.src = video_id;
				break;
			}
			case 'vimeo': {
				let video_id = url.split('/')[3];
				video.src = video_id;
				break;
			}
			default: {
                url = encodeURIComponent(url);
				let endpoint = `https://puppeteer-fetch-video.vercel.app/api/fetch?page=${url}`;
				const res = await fetch(endpoint);
				const data = await res.json();
				video.src = data.src;
			}
		}
	};

	onMount(function () {
		fetchVideoDetails()
	})
</script>

<div>
	<a href='/' style='text-decoration: none'>
		<span class="header"> QuixList </span>
	</a>
	{#if video.title}
			<h1 id="title"> {video.title}</h1>
		{/if}
	<div class="video-wrapper">
		
		{#if video.src}
			<Video video_src={video.src} domain={video.domain} />
		{/if}
	</div>
</div>

<style>
	.video-wrapper {
		width: 90vw;
		height: calc(90vw * (9 / 16)); /* maintaining the aspect ratio of 16:9 */
		flex-direction: column;
		/* margin: 0px 10px; */
		border-radius: 15px;
		background-color: #262021e0;
		overflow: auto;
		display: flex;
		align-self: center;
		margin: 0 auto;
		
	}

	.header {
		font-family: 'Comic Sans MS';
		font-size: 50px;
		font-weight: bold;
		vertical-align: middle;
		margin-left: 20px;
		color: rgb(255, 201, 108);
		-webkit-text-stroke: 3px navy;
	}

	#title {
		margin-left: 5vw;
		font-style: italic;
	}

	:global(body) {
		background-color: #f1b362;
	}
</style>
