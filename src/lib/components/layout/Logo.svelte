<svg
	aria-label="Quangdao's Logo"
	id="Layer_1"
	data-name="Layer 1"
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 59 31.1"
>
	<defs />
	<path class="cls-3" d="M10.1,12L0,15.9l10.1,3.9V12z" />
	<path class="cls-2" d="M17.7,31.1h-4.6L23.2,0h4.5L17.7,31.1z" />
	<path
		class="cls-1"
		d="M30.5,16.7c0-1.3,0.2-2.5,0.5-3.6c0.4-1.1,0.9-2,1.6-2.8c0.7-0.8,1.5-1.4,2.6-1.8c1-0.4,2.2-0.6,3.5-0.6
		c0.6,0,1.1,0,1.7,0.1c0.6,0,1.2,0.1,1.8,0.2s1.1,0.2,1.6,0.3s1,0.2,1.4,0.3v22.3h-4.4v-6.4c-0.6,0.3-1.1,0.5-1.7,0.6
		c-0.6,0.2-1.2,0.2-1.7,0.2c-1.1,0-2.1-0.2-2.9-0.6c-0.8-0.4-1.5-1-2.1-1.8c-0.6-0.8-1-1.7-1.3-2.8S30.5,18.1,30.5,16.7z M35,16.9
		c0,1.6,0.3,2.8,0.8,3.6c0.5,0.9,1.3,1.3,2.4,1.3c0.5,0,1-0.1,1.4-0.2s0.8-0.3,1.2-0.5v-9.3c-0.2,0-0.5-0.1-0.9-0.1
		s-0.8-0.1-1.2-0.1c-1.2,0-2.1,0.5-2.8,1.5C35.3,14.1,35,15.4,35,16.9z"
	/>
	<path class="cls-3" d="M48.9,19.9L59,16l-10.1-4V19.9z" />
</svg>

<style lang="scss">
	@use '@scissors/media';

	svg {
		width: 120px;
	}
	.cls-1 {
		fill: var(--color-green-base);
	}
	.cls-2 {
		fill: var(--color-orange-base);
	}
	.cls-3 {
		fill: var(--color-black);
	}

	@include media.dark {
		.cls-3 {
			fill: var(--color-white);
		}
	}
</style>
