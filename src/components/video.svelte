<script lang="ts">
	import { onMount } from 'svelte';
	import PlayerCustomUi from './player-custom-ui.svelte';
	export let video_src;
	export let domain;
	export let loadNextVideo: () => void = () => undefined;
	export let handleTheaterMode = () => undefined;

	let playerHasMounted = false;

	let player;

	const autoplay = async () => {
		await new Promise((r) => setTimeout(r, 200));
		player.play();
	};

	const skipAhead = () => {
		player.currentTime += 10;
	};

	onMount(async function () {
		const { defineCustomElements } = await import('@vime/core');
		defineCustomElements();
		playerHasMounted = true;
	});
</script>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@vime/core@^5/themes/default.css" />

{#if playerHasMounted && domain}
	{#key video_src}
			<vm-player
				autoplay
				volume="100"
				theme="dark"
				bind:this={player}
				on:vmPlaybackEnded={loadNextVideo}
				on:vmPlaybackReady={autoplay}
			>
				{#if domain === 'youtube'}
					<vm-youtube video-id={video_src} />
					<PlayerCustomUi {loadNextVideo} {skipAhead} {handleTheaterMode}/>
				{:else if domain === 'vimeo'}
					<vm-vimeo video-id={video_src} />
					<PlayerCustomUi {loadNextVideo} {skipAhead} {handleTheaterMode} />
				{:else}
					<vm-video>
						<source src={video_src} type="video/mp4" />
						<PlayerCustomUi {loadNextVideo} {skipAhead} {handleTheaterMode}/>
					</vm-video>
				{/if}
			</vm-player>
	{/key}
{/if}

<style>
	vm-player {
		--vm-slider-value-color: rgb(250, 88, 1);
		--vm-player-theme: #a4a0a064;
		--vm-slider-track-height: 7px;
		--vm-slider-track-focused-height: 9px;
		--vm-slider-thumb-width: 17px;
		--vm-slider-thumb-height: 17px;
	}
</style>
