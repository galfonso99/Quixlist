<script lang="ts">
	import VideoItem from './video-item.svelte';
	import { db } from '../Firebase';
	import { ref, push, set, remove } from 'firebase/database';
	import SavePlaylistDialog from './save-playlist-dialog.svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons/faFloppyDisk';
	import { goto } from '$app/navigation';

	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';

	export let items;
	export let title = '';
	export let ind;
	export let id: string = undefined;
	export let loadVideo;
	export let deleteVideo;
	export let isSavedPlaylist: boolean = false;

	let showDialog = false;
	let prevId;
	let scroll = true;
	const flipDurationMs = 200;

	const handleSaveButton = async () => {
		savePlaylist();
	};

	const savePlaylist = () => {
		isSavedPlaylist ? updateSavedPlaylist() : saveNewPlaylist();
		!isSavedPlaylist && openDialogWindow();
	};

	const updateSavedPlaylist = () => {
		const playlistUrlsRef = ref(db, 'playlists/' + id + '/videos');
		// Delete the videos structure and create a new one with the updated videos
		remove(playlistUrlsRef);
		for (let video of items) {
			const videoRef = push(playlistUrlsRef);
			set(videoRef, {
				video_url: video.url,
				video_title: video.title
			});
		}
	};

	const saveNewPlaylist = () => {
		id = createNewId(); // Creates a random id
		const playlistRef = ref(db, 'playlists/' + id);
		const playlistUrlsRef = ref(db, 'playlists/' + id + '/videos');
		set(playlistRef, { title });
		for (let video of items) {
			const videoRef = push(playlistUrlsRef);
			set(videoRef, {
				video_url: video.url,
				video_title: video.title
			});
		}
	};

	const createNewId = () => {
		return Math.random()
			.toString(36)
			.replace(/[a-z0-9]/, '')
			.substring(1, 9);
	};

	const openDialogWindow = () => {
		showDialog = true;
	};

	function handleSort(e: CustomEvent<DndEvent>) {
		prevId = items[ind]?.id;
		items = e.detail.items;
	}

	/* This function not only updates the items array after a swap happens, but it also updates the current index of the playlists
	so that the video that was playing is the same after the swap */
	function handleSortFinalize(e: CustomEvent<DndEvent>) {
		items = e.detail.items;
		let newInd = items.findIndex((vid) => vid.id === prevId);
		ind = newInd;
	}
</script>

<div class="playlist-wrapper">
	<div class="playlist-header">
		<div class="header-top">
			{#if !isSavedPlaylist}
				<input
					id="playlist-title"
					type="text"
					placeholder="Enter Playlist Title..."
					bind:value={title}
				/>
			{:else}
				<h2 id="title">{title}</h2>
			{/if}
		</div>
		<div class="save" on:click={handleSaveButton}>
			<Fa icon={faFloppyDisk} />
			<span style="padding-left: 10px">SAVE</span>
		</div>
	</div>
	<section
		use:dndzone={{ items, flipDurationMs }}
		class="items drag-n-drop"
		on:consider={handleSort}
		on:finalize={handleSortFinalize}
	>
		{#each items as video (video.id)}
			<div
				animate:flip={{ duration: flipDurationMs }}
				class="video-card video-item-wrapper"
				class:selected={ind === items.indexOf(video)}
			>
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
</div>

<SavePlaylistDialog bind:showDialog {id} />

<style>
	.playlist-wrapper {
		position: relative;
		height: calc(77vw * (9 / 16));
		width: 22vw;
		border-radius: 15px;
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
	.drag-n-drop {
		overflow-y: scroll;
		overflow-x: hidden;
		outline: none !important;
	}

	.items {
		overflow-y: auto;
	}

	#title {
		font-size: 1.5em;
		font-weight: bold;
		margin-inline: 10px;
		margin-block: 0px;
		color: white;
		width: inherit;
		height: 1.5em;
		overflow: hidden;
		white-space: nowrap;
		float: left;
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

	.save {
		background-color: transparent;
		border-color: transparent;
		color: white;
		font-size: 1.25em;
		font-weight: bold;
		margin: 7px 10px 0px 10px;
		cursor: pointer;
		display: flex;
		font-family: 'Roboto', 'Arial', sans-serif;
		align-items: center;
	}

	.hidden {
		display: none;
	}
</style>
