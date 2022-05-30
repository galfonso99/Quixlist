<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let showDialog;
	export let id;

	let shown = false;

	let address = $page.url.href;

	$: showDialog, show();

	export function show() {
		if (showDialog) {
			shown = true;
		}
	}

	const hide = () => {
		shown = false;
		showDialog = false;
	};
</script>

{#if shown}
	<div class="modal-wrapper">
		<div class="modal">
			<div class="dialog-wrapper">
				<h2 id="first">Your Playlist has been saved.</h2>
				<br />
				<h2 id="second">Do you want to go to the created playlist page?</h2>
				<a href={'/playlist/' + id} class="link"> {address}playlist/{id} </a>
				<br />
				<div class="buttons">
					<button name="close" on:click={hide}> No, stay here </button>
					<button name="home" on:click={() => goto(`/playlist/${id}`)}> Go There </button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	h2 {
		text-align: center;
	}
	button {
		padding: 15px;
		margin: 0px 50px;
		border-radius: 10px;
		cursor: pointer;
		width: 8vw;
		background-image: linear-gradient(to right, rgb(1, 52, 160) 0%, rgb(17, 113, 177) 100%);
		color: white;
	}

	.modal-wrapper {
		background-color: rgb(0, 0, 0);
		background-color: rgba(0, 0, 0, 0.803);
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 99999;
	}

	.modal {
		background-color: #fc804b; /* #ebfeff */
		border-radius: 10px;
		border: 2px solid #0085a3;
		box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
		width: 32vw;
		max-width: 40vw;
		max-height: 40vh;
		padding: 1rem;
		margin: 15% auto;
	}

	.buttons {
		display: flex;
		justify-content: space-between;
		margin-top: 40px;
	}

	.dialog-wrapper {
		display: flex;
		flex-direction: column;
		min-height: 40vh;
		text-align: center;
		justify-content: center;
	}

	.link {
		align-self: center;
		width: fit-content;
		color: blueviolet;
		text-decoration: none;
		font-family: 'Comic Sans MS', cursive, sans-serif;
		font-weight: bold;
		font-size: 20px;
		margin: 30px 0px;
	}
</style>
