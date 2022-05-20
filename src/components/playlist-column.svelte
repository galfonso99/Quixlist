<script lang="ts">
	import VideoItem from './video-item.svelte';

	export let items;
	export let title = '';
	export let ind;
	export let loadVideo
</script>

<div class="playlist-wrapper">
	<div class="playlist-header">
		<div class="header-top">
			<input
				id="playlist-title"
				type="text"
				placeholder="Enter Playlist Title..."
				bind:value={title}
			/>
		</div>
	</div>
	{#each items as video,i}
		<VideoItem
			ind={i}
			title={video?.title}
			domain={video?.domain}
			url={video?.url}
            selected={i === ind}
            {loadVideo}
		/>
	{/each}
</div>

<style>
	.playlist-wrapper {
		position: relative;
		width: 22vw;
		height: calc(75vw * (9 / 16));
		border-radius: 15px;
		overflow-y: hidden;
		display: flex;
		flex-direction: column;
		background-color: #070707;
	}
	.playlist-header {
		position: sticky;
		background-color: #052e44e0;
		border-top-right-radius: 15px;
		border-top-left-radius: 15px;
		padding-block: 10px;
	}

	input#playlist-title {
		height: 1.5em;
		width: calc(100% - 50px); /* font-size: 1.5em; */
		font-size: 1.4vw;
		border: 1.5px solid rgb(112, 116, 119);
		border-radius: 15px;
		outline: none;
		background-color: transparent;
		/* background-color: rgba(32, 31, 31, 0.645); */
		color: white;
		font-weight: bold;
		padding-left: 10px;
		margin-left: 5px;
		float: left;
	}

	.header-top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
</style>
