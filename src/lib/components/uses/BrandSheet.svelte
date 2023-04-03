<script lang="ts">
	const colors = ['#224102', '#FFA630', '#222E50', '#9F2042', '#F7F7F9', '#04080F'];
</script>

<h3>Colors</h3>

<ul class="colors">
	{#each colors as color}
		<li class="color">
			<div class="color-display" style="--color: {color}" />
			<div class="color-label">{color}</div>
		</li>
	{/each}
</ul>

<h3>Font Faces</h3>

<div class="font font-primary">
	<h4><a href="https://www.fontshop.com/families/ff-tisa-sans">FF Tisa Sans Pro</a></h4>
	<p>My primary font face.</p>
</div>

<div class="font font-code">
	<h4><a href="https://design.ubuntu.com/font">Ubuntu Mono</a></h4>
	<p>
		The font face I use for code snippets on the website. Also the font I set for all of my code
		editors!
	</p>
</div>

<div class="font font-script">
	<h4><a href="https://fonts.google.com/specimen/Gloria+Hallelujah">Gloria Hallelujah</a></h4>
	<p>A fun handwritten font-face I use for quotes throughout the site.</p>
</div>

<style lang="scss">
	@use '~/breakpoints';

	.colors {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.5em;
		padding: 0;
		max-width: 600px;
		list-style-type: none;
		@include breakpoints.large {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.color {
		display: flex;
		align-items: center;
		&-display {
			aspect-ratio: 1;
			height: 1.5em;
			background: var(--color);
			margin-right: 0.5em;
			border: 1px solid var(--color-foreground);
		}
	}

	.font {
		h4 {
			font-weight: normal;
			font-size: 2em;
		}
		&-primary h4 {
			font-family: var(--font-primary);
		}
		&-code h4 {
			font-family: var(--font-code);
		}
		&-script h4 {
			font-family: var(--font-script);
		}
	}
</style>
