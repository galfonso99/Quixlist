<script lang="ts">
	import { onMount } from 'svelte';
	import Video from '../components/video.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/env';


	type Video = {
		url: string;
		src: string;
		title: string;
		domain: string;
	};

	let ind = 0;

	let videos: Video[] = [];


	onMount(async function () {
		videos = [{
				url: "test.com",
				src: 'Ra-Om7UMSJc',
				title: 'Loading Title...',
				domain: 'youtube'
			}]
	});





</script>

<div>
	<div class="video-wrapper">
		<Video video_src={videos[ind]?.src} domain={videos[ind]?.domain} />
	</div>
</div>

<style>
	.video-wrapper {
		width: 96%;
		flex-direction: column;
		margin: 0px 10px;
		border-radius: 15px;
		background-color: #262021e0;
		overflow: hidden;
	}

	:global(body) {
		background-color: #62f1ee;
	}
</style>
