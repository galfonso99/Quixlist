<script lang="ts">
	import { onMount } from 'svelte';
	import Video from '../components/video.svelte';
	import PlaylistColumn from '../components/playlist-column.svelte';


	type Video = {
		url: string;
		src: string;
		title: string;
		domain: string;
	};

	let ind = 0;
	let playlist_title;

	let videos: Video[] = [];


	onMount(async function () {
		videos = [{
				url: "test.com",
				src: 'Ra-Om7UMSJc',
				title: 'Loading Title...',
				domain: 'youtube'
			},
			{
				url: "test.com",
				src: '101653610',
				title: 'Loading Title...',
				domain: 'vimeo'
			},
			{
				url: "test.com",
				src: 'b7k0a5hYnSI',
				title: 'Loading Title...',
				domain: 'youtube'
			},
			{
				url: "test.com",
				src: '1TO48Cnl66w',
				title: 'Loading Title...',
				domain: 'youtube'
			},
			{
				url: "test.com",
				src: 'agrXgrAgQ0U',
				title: 'Loading Title...',
				domain: 'youtube'
			}]
	});



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
				{loadVideo}
			/>
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

	:global(body) {
		background-color: #f1b362;
	}
</style>
