<script lang="ts">
	export let input;
	let temp_input: string;

	const submit = () => {
		input = temp_input;
		temp_input = '';
	};
</script>

<div class="input-wrapper">
	<textarea
		class="input"
		placeholder="/* Enter one or multiple video urls separated by enters"
		bind:value={temp_input}
	/>
	<button on:click={submit}> Submit videos </button>
</div>

<style>
	.input-wrapper {
		display: flex;
		flex-direction: column;
	}
	textarea {
		height: 7em;
		border: none;
		outline: none;
		margin: 10px;
		background-color: rgba(31, 30, 30, 0.851);
		border-radius: 15px;
		color: white;
	}
	button {
		width: fit-content;
		height: 2em;
		border: none;
		outline: none;
		background-color: #052e44e0;
		color: white;
		font-size: 1.2em;
		cursor: pointer;
		border-radius: 8px;
		margin: 0px 10px;
	}
</style>
