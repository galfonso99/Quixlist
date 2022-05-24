<script lang="ts">
	export let loadNextVideo: () => void;
	export let skipAhead: () => void;

</script>


<vm-ui>
	<vm-click-to-play />
	<vm-dbl-click-fullscreen />
	<vm-spinner />
	<vm-loading-screen />
	<vm-default-settings />
	<vm-controls full-width>
		<vm-control-group>
			<vm-scrubber-control />
		</vm-control-group>

		<vm-control-group space="top">
			<vm-playback-control />
			<vm-control on:click={loadNextVideo}>
				<vm-icon src="/Skip.svg" label="Skip" />
				<vm-tooltip> Next </vm-tooltip>
			</vm-control>
			<vm-control on:click={skipAhead}>
				<vm-icon src="/Forward.svg" label="Forward" />
				<vm-tooltip> Skip Ahead </vm-tooltip>
			</vm-control>
			<vm-volume-control />
			<vm-time-progress separator="/" />

			<vm-control-spacer />
			<vm-pip-control />

			<vm-settings-control />

			<vm-fullscreen-control />
		</vm-control-group>
	</vm-controls>
</vm-ui>
