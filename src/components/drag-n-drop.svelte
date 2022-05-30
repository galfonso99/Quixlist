<script lang="ts">
	import VideoItem from './video-item.svelte';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';

	export let items;
	export let ind;
	export let scroll;
	export let loadVideo;
	export let deleteVideo;

	const flipDurationMs = 200;

	function handleSort(e: CustomEvent<DndEvent>) {
		items = e.detail.items;
	}

	function handleSortFinalize(e: CustomEvent<DndEvent>) {
		items = e.detail.items;
	}
</script>

<section
	use:dndzone={{ items, flipDurationMs }}
	class="items drag-n-drop"
	on:consider={handleSort}
	on:finalize={handleSortFinalize}
>
	{#each items as video (video.id)}
		<div animate:flip={{ duration: flipDurationMs }}>
			<VideoItem
				ind={items.indexOf(video)}
				title={video?.title}
				domain={video?.domain}
				url={video?.url}
				selected={ind === items.indexOf(video)}
				bind:scroll
				{loadVideo}
				{deleteVideo}
			/>
		</div>
	{/each}
</section>

<style>
	.drag-n-drop {
		overflow-y: scroll;
		overflow-x: hidden;
		outline: none !important;
	}

	.items {
		overflow-y: auto;
	}
</style>
