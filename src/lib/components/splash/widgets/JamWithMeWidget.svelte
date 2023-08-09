<script lang="ts">
	import type { JamWithMeDetails } from '$lib/integrations/jam-with-me/models';

	export let music: JamWithMeDetails;
</script>

<div class="wrapper">
	<div class="notes">🎵</div>
	<div class="details-wrapper">
		<div class="details">
			<div class="details-thumb">
				<a href={music.album.url}>
					<img
						src={music.album.imageUrl}
						alt={`${music.album.title} by ${music.album.artists[0].name}`}
					/>
				</a>
			</div>
			<div class="details-message">
				<h3>Jam with me! I'm currently listening to:</h3>

				<p>
					<a href={music.track.url}>{music.track.title}</a>
				</p>
				<p>
					by {music.artists[0].name}
				</p>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.wrapper:hover {
		.details-wrapper {
			display: block;
		}
	}
	.details-wrapper {
		display: none;
		position: absolute;
		top: 100%;
		left: 0;
		padding-top: 0.5em;
		font-family: var(--font-primary);
		font-size: 1rem;
	}
	.details {
		padding: 0.5em;
		background: var(--color-black);
		display: inline-flex;
		width: max-content;
		min-width: 100%;
		&-thumb {
			width: 6vw;
			flex: auto 0 0;
			a,
			img {
				width: 100%;
				display: block;
			}
		}
		&-message {
			flex: auto 1 1;
			max-width: 40vw;
			padding-left: 0.5em;
			font-size: 0.875em;
			h3 {
				margin-bottom: 0.75em;
			}
			p {
				margin: 0;
				line-height: 1.5;
			}
		}
	}
</style>
