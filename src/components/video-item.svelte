<script lang="ts">
	import { onMount } from 'svelte'
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

	export let title;
	export let domain;
	export let url;
	export let ind;
	export let loadVideo;
	export let deleteVideo;
	export let selected;

	let videoItem;


	onMount(async function () {
		// Stall for time so the actual videoIndex loads
		// Then if videoIndex is out of view scroll it into view
		await new Promise((r) => setTimeout(r, 1000));
		scrollIntoView()
		
		
	});
	const scrollIntoView = async () => {
		if (selected) {
			videoItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}
</script>

<div class="wrapper" on:click={loadVideo(ind)} class:selected bind:this={videoItem}>
	<div class="index-wrapper">
		<span id="index">{ind + 1}</span>
	</div>
	<div class="video-info">
		<span id="title" {title}>{title}</span>
		<a href={url} class="anchor">
			<span id="origin">{domain}</span>
		</a>
	</div>
	<div
		class="delete-btn"
		on:click={(e) => {
			e.stopPropagation();
			deleteVideo(ind);
		}}
	>
		<Fa icon={faTrash} />
	</div>
</div>

<style>
	.wrapper {
		padding: 5px 10px;
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-content: center;
		cursor: pointer;
	}
	span#title {
		/* font-size: 1.4rem; */
		color: white;
		margin: 5px 0px;
		font-family: 'Roboto', 'Arial', sans-serif;
		font-size: 1.1rem;
		line-height: 1.8rem;
		font-weight: 700;
		max-height: 3.5rem;
		overflow: hidden;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		white-space: normal;
	}
	span#origin {
		font-size: 1rem;
		font-weight: 700;
		color: rgb(143, 141, 141);
		margin: 10px 0px;
	}

	span#index {
		font-size: 1rem;
		font-weight: 700;
		color: white;
	}

    .selected {
		background-color: #515151d2;
	}

	.index-wrapper {
		/* align-self: center; */
		display: flex;
		align-items: center;
		margin: 0px 3px;
	}

	.video-info {
		/* width: 18vw; */
		width: 100%;
		margin: 0px 10px;
	}

	.delete-btn {
		align-self: center;
		justify-self: center;
		margin-left: 10px;
		width: 1.3rem;
		height: 1.3rem;
		font-size: 1em;
		color: white;
	}

	.anchor {
		text-decoration: none;
		color: white;
		font-size: 15px;
		font-weight: bold;
	}
</style>
