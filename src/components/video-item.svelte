<script lang="ts">
	export let title;
	export let domain;
	export let url;
	export let ind;
	export let loadVideo;
	export let selected;
</script>

<div class="wrapper" on:click={() => loadVideo(ind, url, domain)} class:selected>
	<div class="index-wrapper">
		<span id="index">{ind + 1}</span>
	</div>
	<div class="video-info">
		<span id="title" {title}>{title}</span>
		<a href={url} class="anchor">
			<span id="origin">{domain}</span>
		</a>
	</div>
</div>

<style>
	.wrapper {
		max-height: 10%;
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
		display: block;
		-webkit-line-clamp: 2;
		display: box;
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

	.anchor {
		text-decoration: none;
		color: white;
		font-size: 15px;
		font-weight: bold;
	}
</style>
